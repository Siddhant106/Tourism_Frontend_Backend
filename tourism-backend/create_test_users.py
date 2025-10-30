# tourism-backend/create_test_users.py
# 🔥 Run this to create test users instantly

from pymongo import MongoClient
from werkzeug.security import generate_password_hash
import os
from dotenv import load_dotenv

load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
db = client['tourism_db']
users_collection = db['users']

# Test users data
test_users = [
    {
        "name": "Rahul Kumar",
        "email": "rahul@test.com",
        "password": "test123"
    },
    {
        "name": "Priya Sharma",
        "email": "priya@test.com",
        "password": "test123"
    },
    {
        "name": "Admin User",
        "email": "admin@tourism.com",
        "password": "admin123"
    }
]

print("🚀 Creating test users...\n")

for user in test_users:
    # Check if user already exists
    existing = users_collection.find_one({"email": user["email"]})
    
    if existing:
        print(f"⚠️  User already exists: {user['email']}")
        continue
    
    # Hash password
    hashed_password = generate_password_hash(user["password"])
    
    # Insert user
    users_collection.insert_one({
        "name": user["name"],
        "email": user["email"],
        "password": hashed_password
    })
    
    print(f"✅ Created: {user['name']} ({user['email']})")
    print(f"   Password: {user['password']}\n")

print("=" * 50)
print("🎉 All test users created!\n")
print("📝 Login Credentials:")
print("=" * 50)
print("\n👤 User 1:")
print("   Email: rahul@test.com")
print("   Password: test123")
print("\n👤 User 2:")
print("   Email: priya@test.com")
print("   Password: test123")
print("\n👤 Admin:")
print("   Email: admin@tourism.com")
print("   Password: admin123")
print("\n" + "=" * 50)