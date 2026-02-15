import { useState, useEffect } from 'react';
import { apiClient } from '../config/aws';
import { useAuth } from '../contexts/AuthContext';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/bookings');
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const newBooking = await apiClient.post('/bookings', {
        userId: user?.uid || 'anonymous',
        service: formData.get('service'),
        staffId: formData.get('staffId'),
        date: formData.get('date'),
        time: formData.get('time'),
      });

      setBookings([...bookings, newBooking]);
      setShowNewBooking(false);
      e.target.reset();
    } catch (error) {
      console.error('Failed to create booking:', error);
      alert('Kunde inte skapa bokning');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Är du säker på att du vill avboka denna tid?')) {
      return;
    }

    try {
      await apiClient.delete(`/bookings/${bookingId}`);
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (error) {
      console.error('Failed to delete booking:', error);
      alert('Kunde inte avboka');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Laddar bokningar...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mina Bokningar</h1>
          <button
            onClick={() => setShowNewBooking(!showNewBooking)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {showNewBooking ? 'Avbryt' : '+ Ny bokning'}
          </button>
        </div>

        {showNewBooking && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Skapa ny bokning</h2>
            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tjänst
                </label>
                <select
                  name="service"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Välj tjänst</option>
                  <option value="Klippning">Klippning</option>
                  <option value="Klippning & färg">Klippning & färg</option>
                  <option value="Färgning">Färgning</option>
                  <option value="Permanent">Permanent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frisör
                </label>
                <select
                  name="staffId"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Välj frisör</option>
                  <option value="staff1">Anna Andersson</option>
                  <option value="staff2">Erik Eriksson</option>
                  <option value="staff3">Maria Svensson</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Datum
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tid
                  </label>
                  <select
                    name="time"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Välj tid</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Boka tid
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">Inga bokningar ännu</p>
              <p className="text-sm text-gray-500 mt-2">
                Klicka på "Ny bokning" för att skapa din första bokning
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.service}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      📅 {booking.date} kl. {booking.time}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Bokad:{' '}
                      {new Date(booking.createdAt).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Ändra
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Avboka
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
