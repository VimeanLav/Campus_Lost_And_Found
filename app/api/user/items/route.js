import LostItem from '../../../../models/LostAndFoundItem';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('email');
  if (!userEmail) {
    return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 });
  }
  // Find all items reported by user (regardless of status)
  const lostItems = await LostItem.find({ email: userEmail });
  // Find user ObjectId
  const user = await User.findOne({ email: userEmail });
  let foundItems = [];
  if (user) {
    foundItems = await LostItem.find({ status: 'found', requestedBy: user._id });
  }
  return Response.json({ lostItems, foundItems });
}
