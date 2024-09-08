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
        // backgroundSize: 'auto', // Keeps the original size of the dimple background image
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
              <div className="absolute inset-0 bg-[color:rgba(139,92,246,0.5)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-12 pt-12 pb-8 sm:px-12 sm:pt-24 sm:pb-14 lg:px-16 lg:pt-32">
              {/* <h1 className="text-center text-6xl font-extrabold sm:text-8xl lg:text-9xl font-montserrat tracking-normal sm:tracking-tighter">
                <span className="text-orange-500 drop-shadow-md">
                  &nbsp;&nbsp;&nbsp; WILLOW CANYON SOFTBALL GOLF OUTING &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </h1> */}
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
