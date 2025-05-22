import { ModeToggle } from "./DarkModeToggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { getUser, getUserName } from "@/utils/server";
import { UserCircle, LogOut, ChevronRight, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LogOutButton from "./logOutButton";
export default async function Navbar() {
 const user = await getUser();
let userName;
if (user) {
  userName = await getUserName();
}

  // console.log(user);
  return (
    <div className="relative bg-background border-b w-full px-7">
      <div className="max-w-8xl mx-auto  ">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Heart className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-lg text-foreground">
                Hospital Management
              </span>
            </Link>
          </div>

          {/* User Authentication Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-6">
                <div className="hidden md:block">
                  <span className="text-sm text-foreground/80 ">
                    Welcome, {userName[0].userName}
                  </span>
                </div>

                <LogOutButton />
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href="/auth/signUp" className="flex items-center">
                    Sign Up
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
