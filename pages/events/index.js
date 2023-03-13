import EventsPage from '../../src/components/events/events-page';

const AllEvents = ({ data }) => {
    return <EventsPage data={data} />
}
export default AllEvents;

export async function getStaticProps() {
    const { events_categories } = await import('/data/data.json')
    return {
        props: {
            data: events_categories,
        },
    };
}