import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, token, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/jobs" className="font-bold text-lg">
          Job Tracker
        </Link>
        <div className="text-sm flex items-center gap-3">
          {token ? (
            <>
              <span className="text-gray-600">
                Hi, {user?.name || user?.email}
              </span>
              <button className="btn btn-primary " onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary ">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
