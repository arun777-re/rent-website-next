// components/NotificationBell.tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getNotification, readNotification} from "@/redux/slices/userSlice";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Card } from "@radix-ui/themes";
import dayjs from 'dayjs'

interface Notification {
  _id: string;
  title: string;
  message: string;
  timestamp: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notification, setNotification] = useState<Notification[]>([]);

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
    dispatch(getNotification()).unwrap().then((res)=>{
      if(res?.data.length > 0){
setNotification(res?.data)
      }
    });
    // eslint-disable-next-line
  }, [dispatch]);

  // after click set message read
  const handleRead = useCallback((id:string)=>{
    if(id){
      dispatch(readNotification({id:id}))
    }
  },[dispatch])

const liveNotification = [...notifications,...notification];

  return (
    <div className="relative inline-block">
      <button onClick={toggleDropdown} className="relative">
        <IoMdNotificationsOutline className="w-6 h-6 text-gray-700 shadow-md cursor-pointer" />
        {hasNew && (
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[20rem] bg-white border rounded shadow-lg z-50 max-h-[60vh] 
        hide-scrollbar overflow-y-auto">
          <div className="p-2 text-sm font-semibold border-b w-full">
            Notifications
          </div>
          {liveNotification.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm">No notifications</div>
          ) : (
            liveNotification.map((n, k) => (
              <Card key={k} className="p-3 border-b hover:bg-gray-50 drop-shadow-xl cursor-pointer w-[20rem]"
              onClick={()=> handleRead(n?._id)}
              >
                <h4 className="font-semibold text-blue-700/60 pb-2 leading-loose break-words whitespace-normal">{n.title}</h4>
                <p className="text-sm text-gray-600 leading-loose break-words whitespace-normal w-full h-auto">{n.message}</p>
                <div className="text-xs text-gray-400 pt-2">
                {dayjs(n.timestamp).format("YYYY-MM-DD HH:mm")}
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
