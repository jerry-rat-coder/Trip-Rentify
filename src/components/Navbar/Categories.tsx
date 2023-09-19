'use client'

import Container from "../Container";

import { categories } from "@/libs/categories";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


// export const categories = [
//     {
//       label: 'Beach',
//       icon: TbBeach,
//       description: 'This property is close to the beach!',
//     },
//     {
//       label: 'Windmills',
//       icon: GiWindmill,
//       description: 'This property is has windmills!',
//     },
//     {
//       label: 'Modern',
//       icon: MdOutlineVilla,
//       description: 'This property is modern!'
//     },
//     {
//       label: 'Countryside',
//       icon: TbMountain,
//       description: 'This property is in the countryside!'
//     },
//     {
//       label: 'Pools',
//       icon: TbPool,
//       description: 'This is property has a beautiful pool!'
//     },
//     {
//       label: 'Islands',
//       icon: GiIsland,
//       description: 'This property is on an island!'
//     },
//     {
//       label: 'Lake',
//       icon: GiBoatFishing,
//       description: 'This property is near a lake!'
//     },
//     {
//       label: 'Skiing',
//       icon: FaSkiing,
//       description: 'This property has skiing activies!'
//     },
//     {
//       label: 'Castles',
//       icon: GiCastle,
//       description: 'This property is an ancient castle!'
//     },
//     {
//       label: 'Caves',
//       icon: GiCaveEntrance,
//       description: 'This property is in a spooky cave!'
//     },
//     {
//       label: 'Camping',
//       icon: GiForestCamp,
//       description: 'This property offers camping activities!'
//     },
//     {
//       label: 'Arctic',
//       icon: BsSnow,
//       description: 'This property is in arctic environment!'
//     },
//     {
//       label: 'Desert',
//       icon: GiCactus,
//       description: 'This property is in the desert!'
//     },
//     {
//       label: 'Barns',
//       icon: GiBarn,
//       description: 'This property is in a barn!'
//     },
//     {
//       label: 'Lux',
//       icon: IoDiamond,
//       description: 'This property is brand new and luxurious!'
//     }
//   ]



const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if(!isMainPage) {
    return null;
  }


  return ( 
      <Container>
          <div className="flex flex-row justify-between items-center overflow-x-auto pt-4">
              {
                  categories.map(item => (
                      <CategoryBox 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                      />
                  ))
              }
          </div>
      </Container>
    );
}
 
export default Categories;