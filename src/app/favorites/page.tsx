import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingLike from "@/components/listing/ListingLike";


const FavoritesPage = async () => {
  const listings = await getFavoriteListings();  
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

  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return ( 
    <ClientOnly>
      <ListingLike 
        listings={listings}
        currentUser={currentUser}
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
    </ClientOnly>
   );
}
 
export default FavoritesPage;