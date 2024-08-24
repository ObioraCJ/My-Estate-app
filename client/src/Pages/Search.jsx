import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItems from '../components/ListingItems';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc', 
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    
    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        
        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl 
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
          setLoading(true);
          const searchQuery = urlParams.toString();
          const res = await fetch(`/Api/listing/get?${searchQuery}`);
          const data = await res.json();
          setListings(data);
          setLoading(false);
        };
        fetchListings();
    },  [location.search]);
    
    const handleChange = (e) => {

        if (
            e.target.id === 'all' || 
            e.target.id === 'rent' || 
            e.target.id === 'sale'
        ) {
            setSidebardata({...sidebardata, type: e.target.id});
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({...sidebardata, searchTerm: e.target.value});
        }

        if (
            e.target.id === 'parking' || 
            e.target.id === 'furnished' || 
            e.target.id === 'offer'
        ) {
            setSidebardata({
                ...sidebardata, 
                [e.target.id]: 
                e.target.checked || 
                e.target.checked === 'true' ? true : false, 
            });
        }

        if (e.target.id === 'sort_order') {

            const sort = e.target.value.split('_')[0] || 'createdAt';

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebardata({...sidebardata, sort, order});
        }
    }

    const handleSUbmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='border-b-4 md:border-r-4 p-7 md:min-h-screen'>
            <form onSubmit={handleSUbmit} className='flex flex-col gap-7'>
              <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap text-green-900
                font-semibold'>Search Term:</label>
                <input 
                 type='text'
                 id='searchTerm'
                 placeholder='Search...'
                 className='border p-3 rounded-lg w-full'
                 value={sidebardata.searchTerm}
                 onChange={handleChange}
                 />
              </div>
              <div className='flex gap-2 flex-wrap items-center'>
                <label className='text-green-900 font-semibold'>Type:</label>
                <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='all'
                     className='w-5'
                     onChange={handleChange}
                     checked={sidebardata.type === 'all'}  
                    />
                    <span className='text-green-900'>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='rent'
                     className='w-5'  
                     onChange={handleChange}
                     checked={sidebardata.type === 'rent'} 
                    />
                    <span className='text-green-900'>Rent</span>
                    </div> 
                    <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='sale'
                     className='w-5'  
                     onChange={handleChange}
                     checked={sidebardata.type === 'sale'} 
                    />
                    <span className='text-green-900'>Sale</span>
                   </div> 
                   <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='offer'
                     className='w-5'  
                     onChange={handleChange}
                     checked={sidebardata.offer} 
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
                     onChange={handleChange}
                     checked={sidebardata.parking} 
                    />
                    <span className='text-green-900'>Parking slot</span>
                    <div className='flex gap-2'>
                    <input
                     type='checkbox'
                     id='furnished'
                     className='w-5'  
                     onChange={handleChange}
                     checked={sidebardata.furnished} 
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
                onChange={handleChange}
                defaultValue={'created_at_desc'} 
                >
                    <option value={'regularPrice_desc'}>Descending</option>
                    <option value={'regularPrice_asc'}>Ascending</option>
                    <option value={'createdAt_desc'}>Latest</option>
                    <option value={'creeatedAt_asc'}>Oldest</option>
                </select>
              </div>
              <button className='p-3 bg-green-900 text-white
              uppercase rounded-lg hover:opacity-95'>Search</button>
            </form>
        </div>
        <div>
            <h1 className='text-green-900 text-3xl font-semibold 
            border-b-4 mt-5 p-3'>Listing Results:</h1>
            <div className='flex flex-wrap p-7 gap-4'>
                {!loading && listings.length === 0 && (
                    <p className='text-green-800 text-xl'>No Listing Found!!</p>
                )}
                {loading && (
                    <p className='text-green-800 w-full text-center text-xl'>
                        Loading...
                    </p>
                )}
                {
                 !loading &&
                 listings &&
                 listings.map((listing) => (
                   <ListingItems key={listing._id} listing={listing} />
                 )
                 )}
            </div>
        </div>
    </div>
  )
}
