'use client'

import Container from "@/components/Container";
import { SafeListing, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import ListingHead from "./ListingHead";

import { categories } from "@/libs/categories";
import { useMemo } from "react";
import ListingInfo from "./ListingInfo";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
  reservations?: Reservation[] 
}

const ListingClient:React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [categories, listing.category]);
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
          </div>
        </div>
      </div>
    </Container>
 );
}
 
export default ListingClient;