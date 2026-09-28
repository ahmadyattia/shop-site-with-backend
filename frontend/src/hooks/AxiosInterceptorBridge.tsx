// interceptor for requests that return status 401 (unauthorized)
// logs the user out

import React, { useEffect, useRef } from "react";
import { api } from "../server/api";
import { useAuth } from "@/context/AuthContext";

export function AxiosInterceptorBridge({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  // Put the action function into a mutable ref container
  const logoutRef = useRef(logout);

  // Keep the ref updated with the logout hook on every render
  useEffect(() => {
    logoutRef.current = logout;
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        // log out on intercepting status 401
        if (error.response?.status === 401) {
          logoutRef.current();
        }
        return Promise.reject(error);
      },
    );

    // Clean up interceptor if this component unmounts
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return <>{children}</>;
}
