import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { Link } from "@remix-run/react";
import 'tailwindcss/tailwind.css';
import { useOptionalUser } from "~/utils";

const supabaseUrl = 'https://omhsepwfnkxmzjqvydun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9taHNlcHdmbmt4bXpqcXZ5ZHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NDEzMzcsImV4cCI6MjAyNzIxNzMzN30.did1LkX1hVTxQs-nQLWxlSNSsL_WSJIV89HKcVPPfC4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
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
                <span className="block uppercase text-green-400 drop-shadow-md">
                  Willow Canyon Softball Golf Tournament Fundraiser
                </span>
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    {/* Removed the Log In button */}
                  </div>
                )}
              </div>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                  alt="Remix"
                  className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
