'use client'
import Image from "next/image";

interface AvatarProps {
  src?: string
}

const Avatar:React.FC<AvatarProps> = ({ 
  src
 }) => {
   return ( 
    <Image 
    className="rounded-full"
    width={30}
    height={30}
    src={src || "/images/placeholder.jpg"}
    alt="Avatar"
    /> 
   )
}
 
export default Avatar;