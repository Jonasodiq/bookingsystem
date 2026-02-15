import { useState, useEffect } from 'react';
import { apiClient } from '../config/aws';

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/bookings');
      setBookings(data);
      calculateStats(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData) => {
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookingsData.filter((b) => b.date === today);

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekBookings = bookingsData.filter((b) => {
      const bookingDate = new Date(b.date);
      return bookingDate >= weekAgo && bookingDate <= now;
    });

    setStats({
      total: bookingsData.length,
      today: todayBookings.length,
      thisWeek: weekBookings.length,
    });
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {/* Statistik Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Totalt bokningar</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Idag</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {stats.today}
                </p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Denna vecka</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.thisWeek}
                </p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>
        </div>

        {/* Alla Bokningar */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Alla bokningar</h2>

          {bookings.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Inga bokningar ännu
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tjänst
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Datum
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tid
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Personal
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Bokad
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {booking.service}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {booking.date}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {booking.time}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {booking.staffId}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString(
                            'sv-SE',
                          )}
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
