import { Route, Routes, Link } from "react-router-dom";
import { LocationPage } from "./pages/booking/LocationPage";
import { RoomPage } from "./pages/booking/RoomPage";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/booking/:location" element={<LocationPage />} />
        <Route path="/booking/:location/:room" element={<RoomPage />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
