import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // or 'bcrypt' if you want to switch

// In-memory user store (replace with a database in production)
const users: { email: string; password: string }[] = [];

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variable for secret

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  // Hash the password before saving (using bcryptjs or bcrypt)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user with hashed password
  users.push({ email, password: hashedPassword });

  // Create JWT token
  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });

  // Return token in response
  return NextResponse.json({ token }, { status: 200 });
}
