'use client'

import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import useSearchModal from "@/hooks/useSearchModal";
import { Range } from "react-date-range";
import { CountrySelectValue } from "../inputs/CountrySelect";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams(); //获取url中的filter参数
  const searchModal = useSearchModal();
  
  const [] = useState();

  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });



  return (  
    <div>

    </div>
  );
}
 
export default SearchModal;