import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, MetaFunction } from "@remix-run/react";

const supabaseUrl = 'https://rnrbhrdtuakgdenosfgj.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY'; // Replace with your actual Supabase key
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
      alert("Success! You've just sunk a hole-in-one with that sponsorship submission! ⛳🏌️‍♂️");

      // Reset form fields
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
                <p className="text-center text-lg mt-4">
                  Three different sponsor options.<br />
                
                </p>

                <div>
  <h2 className="text-2xl font-bold mt-8">Sponsorship Form</h2>
  <p className="mt-4">
    We are thrilled to offer three levels of sponsorship for the Willow Canyon Softball Golf Outing.
    Your generous contribution will support our softball program and make this event a memorable
    experience for all participants.
  </p>

  <h3 className="text-xl font-semibold mt-6">1. Birdie Sponsor - $75</h3>
  <ul className="list-disc list-inside ml-4 mt-2">
    <li>
      <strong>Company Recognition:</strong> Your business name listed on our official event website.
    </li>
    <li>
      <strong>Social Media Shout-out:</strong> Acknowledgment on our social media platforms thanking
      your company for its support.
    </li>
  </ul>

  <h3 className="text-xl font-semibold mt-6">2. Eagle Sponsor - $100</h3>
  <ul className="list-disc list-inside ml-4 mt-2">
    <li>
      <strong>Includes all Birdie Sponsor benefits, plus:</strong>
    </li>
    <li>
      <strong>Logo Placement:</strong> Your company logo featured on event promotional materials.
    </li>
    <li>
      <strong>Event Signage:</strong> Recognition on banners displayed at the event venue.
    </li>
  </ul>

  <h3 className="text-xl font-semibold mt-6">3. Hole-in-One Sponsor - $150</h3>
  <ul className="list-disc list-inside ml-4 mt-2">
    <li>
      <strong>Includes all Eagle Sponsor benefits, plus:</strong>
    </li>
    <li>
      <strong>Exclusive Hole Signage:</strong> Your company's logo prominently displayed on signage
      at one of the golf holes.
    </li>
    <li>
      <strong>Verbal Recognition:</strong> Special mention during the event's opening and closing
      ceremonies.
    </li>
  </ul>
</div>


                

                {/* Sponsorship Cards with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {/* Par Sponsor */}
                  <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img
                      src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/golf-man.png?raw=true"
                      alt="Birdie Sponsor Icon"
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <Link to="/donate">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Par Sponsor</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700">$75.00 order NOW</p>
                    <Link
                      to="/donate"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                  {/* Birdie Sponsor */}
                  <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img
                      src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/golf-man-flag.png?raw=true"
                      alt="Eagle Sponsor Icon"
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <Link to="/donate">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Birdie Sponsor</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700">$100.00 order NOW</p>
                    <Link
                      to="/donate"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                  {/* Eagle Sponsor */}
                  <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img
                      src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/golf-cart-icon.png?raw=true"
                      alt="Hole-in-One Sponsor Icon"
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <Link to="/donate">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Eagle Sponsor</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700">$150.00 order NOW</p>
                    <Link
                      to="/donate"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                {/* Sponsorship Cards End Here */}

                {/* Sponsorship Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* ... (form fields and buttons remain unchanged) */}
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

