import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange =  (e) => {
  setFormData ({
      ...formData,
      [e.target.id]: e.target.value,
    })
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
  const res = await fetch ('./Api/auth/signUp', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }
  )   
  const data = await res.json();
  if (data.success === false) {
    console.log(data);
    setError(data.message);
    setLoading(false);
    return;
  }
  setLoading(false);
  setError(null);
  navigate('/login');
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
 
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl font-semibold text-center 
         my-6'>Create New User Account</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <input type='text' placeholder='username' 
          id='username' className='border p-3 
          rounded-lg' onChange={handleChange}/> 
       <input type='email' placeholder='email' 
          id='email' className='border p-3 rounded-lg'
          onChange={handleChange}/> 
       <input type='password' placeholder='password' 
          id='password' className='border p-3 rounded-lg'
          onChange={handleChange}/>
      <button disabled= {loading} className='bg-orange-800 rounded-lg p-3
         text-white uppercase font-semibold hover:opacity-90
          disabled:opacity-75'> {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <OAuth /> 
    </form>
    <div className='flex gap-1 mt-2'>
      <p>Have an accoun?</p>
      <Link to={'/login'}><span className='text-blue-700
      hover:underline'>Login</span></Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
