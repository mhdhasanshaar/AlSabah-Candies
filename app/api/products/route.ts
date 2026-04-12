import { NextResponse } from 'next/server';
import { getStoreData, saveStoreData, Product } from '@/lib/store';

export async function GET() {
  const data = getStoreData();
  return NextResponse.json(data.products);
}

export async function POST(request: Request) {
  const newProduct: Product = await request.json();
  const data = getStoreData();
  
  newProduct.id = Date.now().toString();
  data.products.push(newProduct);
  
  saveStoreData(data);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedProduct: Product = await request.json();
  const data = getStoreData();
  
  const index = data.products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    data.products[index] = updatedProduct;
    saveStoreData(data);
    return NextResponse.json(updatedProduct);
  }
  
  return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  
  const data = getStoreData();
  data.products = data.products.filter(p => p.id !== id);
  saveStoreData(data);
  
  return NextResponse.json({ success: true });
}
