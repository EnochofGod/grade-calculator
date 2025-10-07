import React from 'react'

import { useNavigate } from 'react-router-dom';

const Missing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl border-2 border-red-200 p-10 w-full max-w-xl flex flex-col items-center">
        <h2 className="text-4xl font-extrabold text-red-600 mb-4">404</h2>
        <p className="text-lg text-gray-700 mb-6 text-center">Sorry, the page you are looking for does not exist.</p>
        <button onClick={() => navigate('/')} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 px-6 rounded-xl shadow hover:scale-105 transition-all duration-200">Go Home</button>
      </div>
    </div>
  )
}

export default Missing
