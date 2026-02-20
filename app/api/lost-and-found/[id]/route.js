import dbConnect from '@/lib/mongodb';
import LostItem from '@/models/LostItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

// ...existing code...
  export async function GET(req, context) {
    await dbConnect();
    const params = await context.params;
    const { id } = params;
    console.log("[LostItem API] params:", params);
    console.log("[LostItem API] Fetching item by id:", id);
    try {
      const item = await LostItem.findById(id);
      if (!item) {
        console.log("[LostItem API] Not found for id:", id);
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(item);
    } catch (error) {
      console.log("[LostItem API] Error for id:", id, error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

}

export async function PATCH(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = params;
  try {
    const item = await LostItem.findById(id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (item.status !== 'lost') {
      return NextResponse.json({ error: 'Item not available for request' }, { status: 400 });
    }
    item.status = 'requested';
    item.requestedBy = session.user.id;
    await item.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
