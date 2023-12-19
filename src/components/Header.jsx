import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-green-100 shadow-md'>
     <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to='/'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-red-700'>CJAY</span>
            <span className='text-blue-700'>Estate</span>
      </h1>
      </Link>
      <form className='bg-white p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...'
            className='bg-transparent focus: outline-none w-24 sm:w-64'/>
            <FaSearch className='text-emerald-700' />
      </form>
      <ul className='flex gap-5 text-emerald-700'>
        <Link to='/'>
        <li className='hidden sm:inline hover:underline'>Home</li>
        </Link>
        <Link to='/about us'>
        <li className='hidden sm:inline hover:underline'>About us</li>
        </Link>
        <Link to='/login'>
        <li className='hover:underline'>Login</li>
        </Link>
      </ul>
     </div>
    </header>
  )
}
