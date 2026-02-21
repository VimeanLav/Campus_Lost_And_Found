import dbConnect from '@/lib/mongodb';
import LostItem from '@/models/LostItem';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import transporter from '@/lib/email';

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

export async function PATCH(req, context) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Properly unwrap params if it's a Promise
  let params = context.params;
  if (typeof params.then === 'function') {
    params = await params;
  }
  const { id } = params;
  try {
    const item = await LostItem.findById(id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (item.status !== 'lost') {
      return NextResponse.json({ error: 'Item not available for request' }, { status: 400 });
    }
    // Get the user who is requesting
    const requester = await User.findById(session.user.id);
    if (!requester) {
      return NextResponse.json({ error: 'Requester not found' }, { status: 404 });
    }
    item.status = 'requested';
    item.requestedBy = session.user.id;
    await item.save();

    // Send email to requester with owner's contact info
    const ownerEmail = item.email;
    const ownerPhone = item.phone;
    const ownerName = item.title;
    const requesterEmail = requester.email;
    const requesterName = requester.name;

    const mailOptions = {
      from: 'Campus Lost & Found <lav.vimean168@gmail.com>',
      to: requesterEmail,
      subject: 'Contact Information for Requested Lost Item',
      html: `
        <h2>Hi ${requesterName},</h2>
        <p>You have requested the item: <b>${item.title}</b>.</p>
        <p>Please contact the owner using the information below to arrange the return:</p>
        <ul>
          <li><b>Email:</b> ${ownerEmail}</li>
          <li><b>Phone:</b> ${ownerPhone}</li>
        </ul>
        <p>Thank you for using Campus Lost & Found!</p>
      `,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      // Log but do not fail the request if email fails
      console.error('Failed to send request info email:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
