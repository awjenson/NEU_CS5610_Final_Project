import { useAuthUser } from "../security/AuthContext";
import { useNavigate, Outlet, Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function AppLayout() {
  const { user, logout } = useAuthUser();
  const navigate = useNavigate();

  return (
    <main className="grid-container">

      {/* Navigation */}
      <section className="grid-item-nav">
          <Nav />
      </section>

      {/* Body Content */}
      <section className="grid-item-body">

          {/* The <Outlet> renders the current route selected */}
          <Outlet />

      </section>

      {/* Footer */}
      <section className="grid-item-footer">
          <Footer />
      </section>

    </main>
  );
}
