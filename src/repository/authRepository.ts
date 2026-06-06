import client from "../config/db.js";

export const addRefreshToken = async (
  user_id: string,
  refreshToken: string,
) => {
  const expired_at = new Date(
    Date.now() * 7 + 24 + 60 + 60 + 1000,
  ).toISOString();
  return await client.query(
    "INSERT INTO authentications (user_id,token,expires_at) VALUES ($1,$2,$3)",
    [user_id, refreshToken, expired_at],
  );
};

export const checkRefreshToken = async (refreshToken: string) => {
  return await client.query(
    "SELECT * FROM authentications WHERE token = ($1)",
    [refreshToken],
  );
};

export const removeRefreshToken = async (refreshToken: string) => {
  return await client.query("DELETE FROM authentications WHERE token = ($1)", [
    refreshToken,
  ]);
};
