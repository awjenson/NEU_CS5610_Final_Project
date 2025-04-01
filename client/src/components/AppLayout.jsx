import { useAuthUser } from "../security/AuthContext";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function AppLayout() {
  const { user, logout } = useAuthUser();
  const navigate = useNavigate();

  return (
    <div className="grid-container">

      {/* Navigation */}
      <div className="grid-item-nav">
          <Nav />
      </div>

      {/* Main Content */}
      <main className="grid-item-main">

          {/* The <Outlet> renders the current route selected */}
          <Outlet />

      </main>

      {/* Footer */}
      <div className="grid-item-footer">
          <Footer />
      </div>

    </div>
  );
}
