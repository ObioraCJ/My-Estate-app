import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Header from './components/Header';
import ProfileRoute from './components/ProfileRoute';
import CreateListing from './Pages/CreateListing';
import UpdateListing from './Pages/UpdateListing';
import Listing from './Pages/Listing';

export default function App() {
  return (
    <BrowserRouter>
    <Header /> 
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<SignIn />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/about us' element={<About />} />
    <Route path='/listing/:listingId' element={<Listing />} />
    <Route element={<ProfileRoute />}>
      <Route path='/profile' element={<Profile />} />
      <Route path='/create-listing' element={<CreateListing />} />
      <Route path='/update-listing/:listingId' element={<UpdateListing />} />
    </Route>
    </Routes>
    </BrowserRouter>
  )  
}