import { useUser, useAuth } from "@clerk/react";
import { useEffect, useRef } from "react";

export function UserSync() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const isSyncing = useRef(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      localStorage.removeItem("last_db_sync");
      console.log("db cleared.")
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !isSignedIn || !user || isSyncing.current) return;

      const lastSync = localStorage.getItem("last_db_sync");
      const oneHour = 60 *1000 * 10;
      const now = Date.now();

      // Check if sync is actually needed
      if (lastSync && now - Number(lastSync) < oneHour) {
        return;
      }

      try {
        isSyncing.current = true;
        const token = await getToken({ template: "skill-mentor-backend" });

        const userData = {
          profileImageUrl: user.imageUrl,
        };

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/students`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          },
        );

        if (res.ok) {
          localStorage.setItem("last_db_sync", now.toString());
          console.log("User synced successfully");
        }
      } catch (error) {
        console.error("Failed to sync user:", error);
      }finally{
        isSyncing.current = false;
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user, getToken]);

  return null;
}
