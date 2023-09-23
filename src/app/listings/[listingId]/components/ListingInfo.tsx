'use client'

import Avatar from "@/components/Avatar";
import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  host: SafeUser;
  category: {
    icon: IconType,
    description: string,
    label: string
  },
  guestCount: number,
  bathroomCount: number,
  roomCount: number,
  locationValue: string,
  description: string
}

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false
})

const ListingInfo: React.FC<ListingInfoProps> = ({
  host,
  guestCount,
  bathroomCount,
  roomCount,
  locationValue,
  category,
  description
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;


  return ( 
    <div className="md:col-span-4 flex flex-col gap-8">
      <div className=" flex flex-col gap-4">
        <div className=" flex flex-row items-center gap-2 text-xl font-semibold ">
          <div>Hosted by {host.name}</div>
          <Avatar src={ host.image || '/images/Snipaste_2023-09-06_21-08-13.png' } />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-lg text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      <ListingCategory 
        label={category.label}
        description={category.description}
        icon={category.icon}
      />
      <hr />
      <div className=" font-light text-neutral-500 text-lg">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
   );
}
 
export default ListingInfo;