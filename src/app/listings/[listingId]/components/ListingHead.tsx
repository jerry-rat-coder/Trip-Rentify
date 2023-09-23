'use client'

import Heading from "@/components/Heading"
import HeartButton from "@/components/HeartButton"
import useCountries from "@/hooks/useCountries"
import { SafeUser } from "@/types"
import Image from "next/image"
interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

const ListingHead:React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();
  const country = getByValue(locationValue);

  
  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${country?.label}, ${country?.region}`}
      />
      <div className=" h-[60vh] w-full overflow-hidden rounded-xl relative">
        <Image 
          src={imageSrc}
          alt="Airbnb"
          fill
          className=' object-cover w-full'
        />
        <div className=" absolute right-5 top-5">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
}
 
export default ListingHead;