// components/Tickets.tsx
"use client";
import { TicketEvent } from "@/data/data";
import { purchaseSchema } from "@/data/val";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaTicketAlt,
  FaTimes,
} from "react-icons/fa";

export default function Tickets() {
  /* eslint-disable @typescript-eslint/no-explicit-any */

  const [Events, setEvents] = useState<TicketEvent[]>([]);
  const [query, setQuery] = useState("");
  const [filterCompetition, setFilterCompetition] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"date-asc" | "date-desc" | "price-asc">(
    "date-asc"
  );

  const [selectedEvent, setSelectedEvent] = useState<TicketEvent | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [purchaseQty, setPurchaseQty] = useState<number>(1);
  const [showFaq, setShowFaq] = useState<Record<string, boolean>>({});

  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleQtyChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    try {
      await purchaseSchema.validate({ purchaseQty: value });
      setPurchaseQty(value);
      setError(null); // clear errors
    } catch (err: any) {
      setError(err.message);
    }
  };

  const competitions = useMemo(() => {
    const set = new Set(Events.map((e) => e.competition));
    return ["All", ...Array.from(set)];
  }, [Events]);

  const filtered = useMemo(() => {
    let list = Events.filter((e) =>
      e.title.toLowerCase().includes(query.toLowerCase())
    );

    if (filterCompetition !== "All") {
      list = list.filter((e) => e.competition === filterCompetition);
    }

    if (sortBy === "date-asc") {
      list = list.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    } else if (sortBy === "date-desc") {
      list = list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    } else if (sortBy === "price-asc") {
      // sort by cheapest available tier price
      list = list.sort((a, b) => {
        const aMin = Math.min(...a.tiers.map((t) => t.price));
        const bMin = Math.min(...b.tiers.map((t) => t.price));
        return aMin - bMin;
      });
    }

    return list;
  }, [query, filterCompetition, sortBy, Events]);

  function openPurchase(e: TicketEvent) {
    setSelectedEvent(e);
    setSelectedTier(e.tiers.find((t) => t.available > 0)?.name ?? null);
    setPurchaseQty(1);
  }

  async function confirmPurchase() {
    // placeholder for actual purchase
    try {
      if (!selectedEvent || !selectedTier) return;
      alert(
        `Purchased ${purchaseQty} x ${selectedTier} for ${selectedEvent.title}. (Demo)`
      );
      const data = { selectedEvent, selectedTier, purchaseQty };
      console.log("Purchase data:", data);

      const savedTicket = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          tier: selectedTier,
          quantity: purchaseQty,
        }),
      });
      const res = await savedTicket.json();
      setSucces(res.message);
      setTimeout(() => setSucces(null), 5000);
      console.log("Purchase response:", res.message);
    } catch (error) {
      console.error("Purchase error:", error);
    }

    setSelectedEvent(null);
  }
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
      console.log("Events state updated:", Events);
      // setQuery("G");
    } catch (error) {
      setError("Error fetching tickets");
    } finally {
      setLoading(false); // 3. Set loading to false after fetch
    }
  }
  useEffect(() => {
    getData();
  }, [succes]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 items-center justify-center ">
      <header className="flex flex-col md:flex-row md:items-center text-black md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
            <FaTicketAlt /> Tickets {error && error}
          </h1>
          {succes && (
            <div className=" text-bold rounded-full z-50 top-10 leftt-4 p-3 justify-center items-center bg-green-300 text-green-600">
              {succes}
            </div>
          )}
          <p className="text-black mt-2">
            Browse upcoming matches, pick your seating tier and secure your
            seat.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search matches, opponents..."
              className="pl-10 pr-4 py-2 rounded border w-72 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <FaCalendarAlt className="absolute left-3 top-2.5 text-black" />
          </div>

          <select
            value={filterCompetition}
            onChange={(e) => setFilterCompetition(e.target.value)}
            className="py-2 px-3 rounded border focus:outline-none"
          >
            {competitions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="py-2 px-3 rounded border focus:outline-none"
          >
            <option value="date-asc">Date (soonest)</option>
            <option value="date-desc">Date (latest)</option>
            <option value="price-asc">Price (lowest)</option>
          </select>
        </div>
      </header>
      {loading ? (
        <div className="text-center py-12 text-lg text-green-700">
          Loading events...
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((evt) => {
            const cheapest = Math.min(...evt.tiers.map((t) => t.price));
            const isSoldOut = evt.tiers.every((t) => t.available === 0);
            return (
              <article
                key={evt.id}
                className="rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition relative"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={evt.thumbnail}
                    alt={evt.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-3 bottom-3 bg-white/90 text-black px-3 py-1 rounded text-sm">
                    {evt.venue}
                  </div>
                  {isSoldOut && (
                    <div className="absolute right-3 top-3 bg-red-600 text-white px-3 py-1 rounded text-sm">
                      Sold Out
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="font-bold text-black text-lg">
                        {evt.title}
                      </h3>
                      <p className="text-sm text-black">
                        {new Date(evt.date).toLocaleString(undefined, {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-sm text-black mt-2">
                        {evt.competition}
                      </p>
                    </div>

                    <div className="text-right text-black">
                      <div className="text-sm ">From</div>
                      <div className="text-xl font-extrabold text-green-700">
                        Ksh.{cheapest}
                      </div>
                    </div>
                  </div>

                  {/* <p className="text-sm text-black  mt-3 line-clamp-3">
                  {evt.description}
                </p> */}

                  <div className="mt-4 flex items-baseline-last justify-between gap-3">
                    <div className="flex gap-2">
                      {evt.tiers.slice(0, 2).map((t) => (
                        <div
                          key={t.name}
                          className="text-xs px-2 py-1 bg-gray-100 text-black rounded"
                        >
                          {`${t.name} • Ksh.${t.price}`}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openPurchase(evt)}
                        disabled={isSoldOut}
                        className={`px-3 py-2 rounded-full text-sm font-semibold ${
                          isSoldOut
                            ? "bg-gray-300 text-black "
                            : "bg-green-600  hover:bg-green-700"
                        }`}
                      >
                        {isSoldOut ? "No tickets" : "Buy tickets"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* FAQ */}
      <section className="mt-12 text-black">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            {
              q: "How do I collect my tickets?",
              a: "Tickets are delivered digitally or can be collected at the box office.",
            },
            {
              q: "Can I transfer my ticket?",
              a: "Tickets may be transferable subject to stadium policy.",
            },
            {
              q: "What time do gates open?",
              a: "Gates typically open 90 minutes before kick-off.",
            },
          ].map((f, i) => (
            <div key={i} className="border rounded">
              <button
                onClick={() => setShowFaq((s) => ({ ...s, [i]: !s[i] }))}
                className="w-full text-left px-4 py-3 flex justify-between items-center"
              >
                <span className="font-semibold">{f.q}</span>
                <FaChevronDown
                  className={`transition-transform ${
                    showFaq[i] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showFaq[i] && (
                <div className="px-4 pb-3 text-gray-700">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Purchase Modal */}
      {selectedEvent && (
        <div className="fixed text-black inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Image
                  src={selectedEvent.thumbnail}
                  alt={selectedEvent.title}
                  width={80}
                  height={60}
                  className="object-cover rounded"
                />
                <div>
                  <h3 className="font-bold text-black">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-sm text-black">
                    {new Date(selectedEvent.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                aria-label="Close"
                className="p-2 rounded hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Pick your tier</h4>
                <div className="space-y-2">
                  {selectedEvent.tiers.map((t) => (
                    <label
                      key={t.name}
                      className={`flex text-black items-center justify-between gap-3 border rounded p-3 ${
                        t.available === 0 ? "opacity-50" : ""
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-sm text-black">
                          Ksh.{t.price} • {t.available} available
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="tier"
                        checked={selectedTier === t.name}
                        disabled={t.available === 0}
                        onChange={() => setSelectedTier(t.name)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Quantity & Summary</h4>
                <div className="flex items-center gap-3">
                  <label className="text-sm">Qty</label>
                  <input
                    type="number"
                    className="w-20 border rounded p-2"
                    min={1}
                    max={10}
                    value={purchaseQty}
                    onChange={handleQtyChange}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                <div className="mt-4">
                  <div className="text-sm text-black">Selected</div>
                  <div className="font-bold text-lg">
                    {selectedTier ?? "—"} • Qty: {purchaseQty}
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={confirmPurchase}
                      disabled={!selectedTier}
                      className={`px-4 py-2 rounded ${
                        selectedTier
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      Confirm purchase
                    </button>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="ml-3 px-4 py-2 rounded border"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t text-sm text-black">
              By continuing you agree to the ticketing terms and conditions.
            </div>
          </div>
        </div>
      )}
    </section>
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
}
