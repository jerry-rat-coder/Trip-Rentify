import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import getUserNameById from "@/actions/getUserNameById";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingLike from "@/components/listing/ListingLike";

const ReservationsPage = async () => {
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
    authorId: currentUser.id
  })

  if(!reservations || reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    )
  }

  const bookedBy = await Promise.all(reservations.map((reservation) => {
    return getUserNameById({userId: reservation.userId});
  }))

  return ( 
    <ClientOnly>
      <ListingLike 
        title="Reservations"
        subtitle="Bookings on your properties"
        currentUser={currentUser}
        reservations={reservations}
        isAuthor
        bookedBy={bookedBy as string[]}
      />
    </ClientOnly>
   );
}
 
export default ReservationsPage;