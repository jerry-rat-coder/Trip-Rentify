import countries from "world-countries";
// import { countries } from 'country-flag-icons'
import { countries as flags } from 'country-flag-icons';

const formattedCountries = countries.map((country, index) => ({
    value: country.cca2,
    label: country.name.common,
    flag: flags[index],
    latlng: country.latlng,
    region: country.region,
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((country) => country.value === value);
    }

    return {
        getAll,
        getByValue
    }
}

export default useCountries;