import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, MetaFunction } from "@remix-run/react";

// Replace with your actual Supabase credentials
const supabaseUrl = 'https://rnrbhrdtuakgdenosfgj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucmJocmR0dWFrZ2Rlbm9zZmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MzYyOTYsImV4cCI6MjA0MTQxMjI5Nn0.5rXZ1w0neKmCogymbhDJecpwji0dvtG3pEEEs2k5iPA';

const supabase = createClient(supabaseUrl, supabaseKey);

export const meta: MetaFunction = () => {
  return [
    { title: "Willow Canyon Softball Golf Outing" },
    { name: "description", content: "Information about the Willow Canyon Softball Golf Outing event." }
  ];
};

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

  const submitData = async () => {
    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");

    // Trim input values
    const trimmedName = name.trim();
    const trimmedTeamName = teamName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    // Validation
    if (!trimmedName || !trimmedTeamName || !trimmedEmail || !trimmedPhone) {
      setErrorMessage("Please fill out all required fields.");
      return false;
    }

    if (!trimmedEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (!phonePattern.test(trimmedPhone)) {
      setErrorMessage("Fore! 🏌️‍♂️ Your phone number needs to be in the format xxx-xxx-xxxx. Please fix that slice and try again.");
      return false;
    }

    // Submit to Supabase
    const { error } = await supabase
      .from("registrations")
      .insert([
        { name: trimmedName, team_name: trimmedTeamName, email: trimmedEmail, phone: trimmedPhone }
      ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      setErrorMessage("Error submitting data. Please try again.");
      return false;
    } else {
      // Clear form
      setName("");
      setTeamName("");
      setEmail("");
      setPhone("");
      setSuccessMessage("Great shot! Your registration is in the hole! 🏌️‍♂️⛳");
      return true;
    }
  };

  const handlePayNow = async () => {
    const success = await submitData();
    if (success) {
      // Redirect to payment link
      window.location.href = 'https://square.link/u/v01tMB9e';
    }
  };

  const handlePayAtCourse = async () => {
    const success = await submitData();
    if (success) {
      // Success message is already set in submitData
      // You can display additional messages or actions here if needed
    }
  };

  return (
    <main
      className="relative min-h-screen bg-blue sm:flex sm:items-center sm:justify-center"
      style={{
        backgroundImage: `url("https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/dimple-background.jpg?raw=true")`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/golf-hole-mt.jpg?raw=true")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-[color:rgba(0,123,255,0.5)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-12 pt-12 pb-8 sm:px-12 sm:pt-24 sm:pb-14 lg:px-16 lg:pt-32">
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="p-6 rounded-lg shadow-lg text-gray-800">
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Individual Registration</h2>
                <p className="text-center text-lg mt-4">Register and pay as an individual or register and pay at the golf course</p>

                <p className="text-center text-red-600 font-bold text-xl mt-4">
                  Cost $120 per player
                </p>

                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <input 
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      maxLength={61}
                      required
                    />
                  </div>

                  <div>
                    <input 
                      type="text"
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Team Name"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      maxLength={61}
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
                      maxLength={61}
                      required
                    />
                  </div>

                  <div>
                    <input 
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number (xxx-xxx-xxxx)"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      maxLength={12}
                      required
                      pattern="\d{3}-\d{3}-\d{4}"
                      title="Oops! Looks like your phone number's in the sand trap. 🏌️‍♂️⛳ Make sure it's in the format xxx-xxx-xxxx before you tee off on that submit button!"
                    />
                  </div>

                  {/* Removed team member inputs */}

                  <div className="flex justify-center mt-6 space-x-4">
                    <button 
                      type="button" 
                      onClick={handlePayNow}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Submit &amp; Pay Registration
                    </button>
                    <button 
                      type="button" 
                      onClick={handlePayAtCourse}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Submit &amp; Pay at Golf Course
                    </button>
                  </div>
                </form>

                {/* Moved success and error messages outside the form */}
                {successMessage && (
                  <p className="mt-4 text-green-500 text-center bg-white p-4 rounded-md">
                    {successMessage}
                  </p>
                )}

                {errorMessage && (
                  <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
                )}

                <div className="flex flex-col sm:flex-row justify-center mt-10 space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link
                    to="/about"
                    className="flex items-center justify-center rounded-md bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600"
                  >
                    Information
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-md bg-gray-500 px-4 py-3 font-medium text-white hover:bg-gray-600"
                  >
                    Home
                  </Link>
                  <Link
                    to="/sponsorship"
                    className="flex items-center justify-center rounded-md bg-green-500 px-4 py-3 font-medium text-white hover:bg-green-600"
                  >
                    Sponsorship
                  </Link>
                  <Link
                    to="/donate"
                    className="flex items-center justify-center rounded-md bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700"
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
