#!/usr/bin/env python3
"""
Generate a secure SECRET_KEY for Django
"""

import secrets
import string

def generate_secret_key(length=50):
    """Generate a secure secret key"""
    alphabet = string.ascii_letters + string.digits + string.punctuation
    return ''.join(secrets.choice(alphabet) for _ in range(length))

if __name__ == '__main__':
    secret_key = generate_secret_key()
    print("🔐 Generated Secure SECRET_KEY:")
    print("=" * 50)
    print(secret_key)
    print("=" * 50)
    print("\n📝 Instructions:")
    print("1. Copy this SECRET_KEY")
    print("2. Set it as environment variable: SECRET_KEY=your_key_here")
    print("3. Never commit this key to version control!")
    print("4. Use different keys for development and production") 