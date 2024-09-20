import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: username, password }),
    });
    if (response.ok) {
      // Handle successful login
    } else {
      // Handle errors
    }
  };

  return (
    <div className=" bg-gray-100 p-4 rounded-md flex flex-col gap-10 border-2 border-gray-300 w-1/2 py-14">
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <input className="p-2 rounded-md px-4"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className="p-2 rounded-md px-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit" className="p-2 rounded-md bg-black text-white">Login</button>
    </form>
    <div className="flex gap-2 justify-end">
        <p className="text-gray-500">Don't have an account?</p>
        <a href="/register" className="text-black font-bold">Register</a>
    </div>
    
        </div>
  );
};

export default LoginForm;