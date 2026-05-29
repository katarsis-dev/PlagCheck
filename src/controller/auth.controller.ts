import { addUsers } from "../repository/userRepository.js";

export const registerController = async (req: any, res: any, next: any) => {
  try {
    await addUsers(req.body.username, req.body.password);

    return res.status(200).json({
      status: "success",
      message: "success add user data",
    });
  } catch (err) {
    return next(err);
  }
};
