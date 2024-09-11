import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "@remix-run/react";
import 'tailwindcss/tailwind.css';

const supabaseUrl = 'https://rnrbhrdtuakgdenosfgj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucmJocmR0dWFrZ2Rlbm9zZmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MzYyOTYsImV4cCI6MjA0MTQxMjI5Nn0.5rXZ1w0neKmCogymbhDJecpwji0dvtG3pEEEs2k5iPA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PencilMeIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation to ensure "@" is present
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Clear error message if email is valid
    setErrorMessage("");

    const { error } = await supabase
      .from("pencil")
      .insert([{ name, email }]);

    if (error) {
      console.error("Error adding data:", error.message);
      setErrorMessage("🚩 Oops! Looks like we sliced that shot into the rough. 🏌️ Give it another swing and try again!");
    } else {
      // Success message popup
      alert("🏌️‍♂️ You’ve been penciled in! ⛳ We'll tee up a reminder when the date gets closer—get ready to swing into action!");

      // Clear form fields
      setName("");
      setEmail("");
    }
  };

  return (
    <main 
      className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center"
      style={{
        backgroundImage: `url("https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/dimple-background.jpg?raw=true")`,
        backgroundRepeat: 'repeat', // This will tile the image
        backgroundSize: 'auto', // Keep the natural size of the image for tiling
      }}
    >
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/pencil-me-in.jpg?raw=true"
                alt="Pencil Me In"
              />
              <div className="absolute inset-0 bg-[color:rgba(0,0,128,0.4)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-12 pt-12 pb-8 sm:px-12 sm:pt-24 sm:pb-14 lg:px-16 lg:pt-32">
              {/* Matching form background */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="p-6 rounded-lg shadow-lg text-gray-800">
                <p className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl text-black">
                  <span className="block uppercase">
                    Willow Canyon Softball <br></br>Golf Outing
                  </span>
                </p>
                {/* Updated text color */}
                <p className="text-center text-gray-700 text-lg mt-4">
                  Add your name and email to our list and we <br></br>will send you a reminder email next month
                </p>

                {/* Form for Name and Email */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md mx-auto">
                  <div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Pencil Me In
                    </button>
                  </div>
                </form>

                {/* Buttons Below Form */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center mt-8">
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-md bg-gray-500 px-4 py-3 font-medium text-white hover:bg-gray-600 sm:px-8"
                  >
                    Home
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center rounded-md bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600 sm:px-8"
                  >
                    Register
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center justify-center rounded-md bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700 sm:px-8"
                  >
                    About
                  </Link>
                  <Link
                    to="/sponsorship"
                    className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 sm:px-8"
                  >
                    Sponsorship
                  </Link>
                  <Link
                    to="/donate"
                    className="flex items-center justify-center rounded-md bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700 sm:px-8"
                  >
                    Donate/Pay
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
