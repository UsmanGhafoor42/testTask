import React, { useState, useEffect } from 'react';

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

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartProps {
  jwt: string; // JWT token to authenticate the user
}

export const Cart = ({ jwt }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState('');

  // Fetch the cart items
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch('/api/get-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jwt }),
        });

        if (!res.ok) {
          setMessage('Failed to fetch cart');
          return;
        }

        const data = await res.json();
        setCartItems(data.products.map((item: any) => ({
          id: item.id,
          product: item.product,
          quantity: item.quantity || 1
        })));
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setMessage('Error fetching cart');
      }
    }

    fetchCart();
  }, [jwt]);

  // Handle removing an item from the cart
  const deleteFromCart = async (productId: number) => {
    try {
      const res = await fetch('/api/delete-from-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, jwt }),
      });

      if (!res.ok) {
        setMessage('Failed to remove item from cart');
        return;
      }

      // Filter out the deleted item
      setCartItems(cartItems.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error('Failed to delete from cart:', error);
      setMessage('Error deleting from cart');
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-bold mb-5">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-200 w-full rounded-md p-4 gap-10"
            >
              <img
                src={`http://localhost:1337${item.product.Image[0]?.url}`}
                alt={item.product.Title}
                className="w-24 h-24 object-contain bg-[#fffafa] rounded-md"
              />
              <div className="flex flex-col gap-2 mr-20">
                <h1 className="text-2xl font-bold">{item.product.Title}</h1>
                <p className="text-xl">Price: ${item.product.Price}</p>
                <p className="text-lg">Quantity: {item.quantity}</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => deleteFromCart(item.product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {message && <p className="text-red-500 mt-5">{message}</p>}
    </div>
  );
};
