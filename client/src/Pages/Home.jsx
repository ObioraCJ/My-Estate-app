import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItems from '../components/ListingItems';

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  
  console.log(saleListings);
  useEffect(() => {
    console.log(saleListings);
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/Api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/Api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }
      const fetchSaleListings = async () => {
        try {
          const res = await fetch('/Api/listing/get?type=sale&limit=4');
          const data = await res.json();
          setSaleListings(data);
        } catch (error) {
          console.log(error);
        }
    }
    fetchOfferListings()
  }, [])
  return (
    <div>
    {/* top*/}
      <div className='flex flex-col gap-6 p-28 px-3
      max-w-6xl mx-auto'>
        <h1 className='font-bold text-slate-700 text-3xl
        lg:text-6xl'>
        Your comfort is our <span className='text-green-700'>priority</span>
        <br />
        We offer the best service
        </h1>
        <div className=' font-serif text-xs text-gray-500 sm:text-sm'>
          The First Estate was the clergy, who were people, including priests,
          <br />
           who ran both the Catholic church and some aspects of the country. 
          <br />
          In addition to keeping registers of births, deaths and marriages, 
          <br />
          the clergy also had the power to levy a 10% tax known as the tithe.
        </div>
        <Link
         className='bg-slate-700 text-white p-3
         font-bold rounded-lg w-44' 
         to={'/search'}>
         Get started here...
        </Link>
      </div>
    {/* swiper*/}
    <Swiper navigation>
      {offerListings && 
       offerListings.length > 0 &&
        offerListings.map((listing) => (
        <SwiperSlide>
          <div 
          style={{
            background: `url(${listing.imageUrls[0]})
            center no-repeat`,
            backgroundSize: 'cover',
          }}
           key={listing._id}
           className='h-[300px]'
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* listing results for offer, sales and rent*/}
     <div className='p-3 gap-8 max-w-6xl mx-auto
     flex flex-col my-10'>
      {
        offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-green-700 text-2xl
               font-semibold'>Recent offer</h2>
              <Link
              className='text-slate-600 text-sm hover:underline' 
              to={'/search?offer=true'}>
              Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {
                offerListings.map((listing) => (
                  <ListingItems 
                   listing={listing}
                    key={listing._id}
                  />
                ))
              }
            </div>
          </div>
        )
      }
       {
        rentListings && rentListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-green-700 text-2xl
               font-semibold'>Recent places for rent</h2>
              <Link
              className='text-slate-600 text-sm hover:underline' 
              to={'/search?type=rent'}>
              Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {
                rentListings.map((listing) => (
                  <ListingItems 
                   listing={listing}
                    key={listing._id}
                  />
                ))
              }
            </div>
          </div>
        )
      }
       {
        saleListings && saleListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-green-700 text-2xl
               font-semibold'>Recent places for sale</h2>
              <Link
              className='text-slate-600 text-sm hover:underline' 
              to={'/search?type=sale'}>
              Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {
                saleListings.map((listing) => (
                  <ListingItems 
                   listing={listing}
                    key={listing._id}
                  />
                ))
              }
            </div>
          </div>
        )
      }
     </div>
    </div>
  )
}
