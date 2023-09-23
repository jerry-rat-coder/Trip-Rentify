'use client'
import Button from '@/components/Button'
import Calendar from '@/components/inputs/Calendar'
import { Range } from 'react-date-range'

interface ListingReservationProps {
  price: number
  dateRange: Range
  totalPrice: number
  onChangeDate: (value: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

const ListingReservation:React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  return ( 
    <div className=' bg-white border-neutral-200 border-[1px] rounded-xl overflow-hidden'>
      <div className=' flex flex-row items-center p-4 gap-1'>
        <div className=' text-2xl font-semibold'>$ {price}</div>
        <div className=' font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <Calendar 
        disabledDates={disabledDates}
        onChange={(value) => {onChangeDate(value.selection)}}
        value={dateRange}
      />
      <hr />
      <div className='p-4'>
        <Button 
          disabled={disabled}
          onClick={onSubmit}
          label="Reserve"
        />
      </div>
      <div className='p-4 flex flex-row items-center justify-between text-lg font-semibold'>
        <div>Total</div>
        <div>{totalPrice}</div>
      </div>
    </div>
   );
}
 
export default ListingReservation;