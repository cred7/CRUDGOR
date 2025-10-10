import { ZapIcon } from "lucide-react";
import Link from "next/link";

const Alert = () => {
  return (
    <div className="max-w-screen w-full flex justify-center items-center mb-0 z-10">
      <div className="flex items-center justify-between uppercase h-[40px] w-full text-xs md:text-normal primary pr-6">
        <div className="flex items-center h-full  ">
          <Link
            href="/"
            className="flex1 h-full px-7 font-bold bg-white text-black hover:text-white hover:bg-[#002511]"
          >
            Gor Mahia
          </Link>
          <Link
            href="/"
            className="flex1 h-full px-5 hover:text-black hover:bg-white p-3 max-sm:p-1"
          >
            Tickets
          </Link>
          <Link
            href="/"
            className="flex1 hover:text-black px-5 hover:bg-white h-full p-2 max-sm:p-1"
          >
            Store
          </Link>
          <Link
            href="/"
            className="flex1 h-full p-3 hover:text-black px-5 max-sm:p-2 hover:bg-white"
          >
            Gor TV
          </Link>
        </div>
        <div className="items-center flex  justify-center max-sm:p-2 font-size-[13px] font-[400] font-Roboto font-sans-serif">
          <ZapIcon /> Sing in
        </div>
      </div>
    </div>
  );
};

export default Alert;
