import { registerUser , loginUser } from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
