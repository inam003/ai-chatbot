"use client";

import React, { useEffect, useState } from "react";
import { userSession } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sparkle } from "lucide-react";

const Hero = () => {
  const [isUser, setIsUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      const user = await userSession();
      setIsUser(user);
    };

    checkUserSession();
  }, []);
  return (
    <section className="relative h-screen">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl font-bold mb-6">
            Experience the Future of Conversation
          </h1>
          <p className="text-xl mb-8">
            Engage with our advanced AI chatbot for intelligent, natural
            conversations that adapt to your needs.
          </p>
          {isUser ? (
            <Link href="/chat">
              <Button size="lg" variant="secondary">
                <Sparkle className="size-5" />
                Chat with AI
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
