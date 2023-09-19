import 'flag-icon-css/css/flag-icons.css'


function Flag({ countryCode }:{countryCode: string}) {
  return (
    <div className={`flag-icon flag-icon-${countryCode.toLowerCase()}`} />
  );
}
export default Flag
