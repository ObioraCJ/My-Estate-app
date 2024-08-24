import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams()
  const {currentUser} = useSelector((state) => state.user);
  useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
            const res = await fetch(`/Api/listing/get/${params.listingId}`);
            const data = await res.json();
            if (data.success === false) {
                setError(true);
                setLoading(false);
              return;
            }
          setListing(data);
          setLoading(false);
          setError(false);
    } catch (error) {
        setError(true);
        setLoading(false);
    };
};
    fetchListing();
}, [params.listingId]);
return <main>
    {loading && <p className='my-7 text-center text-2xl'>
        Loading...</p>}
    {error && <p className='my-7 text-center text-2xl'>
            Something went wrong!!</p>}
    {listing && !loading && !error && (
        <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                    <div className='h-[350px]'
                    style={{background: `url(${url}) center 
                    no-repeat`, backgroundSize: 'cover'}}
                    ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='border rounded-full w-12 h-12 flex justify-center
            items-center bg-slate-50 fixed top-[13%] right-[3%] z-10 cursor-pointer'>
             <FaShare 
             onClick={()=> {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
             }}
             className='text-slate-600'
             />
            </div>
            {copied && (
                <p className='p-2 rounded-md fixed top-[23%] right-[5%]
                z-10 bg-slate-200'>
                    Link copied
                </p>
            )}
            <div className='flex flex-col mx-auto gap-4 my-7 max-w-4xl p-3 '>
                <p className='font-semibold text-2xl'>
                    {listing.name} - ${''}
                    {listing.offer 
                     ? listing.discountPrice.toLocaleString('en-US')
                     : listing.regularPrice.toLocaleString('en-US')}
                     {listing.type === 'rent' && ' / month'}
                </p>
                <p className='items-center flex gap-2 mt-6 my-2 text-sm
                   text-gray-700'>
                    <FaMapMarkerAlt className='text-green-800' />
                    {listing.address}
                </p>
                <div className='flex gap-4'>
                    <p className='text-center w-full p-1 bg-red-900 text-white
                     rounded-md max-w-[200px]'>
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {
                        listing.offer && (
                            <p className='bg-green-900 text-center w-full p-1 text-white
                             rounded-md max-w-[200px]'>
                              ${+listing.regularPrice - +listing.discountPrice} OFF
                              
                            </p>
                        )
                    }
                </div>
                <p className='text-slate-800'>
                <span className='font-semibold text-black'>
                    Description - {''}
                </span>
                {listing.description}
            </p>
            <ul className='text-sm font-semibold text-green-800 flex flex-wrap
             items-center gap-4 sm:gap-6'>
                <li className='items-center gap-1 flex whitespace-nowrap '>
                    <FaBed className='text-lg' />
                    {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` 
                    : `${listing.bedrooms} Bed`}
                </li>
                <li className='items-center gap-1 flex whitespace-nowrap '>
                    <FaBath className='text-lg' />
                    {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` 
                    : `${listing.bathrooms} Bath`}
                </li>
                <li className='items-center gap-1 flex whitespace-nowrap '>
                    <FaParking className='text-lg' />
                    {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>
                <li className='items-center gap-1 flex whitespace-nowrap '>
                    <FaChair className='text-lg' />
                    {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id
            && !contact && (
                <button
                onClick={() => setContact(true)} 
                className='p-3 uppercase bg-green-950 text-white 
                rounded-lg hover:opacity-95'>Contact Landlord</button>
            )}
            {contact && <Contact listing={listing}/>}
            </div>
        </div>
    )}   
    </main>
}