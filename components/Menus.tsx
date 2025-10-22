"use client";

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";

const Menus = () => {
  const [menu, setMenu] = useState(false);
  const items = [
    { name: "News", href: "/news" },
    { name: "Tickets", href: "/tickets" },
    { name: "Fixtures", href: "/matches" },
    { name: "Teams", href: "/player" },
    { name: "Shop", href: "/" },
  ];
  return (
    <>
      <div className="bg-none">
        <button onClick={() => setMenu((p) => !p)}>
          {menu ? <X size={23} /> : <MenuIcon />}
        </button>
      </div>
      {menu && (
        <div className="absolute inset-0 bg-green-700 h-[calc(100vh-200px)] top-35 rounded backgrop-blur-lg  left-10 w-4/5  text-white font-bold text-xl flex flex-col items-center pt-25 md:hidden px-10">
          {items.map((item, key) => (
            <div
              key={key}
              className="backdrop-blur-xs px-7 items-centenr flex flex-col w-full"
            >
              <a
                key={item.name}
                className="p-4 border-b border-white w-full text-center hover:backdrop-brightness-90 hover:bg-green-500/50 hover:text-black hover:font-bold rounded hover:border-none"
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Menus;
