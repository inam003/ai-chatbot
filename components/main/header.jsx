"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sparkle, LogOut, User } from "lucide-react";
import { userSession } from "@/lib/utils";
import supabase from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isUser, setIsUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      const user = await userSession();
      setIsUser(user);
    };

    checkUserSession();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign out error", error.message);

    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-sm px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-white cursor-pointer">
          ChatAI
        </Link>
        {isUser ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="secondary">
                <Sparkle className="size-4" />
                <span className="hidden md:inline">Chat with AI</span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="/avatar.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{isUser.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  <Link className="flex items-center" href={"/profile"}>
                    <User className="mr-2 size-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="rounded-lg cursor-pointer"
                >
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="secondary">Get Started</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
