import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "admin_session";

const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

const PBKDF2_KEY_LENGTH = 32;
const PBKDF2_DIGEST = "sha256";

type SessionPayload = {
  username: string;
  expiresAt: number;
  token: string;
};

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is missing from environment variables.`
    );
  }

  return value;
}

/**
 * Hash password using PBKDF2.
 */
function hashPassword(
  password: string,
  salt: string,
  iterations: number
): Buffer {
  return crypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    PBKDF2_KEY_LENGTH,
    PBKDF2_DIGEST
  );
}

/**
 * Verify a password against the stored hash.
 */
function verifyPassword(
  password: string,
  storedHash: string
): boolean {
  try {
    const parts = storedHash.split(":");

    if (parts.length !== 3) {
      return false;
    }

    const iterations = Number(parts[0]);
    const salt = parts[1];
    const storedHashHex = parts[2];

    if (
      !iterations ||
      !salt ||
      !storedHashHex
    ) {
      return false;
    }

    const derivedHash = hashPassword(
      password,
      salt,
      iterations
    );

    const storedBuffer = Buffer.from(
      storedHashHex,
      "hex"
    );

    if (
      derivedHash.length !== storedBuffer.length
    ) {
      return false;
    }

    return crypto.timingSafeEqual(
      derivedHash,
      storedBuffer
    );
  } catch {
    return false;
  }
}

/**
 * Create a cryptographically secure session token.
 */
function createSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create an HMAC signature.
 */
function signPayload(payload: string): string {
  const secret = getEnv("ADMIN_SESSION_SECRET");

  return crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
}

/**
 * Create a signed session value.
 */
function createSessionValue(
  username: string
): string {
  const expiresAt =
    Math.floor(Date.now() / 1000) +
    SESSION_DURATION;

  const token = createSessionToken();

  const payload: SessionPayload = {
    username,
    expiresAt,
    token,
  };

  const encodedPayload = Buffer.from(
    JSON.stringify(payload)
  ).toString("base64url");

  const signature =
    signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

/**
 * Verify the session cookie.
 */
function verifySessionValue(
  value: string
): SessionPayload | null {
  try {
    const [encodedPayload, signature] =
      value.split(".");

    if (!encodedPayload || !signature) {
      return null;
    }

    const expectedSignature =
      signPayload(encodedPayload);

    const signatureBuffer = Buffer.from(
      signature,
      "hex"
    );

    const expectedBuffer = Buffer.from(
      expectedSignature,
      "hex"
    );

    if (
      signatureBuffer.length !==
      expectedBuffer.length
    ) {
      return null;
    }

    if (
      !crypto.timingSafeEqual(
        signatureBuffer,
        expectedBuffer
      )
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(
        encodedPayload,
        "base64url"
      ).toString("utf8")
    ) as SessionPayload;

    if (
      !payload.username ||
      !payload.token ||
      !payload.expiresAt
    ) {
      return null;
    }

    if (
      payload.expiresAt <
      Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Login admin.
 */
export async function setAdminSession(
  username: string,
  password: string
): Promise<boolean> {
  const adminUsername =
    getEnv("ADMIN_USERNAME");

  const passwordHash =
    getEnv("ADMIN_PASSWORD_HASH");

  if (username !== adminUsername) {
    return false;
  }

  const validPassword =
    verifyPassword(
      password,
      passwordHash
    );

  if (!validPassword) {
    return false;
  }

  const sessionValue =
    createSessionValue(username);

  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE,
    sessionValue,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION,
    }
  );

  return true;
}

/**
 * Get current admin session.
 */
export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();

  const sessionCookie =
    cookieStore.get(SESSION_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  const session =
    verifySessionValue(
      sessionCookie.value
    );

  if (!session) {
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  if (
    session.username !==
    getEnv("ADMIN_USERNAME")
  ) {
    cookieStore.delete(SESSION_COOKIE);
    return null;
  }

  return session;
}

/**
 * Require authentication.
 */
export async function requireAdmin() {
  const session =
    await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

/**
 * Logout admin.
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();

  // Match the path used when the session was created so every admin route
  // immediately receives the expired cookie after signing out.
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
