"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { googleSignIn } from "@/Oauth/actions/auth";
import {  useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter,useSearchParams } from "next/navigation";
import { signIn,useSession } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router=useRouter();

  const {data:session,update}=useSession();

  const searchParams = useSearchParams()
 
  const callbackUrl = searchParams.get('callbackUrl') || '/'


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      console.log("Signing in with:", { email, password });
  
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // prevent automatic redirect
        callbackUrl
      });
  
      if (result?.error) {
        setError(result.error);
        return;
      }
  
      if (result?.ok) {
        setEmail("");
        setPassword("");
  
        // Optional: force session update before redirect (in case Navbar reads it immediately)
        await update?.();
  
        router.push(callbackUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Error message display */}
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Email input */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Password input */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Submit button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 text-slate-500 animate-spin"/> : "Login"}
              </Button>

              {/* Google sign-in button */}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => googleSignIn()}
                disabled={isLoading}
                type="button"
              >
                Login with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}