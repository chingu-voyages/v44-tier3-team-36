import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="z-50 relative bg-gradient-to-r from-indigo-400 from-10% via-sky-400 via-30% to-emerald-400 to-90% max-w-full">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="font-sans-mono font-bold text-2xl">
          <h1>MTA Transit</h1>
        </div>
        <div className="flex font-bold">
          <button className="text-white px-4 py-2 mr-4">Login</button>
          <button className="text-white px-4 py-2">Signup</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;