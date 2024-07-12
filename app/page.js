import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";


const font = Poppins({
  subsets: ["latin"],
  weight : ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className="space-y-6 text-center">
          <h1 className={cn("text-6xl font-semibold text-cyan-700 drop-shadow-md",font.className)}>
          🔑Auth
          </h1>
          <p className="text-cyan-600 text-lg">
            A Simple authentication service
          </p>
          <div className="justify-center">
            <LoginButton>
            <Button varient="secondary" size="lg">
              Sign In
            </Button>
            </LoginButton>
          </div>
        </div>
    </main>
  );
}
