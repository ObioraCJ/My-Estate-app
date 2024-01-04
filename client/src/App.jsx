import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Header from './components/Header';
import ProfileRoute from './components/ProfileRoute';

export default function App() {
  return (
    <BrowserRouter>
    <Header /> 
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<SignIn />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/about us' element={<About />} />
    <Route element={<ProfileRoute />}>
      <Route path='/profile' element={<Profile />} />
    </Route>
    </Routes>
    </BrowserRouter>
  )  
}