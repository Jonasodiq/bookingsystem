import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Välkommen till Bokningssystemet
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Boka tid hos din frisör snabbt och enkelt
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              to="/bookings"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Boka tid
            </Link>
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
            >
              Logga in
            </Link>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Boka online</h3>
            <p className="text-gray-600">
              Se lediga tider i realtid och boka direkt via webben
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">✂️</div>
            <h3 className="text-xl font-semibold mb-2">Välj frisör</h3>
            <p className="text-gray-600">
              Boka med din favoritfrisör eller välj nästa lediga tid
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔔</div>
            <h3 className="text-xl font-semibold mb-2">Hantera bokningar</h3>
            <p className="text-gray-600">
              Ändra eller avboka din tid enkelt via ditt konto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
