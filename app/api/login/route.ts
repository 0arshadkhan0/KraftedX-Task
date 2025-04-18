import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Dummy auth logic — replace this with real DB check later
  if (email === 'admin@example.com' && password === 'password123') {
    const token = 'mock-jwt-token'; // Replace with real JWT later
    return NextResponse.json({ token }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
