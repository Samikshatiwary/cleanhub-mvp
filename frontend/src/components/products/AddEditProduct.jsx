import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import productService from "../../services/productService";

const empty = {
  name: "",
  price: "",
  category: "",
  stock: "",
  description: "",
  featured: false,
};

export default function AddEditProduct() {
  const { id } = useParams(); 
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    productService
      .getProduct(id)
      .then((res) => {
        const data = res?.data || res || {};
        setForm({
          name: data.name || "",
          price: data.price ?? "",
          category: data.category || "",
          stock: data.stock ?? "",
          description: data.description || "",
          featured: !!data.featured,
        });
        setPreview(data.imageUrl || null);
      })
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  
  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) return "Enter valid price";
    if (!form.category.trim()) return "Category required";
    return null;
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return toast.error("Please upload an image");
    setImageFile(f);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);

    const payload = new FormData();
    payload.append("name", form.name.trim());
    payload.append("price", Number(form.price));
    payload.append("category", form.category.trim());
    payload.append("stock", form.stock ? Number(form.stock) : 0);
    payload.append("description", form.description || "");
    payload.append("featured", form.featured ? "true" : "false");
    if (imageFile) payload.append("image", imageFile); 

    try {
      setLoading(true);
      if (isEdit) {
        await productService.updateProduct(id, payload); 
        toast.success("Product updated");
      } else {
        await productService.createProduct(payload); 
        toast.success("Product created");
      }
      navigate("/admin/products"); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg glass border dark:border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-gray-900 dark:border-gray-700"
              placeholder="Product name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Price (INR)</label>
            <input
              name="price"
              value={form.price}
              onChange={onChange}
              type="number"
              step="0.01"
              className="w-full mt-1 p-2 rounded-lg border dark:bg-gray-900 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={onChange}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-gray-900 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Stock</label>
            <input
              name="stock"
              value={form.stock}
              onChange={onChange}
              type="number"
              className="w-full mt-1 p-2 rounded-lg border dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>

        
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="w-full mt-1 p-2 rounded-lg border dark:bg-gray-900 dark:border-gray-700"
            rows={4}
          />
        </div>

        
        <div className="flex items-start gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">Image</label>
            <input type="file" accept="image/*" onChange={onFile} />
            <div className="mt-3">
              {preview ? (
                <img src={preview} alt="preview" className="w-36 h-36 object-cover rounded-md shadow" />
              ) : (
                <div className="w-36 h-36 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-sm">
                  No image
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="featured" checked={form.featured} onChange={onChange} />
              <span>Featured</span>
            </label>
            <p className="text-xs text-gray-500 mt-2">Recommended size: 800x800. PNG/JPG. Max 2MB.</p>
          </div>
        </div>

      
        <div className="flex items-center gap-3">
          <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">
            {loading ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded border">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}