import MyCourses from "@/components/MyCourses";
import NavBar from "@/components/NavBar";
import { useUser } from "@clerk/react";
import { Navigate } from "react-router";

export default function DashboardPage() {
    const { user } = useUser();

    const userRole = user?.publicMetadata?.roles as string[] || [];
    if(user && userRole.includes("ADMIN")){
      return <Navigate to="/admin" replace />;
    }
  
  return (
    <>
      <NavBar />
      <MyCourses />
    </>
  );
}
