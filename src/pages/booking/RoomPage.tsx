import { useParams } from "react-router-dom";
//import { useFetch } from "../../../src/hooks/useFetch";
import Clock from "../../components/Clock";
//import { ILocation } from "../../interfaces/BookingInterfaces";

export const RoomPage = () => {
  const { location, room } = useParams<{ location: string; room: string }>();
  //const apiPath = `http://localhost:3000/bookings/${location}`;
  //const locationData = useFetch<ILocation>(apiPath, 30000);

  return (
    <div>
      {location} - {room}{" "}
      <Clock className="text-4xl bg-slate-50 text-slate-950 rounded p-4" />
    </div>
  );
};
