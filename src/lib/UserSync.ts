import { useUser, useAuth } from "@clerk/react";
import { useEffect } from "react";

export function UserSync() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      localStorage.removeItem("last_db_sync");
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const lastSync = localStorage.getItem("last_db_sync");
    const oneHour = 60 * 60 * 1000;
    const syncUser = async () => {
      if (user) {

        try {
          const token = await getToken();

          const userData = {
            profileImageUrl: user.imageUrl,
          };


          await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/students`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          });

          console.log("User synced with DB");
        } catch (error) {
          console.error("Failed to sync user:", error);
        }
      }
    };

    if (isLoaded && isSignedIn) {
      console.log(Date.now() - Number(lastSync) > oneHour);
      if (!lastSync || Date.now() - Number(lastSync) > oneHour) {
        syncUser().then(() => {
          localStorage.setItem("last_db_sync", Date.now().toString());
        });
      }
    }
  }, [isLoaded, isSignedIn, user, getToken]);

  return null;
}
