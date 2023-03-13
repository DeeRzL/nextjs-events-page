import path from 'path';
import fs from 'fs';

//llama el path de los datos
function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json');
}

//extrae la data de un directorio entregado
function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath)
    const data = JSON.parse(jsonData);
    return data;
}

//endpoint
export default function handler(req, res) {
    const { method } = req;

    const filePath = buildPath();
    const { events_categories, allEvents } = extractData(filePath);

    //R si no existe el evento
    if (!allEvents) {
        return res.status(404).json({
            status: 404,
            message: 'Events data not found',
        });
    }

    //R post con validacion @
    if (method === "POST") {
        const { email, eventId } = req.body;
        if (!email | !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
        }


        //R busca el evento seleccionado valida y agrega el email nuevo
        const newAllEvents = allEvents.map((ev) => {
            if (ev.id === eventId) {
                if (ev.emails_registered.includes(email)) {
                    res.status(409).json({ message: 'This email has already been registered' });
                    return ev;
                }
                return {
                    ...ev,
                    emails_registered: [...ev.emails_registered, email],
                };
            }
            return ev;
        });
        //reescribe el json usado como bbdd
        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

        //R 
        res.status(201).json({
            message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
        });
    }
}