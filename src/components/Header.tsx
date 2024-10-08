// src/components/Header.tsx

import React, { useEffect, useState } from 'react';
import { Logout } from './Logout';

const Header: React.FC = () => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    // This runs on the client after the component mounts
    const token = sessionStorage.getItem('jwt');
    const user = sessionStorage.getItem('username');
    const userData = sessionStorage.getItem('user');
    console.log(userData, "userData");
    const User = {username:user}
    console.log(User, "User");
    setJwt(token);
    setUsername(user);
    setUser(userData);
  }, []);

  return (
    <header className="flex justify-between items-center px-24 py-12 max-sm:px-5 max-sm:py-10 max-w-7xl justify-self-center w-full mx-auto bg-gray-100">
      <a href="/" className="flex gap-x-4 items-center">
        <p className="uppercase text-3xl text-zinc-900">Test Task</p>
      </a>

      <nav className="flex gap-x-10">
        <a href="/" className="text-xl font-bold text-black">Home</a>
        <a href="/product-catalog" className="text-xl font-bold text-black">Products</a>
        <a href="/cart" className="text-xl font-bold text-black">Cart</a>
      </nav>

      {jwt ? (
        <div className="flex items-center gap-x-4">

          {user && <span className='font-bold'>Welcome, {username}</span>}
          <Logout />
        </div>
      ) : (
        <a href="/login" className="bg-black text-white py-3 px-6 rounded-xl text-xl">
          Login
        </a>
      )}
    </header>
  );
};

export default Header;
