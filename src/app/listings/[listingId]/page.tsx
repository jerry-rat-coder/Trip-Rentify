import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import ClientOnly from "@/components/ClientOnly";
import ListingClient from "./components/ListingClient";
import EmptyState from "@/components/EmptyState";
import getReservations from "@/actions/getReservations";

interface IParams {
  listingId?: string
}


const ListingPage = async ({ params } : { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if(!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return ( 
    <ClientOnly>
      <ListingClient 
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
   );
}
 
export default ListingPage;