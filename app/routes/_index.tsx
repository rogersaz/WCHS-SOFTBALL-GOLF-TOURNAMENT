import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "@remix-run/react";
import 'tailwindcss/tailwind.css';
import { useOptionalUser } from "~/utils";

const supabaseUrl = 'https://rnrbhrdtuakgdenosfgj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucmJocmR0dWFrZ2Rlbm9zZmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MzYyOTYsImV4cCI6MjA0MTQxMjI5Nn0.5rXZ1w0neKmCogymbhDJecpwji0dvtG3pEEEs2k5iPA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Index() {
  const user = useOptionalUser();
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
                src="https://github.com/rogersaz/WCHS-SOFTBALL-GOLF-TOURNAMENT/blob/main/public/Golfcart-jump.jpeg?raw=true"
                alt="Coach T driving"
              />
              <div className="absolute inset-0 bg-[color:rgba(139,92,246,0.5)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-2 sm:pt-10 sm:pb-8 lg:px-8 lg:pt-8">
              <p className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl">
                <span className="block uppercase text-gray-100 drop-shadow-md">
                  Willow Canyon Softball <br></br>Golf Outing
                </span>
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-3 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/register"
                      className="flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-600 sm:px-8"
                    >
                      Register
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:px-8"
                    >
                      About
                    </Link>
                    <Link
                      to="/sponsorship"
                      className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:px-8"
                    >
                      Sponsorship
                    </Link>
                  </div>
                )}
              </div>
              {/* Removed the Remix logo and link */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
