import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const SingleEvent = ({ data }) => {
    const inputEmail = useRef();
    const router = useRouter();
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const emailValue = inputEmail.current.value;
        const eventId = router?.query.id;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailValue.match(validRegex)) {
            setMessage('Please introduce a correct email address');
        }

        try {
            const response = await fetch('/api/email-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailValue, eventId })
            })
            if (!response.ok) throw new Error(`Error: ${response.status}`)
            const data = await response.json();
            setMessage(data.message);
            inputEmail.current.value = '';
        } catch (e) {
            console.log('Error')
        }
    };

    return (
        <div className='event_single_page'>
            {data.map(ev => (
                <div key={ev.id}  >
                    <h2>Event {ev.title}</h2>
                    <Image key={ev.id} width={600} height={600} alt={ev.title} src={ev.image} />
                    <p>{ev.description}</p>
                    <form onSubmit={onSubmit} className="email_registration">
                        <label> Get registered for this event!</label>
                        <input ref={inputEmail} type="email" id='email' placeholder='Please type your email address' />
                        <button type='submit'>Submit</button>
                    </form>
                    <p>{message}</p>
                </div>
            ))}
        </div>
    )
}

export default SingleEvent