import time
import logging
from sentry_sdk import configure_scope, capture_message

logger = logging.getLogger(__name__)

class MonitoringMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        
        # Adiciona contexto ao Sentry
        with configure_scope() as scope:
            if hasattr(request, 'resolver_match') and request.resolver_match:
                scope.set_tag("view_name", request.resolver_match.view_name)
            else:
                scope.set_tag("view_name", "unknown")
            
            if request.user.is_authenticated:
                scope.set_user({"id": request.user.id, "username": request.user.username})
            else:
                scope.set_user({"id": "anonymous"})
        
        response = self.get_response(request)
        
        duration = time.time() - start_time
        
        # Log de performance
        logger.info(f"Request to {request.path} completed in {duration:.2f}s - Status: {response.status_code}")
        
        # Alerta para requests lentos
        if duration > 5.0:  # Mais de 5 segundos
            capture_message(
                f"Slow request detected: {request.path} took {duration:.2f}s",
                level="warning"
            )
        
        return response