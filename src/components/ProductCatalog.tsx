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
    <div className="grid grid-cols-3 gap-4">
      {products.map((product: any)=> (
        <div className="flex  items-center justify-center border rounded-md p-4 gap-10">
         <img src={product.Image} alt={product.Title} />
         <div className="flex flex-col items-center justify-center gap-5">

         <h1>{product.Title}</h1>
         <p>{product.Price}</p>
         </div>
        </div>
      ))}

    </div>
  );
};
