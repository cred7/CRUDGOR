import { standings } from "@/data/data";

const Hero = () => {
  return (
    <section className="h-[calc(100vh-30px)] -mt-20 z-0 w-full bg-[url('/Hero.jpeg')] bg-cover bg-center relative">
      <div className="absolute z-0 inset-0 bg-[radial-gradient(circle,rgba(0,25,12,0)_10%,rgba(0,25,12,0.7)_100%)]"></div>

      <div className="w-full h-full relative fade-in p-3 ">
        <div className="absolute top-25 right-5 w-3/5 lg:w-2/5 font-md md:font-normal  p-1">
          <div className="w-full">
            {/* Column titles */}
            <div className="grid grid-cols-5 bg-black text-white font-semibold px-4 py-2">
              <span>POS</span>
              <span className="col-span-2">TEAM</span>
              <span>P</span>
              <span>PTS</span>
            </div>

            {/* Rows */}
            {standings.slice(0, 10).map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-5 items-center px-4 py-3 border-b text-black ${
                  row.team.includes("Gor")
                    ? "bg-green-900 text-white"
                    : `${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`
                } `}
              >
                <span className="font-bold">{row.pos}</span>
                <span className="col-span-2">{row.team}</span>
                <span>{row.p}</span>
                <span className="font-bold">{row.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
