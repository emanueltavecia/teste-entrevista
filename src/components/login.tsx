'use client'
import { useState } from 'react'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })

      const data = await response.json()
      console.log(data)
      if (data.message !== 'Invalid credentials') {
        localStorage.setItem('logged', 'true')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="max-w-96 mx-auto text-center min-h-screen flex flex-col justify-center">
      <h1 className="font-bold text-4xl mb-4">Login</h1>

      <div className="flex flex-col gap-4">
        <input
          className="p-2 rounded-md text-slate-900"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 rounded-md text-slate-900"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-slate-700 p-2 rounded-md hover:bg-slate-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}
