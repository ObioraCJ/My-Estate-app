import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [uploadPerc, setUploadPerc] = useState(0)
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [UpdateSuccess, setUpdateSuccess] = useState(false);
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

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
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
    </form>
    <div className="flex justify-between mt-4">
      <span className="text-red-700 cursor-pointer
      hover:underline">Delete account</span>
      <span className="text-red-700 cursor-pointer
      hover:underline">Sign Out</span>
    </div>
    <p className="text-red-600 mt-1">{error ? error : ''}</p>
    <p className="text-green-800 mt-1">{UpdateSuccess ? "Your account is updated successfully!!" 
    : ""}</p>
    </div>
  )
}
