import React from 'react'

export default function () {
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
           <span className='font-normal ml-2 text-gray-600'> The first image will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input 
             className='p-3 border-green-400 rounded w-full'
             type="file" 
             id='images' 
             accept='images/*' 
             multiple 
            />
            <button className='uppercase border border-green-700 
            p-3 text-green-700 rounded hover:shadow-lg disabled:opacity-80'>
              Upload
            </button>
          </div>
          <button className='bg-green-900 text-white rounded-lg uppercase
          p-3 hover:opacity-95 disabled:80'>Submit</button>
        </div>
      </form>
    </main>   
  )
}
