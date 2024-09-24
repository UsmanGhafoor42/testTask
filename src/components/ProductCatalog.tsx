import React from "react";

interface Product {
  id: number;
  title: string;
  image: { url: string };
  price: number;
}

interface ProductCatalogProps {
  products: Product[];
}

export const ProductCatalog = ({ products }: ProductCatalogProps) => {
  console.log("products: ", products);

  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-center border rounded-md p-4 gap-10">
          <img
            src={`http://localhost:1337${product.image.url}`}
            alt={product.title}
            width={400}
            height={400}
          />
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-xl">Price: {product.price}</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};