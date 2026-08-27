import crypto from "crypto";

export const ADMIN_SESSION_COOKIE =
  "admin_session";

const SESSION_DURATION =
  60 * 60 * 24 * 7; // 7 days

function getSessionSecret() {
  const secret =
    process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not configured."
    );
  }

  return secret;
}

function createSignature(
  value: string
) {
  return crypto
    .createHmac(
      "sha256",
      getSessionSecret()
    )
    .update(value)
    .digest("base64url");
}

export function createAdminToken() {
  const expiresAt =
    Math.floor(Date.now() / 1000) +
    SESSION_DURATION;

  const payload = JSON.stringify({
    role: "admin",
    exp: expiresAt,
  });

  const encodedPayload =
    Buffer.from(payload).toString(
      "base64url"
    );

  const signature =
    createSignature(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(
  token: string
) {
  try {
    const parts = token.split(".");

    if (parts.length !== 2) {
      return false;
    }

    const [
      encodedPayload,
      providedSignature,
    ] = parts;

    const expectedSignature =
      createSignature(
        encodedPayload
      );

    const providedBuffer =
      Buffer.from(
        providedSignature
      );

    const expectedBuffer =
      Buffer.from(
        expectedSignature
      );

    if (
      providedBuffer.length !==
      expectedBuffer.length
    ) {
      return false;
    }

    if (
      !crypto.timingSafeEqual(
        providedBuffer,
        expectedBuffer
      )
    ) {
      return false;
    }

    const payload = JSON.parse(
      Buffer.from(
        encodedPayload,
        "base64url"
      ).toString("utf8")
    );

    if (payload.role !== "admin") {
      return false;
    }

    if (
      typeof payload.exp !== "number"
    ) {
      return false;
    }

    if (
      payload.exp <
      Math.floor(Date.now() / 1000)
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}