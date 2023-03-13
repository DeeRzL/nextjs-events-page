import React from 'react';
import Image from 'next/image'
import Link from 'next/link';


export const HomePage = ({ data }) => {
  return (
    <div className='home_body'>
      {data?.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`}>
            <div className='image'>
              <Image src={ev.image} width={500} height={300} alt={ev.title} />
            </div>
            <div className='content'>
              <h2>{ev.title}</h2>
              <p>{ev.description}</p>
            </div>
        </Link>
      ))}
    </div>
  )
};
