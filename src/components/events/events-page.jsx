import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const EventsPage = ({data})=> {
  return (
    <div className='events_page'>
            <div>
                {data.map(ev => (
                    <Link  key={ev.id} href={`/events/${ev.id}`}>
                        <div className='card'>
                        <Image src={ev.image} width={500} height={500} alt={ev.title} />
                        <h2>{ev.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
  )
}

export default EventsPage