import CatEvent from '../../../src/components/events/catEvent';

const EventsCatPage = ({ data, pageName }) => <CatEvent data={data} pageName={pageName} />
  
    
export default EventsCatPage;

export async function getStaticPaths() {
    const { events_categories } = await import('/data/data.json');
    const allPaths = events_categories.map((ev) => {
        return {
            params: {
                category: ev.id.toString(),
            }
        };
    });
    
    return {
        paths: allPaths,
        fallback: false, //render solo del allpath
    };
}

export async function getStaticProps(context) {

    console.log(context)
    const id = context?.params.category;
    const { allEvents } = await import('/data/data.json');

    const data = allEvents.filter(ev => ev.city === id);
    return { props: { data, pageName:id } };
}
