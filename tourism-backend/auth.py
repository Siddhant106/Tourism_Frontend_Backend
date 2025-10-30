# tourism-backend/auth.py
# 🔐 User Authentication Module

from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

# Secret key for JWT (in production, use environment variable)
SECRET_KEY = "your-secret-key-change-this-in-production"

# ============================================
# JWT Token Decorator
# ============================================
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'success': False, 'error': 'Token is missing!'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data['user_id']
        except:
            return jsonify({'success': False, 'error': 'Token is invalid!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

# ============================================
# Add these routes to app.py
# ============================================

def setup_auth_routes(app, users_collection):
    """
    Call this function in app.py to setup authentication routes
    """
    
    # SIGNUP
    @app.route('/api/auth/signup', methods=['POST'])
    def signup():
        try:
            data = request.json
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            
            if not name or not email or not password:
                return jsonify({
                    'success': False,
                    'error': 'All fields required'
                }), 400
            
            # Check if user already exists
            if users_collection.find_one({'email': email}):
                return jsonify({
                    'success': False,
                    'error': 'Email already registered'
                }), 400
            
            # Hash password
            hashed_password = generate_password_hash(password)
            
            # Create user
            user_doc = {
                'name': name,
                'email': email,
                'password': hashed_password,
                'created_at': datetime.datetime.utcnow()
            }
            
            result = users_collection.insert_one(user_doc)
            
            # Generate JWT token
            token = jwt.encode({
                'user_id': str(result.inserted_id),
                'email': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
            }, SECRET_KEY, algorithm="HS256")
            
            return jsonify({
                'success': True,
                'message': 'User created successfully!',
                'token': token,
                'user': {
                    'id': str(result.inserted_id),
                    'name': name,
                    'email': email
                }
            }), 201
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    # LOGIN
    @app.route('/api/auth/login', methods=['POST'])
    def login():
        try:
            data = request.json
            email = data.get('email')
            password = data.get('password')
            
            if not email or not password:
                return jsonify({
                    'success': False,
                    'error': 'Email and password required'
                }), 400
            
            # Find user
            user = users_collection.find_one({'email': email})
            
            if not user:
                return jsonify({
                    'success': False,
                    'error': 'Invalid credentials'
                }), 401
            
            # Check password
            if not check_password_hash(user['password'], password):
                return jsonify({
                    'success': False,
                    'error': 'Invalid credentials'
                }), 401
            
            # Generate JWT token
            token = jwt.encode({
                'user_id': str(user['_id']),
                'email': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
            }, SECRET_KEY, algorithm="HS256")
            
            return jsonify({
                'success': True,
                'message': 'Login successful!',
                'token': token,
                'user': {
                    'id': str(user['_id']),
                    'name': user['name'],
                    'email': user['email']
                }
            }), 200
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500
    
    # GET USER PROFILE (Protected Route Example)
    @app.route('/api/auth/profile', methods=['GET'])
    @token_required
    def get_profile(current_user):
        try:
            from bson import ObjectId
            user = users_collection.find_one({'_id': ObjectId(current_user)})
            
            if not user:
                return jsonify({'success': False, 'error': 'User not found'}), 404
            
            return jsonify({
                'success': True,
                'user': {
                    'id': str(user['_id']),
                    'name': user['name'],
                    'email': user['email']
                }
            }), 200
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

# ============================================
# Update requirements.txt
# ============================================
# Add these lines:
# PyJWT==2.8.0
# werkzeug==2.3.0