"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuthWrapper = ({ children }) => {
  return (
    <GoogleOAuthProvider
      clientId={
        "147340775226-mccq9i94sl0qpjr73gboergef8tqqv2q.apps.googleusercontent.com"
      }
    >
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;
