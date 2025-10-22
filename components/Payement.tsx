import { useState } from "react";

const Payement = ({
  data,
  onCancel,
}: {
  data: {
    eventId: string;
    selectedTier: string;
    purchaseQty: number;
  };
  onCancel?: () => void;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [succes, setSucces] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setError("All fields are required.");
      return;
    }
    try {
      const savedTicket = await fetch("/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: data.eventId,
          tierId: data.selectedTier,
          quantity: data.purchaseQty,
        }),
      });
      const res = await savedTicket.json();
      setSucces(res.message);
      setTimeout(() => setSucces(null), 5000);
      console.log("Purchase response:", res.message);
      setError(null);
    } catch (error) {
      console.error("Purchase error:", error);
    }
  };

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-black text-center">
          Payment Details
        </h2>
        {error && (
          <div className="mb-3 text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        {succes && (
          <div className=" text-bold rounded-full z-50 top-10 leftt-4 p-3 justify-center items-center bg-green-300 text-green-600">
            {succes}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-black mb-1 font-medium">Name</label>
          <input
            type="text"
            className="w-full text-black border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-1 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            className="w-full border text-black rounded px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07XXXXXXXX"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-black mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border  text-black rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 rounded text-black bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payement;
