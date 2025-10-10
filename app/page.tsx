import Hero from "@/components/Hero";
import History from "@/components/History";
import News from "@/components/News";
import Nextgame from "@/components/Nextgame";
import Players from "@/components/Players";
import Store from "@/components/Store";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-screen  flex-col items-center ">
      <Hero />
      <Nextgame />
      <News />
      <Players />

      <Store />
      <History />
    </main>
  );
}
