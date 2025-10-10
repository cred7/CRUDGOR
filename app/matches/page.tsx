// components/UpcomingMatches.tsx
import Image from "next/image";

type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string; // ISO string or parseable date
  time: string; // time part or included in date
  venue: string;
  thumbnailUrl: string;
  ticketUrl: string; // link to eTicketing / purchase
};

const UPCOMING: Match[] = [
  {
    id: "sc-braga-2025-10-02",
    homeTeam: "Celtic",
    awayTeam: "SC Braga",
    competition: "UEL",
    date: "2025-10-02",
    time: "17:45",
    venue: "Celtic Park",
    thumbnailUrl: "/FKF.jpg",
    ticketUrl:
      "https://www.eticketing.co.uk/celtic/Events/EventDetails?eventId=someId",
  },
  {
    id: "motherwell-2025-10-05",
    homeTeam: "Celtic",
    awayTeam: "Motherwell",
    competition: "Scottish Premiership",
    date: "2025-10-05",
    time: "15:00",
    venue: "Celtic Park",
    thumbnailUrl: "/kit.png",
    ticketUrl:
      "https://www.eticketing.co.uk/celtic/Events/EventDetails?eventId=anotherId",
  },
  // … more matches
];

export default function UpcomingMatches() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h2 className="text-3xl font-bold mb-6">Upcoming Matches</h2>
      <div className="flex w-full flex-col gap-y-3 ">
        {UPCOMING.map((m) => (
          //   <Link key={m.id} href={m.ticketUrl}>
          <a
            key={m.id}
            href={m.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="relative w-1/3 h-40">
              <Image
                src={m.thumbnailUrl}
                alt={`${m.homeTeam} vs ${m.awayTeam}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4 bg-white flex-col  gap-3 items-center">
              <div className="flex items-center gap-3 justify-center p-3">
                <div className="text-sm text-black">{m.competition}</div>
                <h3 className=" text-xl text-black font-semibold">
                  {m.homeTeam} vs {m.awayTeam}
                </h3>
                <p className=" text-black">
                  {new Date(m.date).toLocaleDateString()} • {m.time}
                </p>
                <p className=" text-black">{m.venue}</p>
              </div>
              <div className="mt-4 w-full items-center">
                <button className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">
                  Buy Tickets
                </button>
              </div>
            </div>
          </a>
          //   </Link>
        ))}
      </div>
    </section>
  );
}
