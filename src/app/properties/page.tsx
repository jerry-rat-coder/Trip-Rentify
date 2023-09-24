import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import getReservations from "@/actions/getReservations";
import getUserNameById from "@/actions/getUserNameById";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingLike from "@/components/listing/ListingLike";

const PropertiesPage = async () => {
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

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }


  return ( 
    <ClientOnly>
      <ListingLike 
        title="Properties"
        subtitle="List of your properties"
        listings={listings}
        currentUser={currentUser}
        isProperty
      />
    </ClientOnly>
   );
}
 
export default PropertiesPage;