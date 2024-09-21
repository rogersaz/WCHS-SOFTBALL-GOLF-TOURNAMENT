import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, MetaFunction, Form } from "@remix-run/react";

const supabaseUrl = 'https://rnrbhrdtuakgdenosfgj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiIsInJucmJocmR0dWFrZ2Rlbm9zZmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MzYyOTYsImV4cCI6MjA0MTQxMjI5Nn0.5rXZ1w0neKmCogymbhDJecpwji0dvtG3pEEEs2k5iPA';
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
  const [sponsorshipLevel, setSponsorshipLevel] = useState("Birdie");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");

    // Email validation to check if "@" exists
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone number validation
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(phone)) {
      setErrorMessage("Fore! 🏌️‍♂️ Your phone number's out of bounds! It needs to be in the format xxx-xxx-xxxx. Please adjust your swing and try again!");
      return;
    }

    let logoUrl = "";
    if (logoFile) {
      logoUrl = await handleFileUpload(logoFile);
    }

    const { error } = await supabase
      .from("sponsorships")
      .insert([{ name, company, phone, email, logo: logoUrl, sponsorship_level: sponsorshipLevel }]);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      alert("Success! You've just sunk a hole-in-one with that sponsorship submission! ⛳🏌️‍♂️");

      setName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setLogoFile(null);
      setSponsorshipLevel("Birdie");
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
                <p className="text-center text-lg mt-4">Local businesses can sponsor a specific hole.<br></br>Hole Sponsor - $150 One sign with your logo placed at a hole.</p>

                <p className="text-center text-red-600 font-bold text-xl mt-4">
                  Donation cost $150 per hole
                </p>

                <Form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                      type="text"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Business Name"
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
                      pattern="\d{3}-\d{3}-\d{4}"
                      title="Phone number must be in the format xxx-xxx-xxxx"
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

                  <div>
                    <label className="block text-sm font-bold mb-1" htmlFor="sponsorshipLevel">Sponsorship Level</label>
                    <select 
                      id="sponsorshipLevel"
                      value={sponsorshipLevel}
                      onChange={(e) => setSponsorshipLevel(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Birdie">Birdie Sponsor - $50</option>
                      <option value="Eagle">Eagle Sponsor - $100</option>
                      <option value="Albatross">Albatross Sponsor - $150</option>
                    </select>
                  </div>

                  {errorMessage && (
                    <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
                  )}

                  <div className="flex justify-center mt-6">
                    <button 
                      type="submit" 
                      className="group relative min-h-[50px] w-40 overflow-hidden border border-red-500 bg-white text-red-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full"
                    >
                      <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                      <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">Submit Sponsorship</span>
                    </button>
                  </div>
                </Form>

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center mt-10">
                  <Link
                    to="/register"
                    className="group relative min-h-[50px] w-40 overflow-hidden border border-blue-500 bg-white text-blue-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-blue-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-blue-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full"
                  >
                    <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-blue-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-blue-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                    <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">Register</span>
                  </Link>
                  <Link
                    to="/"
                    className="group relative min-h-[50px] w-40 overflow-hidden border border-green-500 bg-white text-green-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-green-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-green-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full"
                  >
                    <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-green-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-green-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                    <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">Home</span>
                  </Link>
                  <Link
                    to="/donate"
                    className="group relative min-h-[50px] w-40 overflow-hidden border border-orange-500 bg-white text-orange-500 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-orange-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-orange-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full"
                  >
                    <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-orange-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-orange-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                    <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">Donate/Pay</span>
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
