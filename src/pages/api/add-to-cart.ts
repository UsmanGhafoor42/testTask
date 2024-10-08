// src/pages/api/add-to-cart.ts
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { productId, jwt } = body;

  const res = await fetch('http://localhost:1337/api/carts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      data: {
        products: [productId], // Assuming your cart model expects products array
      },
    }),
  });

  if (!res.ok) {
    return new Response('Failed to add product to cart', { status: 500 });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
};
