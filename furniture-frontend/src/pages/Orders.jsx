import { useState, useEffect } from "react";
import { getOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    getOrders()
      .then((res) => {
        const data = res?.data;
        if (Array.isArray(data)) setOrders(data);
        else if (data?.data && Array.isArray(data.data)) setOrders(data.data);
      })
      .catch((err) => {
        if (mounted) {
          setError(err?.response?.data?.message || "Failed to load orders.");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <section className="layout_padding">
        <div className="container">
          <h2>My Orders</h2>
          <p className="text-muted">Loading orders...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="layout_padding">
        <div className="container">
          <h2>My Orders</h2>
          <div className="alert alert-danger">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="layout_padding">
      <div className="container">
        <h2 className="mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-muted">No orders yet.</p>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div key={order.orderId} className="col-12">
                <div className="card border rounded-3 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                      <div>
                        <h5 className="card-title mb-1">Order #{order.orderId}</h5>
                        <p className="card-text text-muted mb-0 small">
                          Total: ₹{Number(order.totalAmount).toLocaleString()} ·{" "}
                          {order.paymentStatus}
                        </p>
                        {order.orderDate && (
                          <p className="card-text text-muted mb-0 small">
                            Placed on:{" "}
                            {(() => {
                              const dt = new Date(order.orderDate);
                              if (Number.isNaN(dt.getTime())) return order.orderDate;
                              return dt.toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            })()}
                          </p>
                        )}
                      </div>
                      <span className="badge bg-success">{order.paymentStatus}</span>
                    </div>

                    {Array.isArray(order.items) && order.items.length > 0 && (
                      <div className="table-responsive">
                        <table className="table align-middle mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Product</th>
                              <th scope="col" className="text-center">
                                Qty
                              </th>
                              <th scope="col" className="text-end">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item) => (
                              <tr key={`${order.orderId}-${item.productId}`}>
                                <td>
                                  <div className="d-flex align-items-center gap-2">
                                    <div className="order-product-thumb">
                                      <img
                                        src={
                                          item.imageUrl ||
                                          "/assests/images/products/sofa-1.jpg"
                                        }
                                        alt={item.productName}
                                        loading="lazy"
                                      />
                                    </div>
                                    <div>
                                      <div className="fw-semibold">
                                        {item.productName}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-end">
                                  ₹{Number(item.price).toLocaleString("en-IN")}
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
