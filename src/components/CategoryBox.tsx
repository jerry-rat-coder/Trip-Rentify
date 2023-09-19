'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import { useCallback } from 'react'
import qs  from "query-string";

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
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if(params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if(params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [label, params, router]);

  
  
  return ( 
      <div
        onClick={handleClick} 
        className={`flex flex-col justify-center items-center gap-2 p-3 border-b-2 hover:text-neutral-800 hover:border-b-neutral-800 transition cursor-pointer ${ selected ? ' text-neutral-800' : ' text-neutral-500' } ${ selected ? ' border-b-neutral-800' : ' border-b-transparent' }`}>
          <Icon size={26} />
          <div className=" font-semibold text-sm">
              {label}
          </div>
      </div>
  );
}
 
export default CategoryBox;
