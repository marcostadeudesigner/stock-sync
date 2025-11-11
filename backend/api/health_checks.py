from django.http import JsonResponse
from django.db import connection
from django.core.cache import cache
import psutil
import logging

logger = logging.getLogger(__name__)

def health_check(request):
    """Endpoint para verificar a saúde da aplicação"""
    checks = {
        'database': check_database(),
        'cache': check_cache(),
        'disk_space': check_disk_space(),
        'memory': check_memory()
    }
    
    status = 200 if all(checks.values()) else 503
    return JsonResponse(checks, status=status)

def check_database():
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        return True
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return False

def check_cache():
    try:
        cache.set('health_check', 'test', 1)
        return cache.get('health_check') == 'test'
    except Exception as e:
        logger.error(f"Cache health check failed: {e}")
        return False

def check_disk_space():
    try:
        return psutil.disk_usage('/').percent < 90
    except Exception as e:
        logger.error(f"Disk space check failed: {e}")
        return False

def check_memory():
    try:
        return psutil.virtual_memory().percent < 85
    except Exception as e:
        logger.error(f"Memory check failed: {e}")
        return False