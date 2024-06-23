import { IBooking, IRoom } from "../interfaces/BookingInterfaces"
import { motion } from "framer-motion";


interface OverviewBookingItemProps {
  index: number;
  booking: IBooking;
  rooms: IRoom[];
}

export default function OverviewBookingItem({
  index,
  booking,
  rooms,
}: OverviewBookingItemProps) {
  function findRoom(rooms: IRoom[], id: number) {
    return rooms.find((room) => room.id === id);
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      key={booking.id}
      className="grid grid-cols-3 mb-1 gap-1 rounded-md text-2xl text-slate-300 tracking-wide"
    >
      <div
        className={`${
          index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
        } p-6 rounded-l-lg font-bold text-slate-200`}
      >
        {booking.id} {booking.description}
      </div>
      {new Date(booking.from).getHours() === 0 &&
      new Date(booking.to).getHours() === 0 ? (
        <div
          className={`${index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"} p-6`}
        >
          Hele dagen
        </div>
      ) : (
        <div
          className={`${index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"} p-6`}
        >
          {new Date(booking.from).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(booking.to).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}

      <div
        className={`${
          index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
        } p-6 rounded-r-lg`}
      >
        {findRoom(rooms, booking.roomId)?.name}
      </div>
    </motion.li>
  );
}
