import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
 const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange =  (e) => {
  setFormData ({
      ...formData,
      [e.target.id]: e.target.value,
    })
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(signInStart());
  const res = await fetch('./Api/auth/signIn', 
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
   dispatch(signInFailure(data.message));
    return;
  }
 dispatch(signInSuccess(data));
  navigate('/');
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
 
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl font-semibold text-center 
         my-6'>Login to your account</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <input type='text' placeholder='username' 
          id='username' className='border p-3 
          rounded-lg' onChange={handleChange}/> 
       <input type='password' placeholder='password' 
          id='password' className='border p-3 rounded-lg'
          onChange={handleChange}/>
      <button disabled= {loading} className='bg-blue-900 rounded-lg p-3
         text-white uppercase font-semibold hover:opacity-90
          disabled:opacity-75'> {loading ? 'Loading...' : 'Login'}
            </button> 
    </form>
    <div className='flex gap-1 mt-2'>
      <p>Dont have an accoun?</p>
      <Link to={'/signup'}><span className='text-red-700
      hover:underline'>Sign Up</span></Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
