'use client'
import useSearchModal from '@/hooks/useSearchModal';
import {BiSearch} from 'react-icons/bi'

const Search = () => {
    const searchModal = useSearchModal();

    return ( 
        <div
          onClick={searchModal.onOpen} 
          className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer md:ml-32">
          <div className="flex flex-row items-center justify-between">
              {/* <div className='sm:hidden' /> */}
              <div className="text-sm font-semibold px-6 ">
                Any Where
              </div>
              <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                Any Week
              </div>
              <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden md:block">
                  Add Guests
                </div>
                <div className="p-2 bg-rose-500 rounded-full text-white">
                  <BiSearch size={18} />
                </div>
              </div>
          </div>
        </div>
     );
}
 
export default Search;