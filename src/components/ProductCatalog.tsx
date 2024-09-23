import React, { useState, useEffect } from "react";
import { getProducts } from "../pages/api/get-products";
import fetchApi from "../lib/strapi";

interface Product {
  id: number;
  title: string;
  image: { url: string };
  price: number;
}

export const ProductCatalog = ({products}: {products: any}) => {

  // const fetchProucts = async () => {

  //   const productData = await fetchApi({ endpoint: "products", wrappedByKey: "data" });
  //   console.log("API response: ", productData);
  // };

  // fetchProucts();
  console.log("products: ", products);

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product: any)=> (
        <div className="flex items-center justify-center border rounded-md p-4 gap-10">
         <img src="http://localhost:1337/uploads/Macbook_ad3a4877cd.jpeg" alt={product.Title}  width={400} height={400}/>
         <div className="flex flex-col items-center justify-center gap-5">

         <h1 className="text-2xl font-bold">{product.Title}</h1>
         <p className="text-xl"> Price: {product.Price}</p>
         </div>
         <button className="bg-bla text-white px-4 py-2 rounded-md">Add to Cart</button>
        </div>
      ))}

    </div>
  );
};
