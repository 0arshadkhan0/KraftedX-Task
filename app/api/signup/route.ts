import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

let users: { email: string; password: string }[] = [];

const SECRET = 'your_jwt_secret_key'; // Replace with process.env.JWT_SECRET in prod

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  users.push({ email, password });

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });

  return NextResponse.json({ token }, { status: 200 });
}
