import React, { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username,
          email,
          password,
        }
      );

      if (response.data) {
        setSuccessMessage("Registration successful! You can now log in.");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage(
        (error as any).response?.data?.error?.message ||
          "An error occurred during registration"
      );
      setSuccessMessage("");
    }
    window.location.href = "/login";
  };

  return (
    <div className=" bg-gray-100 p-4 rounded-md flex flex-col gap-10 border-2 border-gray-300 w-1/2 py-14">
      <form onSubmit={handleRegister} className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username:</label>
          <input
            className="p-2 rounded-md px-4"
            type="text"
            placeholder="John Doe"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input
            className="p-2 rounded-md px-4"
            type="email"
            placeholder="johndoe@example.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password:</label>
          <input
            className="p-2 rounded-md px-4"
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Use `onChange` in React
            required
          />
        </div>

        <button type="submit" className="p-2 rounded-md bg-black text-white">
          Register
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
      <div className="flex gap-2 justify-end">
        <p className="text-gray-500">Already have an account?</p>
        <a href="/login" className="text-black font-bold">
          Login
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;
