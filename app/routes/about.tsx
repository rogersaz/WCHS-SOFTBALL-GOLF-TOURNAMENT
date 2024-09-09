import { Link, MetaFunction } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Willow Canyon Softball Golf Outing" },
    { name: "description", content: "Information about the Willow Canyon Softball Golf Outing event." }
  ];
};

export default function Index() {
  const user = useOptionalUser();
  return (
    <main 
      className="relative min-h-screen bg-blue sm:flex sm:items-center sm:justify-center"
      style={{
        backgroundImage: `url("https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/dimple-background.jpg?raw=true")`,
        backgroundRepeat: 'repeat', // Tiles the dimple background image across the page
        backgroundSize: 'auto', // Keeps the original size of the dimple background image
      }}
    >
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/golfballs-background.jpg?raw=true")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-[color:rgba(0,123,255,0.5)] mix-blend-multiply" />

            </div>
            <div className="lg:pb-18 relative px-12 pt-12 pb-8 sm:px-12 sm:pt-24 sm:pb-14 lg:px-16 lg:pt-32">
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="p-6 rounded-lg shadow-lg text-gray-800">
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Questions</h2>
                <p className="mx-auto mt-4 max-w-lg text-left text-xl text-black sm:max-w-3xl font-montserrat">
                  Contact <b>Angie Tizzano</b> at <a href="mailto:angie.tizzano@amail.com">angie.tizzano@amail.com</a> <br></br> <b>Coach Lizzano</b> at <a href="mailto:Coachlizzano@gmal.com">Coachlizzano@gmal.com</a>.
                </p>
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Save the Date!</h2>
                <p className="mx-auto mt-4 max-w-lg text-left text-xl text-black sm:max-w-3xl font-montserrat">
                  <b>Sunday, November 10, 2024</b>
                </p>
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Location</h2>
                <p className="mx-auto mt-4 max-w-lg text-left text-xl text-black sm:max-w-3xl font-montserrat">
                  <b>Arizona Traditions Golf Club</b><br />
                  17225 N. Citrus Rd., Surprise, AZ 85374
                </p>
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Shot Gun Start</h2>
                <p className="mx-auto mt-4 max-w-lg text-left text-xl text-black sm:max-w-3xl font-montserrat">
                  <b>8am</b>
                </p>
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Cost</h2>
                <p className="mx-auto mt-4 max-w-lg text-left text-xl text-black sm:max-w-3xl font-montserrat">
                  <b>$120 per golfer</b>
                </p>
                <h2 className="text-center text-4xl text-black mt-8 font-montserrat">Includes</h2>
                <p className="mx-auto mt-4 max-w-lg text-left text-xl text-black sm:max-w-3xl font-montserrat">
                  Golf, Cart, Range Balls, and Lunch
                </p>
              </div>

              {/* Buttons section at the bottom */}
              <div className="flex justify-center mt-10 space-x-6">
                <Link
                  to="/sponsorship"
                  className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600 sm:px-8"
                >
                  Sponsorship
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-md bg-green-500 px-4 py-3 font-medium text-white hover:bg-green-600 sm:px-8"
                >
                  Register
                </Link>
                <Link
                  to="/"
                  className="flex items-center justify-center rounded-md bg-gray-500 px-4 py-3 font-medium text-white hover:bg-gray-600 sm:px-8"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
