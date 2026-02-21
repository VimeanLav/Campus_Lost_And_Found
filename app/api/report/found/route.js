import LostItem from '../../../../models/LostAndFoundItem';
import dbConnect from '../../../../lib/mongodb';

export async function GET(request) {
  await dbConnect();
  const { search, category } = Object.fromEntries(new URL(request.url).searchParams);
  let filter = { status: 'lost' };
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }
  if (category) {
    filter.category = category;
  }
  try {
    const items = await LostItem.find(filter);
    return Response.json(items);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch items' }), { status: 500 });
  }
}
