import React, { useState } from 'react';

const PopoutMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen">
      <button
        className="fixed left-0 bottom-0 z-10 p-4 bg-blue-500 text-white rounded-tl-lg"
        onClick={toggleMenu}
      >
        Menu
      </button>
      {isOpen && (
        <div className="fixed left-0 bottom-0 z-10 h-screen w-64 p-4 bg-white border-l border-gray-300">
          <button
            className="absolute top-0 right-0 p-2 text-gray-500"
            onClick={toggleMenu}
          >
            Close
          </button>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopoutMenu;

