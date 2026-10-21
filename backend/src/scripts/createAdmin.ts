import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { env } from '../config/env.js';
import User from '../models/User.js';

async function createAdmin() {
  await connectDatabase();

  const email = env.adminEmail.toLowerCase();
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: 'Maison Moya Admin',
      email,
      password: env.adminPassword,
      role: 'admin',
    });
  } else {
    user.role = 'admin';
    user.password = env.adminPassword;
    await user.save();
  }

  console.log(`Admin ready: ${user.email} (${user.role})`);
  await disconnectDatabase();
}

createAdmin().catch((error) => {
  console.error('Unable to create admin user:', error);
  process.exit(1);
});
