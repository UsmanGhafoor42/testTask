import React from "react";

export const Logout = () => {
  const handleLogouts = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div>
      <button
        className="bg-black text-white py-3 px-6 rounded-xl text-xl"
        onClick={handleLogouts}
      >
        Logout
      </button>
    </div>
  );
};
