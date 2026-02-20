import dbConnect from '@/lib/mongodb';
import LostItem from '@/models/LostItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  const body = await req.json();
  try {
    const item = await LostItem.create({
      ...body,
      user: session.user.id,
      status: 'lost',
    });
    return new Response(JSON.stringify(item), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const items = await LostItem.find({ status: 'lost' }).populate('user', 'name email');
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
