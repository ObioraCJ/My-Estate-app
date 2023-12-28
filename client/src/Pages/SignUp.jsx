import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center 
         my-6'>Create New User Account</h1>
    <form className='flex flex-col gap-5'>
      <input type='text' placeholder='username' 
          id='username' className='border p-3 rounded-lg'/> 
       <input type='email' placeholder='email' 
          id='email' className='border p-3 rounded-lg'/> 
       <input type='password' placeholder='password' 
          id='password' className='border p-3 rounded-lg'/>
      <button className='bg-orange-800 rounded-lg p-3
         text-white uppercase font-semibold hover:opacity-90
          disabled:opacity-75'>Sign Up</button> 
    </form>
    <div className='flex gap-1 mt-2'>
      <p>Have an accoun?</p>
      <Link to={'/login'}><span className='text-blue-700
      hover:underline'>Login</span></Link>
    </div>
    </div>
  )
}
