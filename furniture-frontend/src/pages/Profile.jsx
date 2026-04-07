import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user)
    return (
      <h3 style={{ textAlign: "center", marginTop: "40px" }}>
        Please login
      </h3>
    );

  return (
    <section
      style={{
        padding: "60px 0",
        backgroundColor: "#f8f9fa",
        minHeight: "70vh",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontSize: "28px",
            color: "#222",
            borderBottom: "2px solid #e63946",
            paddingBottom: "10px",
          }}
        >
          My Profile
        </h2>

        <p style={{ fontSize: "18px", marginBottom: "15px", color: "#333" }}>
          <strong style={{ color: "#555" }}>Name:</strong> {user.name}
        </p>

        <p style={{ fontSize: "18px", marginBottom: "15px", color: "#333" }}>
          <strong style={{ color: "#555" }}>Email:</strong> {user.email}
        </p>

        <p style={{ fontSize: "18px", color: "#333" }}>
          <strong style={{ color: "#555" }}>Role:</strong>{" "}
          <span
            style={{
              background: "#eaf4ff",
              color: "#5639e6",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {user.role}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Profile;
