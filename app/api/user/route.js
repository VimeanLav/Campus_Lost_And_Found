import User from '../../../models/User';
import dbConnect from '../../../lib/mongodb';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  if (!email) return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
  const user = await User.findOne({ email });
  if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  return Response.json({ name: user.name, email: user.email, phone: user.phone || '', image: user.image || '' });
}

export async function POST(request) {
  await dbConnect();
  const { email, name, phone, image } = await request.json();
  if (!email) return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { name, phone, image } },
    { new: true }
  );
  if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  return Response.json({ success: true });
}
