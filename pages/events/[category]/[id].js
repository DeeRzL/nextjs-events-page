import Image from 'next/image'
import SingleEvent from '../../../src/components/events/single-event';

const EventPage = ({ data }) => <SingleEvent data={data}/>
export default EventPage;

export async function getStaticPaths() {
    const data = await import('/data/data.json');
    const allPaths = data.allEvents.map((path) => {
        return {
            params: {
                category: path.city,
                id: path.id.toString(),
            }
        };
    });

    return {
        paths: allPaths,
        fallback: false, //render solo del allpath
    };
}

export async function getStaticProps(context) {

    const id = context?.params.id;
    const { allEvents } = await import('/data/data.json');

    const data = allEvents.filter(ev => ev.id === id);
    return { props: { data } };
}