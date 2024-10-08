// src/pages/api/get-cart.ts
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { jwt } = body;

  const res = await fetch('http://localhost:1337/api/carts/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    return new Response('Failed to fetch cart', { status: 500 });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
};
