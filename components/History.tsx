import Image from "next/image";
import Button from "./Button";

const History = () => {
  return (
    <section className="w-full justify-center items-center flex flex-col p-4 bg-green-50">
      <div className="max-w-6xl m-4 flex flex-col">
        <h1 className="text-3xl md:text-5xl font-bold text-green-700 mb-4">
          History
        </h1>
        <div className="grid grid-cols-2 md:text-2xl md:flex md:flex-row py-2 gap-5 md:gap-10 text-black">
          {[1, 2, 3].map((p) => (
            <div key={p} className="flex flex-col items-center justify-center">
              <h1 className="font-bold uppercase">League champions</h1>
              <div className="w-full p-1 flex flex-row items-center justify-center">
                <Image
                  src="/LG.jpeg"
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-full md:h-24 md:w-24"
                />
                <p className="text-3xl">20</p>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold uppercase">Mandela Cup</h1>
            <div className="w-full p-1 flex flex-row items-center justify-center">
              <Image
                src="/LG.jpeg"
                alt=""
                width={50}
                height={50}
                className="rounded-full md:h-24 md:w-24"
              />
              <p className="text-3xl">1980</p>
            </div>
          </div>
        </div>
        <Button
          h={"h-1"}
          label="More History"
          className=" bg-green-700 text-white"
        />
      </div>
    </section>
  );
};

export default History;
