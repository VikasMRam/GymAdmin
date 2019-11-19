export const toJson = async response => JSON.parse(await new Response(response.body).text());
