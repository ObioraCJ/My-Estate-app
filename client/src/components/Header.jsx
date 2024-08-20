import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])
  return (
    <header className='bg-green-100 shadow-md'>
     <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to='/'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-red-700'>CJAY</span>
            <span className='text-blue-700'>Estate</span>
      </h1>
      </Link>
      <form 
        onSubmit={handleSubmit}
        className='bg-white p-3 rounded-lg flex items-center'>
        <input 
         type='text' 
         placeholder='Search...'
         className='bg-transparent focus: outline-none w-24 sm:w-64'
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         />
         <button>
        <FaSearch className='text-emerald-700' />
         </button>
      </form>
      <ul className='flex gap-5 text-emerald-700'>
        <Link to='/'>
        <li className='hidden sm:inline hover:underline'>Home</li>
        </Link>
        <Link to='/about us'>
        <li className='hidden sm:inline hover:underline'>About us</li>
        </Link>
        <Link to='/profile'>
          {currentUser ? (
             <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
          ) : ( 
          <li className='hover:underline'>Login</li>
          )}
          </Link>
      </ul>
     </div>
     
    </header>
  )
}
