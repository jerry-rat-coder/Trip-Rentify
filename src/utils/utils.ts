export function getCountryFlagEmoji(countryCode:string) {
    const offset = 127397; // 这个数值将ISO国家代码转换为相应的emoji代码
    return String.fromCodePoint(...countryCode.toUpperCase().split('').map(char => char.charCodeAt(0) + offset));
}