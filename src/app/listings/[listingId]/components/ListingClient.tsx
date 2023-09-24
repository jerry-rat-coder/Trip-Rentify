'use client'

import Container from "@/components/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";


import { categories } from "@/libs/categories";
import { useMemo, useState, useCallback, useEffect } from "react";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import { Range } from 'react-date-range'

import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";
import { eachDayOfInterval, differenceInDays } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
  reservations?: SafeReservation[]
}

const ListingClient:React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // disabledDates
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range];
    })

    return dates;
  }, [reservations])


  
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [categories, listing.category]);

  //action: reserve
  const onCreateReservation = useCallback(() => {
    if(!currentUser) {
      loginModal.onOpen();
    }
    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(res => {
      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      router.push('/trips');
    })
    .catch(error => {
      toast.error('Something went wrong');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [
    router,
    currentUser,
    loginModal,
    totalPrice,
    dateRange,
    listing?.id
  ]);
  
  // calculate totalPrice

  useEffect(() => {
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const price = listing.price;


    const dayCount = (endDate && startDate) ? differenceInDays(
      endDate, 
      startDate
      ) : 0;
      

    setTotalPrice( dayCount ? dayCount * price : price);
  }, [dateRange, listing.price]);


  return ( 
    <Container>
      <div className=" max-w-screen-lg mx-auto">
        <div className=" flex flex-col gap-8">
          <ListingHead 
            title={listing.title}
            currentUser={currentUser!}
            imageSrc={listing.imageSrc}
            id={listing.id}
            locationValue={listing.locationValue}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              host={listing.user}
              category={category!}
              locationValue={listing.locationValue}
              description={listing.description}
              guestCount={listing.guestCount}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
            />
            <div className=" order-first md:order-last md:col-span-3 mb-10">
              {/* listingReservation */}
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                disabledDates={disabledDates}
                disabled={isLoading}
                onChangeDate={(value) => {setDateRange(value)}}
                onSubmit={onCreateReservation}
                dateRange={dateRange}
              />
              
            </div>
          </div>
        </div>
      </div>
    </Container>
 );
}
 
export default ListingClient;