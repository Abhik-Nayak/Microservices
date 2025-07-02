// src/app/page.tsx
'use client'

import { useState } from 'react'

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      })

      const data = await res.json()
      if (res.ok) {
        setShortUrl(data.shortUrl)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <input
          type="url"
          placeholder="Enter your URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 text-center">
          <p className="text-gray-700">Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </main>
  )
}
