import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { 
  updateUserStart,
  updateUserSuccess, 
  updateUserFailure, 
  deleteAccountFailure, 
  deleteAccountStart,
  deleteAccountSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess
} from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadPerc, setUploadPerc] = useState(0)
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [UpdateSuccess, setUpdateSuccess] = useState(false);
  const [viewListingsError, setViewListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  //Firebase rule
  //allow read;
  //allow write: if
  //request.resource.size < 2 * 1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')

 useEffect(() => {
  if (file) {
    handleFileUpload(file);
  }
 }, [file]);

 const handleFileUpload = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred /
    snapshot.totalBytes) * 100;
    setUploadPerc(Math.round(progress));
  },
  (error) => {
     setUploadError(true);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then
    ((downloadURL) => {
      setFormData({ ...formData, avatar: downloadURL });
    });
  } 
  );
};
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/Api/user/update/${currentUser._id}`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data.message));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteAccountStart());
      const res = await fetch(`/Api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteAccountFailure(data.message))
        return;
      }
      dispatch(deleteAccountSuccess(data));
    } catch (error) {
      dispatch(deleteAccountFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/Api/auth/signOut');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
        dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }
  const handleViewlistings = async () => {
    try {
      setViewListingsError(false);
      const res = await fetch(`/Api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setViewListingsError(true);
        return;
      }


      setUserListings(data);
    } catch (error) {
      setViewListingsError(true);
    }
  }

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/Api/listing/delete/${listingId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      } 
      setUserListings((prev) => 
      prev.filter((listing) => 
        listing._id !== listingId
      ))
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className='text-3xl text-center font-semibold my-6'>Profile</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input 
      onChange={(e) => setFile(e.target.files[0])} 
      type="file" 
      ref={fileRef} 
      hidden 
      accept="image/*" 
      />
       <img 
       onClick={() => fileRef.current.click()} 
       src={formData.avatar || currentUser.avatar} 
       alt="profile" 
       className="rounded-full h-28 w-28 object-cover
       cursor-pointer self-center mt-2"
       />
       <p className="text-sm self-center">
        {uploadError ?
        <span className="text-red-700">Error image upload
        </span> :
        uploadPerc > 0 && uploadPerc < 100 ? (
          <span className="text-slate-700">
            {`Uploading... ${uploadPerc}%`}
          </span>
        ) : 
          uploadPerc === 100 ? (
          <span className="text-green-700">
            Profile image successfully uploaded
          </span> ) : (
          ""
        )
      }
       </p>
       <input 
       type="text" 
       placeholder="username" 
       id="username" 
       className="p-3 border rounded-lg"
       defaultValue={currentUser.username} 
       onChange={handleChange}
       />
       <input 
       type="text" 
       placeholder="email" 
       id="email" 
       className="p-3 border rounded-lg" 
       defaultValue={currentUser.email}
       onChange={handleChange}
       />
       <input 
       type="password" 
       placeholder="password" 
       id="password" 
       className="p-3 border rounded-lg"
       onChange={handleChange}
        />
       <button disabled={loading} className="bg-teal-950 text-white
       rounded-lg p-2 uppercase hover:opacity-90
       disabled:opacity-80"> {loading ? "Loading..." : "Update"} </button>
       <Link className="bg-pink-700 text-center text-white uppercase 
       rounded-lg p-2 hover:opacity-90"
        to= {'/create-listing'}>
       Create Listing
       </Link>
    </form>
    <div className="flex justify-between mt-4">
      <span onClick={handleDeleteAccount} 
      className="text-red-700 cursor-pointer
      hover:underline">Delete account</span>
      <span onClick={handleSignOut} 
      className="text-red-700 cursor-pointer
      hover:underline">Sign Out</span>
    </div>
    <p className="text-red-600 mt-1">{error ? error : ''}</p>
    <p className="text-green-800 mt-1">{UpdateSuccess ? "Your account is updated successfully!!" 
     : ""}</p>
    <button 
      onClick={handleViewlistings}
      className="text-green-800  w-full p-3">
      View Listings 
    </button>
    <p className="text-red-600 mt-5">
      {viewListingsError ? 'An error occured in view listing' : '' }
    </p>
    {userListings && userListings.length > 0 && 
   <div className="flex flex-col gap-4">
    <h1 className="mt-7 font-semibold text-2xl 
     text-center">User Listings</h1>
   {userListings.map((listing) => 
      <div key={listing._id} className="rounded-lg border 
      justify-between p-3 items-center flex gap-4">
        <Link to={`/listing/${listing._id}`}>
        <img 
         src={listing.imageUrls[0]} 
         alt="cover image"
         className="object-contain h-16 w-16 "
        />
        </Link>
        <Link 
         className="text-gray-700 flex-1 font-semibold 
         hover:underline truncate" 
         to={`/listing/${listing._id}`}>
         <p >{listing.name}</p>
        </Link>

        <div className="flex flex-col items-center">
          <button 
           onClick={()=>{handleDeleteListing(listing._id)}}
           className="uppercase text-red-600 hover:underline">Delete</button>
        <Link to={`/update-listing/${listing._id}`}>   
          <button className="uppercase text-gray-700 hover:underline">Edit</button>
        </Link>
        </div>
      </div>
   )}
    </div>
}
    </div>
  )
}
