// Install necessary dependencies: `npm install @supabase/supabase-js tailwindcss`

// Setting up the login page and backend data display using Remix and Supabase

// 1. Import required libraries
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';

// 2. Set up Supabase client (replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with actual keys)
const supabase = createClient('https://rnrbhrdtuakgdenosfgj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucmJocmR0dWFrZ2Rlbm9zZmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MzYyOTYsImV4cCI6MjA0MTQxMjI5Nn0.5rXZ1w0neKmCogymbhDJecpwji0dvtG3pEEEs2k5iPA');

export default function BackendDashboard() {
  // State to store user info, fetched data, form inputs, and error messages
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // 3. Login Functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Use Supabase's signInWithPassword method to authenticate the user
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // Set an error message if login fails
        setError('Invalid email or password');
      } else {
        // Set the user if login is successful
        setUser(loginData?.user);
      }
    } catch (error) {
      // Handle unexpected errors
      setError('An unexpected error occurred');
    }
  };

  // 4. Logout Functionality
  const handleLogout = async () => {
    // Sign out the user using Supabase's signOut method
    await supabase.auth.signOut();
    setUser(null); // Clear the user state after logging out
  };

  // 5. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        // Fetch data from the 'registrations' table if the user is logged in
        const { data: registrations, error } = await supabase
          .from('registrations')
          .select('*');
        if (error) {
          // Log any errors that occur while fetching data
          console.error('Error fetching data:', error);
        } else {
          // Set the fetched data to the state
          setData(registrations);
        }
      }
    };
    fetchData();
  }, [user]); // Only refetch data when the user state changes

  // 6. Tailwind CSS styling
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
      {!user ? (
        // Render the login form if the user is not logged in
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
            {error && <p className="text-red-600">{error}</p>} {/* Display error message if any */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Log In
            </button>
          </form>
        </div>
      ) : (
        // Render the dashboard if the user is logged in
        <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Registrations Dashboard</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </div>
          {/* Display the data fetched from the 'registrations' table */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <div key={item.id} className="bg-blue-50 rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-xl mb-2">{item.customer_name}</h3>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Genre:</strong> {item.song_genre}</p>
                <p><strong>Keywords:</strong> {item.keywords}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}