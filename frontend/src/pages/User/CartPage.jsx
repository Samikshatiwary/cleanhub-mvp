import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, setCart, removeFromCart, updateQty, clearCart } from "../../utils/storage";
import { formatINR } from "../../utils/formatDate"; 

export default function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => { setItems(getCart()); }, []);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + Number(it.price) * Number(it.qty), 0),
    [items]
  );

  const changeQty = (id, qty) => {
    const next = updateQty(id, qty);
    setItems(next);
  };

  const remove = (id) => {
    const next = removeFromCart(id);
    setItems(next);
  };

  if (!items.length) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-center space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
        <Link to="/user/products" className="inline-block px-4 py-2 rounded bg-blue-600 text-white">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((it) => (
            <div key={it._id} className="flex items-center gap-4 rounded-lg border dark:border-gray-800 p-3 bg-white dark:bg-gray-900">
              <div className="w-20 h-20 rounded bg-gray-100 dark:bg-gray-800" />
              <div className="flex-1">
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-gray-500">{it.category}</div>
                <div className="mt-1 font-bold">{formatINR(it.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => changeQty(it._id, Math.max(1, it.qty - 1))} className="px-2 py-1 rounded border">-</button>
                <input
                  value={it.qty}
                  onChange={(e) => {
                    const v = Math.max(1, Number(e.target.value || 1));
                    changeQty(it._id, v);
                  }}
                  className="w-12 text-center rounded border"
                  type="number"
                  min={1}
                />
                <button onClick={() => changeQty(it._id, it.qty + 1)} className="px-2 py-1 rounded border">+</button>
              </div>
              <button onClick={() => remove(it._id)} className="ml-3 px-3 py-1 rounded bg-red-500 text-white">Remove</button>
            </div>
          ))}
          <button onClick={() => { clearCart(); setItems([]); }} className="text-sm text-red-600 underline">
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className="rounded-lg border dark:border-gray-800 p-4 bg-white dark:bg-gray-900 h-fit">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr className="my-3 border-gray-200 dark:border-gray-800" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <button
            onClick={() => navigate("/user/checkout")}
            className="mt-4 w-full rounded bg-green-600 text-white py-2 hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}