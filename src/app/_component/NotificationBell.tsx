// components/NotificationBell.tsx
"use client";
import { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getNotification } from "@/redux/slices/userSlice";

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

  const { data } = useSelector((state: RootState) => state.user.user);
  const userId = data?._id as string;
  const pusherkey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "";
  const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || "";

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userId) return;
    // Connect to Pusher (assumes global config or import)
    const pusher = new Pusher(pusherkey, {
      cluster: cluster,
    });

    pusher.connection.bind("connected", () => {
      console.log("Pusher connected!");
    });
    const channel = pusher.subscribe(userId);
    channel.bind("new-notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setHasNew(true);
    });
    return () => {
      pusher.unsubscribe(userId);
    };
    // eslint-disable-next-line
  }, [userId, pusherkey, cluster]);

  const toggleDropdown = () => {
    setOpen(!open);
    setHasNew(false);
  };

  useEffect(() => {
    dispatch(getNotification()).unwrap();
    // eslint-disable-next-line
  }, [dispatch]);

  const notification = useSelector(
    (state: RootState) => state.user.notification
  );

  return (
    <div className="relative inline-block">
      <button onClick={toggleDropdown} className="relative">
        <BellIcon className="w-6 h-6 text-gray-700" />
        {hasNew && (
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2 text-sm font-semibold border-b">
            Notifications
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm">No notifications</div>
          ) : (
            notifications.map((n, k) => (
              <div key={k} className="p-3 border-b hover:bg-gray-50">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-gray-600">{n.message}</div>
                <div className="text-xs text-gray-400">
                  {new Date(n.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
