import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../../utils/storage";
import toast from "react-hot-toast";
import { formatINR } from "../../utils/formatDate";
import { required, minLen } from "../../utils/validateForm";
import { createOrder } from "../../services/orderServices"; 

export default function Checkout() {
  const navigate = useNavigate();
  const cart = getCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
  });
  const [placing, setPlacing] = useState(false);

  const total = useMemo(
    () => cart.reduce((acc, it) => acc + Number(it.price) * Number(it.qty), 0),
    [cart]
  );

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (required(form.name) || required(form.address) || required(form.city) || minLen(form.pincode, 4)) {
      return toast.error("Please fill shipping details correctly");
    }
    if (!cart.length) return toast.error("Cart is empty");

    const payload = {
      items: cart.map((c) => ({ productId: c._id, qty: c.qty, price: c.price })),
      shipping: { ...form },
      total,
      paymentMethod: form.payment,
    };

    try {
      setPlacing(true);
      await createOrder(payload);                 
      toast.success("Order placed!");
      clearCart();
      navigate("/user/orders");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed");
    } finally {
      setPlacing(false);
    }
  };

  if (!cart.length) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
      <form onSubmit={submit} className="lg:col-span-2 space-y-3 rounded-lg border dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-2">Shipping</h1>

        <div className="grid sm:grid-cols-2 gap-3">
          <input name="name" placeholder="Full name" value={form.name} onChange={update}
            className="rounded border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
          <input name="city" placeholder="City" value={form.city} onChange={update}
            className="rounded border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
        </div>
        <input name="address" placeholder="Address" value={form.address} onChange={update}
          className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
        <input name="pincode" placeholder="PIN code" value={form.pincode} onChange={update}
          className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />

        <div className="mt-3">
          <h2 className="font-semibold mb-2">Payment</h2>
          <div className="flex gap-4 text-sm">
            {["cod", "card", "upi"].map((m) => (
              <label key={m} className="flex items-center gap-2">
                <input type="radio" name="payment" value={m} checked={form.payment === m} onChange={update} />
                <span className="capitalize">{m}</span>
              </label>
            ))}
          </div>
        </div>

        <button disabled={placing} className="mt-4 rounded bg-green-600 text-white px-4 py-2">
          {placing ? "Placing..." : "Place order"}
        </button>
      </form>

      <div className="rounded-lg border dark:border-gray-800 p-4 bg-white dark:bg-gray-900 h-fit">
        <h2 className="font-semibold mb-2">Summary</h2>
        {cart.map((c) => (
          <div key={c._id} className="flex justify-between text-sm py-1">
            <span>{c.name}{c.qty}</span>
            <span>{formatINR(Number(c.price) * Number(c.qty))}</span>
          </div>
        ))}
        <hr className="my-3 border-gray-200 dark:border-gray-800" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatINR(total)}</span>
        </div>
      </div>
    </div>
  );
}