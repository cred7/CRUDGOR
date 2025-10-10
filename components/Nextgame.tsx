import Image from "next/image";

const Nextgame = () => {
  return (
    <section className="w-full fade-in bg-gradient-to-t from-[rgba(0,25,12,0.7)] to-[rgba(0,25,12,0)] relative flex items-center justify-center bg-amber-50 flex-col">
      <div className="absolute h-[200px] bg-white p-3 rounded-lg shadow-2xl min-h-[170px] -top-25 max-w-6xl gap-2 hidden lg:flex w-full  flex-row">
        <div className="flex-1 relative h-full w-1/3 hover:shadow-2xl rounded">
          <Image src={"/FKF.jpg"} alt="" fill className="object-cover" />
        </div>
        <div className="flex-1 relative h-full  rounded w-1/3 hover:shadow-2xl">
          <Image src={"/FKF.jpg"} alt="" fill className="object-cover" />
        </div>
        <div className="flex-1 relative h-full w-1/3  rounded hover:shadow-2xl">
          <Image src={"/FKF.jpg"} alt="" fill className="object-cover" />
        </div>
        <div className="flex-1 relative h-full w-1/3  rounded hover:shadow-2xl">
          <Image src={"/FKF.jpg"} alt="" fill className="object-cover" />
        </div>
      </div>
      <div className="w-full bg-gradient-to-b from-[#00190c]/90 via-green-600/90 to-green-700/90 px-6 max-w-screen">
        <div className="lg:hidden  flex flex-col items-center  my-10 gap-y-2 w-full ">
          <div className="w-full flex flex-row gap-3">
            <div className="relative h-[100px] w-[100px]">
              <Image src={"/FKF.jpg"} alt="" fill className="object-cover" />
            </div>
            <div className="flex text-black font-bold justify-center items-start flex-col">
              <div className="flex flex-row gap-2">
                {new Date().getDate().toString()}/{new Date().getMonth() + 1}/
                {new Date().getFullYear()}
                <p> Galleries</p>
              </div>
              <div className="h-0.5  w-3/4 bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>
              <div className="text-black font-bold">
                Next Game: Gor Mahia vs AFC Leopards
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row gap-3">
            <div className="relative h-[100px] w-[100px]">
              <Image src={"/FKF.jpg"} alt="" fill className="object-cover" />
            </div>
            <div className="flex text-black font-bold justify-center items-start flex-col">
              <div className="flex flex-row gap-2">
                {new Date().getDate().toString()}
                Galleries
              </div>
              <div className="h-0.5  w-3/4 bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>
              <div className="text-black font-bold">
                Next Game: Gor Mahia vs AFC Leopards
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row gap-3">
            <div className="relative h-[100px] w-[100px]">
              <Image src={"/FKF.jpg"} alt="" fill className="object-cover" />
            </div>
            <div className="flex text-black font-bold justify-center items-start flex-col">
              <div className="flex flex-row gap-2">
                {new Date().getDate().toString()}
                Galleries
              </div>
              <div className="h-0.5  w-3/4 bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>
              <div className="text-black font-bold">
                Next Game: Gor Mahia vs AFC Leopards
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row gap-3">
            <div className="relative h-[100px] w-[100px]">
              <Image src={"/FKF.jpg"} alt="" fill className="object-cover" />
            </div>
            <div className="flex text-black font-bold justify-center items-start flex-col">
              <div className="flex flex-row gap-2">
                {new Date().getDate().toString()}
                Galleries
              </div>
              <div className="h-0.5  w-3/4 bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>
              <div className="text-black font-bold">
                Next Game: Gor Mahia vs AFC Leopards
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nextgame;
