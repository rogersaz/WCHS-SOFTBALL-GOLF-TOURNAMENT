// Install necessary dependencies: `npm install @supabase/supabase-js tailwindcss`

// Setting up the login page and backend data display using Remix and Supabase

// 1. Import required libraries
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';

// 2. Set up Supabase client
const supabase = createClient('https://rnrbhrdtuakgdenosfgj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucmJocmR0dWFrZ2Rlbm9zZmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MzYyOTYsImV4cCI6MjA0MTQxMjI5Nn0.5rXZ1w0neKmCogymbhDJecpwji0dvtG3pEEEs2k5iPA');

export default function BackendDashboard() {
  // State to store user info, fetched data, form inputs, error messages, and loading state
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // 3. Login Functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError('Invalid email or password');
      } else {
        setUser(loginData.user);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // 4. Logout Functionality
  const handleLogout = async () => {
    setLogoutLoading(true);
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
    setLogoutLoading(false);
  };

  // 5. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else if (session) {
        setUser(session.user);
        const { data: registrations, error: fetchError } = await supabase
          .from('registrations')
          .select('name, team-name, email, phone, pay-with-check, pay-with-cc');
        if (!fetchError) {
          setData(registrations);
        } else {
          console.error('Error fetching registrations:', fetchError);
        }
      }
    };
    fetchData();
  }, [user]);

  // 6. Tailwind CSS styling
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
      {!user ? (
        <div className="bg-white rounded-lg p-8 shadow-md max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Registrations Dashboard</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              disabled={logoutLoading}
            >
              {logoutLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data ? (
              data.length > 0 ? (
                data.map((item) => (
                  <div key={item.email} className="bg-blue-50 rounded-lg p-6 shadow-md">
                    <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                    <p><strong>Team Name:</strong> {item['team-name']}</p>
                    <p><strong>Email:</strong> {item.email}</p>
                    <p><strong>Phone:</strong> {item.phone}</p>
                    <p><strong>Pay with Check:</strong> {item['pay-with-check'] ? 'Yes' : 'No'}</p>
                    <p><strong>Pay with Credit Card:</strong> {item['pay-with-cc'] ? 'Yes' : 'No'}</p>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full">No registrations found.</p>
              )
            ) : (
              <p className="text-center col-span-full">Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}