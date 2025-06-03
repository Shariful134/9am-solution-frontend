/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreditCard, LogOut, UserRoundPen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { useAppDispath } from "../redux/hooks";
import { useNavigate } from "react-router";
import { logout } from "../redux/auth/authSlice";
import type { TCurrentUser } from "../types/type";

export function NavUser({ user }: { user: TCurrentUser }) {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispath();
  const navigate = useNavigate();
  // handleLogout
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  console.log("NavUser: ", user);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gray-100 hover:bg-gray-200"
            >
              <Avatar className="h-8 w-8 rounded-full border-1 border-gray-300">
                <AvatarImage alt={user?.username} />
                <AvatarFallback className="rounded-lg">
                  <UserRoundPen />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">View Profiel</span>
                {/* <span className="truncate font-medium">{user.username}</span> */}
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full border-1 border-gray-300">
                  <AvatarImage alt={user?.username} />
                  <AvatarFallback className="rounded-lg">
                    <UserRoundPen />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user?.shops?.map((shop, index: number) => {
                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => {
                      const cleanShop = shop.toLowerCase().replace(/\s+/g, "");

                      window.location.href = `http://${cleanShop}.localhost:5173`;
                    }}
                  >
                    <CreditCard />
                    {shop}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
