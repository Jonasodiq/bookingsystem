import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Bokningssystem
            </Link>

            <div className="flex gap-6 items-center">
              <Link
                to="/"
                className={`${
                  isActive('/')
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                } transition`}
              >
                Hem
              </Link>
              <Link
                to="/bookings"
                className={`${
                  isActive('/bookings')
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                } transition`}
              >
                Mina bokningar
              </Link>
              <Link
                to="/admin"
                className={`${
                  isActive('/admin')
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                } transition`}
              >
                Admin
              </Link>
              <Link
                to="/staff"
                className={`${
                  isActive('/staff')
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                } transition`}
              >
                Personal
              </Link>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    Logga ut
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`${
                    isActive('/login')
                      ? 'text-indigo-600 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  } transition`}
                >
                  Logga in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2026 Bokningssystem. Examensarbete av Jonas.</p>
        </div>
      </footer>
    </div>
  );
}
