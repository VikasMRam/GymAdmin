export const toJson = async (response) => {
  try {
    return JSON.parse(await new Response(response.body).text());
  } catch (err) {
    return 'Not json';
  }
};

