import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingLike from "@/components/listing/ListingLike";


const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Unauthorized"
          subtitle="Please login"
          login
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser?.id
  })

  if(!reservations || reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    )
  }
  return ( 
    <ClientOnly>
      <ListingLike 
        reservations={reservations}
        currentUser={currentUser}
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
    </ClientOnly>
   );
}
 
export default TripsPage;