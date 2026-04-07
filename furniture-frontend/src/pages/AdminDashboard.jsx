import { useEffect, useMemo, useState } from "react";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../services/productService";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  imageUrl: "",
  category: "",
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadProducts = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res?.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onEdit = (p) => {
    setError("");
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price ?? "",
      stock: p.stock ?? "",
      imageUrl: p.imageUrl || "",
      category: p.category || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl.trim(),
        category: form.category.trim(),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await addProduct(payload);
      }

      onCancelEdit();
      await loadProducts();
    } catch (e2) {
      const msg =
        e2?.response?.data?.message ||
        e2?.response?.data?.error ||
        "Action failed. Ensure you are logged in as ADMIN.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    setError("");
    const ok = window.confirm("Delete this product?");
    if (!ok) return;
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (e) {
      setError(e?.response?.data?.message || "Delete failed. Ensure you are ADMIN.");
    }
  };

  const title = editingId ? `Edit Product #${editingId}` : "Add New Product";

  const categoryOptions = useMemo(() => {
    return Array.from(
      new Set(
        (products || [])
          .map((p) => p.category)
          .filter((c) => typeof c === "string" && c.trim().length > 0)
      )
    ).sort();
  }, [products]);

  return (
    <section className="layout_padding admin_section">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h2 className="mb-0">Admin Dashboard</h2>
          <small className="text-muted">Products: {products.length}</small>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card admin_card mb-4">
          <div className="card-body">
            <h5 className="mb-3">{title}</h5>

            <form onSubmit={onSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Category</label>
                <input
                  className="form-control"
                  list="admin-category-options"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. Sofa"
                  required
                />
                <datalist id="admin-category-options">
                  {categoryOptions.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div className="col-md-3">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  min="0"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                  min="0"
                  required
                />
              </div>

              <div className="col-md-9">
                <label className="form-label">Image URL</label>
                <input
                  className="form-control"
                  value={form.imageUrl}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="/assests/images/products/sofa-1.jpg"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  required
                />
              </div>

              <div className="col-12 d-flex gap-2 flex-wrap">
                <button className="btn1" type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                </button>
                {editingId && (
                  <button className="btn btn-outline-secondary" type="button" onClick={onCancelEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="card admin_card">
          <div className="card-body">
            <h5 className="mb-3">All Products</h5>

            {loading ? (
              <p className="text-muted mb-0">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-muted mb-0">No products found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Stock</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="order-product-thumb">
                              <img
                                src={p.imageUrl || "/assests/images/products/sofa-1.jpg"}
                                alt={p.name}
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <div className="fw-semibold">{p.name}</div>
                              <div className="text-muted small">#{p.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>{p.category || "-"}</td>
                        <td className="text-end">₹{Number(p.price).toLocaleString("en-IN")}</td>
                        <td className="text-end">{p.stock}</td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(p)}>
                              Edit
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
