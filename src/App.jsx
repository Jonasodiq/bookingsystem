import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BookingsPage from './pages/BookingsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
