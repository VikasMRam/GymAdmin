export const toJson = async xhr => JSON.parse(await new Response(xhr.response.body).text());
