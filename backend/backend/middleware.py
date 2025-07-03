import time
from django.http import HttpResponseForbidden
from django.core.cache import cache

class SecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Rate limiting
        client_ip = self.get_client_ip(request)
        cache_key = f"rate_limit_{client_ip}"
        
        # Check if IP is blocked
        if cache.get(f"blocked_{client_ip}"):
            return HttpResponseForbidden("Too many requests")
        
        # Rate limiting logic
        requests = cache.get(cache_key, 0)
        if requests > 100:  # 100 requests per minute
            cache.set(f"blocked_{client_ip}", True, 300)  # Block for 5 minutes
            return HttpResponseForbidden("Too many requests")
        
        cache.set(cache_key, requests + 1, 60)  # Reset every minute
        
        response = self.get_response(request)
        
        # Security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        response['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        
        return response
    
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip 