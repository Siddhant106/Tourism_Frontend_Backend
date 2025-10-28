from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from sentiment_model import analyze_sentiment
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Frontend se connect karne ke liye

# MongoDB Connection
client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
db = client['tourism_db']
reviews_collection = db['reviews']

# ============================================
# 📍 1. GET ALL REVIEWS (for a destination)
# ============================================
@app.route('/api/reviews/<destination_id>', methods=['GET'])
def get_reviews(destination_id):
    try:
        reviews = list(reviews_collection.find(
            {"destination_id": destination_id}
        ).sort("timestamp", -1))
        
        # Convert ObjectId to string
        for review in reviews:
            review['_id'] = str(review['_id'])
        
        return jsonify({
            "success": True,
            "reviews": reviews
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ============================================
# 📝 2. POST NEW REVIEW (with ML sentiment)
# ============================================
@app.route('/api/reviews', methods=['POST'])
def add_review():
    try:
        data = request.json
        review_text = data.get('review')
        destination_id = data.get('destination_id')
        user_name = data.get('user_name', 'Anonymous')
        
        if not review_text or not destination_id:
            return jsonify({
                "success": False, 
                "error": "Review and destination_id required"
            }), 400
        
        # 🤖 ML MODEL CALL - Sentiment Analysis
        sentiment_result = analyze_sentiment(review_text)
        
        # Create review object
        review_doc = {
            "destination_id": destination_id,
            "user_name": user_name,
            "review": review_text,
            "sentiment": sentiment_result['sentiment'],  # positive/neutral/negative
            "sentiment_score": sentiment_result['score'],  # 0 to 1
            "timestamp": datetime.utcnow()
        }
        
        # Save to database
        result = reviews_collection.insert_one(review_doc)
        review_doc['_id'] = str(result.inserted_id)
        
        return jsonify({
            "success": True,
            "review": review_doc,
            "message": "Review added successfully!"
        }), 201
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ============================================
# 📊 3. GET DASHBOARD STATS
# ============================================
@app.route('/api/stats', methods=['GET'])
def get_stats():
    try:
        # Count sentiments
        total_reviews = reviews_collection.count_documents({})
        positive = reviews_collection.count_documents({"sentiment": "positive"})
        neutral = reviews_collection.count_documents({"sentiment": "neutral"})
        negative = reviews_collection.count_documents({"sentiment": "negative"})
        
        # Top rated destinations (most positive reviews)
        pipeline = [
            {"$match": {"sentiment": "positive"}},
            {"$group": {
                "_id": "$destination_id",
                "positive_count": {"$sum": 1}
            }},
            {"$sort": {"positive_count": -1}},
            {"$limit": 5}
        ]
        top_destinations = list(reviews_collection.aggregate(pipeline))
        
        return jsonify({
            "success": True,
            "total_reviews": total_reviews,
            "sentiments": {
                "positive": positive,
                "neutral": neutral,
                "negative": negative
            },
            "top_destinations": top_destinations
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ============================================
# 🏃 RUN SERVER
# ============================================
if __name__ == '__main__':
    app.run(debug=True, port=5000)