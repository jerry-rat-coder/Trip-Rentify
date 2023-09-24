'use client'

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import Button from "./Button";

import useLoginModal from "@/hooks/useLoginModal";
interface EmptyStateProps {
  title?: string,
  subtitle?: string,
  showReset?: boolean
  login?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  login
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  return ( 
    <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
      <Heading 
        title={title}
        subtitle={subtitle}
        center
      />
      {
        showReset && (
          <div className="w-48 mt-4">
            <Button 
              outline
              onClick={() => router.push('/')}
              label="Remove all filters"
            />
          </div>
        )
      }
      {
        login && (
          <div className="w-48 mt-4">
            <Button 
              outline
              onClick={() => loginModal.onOpen()}
              label="LogIn Now"
            />
          </div>
        )
      }
    </div>
   );
}
 
export default EmptyState;