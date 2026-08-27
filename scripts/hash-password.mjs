import bcrypt from "bcryptjs";

const password = "CHANGE_THIS_PASSWORD";

const hash = await bcrypt.hash(password, 12);

console.log("\nYour password hash:\n");
console.log(hash);
console.log("\n");