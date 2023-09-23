import { SafeUser } from "@/types"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import useLoginModal from "./useLoginModal"
import axios from "axios"
import toast from "react-hot-toast"

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({
  listingId,
  currentUser
}: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if(!currentUser) {
      loginModal.onOpen();
    }

    try {
      const request = hasFavorited ? () => axios.delete(`/api/favorites/${listingId}`) : () => axios.post(`/api/favorites/${listingId}`);

      await request();
      router.refresh();
      toast.success('Success!');
    } catch (error) {
      toast.error('Something went wrong.');
    }    
  }, [currentUser, loginModal, hasFavorited, listingId, router]);

  return {
    hasFavorited,
    toggleFavorite
  }
}
export default useFavorite;