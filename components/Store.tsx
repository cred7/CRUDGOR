import prisma from "@/lib/prisma";
import Image from "next/image";
import Button from "./Button";

const Store = async () => {
  const fj = [
    { name: "Home Shirt", img: "/kit.png", age: 25 / 26 },
    { name: "Home Shirt", img: "/kit.png", age: 25 / 26 },
    { name: "Home Shirt", img: "/kit.png", age: 25 / 26 },
    { name: "Home Shirt", img: "/kit.png", age: 25 / 26 },
  ];

  const f = await prisma.itemshop.findMany();
  return (
    <section className="flex flex-col w-full   p-4">
      <div className="flex flex-col max-w-7xl w-full items-center justify-center m-auto">
        <h2 className="text-3xl font-bold text-black mb-4">Our Stores</h2>
        <div className="max-w-7xl overflow-hidden w-full m-auto">
          <div className="w-full items-center justify-center flex flex-row gap-4 md:px-0">
            {f.map((i, index) => (
              <div className="flex flex-col items-center gap-2" key={index}>
                <div className="w-[100px] md:min-w-[300px] h-[100px] md:h-[40vh] relative rounded-md shadow-lg text-center">
                  <Image
                    src={i.imageUrl}
                    alt=""
                    fill
                    className="w-full rounded"
                  />
                </div>
                <div className="flex items-center justify-center gap-0.5 flex-col text-sm">
                  <h1 className=" items-center text-black">{i.name}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          h={"h-1"}
          label="Visit Our stores"
          className="  bg-green-700 text-white"
        />
      </div>
    </section>
  );
};

export default Store;
