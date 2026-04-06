import { NextRequest, NextResponse } from 'next/server'
import { CustomerController } from '@/controllers/CustomerController';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const result = await CustomerController.getAll(searchParams);

  return NextResponse.json(result.body, { status: result.status });
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const result = await CustomerController.create(body);

  return NextResponse.json(result.body, { status: result.status });
};