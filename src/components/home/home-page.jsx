import React from 'react';
import Image from 'next/image'
import Link from 'next/link';


export const HomePage = ({ data }) => {
  return (
    <div className='home_body'>
      {data?.map(({id, title, image, description }) => (
        <Link key={id} href={`/events/${id}`}>
            <div className='image'>
              <Image src={image} width={500} height={300} alt={title} />
            </div>
            <div className='content'>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
        </Link>
      ))}
    </div>
  )
};
