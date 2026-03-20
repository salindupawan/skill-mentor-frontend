import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconListDetails,
  IconUser,
} from "@tabler/icons-react";
import Logo from "/src/assets/logo.jpg";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {  useUser } from "@clerk/react";
import { Link } from "react-router";


const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Mentors",
      url: "/admin/mentor",
      icon: IconUser,
    },
    {
      title: "Subjects",
      url: "/admin/subject",
      icon: IconListDetails,
    },
    {
      title: "Bookings",
      url: "/admin/booking",
      icon: IconChartBar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoaded } = useUser();
  // 1. Wait for Clerk to load to avoid undefined errors
  if (!isLoaded || !user) {
    return null; 
  }

  // 2. Map Clerk user data to the format your NavUser component expects
  const userData = {
    name: user.fullName || user.username || "User",
    email: user.primaryEmailAddress?.emailAddress || "",
    avatar: user.imageUrl,
  };

 
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <img src={Logo} className="h-7 w-7 rounded-2xl" />
                <span className="text-base font-semibold">SkillMentor</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {
          user && (
            <NavUser user={userData} />
          )
        }
      </SidebarFooter>
    </Sidebar>
  );
}
