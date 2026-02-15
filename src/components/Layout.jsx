import { Link, useLocation } from 'react-router';

export default function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Bokningssystem
            </Link>

            <div className="flex gap-6">
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
                to="/login"
                className={`${
                  isActive('/login')
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                } transition`}
              >
                Logga in
              </Link>
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
