import React from "react";

interface ImageFormat {
  url: string;
}

interface Image {
  url: string;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
  };
}

interface Product {
  id: number;
  Title: string;
  Image: Image[];
  Price: number;
}

interface ProductCatalogProps {
  products: Product[];
  
}

export const ProductCatalog = ({ products }: ProductCatalogProps) => {
  // console.log(products, "wasiq");
  return (
    <div className="flex flex-wrap justify-between gap-4">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between items-center bg-gray-200 w-[600px] rounded-md p-4 gap-10">
          <img
            src={`http://localhost:1337${product.Image[0]?.url}`}
            alt={product.Title}
            className="w-52 h-52 object-contain bg-[#fffafa] rounded-md"
          />
          <div className="flex flex-col gap-5 mr-20">
            <h1 className="text-2xl font-bold">{product.Title}</h1>
            <p className="text-xl">Price: ${product.Price}</p>
          <button className="bg-black text-white px-4 py-2 rounded-md">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};