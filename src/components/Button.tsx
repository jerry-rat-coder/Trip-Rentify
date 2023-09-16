'use client'
import {IconType} from 'react-icons'

interface ButtonProps {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    small?: boolean
    icon?: IconType
    outline?: boolean
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    small,
    icon: Icon,
    outline
}) => {
    return ( 
        <button 
        onClick={onClick}
        disabled={disabled}
        className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-70 transition w-full py-3 ${outline ? 'bg-white' : 'bg-rose-500'} ${outline ? 'border-black' : 'border-rose-500'} ${outline ? 'text-black`' : 'text-white'} ${small ? 'text-sm' : ' text-base'} ${small ? 'font-light' : 'font-semibold'}  ${small ? 'border-[1px]' : 'border-2'}`}>
            {
                Icon && (
                    <Icon 
                      size={24}
                      className='absolute left-4 top-3'
                    />
                )
            }
            {label}
        </button>
     );
}
 
export default Button;