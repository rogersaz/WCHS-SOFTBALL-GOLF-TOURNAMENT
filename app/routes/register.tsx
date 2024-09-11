import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, MetaFunction } from "@remix-run/react";

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
  const [teamMember1, setTeamMember1] = useState("");
  const [teamMember2, setTeamMember2] = useState("");
  const [teamMember3, setTeamMember3] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("registrations")
      .insert([
        { name, team_name: teamName, email, phone, team_member_1: teamMember1, team_member_2: teamMember2, team_member_3: teamMember3 }
      ]);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      setName("");
      setTeamName("");
      setEmail("");
      setPhone("");
      setTeamMember1("");
      setTeamMember2("");
      setTeamMember3("");
      setSuccessMessage("Great shot! Your registration is in the hole! 🏌️‍♂️⛳");
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
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Team and Individual Registration</h2>
                <p className="text-center text-lg mt-4">Register as a team or individual</p>

                <p className="text-center text-red-600 font-bold text-xl mt-4">
                  Cost $120 per player
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <input 
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

                  <div>
                    <input 
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <input 
                      type="text"
                      id="teamMember1"
                      value={teamMember1}
                      onChange={(e) => setTeamMember1(e.target.value)}
                      placeholder="Team Member 1 (Optional)"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <input 
                      type="text"
                      id="teamMember2"
                      value={teamMember2}
                      onChange={(e) => setTeamMember2(e.target.value)}
                      placeholder="Team Member 2 (Optional)"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <input 
                      type="text"
                      id="teamMember3"
                      value={teamMember3}
                      onChange={(e) => setTeamMember3(e.target.value)}
                      placeholder="Team Member 3 (Optional)"
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex justify-center mt-6">
                    <button 
                      type="submit" 
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Submit Registration
                    </button>
                  </div>

                  {successMessage && (
                    <p className="mt-4 text-green-500 text-center">{successMessage}</p>
                  )}
                </form>

                <div className="flex justify-center mt-10 space-x-6">
                  <Link
                    to="/about"
                    className="flex items-center justify-center rounded-md bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600 sm:px-8"
                  >
                    Information
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-md bg-gray-500 px-4 py-3 font-medium text-white hover:bg-gray-600 sm:px-8"
                  >
                    Home
                  </Link>
                  <Link
                    to="/sponsorship"
                    className="flex items-center justify-center rounded-md bg-green-500 px-4 py-3 font-medium text-white hover:bg-green-600 sm:px-8"
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
