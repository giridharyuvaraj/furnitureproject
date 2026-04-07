// Check user role
export const isAdmin = (user) => {
  return user?.role === "ADMIN";
};
