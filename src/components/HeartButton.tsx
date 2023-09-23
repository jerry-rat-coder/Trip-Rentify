'use client'
import { useState } from 'react'

import { SafeUser } from "@/types";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import useFavorite from '@/hooks/useFavorite';

interface HeartButtonProps {
  currentUser?: SafeUser | null
  listingId: string
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({listingId, currentUser});

  return ( 
    <div
      onClick={toggleFavorite} 
      className=" relative hover:opacity-70 transition cursor-pointer">
      <AiOutlineHeart 
        size={28}
        className=" absolute -top-[2px] -right-[2px] fill-white"
      />
      <AiFillHeart 
        size={24}
        className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`}
      />
    </div>
  );
}
 
export default HeartButton;