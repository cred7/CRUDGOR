// import { playerData } from "@/data/data";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Button from "./Button";

const Players = async () => {
  const playerData = await prisma.player.findMany();
  // console.log(playerData);

  return (
    <section className="flex flex-col items-center justify-center w-full bg-green-700/90 bg-gradient-to-b from-transparent to-green-600/90 p-4">
      <div className="flex text-black flex-col mt-3 p-3 gap-2 max-w-6xl w-full">
        <div className="flex flex-col w-full items-centekr justify-center gap-2 ">
          <h1 className="text-xl font-bold">The Team</h1>
          <div className="h-0.5  w-2/4 border-none rounded bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>

          <div className="max-w-5xl overflow-hidden w-full m-auto">
            <div className="grid fade-in grid-cols-1 lg:w-full lg:flex-nowrap sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:overflow-x-scroll scrollbar-hide gap-4 sm:gap-x-4 md:px-0">
              {playerData ? (
                playerData.slice(0, 5).map((i, index) => (
                  <div
                    key={index}
                    className="min-w-[40vw] shadow-sm md:min-w-[24%] h-[60vh] md:h-[50vh] lg:h-75 rejlative"
                  >
                    <div className="w-full flex justify-between">
                      {" "}
                      <h1 className="absolunte text-black left-3 top-3">
                        {i.name}
                      </h1>
                      <h1 className="absolutke text-black right-3 top-3">
                        {new Date().getFullYear() -
                          new Date(Number(i.dateOfBirth)).getFullYear()}
                      </h1>
                    </div>

                    <div className="w-full relative h-[80%]">
                      <Image
                        src={
                          i.imageUrl.includes("/") ? i.imageUrl : `/Logo.png`
                        }
                        alt=""
                        fill
                        className="w-[100%] h-[80%] object-contain rounded"
                      />
                    </div>
                    <div className="w-full flex justify-between">
                      <div className=" text-black ">{i.position}</div>
                      <div className=" text-black">{index}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No players found</div>
              )}
            </div>
          </div>
        </div>

        <Button
          href="/player"
          h={"h-1"}
          label="Our players"
          className=" bg-amber-50 text-green-700"
        />
      </div>
    </section>
  );
};

export default Players;
