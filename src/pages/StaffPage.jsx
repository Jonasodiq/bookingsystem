import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../config/aws';

export default function StaffPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  // För demo, använd user email som staff ID
  // I produktion skulle detta komma från en staff-databas
  const staffId = user?.email || 'staff';

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/bookings');
      // Filtrera bokningar för denna personal
      const myBookings = data.filter((b) => b.staffId === staffId);
      setBookings(myBookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const bookingsForSelectedDate = bookings.filter(
    (b) => b.date === selectedDate,
  );

  const upcomingBookings = bookings
    .filter((b) => new Date(b.date) >= new Date())
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return new Date(a.date) - new Date(b.date);
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Laddar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Personalschema
          </h1>
          <p className="text-gray-600">Inloggad som: {user?.email}</p>
        </div>

        {/* Översikt */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Kommande bokningar</h2>
              <span className="text-3xl">📆</span>
            </div>
            <p className="text-4xl font-bold text-indigo-600">
              {upcomingBookings.length}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Totalt antal framtida bokningar
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Idag</h2>
              <span className="text-3xl">⏰</span>
            </div>
            <p className="text-4xl font-bold text-green-600">
              {
                bookings.filter(
                  (b) => b.date === new Date().toISOString().split('T')[0],
                ).length
              }
            </p>
            <p className="text-sm text-gray-600 mt-2">Bokningar för idag</p>
          </div>
        </div>

        {/* Datumväljare */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Välj datum för att se schema:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Schema för valt datum */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Schema för {selectedDate}
          </h2>

          {bookingsForSelectedDate.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Inga bokningar detta datum
            </p>
          ) : (
            <div className="space-y-3">
              {bookingsForSelectedDate
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-semibold text-indigo-600">
                        {booking.time}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.service}
                        </p>
                        <p className="text-sm text-gray-600">
                          Bokad: {new Date(booking.createdAt).toLocaleString('sv-SE')}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl">✅</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Alla kommande bokningar */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Alla kommande bokningar</h2>

          {upcomingBookings.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Inga kommande bokningar
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Datum
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tid
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tjänst
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {upcomingBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {booking.date}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-indigo-600">
                        {booking.time}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {booking.service}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Bekräftad
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
