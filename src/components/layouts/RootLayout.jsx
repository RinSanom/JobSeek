import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollIndicator from "../scrollIndicator/scrollIndicator";
import { Toaster } from "react-hot-toast";
import { useNetwork } from "../../context/NetworkContext";
import OfflineNotification from "../OfflineNotification";




export default function RootLayout() {
  const { isOnline } = useNetwork();
  return (
    <div>{!isOnline && <OfflineNotification />}
      <ScrollIndicator/>
      <Navbar />
    <main className={`main-content ${!isOnline ? 'offline' : ''}`}>
    <Outlet />
    </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1c398e', // Match your blue theme
            border: '1px solid #1c398e',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          success: {
            style: {
              background: '#10B981', // Green for success
              color: '#fff',
              border: 'none',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444', // Red for error
              color: '#fff',
              border: 'none',
            },
          },
        }}
      />
    </div>
  );
}
