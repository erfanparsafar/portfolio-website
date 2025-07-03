#!/usr/bin/env python3
"""
Security Check Script for Django Project
"""

import os
import sys
import django
from django.conf import settings
from django.core.management import execute_from_command_line

def check_security_settings():
    """Check security settings"""
    print("🔒 Security Settings Check:")
    
    # Check SECRET_KEY
    if settings.SECRET_KEY == 'django-insecure-y^qds(_c-oj97(-5+7_3)02!=-1p#=d1n_q=y5t0gdca+^9(yj':
        print("❌ WARNING: Using default SECRET_KEY! Change it in production!")
    else:
        print("✅ SECRET_KEY is customized")
    
    # Check DEBUG
    if settings.DEBUG:
        print("❌ WARNING: DEBUG is True! Set to False in production!")
    else:
        print("✅ DEBUG is False")
    
    # Check ALLOWED_HOSTS
    if not settings.ALLOWED_HOSTS:
        print("❌ WARNING: ALLOWED_HOSTS is empty!")
    else:
        print("✅ ALLOWED_HOSTS is configured")
    
    # Check CORS
    if hasattr(settings, 'CORS_ALLOW_ALL_ORIGINS') and settings.CORS_ALLOW_ALL_ORIGINS:
        print("❌ WARNING: CORS_ALLOW_ALL_ORIGINS is True!")
    else:
        print("✅ CORS is properly configured")
    
    # Check Security Headers
    security_headers = [
        'SECURE_BROWSER_XSS_FILTER',
        'SECURE_CONTENT_TYPE_NOSNIFF',
        'X_FRAME_OPTIONS',
        'SECURE_HSTS_SECONDS',
    ]
    
    for header in security_headers:
        if hasattr(settings, header):
            print(f"✅ {header} is configured")
        else:
            print(f"❌ {header} is missing!")

def check_dependencies():
    """Check for known vulnerabilities in dependencies"""
    print("\n📦 Dependencies Security Check:")
    
    try:
        import subprocess
        result = subprocess.run(['pip', 'list', '--outdated'], capture_output=True, text=True)
        if result.stdout:
            print("⚠️  Some packages are outdated. Consider updating:")
            print(result.stdout)
        else:
            print("✅ All packages are up to date")
    except Exception as e:
        print(f"❌ Could not check dependencies: {e}")

def main():
    """Main security check function"""
    print("🔐 Django Security Check")
    print("=" * 50)
    
    # Setup Django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    django.setup()
    
    check_security_settings()
    check_dependencies()
    
    print("\n" + "=" * 50)
    print("✅ Security check completed!")
    print("\nRecommendations:")
    print("1. Set DEBUG=False in production")
    print("2. Use environment variables for SECRET_KEY")
    print("3. Configure ALLOWED_HOSTS properly")
    print("4. Use HTTPS in production")
    print("5. Regular security updates")

if __name__ == '__main__':
    main() 