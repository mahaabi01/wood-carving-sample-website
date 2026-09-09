import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "omwood-secret-key";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export interface AdminTokenPayload {
  id: string;
  email: string;
  role: string;
}

export async function verifyAdminToken(
  token: string,
): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    if (payload.role !== "ADMIN") return null;
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}
