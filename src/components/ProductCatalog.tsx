import { useState } from "react";

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
  jwt: string;
  
}



export const ProductCatalog = ({ products, jwt  }: ProductCatalogProps) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleAddToCart = async (productId: number) => {
    console.log("Adding product to cart", productId); 
    try {
      const response = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // JWT token to authorize the request
        },
        body: JSON.stringify({
          productId,
          quantity: 1, // You can customize this if you want to allow users to add multiple quantities
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
  
      const data = await response.json();
      setMessage(`Product added to cart: ${data.product.Title}`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("Error adding product to cart");
    }
  };
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
          <button className="bg-black text-white px-4 py-2 rounded-md" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};