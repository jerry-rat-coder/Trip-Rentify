'use client'

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ListingLikeProps {
  title: string
  subtitle: string
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null
  isAuthor?: boolean
  bookedBy?: string[]
  listings?: SafeListing[]
  isProperty?: boolean
}

const ListingLike: React.FC<ListingLikeProps> = ({
  reservations,
  currentUser,
  title,
  subtitle,
  isAuthor,
  bookedBy,
  listings,
  isProperty
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');
  
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success("Reservation cancelled");
      router.refresh();
    })
    .catch(error => {
      toast.error(error?.resonse?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
    
  }, [router]);

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  return ( 
    <Container>
      <Heading
        title={title}
        subtitle={subtitle}
      />
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-8">
        {
          reservations  &&  reservations.map((reservation: any, index) => (
            <ListingCard 
              key={reservation.id}
              data={reservation?.listing}
              disabled={deletingId === reservation.listingId}
              reservation={reservation}
              onAction={onCancel}
              actionId={reservation.id}
              actionLabel={isAuthor ? "Cancel guest reservation" : 'Cancel reservation'}
              currentUser={currentUser}
              bookedBy={bookedBy?.[index]}
            />
          ))
        }
        {
          listings && (isProperty ? (
            listings.map((listing) => (
              <ListingCard 
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                onAction={onDelete}
                actionLabel="Delete property"
                disabled={deletingId === listing.id}
                actionId={listing.id}
              />
            ))
          ) : (
            listings.map((listing) => (
              <ListingCard 
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            ))
          ))
        }
      </div>
    </Container>
   );
}
 
export default ListingLike;