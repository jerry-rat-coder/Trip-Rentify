import getListings from '@/actions/getListings';
import ClientOnly from '@/components/ClientOnly'
import Container from '@/components/Container'
// import Image from 'next/image'
import EmptyState from '@/components/EmptyState';

export default async function Home() {
  // const isEmpty = false;
  const listing = await getListings({});

  if(listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          <div>{listing[0].title}</div>
        </div>
      </Container>
    </ClientOnly>
  )
}
