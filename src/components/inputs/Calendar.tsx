'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CalenderProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disabledDates: Date[]
}

const Calendar:React.FC<CalenderProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  return ( 
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      minDate={new Date()}
      onChange={onChange}
      date={new Date()}
      showDateDisplay={false}
      disabledDates={disabledDates}
      direction="vertical"
    />
   );
}
 
export default Calendar;