import { jwtVerify } from "jose/jwt/verify";
import { cookies } from "next/headers";

if (!process.env.JWT_SECRET) {
  throw new Error(
    "JWT_SECRET environment variable is required and must not be empty.",
  );
}
const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET);

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

// For use in API route handlers (Node runtime) to authorize mutating requests.
export async function getAdminFromCookies(): Promise<AdminTokenPayload | null> {
  const store = await cookies();
  const token = store.get("admin-token")?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
