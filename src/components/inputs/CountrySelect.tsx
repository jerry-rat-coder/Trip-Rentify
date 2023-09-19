'use client'

import useCountries from '@/hooks/useCountries';
import Select from 'react-select'
// import { countries } from 'country-flag-icons';
import Flag from '@/components/Flag'

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect:React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useCountries();
    // const all = getAll();
    // console.log(countries.);

    return ( 
        <div>
            <Select 
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={onChange}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row items-center gap-3'>
                        {/* <div>{option.flag}</div> */}
                        <Flag countryCode={option.flag} />
                        <div>
                            {option.label}
                            <span className='ml-1 text-neutral-500'>
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
     );
}
 
export default CountrySelect;