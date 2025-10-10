import Image from "next/image";
import Link from "next/link";
import Menus from "./Menus";

const Navbar = () => {
  const items = [
    { name: "News", href: "/news" },
    { name: "Tickets", href: "/tickets" },
    { name: "Fixtures", href: "/matches" },
    { name: "Teams", href: "/player" },
    { name: "Shop", href: "/shop" },
  ];
  return (
    <div className="flex w-full">
      <div className="flex w-full items-center justify-between  bg-green-700 bg-gradient-to-b from-transparent to-green-600/90 text-white font-bold p-3  ">
        <div className="font-bold text-xl object-cover relative w-20 h-20 ">
          <Link href="/">
            <Image fill src={"/logo.png"} alt="" />
          </Link>
        </div>
        {/* <div className="flex ml-4 w-full h-full "> */}
        <div className="hidden md:flex flex-col items-center ml-10 w-full">
          <div className="w-full justify-center text-end">
            Official Gor Mahia website
          </div>
          <div className="h-0.5  w-full bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>
          <div className="flex flex-row px-2 gap-5">
            {" "}
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative rounded p-3 text-white font-bold uppercase group"
              >
                {item.name}
                {/* underline */}
                <div className="absolute left-0 bottom-0 h-1 w-0 bg-gradient-to-r from-green-700 to-orange-300/60 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}
          </div>
        </div>
        {/* </div> */}
        <div className="md:hidden flex p-4 ">
          <Menus />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
