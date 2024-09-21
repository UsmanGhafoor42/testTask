import type { APIRoute } from 'astro';
import axios from 'axios';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();

  try {
    const response = await axios.post('http://localhost:1337/auth/local', {
      identifier: body.identifier,
      password: body.password,
    });
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
  }
};
