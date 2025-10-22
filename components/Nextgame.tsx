"use client";
import { TicketEvent } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Nextgame = () => {
  const [events, setEvents] = useState<TicketEvent[]>([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null);
  async function getData() {
    try {
      setLoading(true); // 2. Set loading to true before fetch
      const res = await fetch("/api/ticket", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Network error while bringin the data");
      }

      const data: TicketEvent[] = await res.json();
      // console.log("Fetched ticket data:", data);
      setEvents(data);
      console.log("Events state updated:");
      // setQuery("G");
    } catch (error) {
      setError("Error fetching tickets");
    } finally {
      setLoading(false); // 3. Set loading to false after fetch
    }
  }
  useEffect(() => {
    getData();
  }, []);

  // const events = await prisma.event.findMany();
  return (
    <section className="w-full bg-green-50 fade-in bg-gradient-to-t from-[rgba(0,25,12,0.7)] to-[rgba(0,25,12,0)] relative flex items-center justify-center  flex-col">
      <div className="absolute h-[200px] bg-green-50 p-3 rounded-lg shadow-2xl min-h-[190px] -top-25 max-w-6xl gap-2 hidden lg:flex w-full  flex-row items-center justify-center">
        {events.length > 0 ? (
          events.slice(0, 4).map((event) => (
            <Link key={event.id} href={`/tickets`} className="w-1/3 h-full">
              <div className="flex-1 relative group overflow-hidden h-full w-full max-w-70 hover:shadow-2xl rounded border border-green-500/20">
                <Image
                  src={
                    event.thumbnail.includes("/")
                      ? event.thumbnail
                      : `/Logo.png`
                  }
                  alt=""
                  fill
                  className="object-contain items-center justify-center group-focus:opacity-30 transition-all duration-500  group-hover:scale-110 rounded"
                />
                <div className="text-green-500 backdrop-blur-1xl rounded text-center p-1 text-1xl font-extrabold  absolute bottom-2 left-0">
                  {event.title}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <>No upcoming events</>
        )}
      </div>
      <div className="w-full bg-gradient-to-b h-full from-[#00190c]/90 via-green-600/90 to-green-700/90 px-6 max-w-screen">
        <div className="lg:hidden h-full  flex flex-col items-center  my-10 gap-y-2 w-full ">
          <div className="w-full flex flex-row gap-3 h-full">
            {events.length > 0 ? (
              events.slice(0, 4).map((event) => (
                <Link key={event.id} href={`/tickets`} className="w-full ">
                  <div
                    key={event.id}
                    className="flex-1 relative group flex gap-3  p-4 w-full  hover:shadow-2xl rounded border border-green-500/20"
                  >
                    <div className="relative h-[120] w-[150]">
                      <Image
                        src={
                          event.thumbnail.includes("/")
                            ? event.thumbnail
                            : `/Logo.png`
                        }
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex text-black font-bold justify-center items-start flex-col">
                      <div className="flex flex-row gap-2">{event.date}</div>
                      <div className="h-0.5  w-3/4 bg-gradient-to-b from-green-700 via-orange-300/60 to-green-600/90"></div>
                      <div className="text-black font-bold">
                        Next Game:{event.title}
                      </div>
                    </div>
                  </div>{" "}
                </Link>
              ))
            ) : (
              <>No upcoming events</>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nextgame;
