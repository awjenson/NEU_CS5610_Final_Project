import { useState } from "react";
import { useAuthUser } from "../security/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Login from "./Login";

// LoginPage component
export default function LoginPage() {



  return (
    <main className="login-page">

      <header>
        <h1>Login</h1>
      </header>

      <section>
        <Login />
      </section>

    </main>
  );
}
