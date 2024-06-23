import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Clock from "../../components/Clock";
import OverviewBookingItem from "../../components/OverviewBookingItem";
import { IBooking, ILocation, IRoom } from "../../interfaces/BookingInterfaces";
import { useFetch } from "../../hooks/useFetch";

export const LocationPage = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { location } = useParams<{ location: string }>();
  const [currentPage, setCurrentPage] = useState(0);
  const [bookingsPerPage, setBookingsPerPage] = useState(0);
  const [visibleBookings, setVisibleBookings] = useState<IBooking[]>([]);
  const apiPath = `${
    import.meta.env.VITE_BACKEND_BASE_URL
  }/api/v1/bookings/${location}`;
  const locationData = useFetch<ILocation>(apiPath, 30000);

  useEffect(() => {
    setRooms(locationData?.rooms ?? []);
    const loadedBookings = locationData?.rooms.flatMap(
      (room: IRoom) => room.bookings
    );
    setBookings(loadedBookings ?? []);
  }, [locationData, currentPage, bookingsPerPage]);

  useEffect(() => {
    setBookingsPerPage(Math.floor(window.innerHeight / 100) || 1);
  }, []);

  useEffect(() => {
    if (bookingsPerPage > 0) {
      const totalPages = Math.ceil(bookings.length / bookingsPerPage);
      const timer = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      }, 20000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [currentPage, bookings, bookingsPerPage]);

  useEffect(() => {
    const updatedVisibleBookings = bookings
      .sort((a, b) => new Date(a.from).getHours() - new Date(b.from).getHours())
      .slice(
        currentPage * bookingsPerPage,
        (currentPage + 1) * bookingsPerPage
      );
    setVisibleBookings(updatedVisibleBookings);
  }, [bookings, currentPage, bookingsPerPage]);

  return (
    <div id="content" className="bg-black text-white h-screen p-10">
      <div className="flex justify-between mb-5">
        <h1 className="text-4xl font-extrabold">Romoversikt Studiesenteret</h1>
        <Clock className="text-4xl bg-slate-50 text-slate-950 rounded p-4" />
      </div>
      <div>
        <ul>
          {visibleBookings?.map((booking: IBooking, index: number) => (
            <OverviewBookingItem
              key={booking.id}
              index={index}
              booking={booking}
              rooms={rooms}
            />
          ))}
        </ul>
      </div>
      {visibleBookings.length < bookingsPerPage && (
        <div className="p-5 text-center">
          {locationData?.overviewInfoTexts?.map((infoText) => (
            <div key={infoText.id}>
              <h2 className="text-5xl font-bold tracking-wide uppercase my-3">
                {infoText.title}
              </h2>
              <p className="text-2xl">{infoText.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
