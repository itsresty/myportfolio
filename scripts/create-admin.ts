import crypto from "crypto";
import readline from "readline";

const ITERATIONS = 210_000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";

function askQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .pbkdf2Sync(
      password,
      salt,
      ITERATIONS,
      KEY_LENGTH,
      DIGEST
    )
    .toString("hex");

  return `${ITERATIONS}:${salt}:${hash}`;
}

async function main() {
  console.log("");
  console.log("================================");
  console.log("       CREATE ADMIN ACCOUNT");
  console.log("================================");
  console.log("");

  const username = await askQuestion("Username: ");
  const password = await askQuestion("Password: ");

  if (!username) {
    console.error("Username cannot be empty.");
    process.exit(1);
  }

  if (password.length < 12) {
    console.error(
      "Password must be at least 12 characters long."
    );
    process.exit(1);
  }

  const passwordHash = hashPassword(password);

  const sessionSecret = crypto
    .randomBytes(32)
    .toString("hex");

  console.log("");
  console.log("================================");
  console.log("ADD THESE TO .env.local");
  console.log("================================");
  console.log("");

  console.log(`ADMIN_USERNAME=${username}`);
  console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`);
  console.log(
    `ADMIN_SESSION_SECRET=${sessionSecret}`
  );

  console.log("");
  console.log("Keep these values private.");
  console.log("");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});