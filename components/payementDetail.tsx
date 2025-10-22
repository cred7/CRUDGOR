import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const PayementDetail = ({
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
  const [succes, setSucces] = useState<string | null>(null);
  const purchaseTicket = async () => {};

  return (
    <div className="fixed  text-black inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="fixed text-black inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3"></div>

            <button
              //   onClick={() => setPayement(null)}
              aria-label="Close"
              className="p-2 rounded hover:bg-gray-100"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            PayementDetail
            <div>Event ID: {data.eventId}</div>
            <div>Selected Tier: {data.selectedTier}</div>
            <div>Purchase Quantity: {data.purchaseQty}</div>
          </div>

          <div className="p-4 border-t text-sm text-black">
            By continuing you agree to the ticketing terms and conditions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayementDetail;
