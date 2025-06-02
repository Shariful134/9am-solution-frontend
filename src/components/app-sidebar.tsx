/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
// import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
// import { TeamSwitcher } from "./team-switcher";
// import { NavMain } from "./nav-main";
// import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/auth/authSlice";
import { verifyToken } from "../utils/VerifyToken";
import type { TUser } from "../types/type";
import { useGetUserQuery } from "../redux/auth/authApi";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const { data: userData } = useGetUserQuery(user?._id);
  console.log(user?.userName);
  console.log(userData?.data);
  // This is sample data.

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavUser user={userData?.data} />
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
