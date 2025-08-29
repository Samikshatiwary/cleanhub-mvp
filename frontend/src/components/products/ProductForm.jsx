import React, { useState } from "react";

const ProductForm = ({ initial = { name: "", price: "", category: "" }, onSubmit, submitting }) => {
  const [form, setForm] = useState(initial);
  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, price: Number(form.price) });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-sm">Name</label>
        <input name="name" value={form.name} onChange={change}
          className="w-full mt-1 rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
      </div>
      <div>
        <label className="text-sm">Price</label>
        <input name="price" type="number" value={form.price} onChange={change}
          className="w-full mt-1 rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
      </div>
      <div>
        <label className="text-sm">Category</label>
        <input name="category" value={form.category} onChange={change}
          className="w-full mt-1 rounded-md border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
      </div>
      <button
        disabled={submitting}
        className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700"
      >
        {submitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ProductForm;