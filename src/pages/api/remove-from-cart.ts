// src/pages/api/delete-from-cart.ts
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { productId, jwt } = body;

  const res = await fetch(`http://localhost:1337/api/carts/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    return new Response('Failed to delete product from cart', { status: 500 });
  }

  return new Response('Product removed from cart', { status: 200 });
};
