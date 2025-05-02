// components/NotificationBell.tsx
'use client'
import { useEffect, useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import Pusher from 'pusher-js';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  const pusherkey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY || '';
  const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || '';
  useEffect(() => {
    // Connect to Pusher (assumes global config or import)
    const pusher = new Pusher(pusherkey, {
      cluster:cluster,
    });

    pusher.connection.bind('connected', () => {
      console.log('Pusher connected!');
    });
    const channel = pusher.subscribe('real-estate-channel');
    channel.bind('new-notification', (data: Notification) => {
      setNotifications(prev => [data, ...prev]);
      setHasNew(true);

      // Optional: Save to backend for history
      fetch('/api/pusher/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    });
    return () => {
      pusher.unsubscribe('real-estate-channel');
    };
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
    setHasNew(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleDropdown} className="relative">
        <BellIcon className="w-6 h-6 text-gray-700" />
        {hasNew && <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2" />}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2 text-sm font-semibold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-3 border-b hover:bg-gray-50">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-gray-600">{n.message}</div>
                <div className="text-xs text-gray-400">{new Date(n.timestamp).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
