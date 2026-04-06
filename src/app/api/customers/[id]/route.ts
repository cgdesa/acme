
import { NextRequest, NextResponse } from 'next/server'
import { CustomerController } from '@/controllers/CustomerController';

type RouteParams = {
  params: Promise<{ id: string }>
};

export async function GET(resquest: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const result = await CustomerController.getById(id);

  return NextResponse.json(result.body, { status: result.status });
};

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const body = await request.json()

  const { id } = await params;

  const result = await CustomerController.update(id, body);

  return NextResponse.json(result.body, { status: result.status });
};

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const result = await CustomerController.remove(id);

  return NextResponse.json(result.body, { status: result.status });
};
