import { Navigate } from 'react-router-dom';
import { useProtectedRoute } from './useProtectedRoute';

function ProtectedRoute({ children }) {
  const { isAuthorized, loading } = useProtectedRoute();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export { ProtectedRoute };