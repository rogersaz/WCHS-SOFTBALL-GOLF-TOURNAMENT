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

export default function SponsorshipForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [sponsorshipLevel, setSponsorshipLevel] = useState("Single");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Payment links for each sponsorship level
  const paymentLinks = {
    'Single': 'https://square.link/u/TQbHVKAT',
    'Double': 'https://square.link/u/IzQeu7UR',
    'Triple': 'https://square.link/u/kQ9x5Paq',
    'Grand Slam': 'https://square.link/u/aORWOiJH',
  };

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

    // Email validation
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
      // Reset form fields
      setName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setLogoFile(null);
      setSponsorshipLevel("Single");
      setUploadProgress(0);

      // Redirect to the appropriate payment link based on sponsorship level
      const paymentLink = paymentLinks[sponsorshipLevel];
      if (paymentLink) {
        window.location.href = paymentLink;
      } else {
        alert("Success! You've just sunk a hole-in-one with that sponsorship submission! ⛳🏌️‍♂️");
      }
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
              <div
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                className="p-6 rounded-lg shadow-lg text-gray-800"
              >
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">
                  Four Sponsorship Levels
                </h2>
                <p className="text-center text-lg mt-4">
                  Local businesses can sponsor our event at various levels. Your generous contribution will support our softball program and make this event a memorable experience for all participants.
                </p>

                {/* Tax Deductible Information */}
                <p className="text-center text-lg mt-2 font-semibold text-green-800">
                  All sponsorships are tax-deductible, allowing you to support a great cause while benefiting from a tax deduction.
                </p>

                {/* Sponsorship Cards with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                  {/* Single Sponsor */}
                  <div className="max-w-sm mx-auto p-6 bg-white bg-opacity-50 border border-gray-200 rounded-lg shadow">
                    <img
                      src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/icons-softball-catch.png?raw=true"
                      alt="Single Sponsor Icon"
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Single</h5>
                    <p className="mb-3 font-semibold text-lg text-gray-700 text-center">$150</p>
                    <ul className="mb-3 text-gray-700 list-disc list-inside">
                      <li>1 Hole Sponsor Sign</li>
                    </ul>
                  </div>
                  {/* Double Sponsor */}
                  <div className="max-w-sm mx-auto p-6 bg-white bg-opacity-50 border border-gray-200 rounded-lg shadow">
                    <img
                      src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/icons-softball-hit.png?raw=true"
                      alt="Double Sponsor Icon"
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Double</h5>
                    <p className="mb-3 font-semibold text-lg text-gray-700 text-center">$600</p>
                    <ul className="mb-3 text-gray-700 list-disc list-inside">
                      <li>1 Hole Sponsor Sign</li>
                      <li>1 Foursome Tournament Entry</li>
                    </ul>
                  </div>
                  {/* Triple Sponsor */}
                  <div className="max-w-sm mx-auto p-6 bg-white bg-opacity-50 border border-gray-200 rounded-lg shadow">
                    <img
                      src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/icons-softball-pitching.png?raw=true"
                      alt="Triple Sponsor Icon"
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Triple</h5>
                    <p className="mb-3 font-semibold text-lg text-gray-700 text-center">$1,000</p>
                    <ul className="mb-3 text-gray-700 list-disc list-inside">
                      <li>1 Hole Sponsor Sign</li>
                      <li>1 Foursome Tournament Entry</li>
                      <li>WC Softball Field Banner</li>
                    </ul>
                  </div>
                  {/* Grand Slam Sponsor */}
                  <div className="max-w-sm mx-auto p-6 bg-white bg-opacity-50 border border-gray-200 rounded-lg shadow">
                    <img
                      src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/icons-softball-throw.png?raw=true"
                      alt="Grand Slam Sponsor Icon"
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Grand Slam</h5>
                    <p className="mb-3 font-semibold text-lg text-gray-700 text-center">$1,500</p>
                    <ul className="mb-3 text-gray-700 list-disc list-inside">
                      <li>1 Large Hole Sponsor Sign/Tent</li>
                      <li>2 Foursome Tournament Entries</li>
                      <li>WC Softball Field Banner</li>
                    </ul>
                  </div>
                </div>
                {/* Sponsorship Cards End Here */}

                {/* Sponsorship Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                      placeholder="Phone Number (xxx-xxx-xxxx)"
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
                      <option value="Single">Single Sponsor - $150</option>
                      <option value="Double">Double Sponsor - $600</option>
                      <option value="Triple">Triple Sponsor - $1,000</option>
                      <option value="Grand Slam">Grand Slam Sponsor - $1,500</option>
                    </select>
                  </div>

                  {errorMessage && (
                    <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
                  )}

                  <div className="flex justify-center mt-6">
                    <button 
                      type="submit" 
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Submit Sponsorship
                    </button>
                  </div>
                </form>

                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 justify-center mt-10">
                  <Link
                    to="/register"
                    className="flex items-center justify-center rounded-md bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600"
                  >
                    Register
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-md bg-gray-500 px-4 py-3 font-medium text-white hover:bg-gray-600"
                  >
                    Home
                  </Link>
                  {/* <Link
                    to="/donate"
                    className="flex items-center justify-center rounded-md bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700"
                  >
                    Donate/Pay
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

