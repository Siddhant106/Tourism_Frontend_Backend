import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Download VADER lexicon (first time only)
try:
    nltk.data.find('vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

# Initialize VADER
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    """
    Analyzes sentiment of text using NLTK VADER
    
    Args:
        text (str): Review text to analyze
        
    Returns:
        dict: {
            'sentiment': 'positive' | 'neutral' | 'negative',
            'score': float (0 to 1),
            'scores': {neg, neu, pos, compound}
        }
    """
    
    # Get sentiment scores
    scores = sia.polarity_scores(text)
    
    # Compound score determines overall sentiment
    # Compound: -1 (most negative) to +1 (most positive)
    compound = scores['compound']
    
    # Classify sentiment
    if compound >= 0.05:
        sentiment = 'positive'
    elif compound <= -0.05:
        sentiment = 'negative'
    else:
        sentiment = 'neutral'
    
    # Normalize compound score to 0-1 range
    normalized_score = (compound + 1) / 2
    
    return {
        'sentiment': sentiment,
        'score': round(normalized_score, 3),
        'scores': scores  # Detailed breakdown
    }

# ============================================
# 🧪 TEST FUNCTION (optional)
# ============================================
if __name__ == '__main__':
    # Test examples
    test_reviews = [
        "Taj Mahal is absolutely beautiful! Best place ever! 😍",
        "The place was okay, nothing special.",
        "Terrible experience. Very crowded and dirty. 😞"
    ]
    
    print("\n🧪 Testing Sentiment Analysis:\n")
    for review in test_reviews:
        result = analyze_sentiment(review)
        print(f"Review: {review}")
        print(f"Sentiment: {result['sentiment']} ({result['score']})")
        print(f"Details: {result['scores']}\n")