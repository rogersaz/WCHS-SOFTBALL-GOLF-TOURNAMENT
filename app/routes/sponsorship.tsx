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

export default function SponsorshipForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (file) => {
    setUploadProgress(0);
    const fileExt = file.name.split(".").pop();
    const fileName = `${company}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from("logos")
      .upload(`public/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading file:", error.message);
      return;
    }

    setUploadProgress(100);
    return data.path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadProgress(0);

    // Email validation to check if "@" exists
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    let logoUrl = "";
    if (logoFile) {
      logoUrl = await handleFileUpload(logoFile);
    }

    const { error } = await supabase
      .from("sponsorships")
      .insert([
        { name, company, phone, email, logo: logoUrl }
      ]);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      alert("Success! You've just sunk a hole-in-one with that sponsorship submission! ⛳🏌️‍♂️");

      setName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setLogoFile(null);
      setUploadProgress(0);
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
                backgroundImage: `url("https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/Golf-Hole-Sun.jpg?raw=true")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-[color:rgba(0,123,255,0.5)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-12 pt-12 pb-8 sm:px-12 sm:pt-24 sm:pb-14 lg:px-16 lg:pt-32">
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="p-6 rounded-lg shadow-lg text-gray-800">
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Sponsorship Form</h2>
                <p className="text-center text-lg mt-4">Local businesses can sponsor a specific hole.</p>

                <p className="text-center text-red-600 font-bold text-xl mt-4">
                  Donation cost $120 per hole
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-1" htmlFor="name">Name</label>
                    <input 
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1" htmlFor="company">Business Name</label>
                    <input 
                      type="text"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1" htmlFor="phone">Phone Number</label>
                    <input 
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-bold mb-1" htmlFor="email">Email Address</label>
                    <input 
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1" htmlFor="logo">Upload Logo (.jpg, .jpeg, .png, .pdf)</label>
                    <input 
                      type="file"
                      id="logo"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => setLogoFile(e.target.files[0])}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    {uploadProgress > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center mt-6">
                    <button 
                      type="submit" 
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Submit Sponsorship
                    </button>
                  </div>
                </form>

                <div className="flex justify-center mt-10 space-x-6">
                  <Link
                    to="/register"
                    className="flex items-center justify-center rounded-md bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600 sm:px-8"
                  >
                    Register
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-md bg-gray-500 px-4 py-3 font-medium text-white hover:bg-gray-600 sm:px-8"
                  >
                    Home
                  </Link>
                  {/* Added Donation Button */}
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
