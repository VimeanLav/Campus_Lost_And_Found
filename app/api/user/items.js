import LostItem from '../../../models/LostAndFoundItem';
import dbConnect from '../../../lib/mongodb';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('email');
  if (!userEmail) return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
  // Find lost items reported by user
  const lostItems = await LostItem.find({ status: 'lost', email: userEmail });
  // Find found items requested by user
  const foundItems = await LostItem.find({ status: 'found', requestedByEmail: userEmail });
  return Response.json({ lostItems, foundItems });
}
