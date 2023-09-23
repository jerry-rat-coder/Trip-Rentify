import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import ClientOnly from "@/components/ClientOnly";
import ListingClient from "./components/ListingClient";
import EmptyState from "@/components/EmptyState";

interface IParams {
  listingId?: string
}


const ListingPage = async ({ params } : { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

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
        // reservations={}
      />
    </ClientOnly>
   );
}
 
export default ListingPage;