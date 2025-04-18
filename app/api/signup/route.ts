import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users: { email: string; password: string }[] = [];

const SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variable for secret

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ email, password: hashedPassword });

  // Create JWT token
  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token }, { status: 200 });
}
