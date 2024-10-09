import React, { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import { LogOut } from 'lucide-react'

// TODO: Move these credentials to environment variables for security
const supabaseUrl = 'https://rnrbhrdtuakgdenosfgj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucmJocmR0dWFrZ2Rlbm9zZmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MzYyOTYsImV4cCI6MjA0MTQxMjI5Nn0.5rXZ1w0neKmCogymbhDJecpwji0dvtG3pEEEs2k5iPA'
const supabase = createClient(supabaseUrl, supabaseKey)

// Define interfaces for our data structures
interface Registration {
  name: string
  team_name: string
  email: string
  phone: string
  pay_with_check: string
  pay_with_cc: string
}

interface PenciledIn {
  name: string
  email: string
}

interface Sponsorship {
  name: string
  company: string
  phone: string
  email: string
  sponsorship_level: string
}

function App() {
  const [user, setUser] = useState<any>(null)
  const [registrations, setRegistrations] = useState<Registration[] | null>(null)
  const [penciledIn, setPenciledIn] = useState<PenciledIn[] | null>(null)
  const [sponsorships, setSponsorships] = useState<Sponsorship[] | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)

  // Use useCallback to memoize the fetchData function
  const fetchData = useCallback(async () => {
    setDataLoading(true)
    setError(null)
    try {
      console.log('Fetching data...')
      const [registrationsResponse, penciledInResponse, sponsorshipsResponse] = await Promise.all([
        supabase
          .from('registrations')
          .select('name, team_name, email, phone, pay_with_check, pay_with_cc'),
        supabase
          .from('pencil')
          .select('name, email'),
        supabase
          .from('sponsorships')
          .select('name, company, phone, email, sponsorship_level')
      ])
      
      if (registrationsResponse.error) throw registrationsResponse.error
      if (penciledInResponse.error) throw penciledInResponse.error
      if (sponsorshipsResponse.error) throw sponsorshipsResponse.error
      
      console.log('Fetched registrations:', registrationsResponse.data)
      console.log('Fetched penciled in:', penciledInResponse.data)
      console.log('Fetched sponsorships:', sponsorshipsResponse.data)

      setRegistrations(registrationsResponse.data)
      setPenciledIn(penciledInResponse.data)
      setSponsorships(sponsorshipsResponse.data)
    } catch (error: any) {
      console.error('Error fetching data:', error)
      setError(`Error fetching data: ${error.message}`)
    } finally {
      setDataLoading(false)
    }
  }, []) // Empty dependency array as it doesn't depend on any props or state

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log('Session:', session)
        if (session) {
          setUser(session.user)
          fetchData() // Fetch data if session exists
        }
      } catch (error) {
        console.error('Error fetching session:', error)
        setError('Failed to fetch session')
      }
    }
    fetchSession()
  }, [fetchData]) // Add fetchData as a dependency

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      console.log('Login successful:', data)
      setUser(data.user)
      await fetchData() // Fetch data after successful login
    } catch (error: any) {
      console.error('Login error:', error)
      setError(`Login failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLogoutLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      console.log('Logout successful')
      setUser(null)
      setRegistrations(null)
      setPenciledIn(null)
      setSponsorships(null)
    } catch (error: any) {
      console.error('Logout error:', error)
      setError(`Logout failed: ${error.message}`)
    } finally {
      setLogoutLoading(false)
    }
  }

  const renderDashboard = (title: string, data: any[] | null, headers: string[]) => (
    <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-4xl mb-8">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      {dataLoading ? (
        <p className="text-center">Loading data...</p>
      ) : data ? (
        data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  {headers.map((header, index) => (
                    <th key={index} className="py-3 px-6 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    {headers.map((header, headerIndex) => {
                      const key = header.toLowerCase().replace(/ /g, '_') as keyof typeof item
                      const value = item[key]
                      console.log(`${header} for ${item.name}:`, value)
                      return (
                        <td key={headerIndex} className="py-3 px-6 text-left whitespace-nowrap">
                          {value ?? 'N/A'}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No data found.</p>
        )
      ) : (
        <p className="text-center">Error loading data. Please try again.</p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {!user ? (
        <div className="bg-white rounded-lg p-8 shadow-md max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center w-full max-w-4xl mb-6">
            <h1 className="text-4xl font-bold text-white">Dashboards</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center"
              disabled={logoutLoading}
            >
              {logoutLoading ? 'Logging out...' : (
                <>
                  <LogOut className="mr-2" size={18} />
                  Logout
                </>
              )}
            </button>
          </div>
          {renderDashboard("Registrations", registrations, ["Name", "Team Name", "Email", "Phone", "Pay with Check", "Pay with CC"])}
          {renderDashboard("Penciled In", penciledIn, ["Name", "Email"])}
          {renderDashboard("Sponsorships", sponsorships, ["Name", "Company", "Phone", "Email", "Sponsorship Level"])}
          <button
            onClick={fetchData}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
            disabled={dataLoading}
          >
            {dataLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </>
      )}
    </div>
  )
}

export default App
