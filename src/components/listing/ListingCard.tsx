'use client'

import useCountries from "@/hooks/useCountries";
import { SafeListing, SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
  bookedBy?: string
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  bookedBy
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();

    if(disabled) {
      return;
    }

    onAction?.(actionId);

  }, [onAction, actionId, disabled]);

  const price = useMemo(() => {
    if(reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if(!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation]);



  
  return ( 
    <div
      onClick={() => router.push(`/listings/${data.id}`)} 
      className=" col-span-1 cursor-pointer group"
    >
     <div className="flex flex-col gap-2  w-full">
      <div className=" aspect-square relative w-full overflow-hidden rounded-xl">
        <Image 
          alt="Listing"
          fill
          src={data.imageSrc}
          className=" object-cover group-hover:scale-110 transition h-full w-full"
        />
        <div className="absolute top-3 right-3">
          <HeartButton 
            currentUser={currentUser}
            listingId={data.id}
          />
        </div>
      </div>
      <div className=" font-semibold text-lg">
        {location?.region}, {location?.label}
      </div>
      {
        bookedBy && (
          <div className="font-bold text-base">
            <span className=" text-neutral-500 font-light">reserved by</span> {bookedBy}
          </div>
        )
      }
      <div className=" font-light text-neutral-500">
        {reservationDate || data.category}
      </div>
      <div className=" flex gap-1 flex-row items-center"> 
        <div className="font-semibold">
          $ {price}
        </div>
        { !reservation  && (
          <div className="font-light">
            night
          </div>
        ) }
      </div>
      {
        onAction && actionLabel && (
          <Button 
            onClick={handleCancel}
            small
            label={actionLabel}
            disabled={disabled}
          />
        )
      }
     </div>
    </div>
  );
}
 
export default ListingCard;