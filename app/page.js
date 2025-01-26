import Header from "@/components/main/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
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
            <Button size="lg" asChild variant="secondary">
              <Link href="/login">Start Chatting Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
