import MyCourses from "@/components/MyCourses";
import NavBar from "@/components/NavBar";
import { useAuth } from "@clerk/react";
import { useEffect } from "react";

export default function DashboardPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      if (isLoaded && isSignedIn) {
        try {
          // 2. Fetch the specific template you created for Spring Boot
          const token = await getToken({ template: "skill-mentor-backend" });

          console.log("--- CLERK JWT TOKEN ---");
          console.log(token);
          console.log("-----------------------");
        } catch (err) {
          console.error("Failed to fetch token:", err);
        }
      }
    };
    fetchToken();
  }, [isLoaded, isSignedIn, getToken]);

  return (
    <>
      <NavBar />
      <MyCourses />
    </>
  );
}
