/* import { SiteClient } from 'datocms-client';

export default async function requestReceiver (request, response) {
    const TOKEN = "f07c49dad33685f1ddea4aa454c3ee";
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
        itemType: "978579",
        title: "Comunidade de teste",
        imageUrl: "https://github.com/Vitor-Tx",
        creatorSlug: "Vitor-Tx",

    })

    console.log(registroCriado);

    console.log(TOKEN);
    response.json({
        data: "dados",
        registroCriado: registroCriado, 
    })

} */

import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    const TOKEN = 'f07c49dad33685f1ddea4aa454c3ee';
    const client = new SiteClient(TOKEN);
    if(request.method === 'POST') {
        
        
        // Em uma aplicação "real", o ideal é validar os dados antes de cadastrar
        const registroCriado = await client.items.create({
            itemType: "978579",
            ...request.body,
            /* title: "Comunidade de teste",
            imageUrl: "https://github.com/Vitor-Tx",
            creatorSlug: "Vitor-Tx", */
    
        })
    
        console.log(registroCriado);
    
        console.log(TOKEN);
        response.json({
            data: "dados",
            registroCriado: registroCriado, 
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}