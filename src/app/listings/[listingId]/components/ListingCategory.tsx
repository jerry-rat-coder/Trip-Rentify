'use client'

import { IconType } from "react-icons";

interface ListingCategoryProps {
  label: string
  icon: IconType
  description: string
}

const ListingCategory:React.FC<ListingCategoryProps> = ({
  label,
  icon: Icon,
  description
}) => {
  return ( 
    <div className=" flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className=" flex-col flex"> 
          <div className=" font-semibold text-lg">{label}</div>
          <div className=" text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
   );
}
 
export default ListingCategory;