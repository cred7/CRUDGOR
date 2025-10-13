"use client";

import { newsSchema, playerSchema, ticketSchema } from "@/data/val";
import { useEffect, useState } from "react";
import * as Yup from "yup";

// ---------------------------
// ✅ Validation Schemas
// ---------------------------

// ---------------------------
// ✅ Main Component
// ---------------------------
export default function DataInputForms() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Player state
  const [player, setPlayer] = useState({
    number: "",
    name: "",
    nickname: "",
    dateOfBirth: "",
    nationality: "",
    pos: "",
    position: "",
    height: "",
    weight: "",
    bio: "",
    imageUrl: "",
    social: "",
  });
  const [playerErrors, setPlayerErrors] = useState<Record<string, string>>({});

  // News state
  const [news, setNews] = useState({
    title: "",
    date: "",
    excerpt: "",
    imageUrl: "",
    content: "",
  });
  const [newsErrors, setNewsErrors] = useState<Record<string, string>>({});

  // Ticket state
  const [ticket, setTicket] = useState({
    title: "",
    date: "",
    competition: "",
    venue: "",
    thumbnail: "",
    description: "",
    soldOut: "",
    tname: "",
    tprice: 4,
    tavailable: 4,
  });
  const [ticketErrors, setTicketErrors] = useState<Record<string, string>>({});

  const positionOptions: Record<string, string[]> = {
    Goalkeeper: ["Goalkeeper"],
    Defender: ["Right Back", "Center Back", "Left Back"],
    Midfielder: [
      "Defensive Midfielder",
      "Central Midfielder",
      "Attacking Midfielder",
      "Right Midfielder",
      "Left Midfielder",
    ],
    Striker: ["Right Winger", "Left Winger", "Striker", "Center Forward"],
  };

  // ---------------------------
  // ✅ Generic Handlers
  // ---------------------------

  const handleChange =
    (setter: any) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setter((prev: any) => ({ ...prev, [name]: value }));
    };

  const handleBlur =
    (schema: Yup.AnyObjectSchema, data: any, setErrors: any) =>
    async (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name } = e.target;
      try {
        await schema.validateAt(name, data);
        setErrors((prev: any) => ({ ...prev, [name]: "" }));
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          setErrors((prev: any) => ({
            ...prev,
            [name]: err.message.slice(0, 33),
          }));
        }
      }
    };

  const handleSubmit = async (
    label: string,
    data: any,
    schema: Yup.AnyObjectSchema,
    seterror: any
  ) => {
    try {
      await schema.validate(data);
      seterror((prev: any) => ({ ...prev, [label]: "" }));
      const endpointMap: Record<string, string> = {
        Player: "/api/player",
        News: "/api/news",
        Ticket: "/api/createticket",
      };

      const endpoint = endpointMap[label];
      if (!endpoint) throw new Error(`No endpoint found for label: ${label}`);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.log(error, "heloloeleol");
        setError(`Failed to save ${label}: ${errText}`);
        setTimeout(() => setAlertMessage(null), 5000);
      }

      const result = await response.json();
      console.log(`✅ ${label} saved successfully:`, result);
      //   alert(`${label} saved successfully!`);
      setAlertMessage(result.message || `${label} saved successfully!`);
      setTimeout(() => setAlertMessage(null), 5000);
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        seterror((prev: any) => ({
          ...prev,
          [label]: error.message.slice(0, 33),
        }));
      }
      console.error(`🚨 Failed to save ${label}:`, error.message);
      setError(`Failed to save ${label}`);
      setTimeout(() => setError(null), 5000);
    }
  };
  useEffect(() => {
    if (alertMessage) {
      window.location.reload(); // 🔁 reload the whole page
    }
  }, [alertMessage]);
  // ---------------------------
  // ✅ UI
  // ---------------------------

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-black space-y-10">
      {/* PLAYER FORM */}
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">
          Player Data Input
        </h1>
        <form
          onSubmit={(e) => (
            e.preventDefault(),
            handleSubmit("Player", player, playerSchema, setPlayerErrors)
          )}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(player).map((key) => (
              <div key={key}>
                <label htmlFor={key} className="block font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                {playerErrors[key] && (
                  <p className="text-red-600 text-sm mb-1">
                    {playerErrors[key]}
                  </p>
                )}
                {key === "bio" ? (
                  <textarea
                    id={key}
                    name={key}
                    rows={3}
                    value={(player as any)[key]}
                    onChange={handleChange(setPlayer)}
                    onBlur={handleBlur(playerSchema, player, setPlayerErrors)}
                    className="w-full p-2 border rounded-md"
                  />
                ) : key === "pos" ? (
                  <select
                    id={key}
                    name={key}
                    value={player.pos}
                    onChange={handleChange(setPlayer)}
                    onBlur={handleBlur(playerSchema, player, setPlayerErrors)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select position</option>

                    {/* <!-- Goalkeeper --> */}
                    <option value="Goalkeeper">Goalkeeper</option>

                    {/* <!-- Defenders --> */}
                    <option value="Right Back">Right Back (RB)</option>
                    <option value="Center Back">Center Back (CB)</option>
                    <option value="Left Back">Left Back (LB)</option>

                    {/* <!-- Midfielders --> */}
                    <option value="Defensive Midfielder">
                      Defensive Midfielder (CDM)
                    </option>
                    <option value="Central Midfielder">
                      Central Midfielder (CM)
                    </option>
                    <option value="Attacking Midfielder">
                      Attacking Midfielder (CAM)
                    </option>
                    <option value="Right Midfielder">
                      Right Midfielder (RM)
                    </option>
                    <option value="Left Midfielder">
                      Left Midfielder (LM)
                    </option>
                    {/* 
<!-- Forwards --> */}
                    <option value="Right Winger">Right Winger (RW)</option>
                    <option value="Left Winger">Left Winger (LW)</option>
                    <option value="Striker">Striker (ST)</option>
                    <option value="Center Forward">Center Forward (CF)</option>
                  </select>
                ) : key === "position" ? (
                  <select
                    id={key}
                    name={key}
                    value={player.position}
                    onChange={handleChange(setPlayer)}
                    onBlur={handleBlur(playerSchema, player, setPlayerErrors)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select position</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Striker">Striker</option>
                  </select>
                ) : (
                  <input
                    type={key.includes("date") ? "date" : "text"}
                    id={key}
                    name={key}
                    value={(player as any)[key]}
                    onChange={handleChange(setPlayer)}
                    onBlur={handleBlur(playerSchema, player, setPlayerErrors)}
                    className="w-full p-2 border rounded-md"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={Object.values(playerErrors).some((v) => v !== "")}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mt-4${
              Object.values(playerErrors).some((v) => v !== "")
                ? "hover:bg-gray-900 w-full cursor-not-allowed hover:text-black"
                : ""
            }`}
          >
            Save Player
            {Object.values(playerErrors).some((v) => v !== "")
              ? " (Fix errors)"
              : ""}
          </button>
          {alertMessage?.includes("Player") && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded">
              {alertMessage}
            </div>
          )}
          {error?.includes("Player") && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-200 rounded">
              {error}hhhhhhhhhh
            </div>
          )}
        </form>
      </div>

      {/* NEWS FORM */}
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">News Data Input</h1>
        <form
          onSubmit={(e) => (
            e.preventDefault(),
            handleSubmit("News", news, newsSchema, setNewsErrors)
          )}
          className="space-y-4"
        >
          {Object.keys(news).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {newsErrors[key] && (
                <p className="text-red-600 text-sm mb-1">{newsErrors[key]}</p>
              )}
              {key === "content" ? (
                <textarea
                  id={key}
                  name={key}
                  rows={4}
                  value={(news as any)[key]}
                  onChange={handleChange(setNews)}
                  onBlur={handleBlur(newsSchema, news, setNewsErrors)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <input
                  type={key.includes("date") ? "date" : "text"}
                  id={key}
                  name={key}
                  value={(news as any)[key]}
                  onChange={handleChange(setNews)}
                  onBlur={handleBlur(newsSchema, news, setNewsErrors)}
                  className="w-full p-2 border rounded-md"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            Save News
          </button>
          {alertMessage?.includes("News") && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded">
              {alertMessage}
            </div>
          )}
          {error?.includes("News") && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-200 rounded">
              {error}hhhhhhhhhh
            </div>
          )}
        </form>
      </div>

      {/* TICKET FORM */}
      <div>
        <h1 className="text-2xl font-bold text-center mb-6">
          Ticket Event Input
        </h1>
        <form
          onSubmit={(e) => (
            e.preventDefault(),
            handleSubmit("Ticket", ticket, newsSchema, setTicketErrors)
          )}
          className="space-y-4"
        >
          {Object.keys(ticket).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {ticketErrors[key] && (
                <p className="text-red-600 text-sm mb-1">{ticketErrors[key]}</p>
              )}
              <input
                type={key.includes("date") ? "date" : "text"}
                id={key}
                name={key}
                value={(ticket as any)[key]}
                onChange={handleChange(setTicket)}
                onBlur={handleBlur(ticketSchema, ticket, setTicketErrors)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
          >
            Save Ticket
          </button>
          {alertMessage?.includes("Ticket") && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-200 rounded">
              {alertMessage}
            </div>
          )}{" "}
          {error?.includes("Ticket") && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-200 rounded">
              {error}hhhhhhhhhh
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
