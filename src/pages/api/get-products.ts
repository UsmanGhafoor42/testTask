import type { APIRoute } from "astro";
import http from 'http';

// export const get: APIRoute = async ({ params }) => {
//   const { props } = params;

//   return new Promise((resolve, reject) => {
//     const options = {
//       hostname: 'localhost',
//       port: 1337,
//       path: `/api/${props}`,
//       method: 'GET',
//       headers: {
//         'productToken': 'ec89264e01bea193371a314fec2875f092f27623fdeecc7292dbf4c740c679fe0b39b81ad498c065e3378ba08d7e983acaccb026d62c0ebcb88545013a6937da2c5f84e895e926094e7ac329d73ec77255287772e69125d49aa116e4b3e3f478d74840346398173d497cdc539f761dec8d9a0f30b7d955c99552c5e53bbd5cfb'
//       }
//     };

//     const req = http.request(options, (res) => {
//       let data = '';

//       res.on('data', (chunk) => {
//         data += chunk;
//       });

//       res.on('end', () => {
//         if (res.statusCode === 200) {
//           console.log(JSON.parse(data)); // Log the response data
//           resolve(new Response(data, { status: 200 }));
//         } else {
//           console.error("Error fetching products:", data); // Log the error for debugging
//           resolve(new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 }));
//         }
//       });
//     });

//     req.on('error', (error) => {
//       console.error("Error fetching products:", error); // Log the error for debugging
//       resolve(new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 }));
//     });

//     req.end();
//   });
// };

export const getProducts = async (props: string) => {
  const response = await fetch(`http://localhost:1337/api/${props}`, {
    headers:{
      'productToken': 'ec89264e01bea193371a314fec2875f092f27623fdeecc7292dbf4c740c679fe0b39b81ad498c065e3378ba08d7e983acaccb026d62c0ebcb88545013a6937da2c5f84e895e926094e7ac329d73ec77255287772e69125d49aa116e4b3e3f478d74840346398173d497cdc539f761dec8d9a0f30b7d955c99552c5e53bbd5cfb'
    },
    method: 'GET',
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}

