export default function CheckoutModal({ data, onClose }) {
  if (!data) return null; // Don't render if there's no data

  const { items, totalAmount } = data;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Order Summary
        </h2>

        {/* Items List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × Ksh {item.price.toLocaleString()}
                </p>
              </div>
              <p className="font-semibold text-gray-700">
                Ksh {item.subtotal.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
          <span>Total:</span>
          <span className="text-green-700">
            Ksh {totalAmount.toLocaleString()}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
