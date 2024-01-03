import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/userSlice';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const handleGoogleClick = async () => {
     try {
        const provider  = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)

        const res = await fetch('Api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo:
            result.user.photoURL }),
        })
        const data = await res.json();
        dispatch(signInSuccess(data));
        navigate('/');
     } catch (error) {
        console.log('Could not continue with google', error)
     }
 }
 
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-teal-950 p-3
     text-white rounded-lg hover:opacity-95 uppercase'>
        Continue with google</button>
  )
}
