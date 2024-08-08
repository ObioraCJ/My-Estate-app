import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function () {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false);
  console.log(formData)
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 9 ) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData, 
          imageUrls: formData.imageUrls.concat(urls) 
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError('Image upload failed (2 mb max per image)');
        setUploading(false);
    });
      
    } else {
      setImageUploadError('You can only upload 8 images per listing');
      setUploading(false);
    }
  }
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          })
        }
      )
    })
  }
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => 
        i !== index),
    })
  }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-center my-7 text-3xl
      font-semibold'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col  flex-1 gap-4'>
          <input 
           type='text' 
           placeholder='Name' 
           className='border p-3 rounded-lg' 
           id='name' 
           maxLength='50' 
           minLength='8'
           required 
          />
          <textarea 
           type='text' 
           placeholder='Description' 
           className='border p-3 rounded-lg' 
           id='description' 
           required 
          />
          <input 
           type='text' 
           placeholder='Address' 
           className='border p-3 rounded-lg' 
           id='address' 
           required 
          /> 
          <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2'>
              <input type='checkbox' className='w-5' id='sale' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' className='w-5' id='rent' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' className='w-5' id='parking' />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' className='w-5' id='furnished' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' className='w-5' id='offer' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2 items-center'>
              <input 
               type='number' 
               className='border-green-700 rounded-lg p-3'
               id='bedroom' 
               min='1' 
               max='10' 
              />
              <p>Bedrooms</p>
            </div>
            <div className='flex gap-2 items-center'>
              <input 
               type='number' 
               className='border-green-700 rounded-lg  p-3'
               id='bathroom' 
               min='1' 
               max='10' 
               />
              <p>Bathrooms</p>
            </div>
            <div className='flex gap-2 items-center'>
              <input 
               type='number' 
               className='border-green-700 rounded-lg  p-3'
               id='regularprice' 
               min='1' 
               max='10' 
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'>($ / Month)</span>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <input 
               type='number' 
               className='border-green-700 rounded-lg  p-3'
               id='discountprice' 
               min='1' 
               max='10' 
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>($ / Month)</span>
              </div>
            </div>
          </div>  
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
           <span className='font-normal ml-2 text-gray-600'> The first image will be the cover (max 8)</span>
          </p>
          <div className='flex gap-4'>
            <input 
             onChange={(e) => setFiles(e.target.files)}            
             className='p-3 border-green-400 rounded w-full'
             type="file" 
             id='images' 
             accept='images/*' 
             multiple 
            />
            <button
             type='button'
             disabled={uploading}
             onClick={handleImageSubmit} 
             className='uppercase border border-green-700 p-3 text-green-700 rounded hover:shadow-lg disabled:opacity-80'>
             {uploading ? 'Uploading' : 'Upload'}
            </button>
          </div>
          <p className='text-red-600 text-sm'>{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && 
            formData.imageUrls.map((url, index) => (
              <div
               key={url} 
               className='flex justify-between p-3 items-center 
               border'
              >
                <img 
                 src={url} 
                 alt='listing image' 
                 className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                 type='button'
                 onClick={() => handleRemoveImage(index)} 
                 className='text-red-500 uppercase rounded-lg 
                 p-3 hover:underline'>Delete
                </button> 
              </div>
            ))
          }
          <button 
           className='bg-green-900 text-white 
           rounded-lg uppercase p-3 hover:opacity-95 
           disabled:opacity-80'>Submit
          </button>
        </div>
      </form>
    </main>   
  )
}
