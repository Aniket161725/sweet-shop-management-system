const isAdmin = (user) => user.role === "admin";

export const adminOnly = (req, res, next) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
