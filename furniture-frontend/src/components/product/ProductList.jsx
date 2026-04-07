import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data || []))
      .catch((err) => setError(err?.response?.data?.message || "Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) {
    return (
      <section className="product_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <p className="text-danger">{error}</p>
            <p className="text-muted">Ensure the backend is running on http://localhost:8080</p>
          </div>
        </div>
      </section>
    );
  }

  const trimmedSearch = search.trim().toLowerCase();

  const filteredProducts = (products || []).filter((p) => {
    const name = (p.name || "").toLowerCase();
    const cat = (p.category || "").toLowerCase();

    const matchesSearch =
      !trimmedSearch ||
      name.includes(trimmedSearch) ||
      cat.includes(trimmedSearch);

    const matchesCategory =
      !category || (p.category && p.category.toLowerCase() === category.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const limitedProducts = filteredProducts.slice(0, 20);

  const categoryOptions = Array.from(
    new Set(
      (products || [])
        .map((p) => p.category)
        .filter((c) => typeof c === "string" && c.trim().length > 0)
    )
  ).sort();

  return (
    <section className="product_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            Our <span>Products</span>
          </h2>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mb-2 d-flex align-items-center">
            <small className="text-muted ms-md-auto">
              Showing {limitedProducts.length} of {filteredProducts.length} products
            </small>
          </div>
        </div>

        <div className="row">
          {limitedProducts.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No products available.</p>
            </div>
          ) : (
            limitedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
