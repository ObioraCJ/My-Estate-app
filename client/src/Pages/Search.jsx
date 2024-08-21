import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='border-b-4 md:border-r-4 p-7 md:min-h-screen'>
            <form className='flex flex-col gap-7'>
              <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap text-green-900
                font-semibold'>Search Term:</label>
                <input 
                 type='text'
                 id='searchTerm'
                 placeholder='Search...'
                 className='border p-3 rounded-lg w-full'
                 />
              </div>
              <div className='flex gap-2 flex-wrap items-center'>
                <label className='text-green-900 font-semibold'>Type:</label>
                <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='all'
                     className='w-5'  
                    />
                    <span className='text-green-900'>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='rent'
                     className='w-5'  
                    />
                    <span className='text-green-900'>Rent</span>
                    </div> 
                    <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='sale'
                     className='w-5'  
                    />
                    <span className='text-green-900'>Sale</span>
                   </div> 
                   <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='offer'
                     className='w-5'  
                    />
                    <span className='text-green-900'>Offer</span>
                   </div> 
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                <label className='text-green-900 font-semibold'>Amenities:</label>
                <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='parking'
                     className='w-5'  
                    />
                    <span className='text-green-900'>Parking slot</span>
                    <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='furnished'
                     className='w-5'  
                    />
                    <span className='text-green-900'>Furnished</span>
                    </div> 
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <label className='text-green-900 font-semibold'>Sort:</label>
                <select
                id='sort_order'
                className='rounded-lg p-3 border'
                >
                    <option>Descending</option>
                    <option>Ascending</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                </select>
              </div>
              <button className='p-3 bg-green-900 text-white
              uppercase rounded-lg hover:opacity-95'>Search</button>
            </form>
        </div>
        <div>
            <h1 className='text-green-900 text-3xl font-semibold 
            border-b-4 mt-5 p-3'>Listing Results:</h1>
        </div>
    </div>
  )
}
