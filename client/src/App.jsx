import { Route, Routes, useNavigate } from "react-router-dom";
//Routes
import PrivateRoute from "./components/routes/PrivateRoute";
import OpenRoute from "./components/routes/OpenRoute";

//Pages
import Login from "./pages/Login";
import Combine from "./components/core/Combine";
import Dashboard from "./components/core/Dashboard";
import RoomForm from "./pages/room/MyRooms";
import Leads from "./pages/room/Leads";
import Home from "./pages/Home";
import Error from "./pages/Error";
import BecomeVendor from "./pages/BecomeVendor";
import Register from "./pages/Register";
import PGRoom from "./pages/room/PGRoom";
import Tifin from "./pages/tifin/Tifin";
import TifinForm from "./pages/tifin/MyKitchen";
import SingleRoom from "./pages/room/SingleRoom";
import SingleTifin from "./pages/SingleTifin";
import Contact from "./pages/Contact";
import TermsAndConditions from "./pages/Term&Condition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor" element={<BecomeVendor />} />
        <Route path="/pg-room" element={<PGRoom />} />
        <Route path="/pg-room/:id" element={<PGRoom />} />
        <Route path="/single-room/:slug" element={<SingleRoom />} />
        <Route path="/tifin/:slug" element={<SingleTifin />} />

        <Route path="/tifin-center" element={<Tifin />} />
        <Route path="/tifin-center/:id" element={<Tifin />} />
        <Route path="/contact-us" element={<Contact />} />
        
        <Route path="/term_condition" element={<TermsAndConditions />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />

        <Route path="*" element={<Error />} />

        <Route
          element={
            <PrivateRoute>
              <Combine />
            </PrivateRoute>
          }
        >
          <Route
            path="/vendor/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/vendor/myroom"
            element={
              <PrivateRoute>
                <RoomForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/vendor/my-kitchen"
            element={
              <PrivateRoute>
                <TifinForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/vendor/leads"
            element={
              <PrivateRoute>
                <Leads />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
