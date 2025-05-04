import { createResponse } from '@/lib/middleware/error';
import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
  useTLS: true,
});

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method !== 'POST') return createResponse('Method not allowed',false,405);

  const body = await req.json();

  const { title, message, type } = body;

  const notification = {
    id: Date.now().toString(),
    title,
    message,
    timestamp: new Date().toISOString(),
  };

  await pusher.trigger('real-estate-channel', 'new-notification', notification);

  return createResponse('Method not allowed',true,200);
}
