'use client'

import { IconType } from "react-icons";

interface CategoryItemProps {
    icon: IconType
    label: string
    selected?: boolean
    onClick: (value:string) => void
}

const CategoryItem:React.FC<CategoryItemProps> = ({
    label,
    icon: Icon,
    selected,
    onClick
}) => {
    return ( 
        <div
          onClick={() => onClick(label)}
          className={`rounded-xl border-2 flex flex-col gap-3 p-4 hover:border-black cursor-pointer transition ${selected ? 'border-black' : 'border-neutral-200'}`}
        >
            <Icon size={30} />
            <div className="font-semibold">
              {label}
            </div>
        </div>
    );
}
 
export default CategoryItem;