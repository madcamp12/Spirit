import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl font-medium">Loading...</h1>
        <p className="text-md">Please wait for a moment.</p>
    </div>
  )
}

export default NotFound