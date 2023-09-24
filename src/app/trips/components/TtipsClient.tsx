'use client'

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface TripsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');
  
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(res => {
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

  return ( 
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {
          reservations.map((reservation: any) => (
            <ListingCard 
              key={reservation.id}
              data={reservation?.listing}
              disabled={deletingId === reservation.listingId}
              reservation={reservation}
              onAction={onCancel}
              actionId={reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          ))
        }
      </div>
    </Container>
   );
}
 
export default TripsClient;
