'use client'

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string,
  subtitle?: string,
  showReset?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  const router = useRouter();
  return ( 
    <div className="h-[60vh] flex flex-col justify-center items-center gap-2">
      <Heading 
        title={title}
        subtitle={subtitle}
        center
      />
      <div className="w-48 mt-4">
        <Button 
          outline
          onClick={() => router.push('/')}
          label="Remove all filters"
        />
      </div>
    </div>
   );
}
 
export default EmptyState;