import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';

export default function ListingItems({listing}) {
  return (
   <div className="bg-white shadow-md hover:shadow-lg
    overflow-hidden rounded-lg transition-shadow w-full sm:w-[220px]">
    <Link to={`/listing/${listing._id}`}>
    <img 
      src={listing.imageUrls[0]} 
      alt='cover image'
      className="h-[180px] sm:h-[200px] w-full object-cover
      hover:scale-105 duration-300  trasition-scale"
    />
    <div className="flex flex-col p-3 gap-2 w-full">
      <p className="text-green-900 text-lg p-3 font-semibold
    truncate">{listing.name}</p>
      <div className="flex items-center gap-1">
      <MdLocationOn className="text-black h-4 w-4" />
      <p className="truncate text-sm text-green-800 w-full">{listing.address}</p>
    </div>
    <p className="text-green-800 text-sm line-clamp-2">{listing.description}</p>
    <p className="mt-2 font-semibold text-green-800">

      {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
      {listing.type === 'rent' && '/month'}
    </p>
    <div className="flex gap-4 text-green-800">
      <div className="font-bold text-xs">
        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` :
        `${listing.bedrooms} Bedroom`}
      </div>
    </div>
    </div>
    </Link>

   </div>
  )
}
