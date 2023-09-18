'use client'
import { IconType } from "react-icons";


interface CategoryBoxProps {
    label: string,
    icon: IconType,
    selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {
    return ( 
        <div className={`flex flex-col justify-center items-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${ selected ? ' text-neutral-800' : ' text-neutral-500' } ${ selected ? ' border-b-neutral-800' : ' border-b-transparent' }`}>
            <Icon size={26} />
            <div className=" font-semibold text-sm">
                {label}
            </div>
        </div>
    );
}
 
export default CategoryBox;
