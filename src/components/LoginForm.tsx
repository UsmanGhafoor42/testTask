import React, { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const loginInfo = {
      identifier: username,
      password: password
    };
    console.log(loginInfo, "loginInfo");

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', loginInfo);
      const loginResponse = response.data;

      // Store JWT in sessionStorage
      sessionStorage.setItem('jwt', loginResponse.jwt);
      sessionStorage.setItem('user', JSON.stringify(loginResponse.user));
      sessionStorage.setItem('username', response.data.user.username);

      console.log(response.data, "loginResponse");
      window.location.href = '/';
    } catch (error: any) {
      setError(error.response?.data?.error?.message || 'Login failed');
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-md flex flex-col gap-10 border-2 border-gray-300 w-1/2 py-14">
      <form onSubmit={handleLogin} className="flex flex-col gap-10">
        {error && <p className="text-red-500">{error}</p>}
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div className="flex gap-2 justify-end">
        <p className="text-gray-500">Don't have an account?</p>
        <a href="/register" className="text-black font-bold">Register</a>
      </div>
    </div>
  );
};

export default LoginForm;