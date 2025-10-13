import prisma from "@/lib/prisma";
import Image from "next/image";
import Button from "./Button";

const News = async () => {
  const news = await prisma.news.findMany();
  console.log("dome");
  console.log(news);
  return (
    <section className="w-full overflow-hidden">
      <div className="flex w-full flex-col mb-3 md:mt-30 px-5 justify-center items-center overflow-hidden">
        <div className="flex text-black flex-col mt-3  p-4 gap-2 max-w-7xl w-full">
          <div className="flex flex-col w-full justify-center gap-2 px-1">
            <h1 className="text-xl font-bold">Latest News</h1>
            <div className="h-0.5  w-2/4 border-none rounded bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>

            <div className="grid fade-in grid-cols-1 lg:w-full lg:flex-nowrap md:grid-cols-2 lg:flex lg:flex-row lg:overflow-x-scroll scrollbar-hide gap-4 md:gap-x-4 md:px-0">
              {news.slice(0, 4).map((i, index) => (
                <div key={index} className="w-full px-2">
                  <div className="min-w-[40vw] flex-col shadow-sm md:min-w-[24%] h-[25vh] md:h-[30vh] lg:h-50 relative">
                    <Image
                      src={i.imageUrl}
                      alt=""
                      fill
                      className="w-full object-cover"
                    />
                  </div>
                  <h1 className="text-lg font-bold">{i.title}</h1>
                  {/* <h1 className="text-sm">{i.date}</h1> */}
                  <div className="w-full bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>
                  <div className="font-light">{i.excerpt}</div>
                </div>
              ))}
            </div>

            <Button
              href="/news"
              label="more news"
              className="bg-green-700  text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
