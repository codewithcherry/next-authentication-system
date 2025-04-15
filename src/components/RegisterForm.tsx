'use client';

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
import { Label } from "@/components/ui/label";
import { googleSignIn} from "@/Oauth/actions/auth";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: ""
  });
  const [registerLoading,setRegisterLoading]=useState(false)

  const router=useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call your registration API
    console.log("Registering with:", { email, password });
    try {
      setRegisterLoading(true);
      const response=await axios.post("/api/register",{email,password},
        {headers:{
          "Content-Type":'application/json'
        }}
      )
      setEmail('');
      setPassword('');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    finally{
      setRegisterLoading(false);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let messages = [];

    // Check length
    if (password.length >= 8) score += 1;
    else messages.push("Password should be at least 8 characters long");

    // Check for numbers
    if (/\d/.test(password)) score += 1;
    else messages.push("Add at least one number");

    // Check for special chars
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else messages.push("Add at least one special character");

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) score += 1;
    else messages.push("Add at least one uppercase letter");

    // Determine strength message
    let message = "";
    if (score === 0) message = "Very weak";
    else if (score === 1) message = "Weak";
    else if (score === 2) message = "Moderate";
    else if (score === 3) message = "Strong";
    else message = "Very strong";

    // If there are specific improvement messages, show them
    if (messages.length > 0 && score < 4) {
      message += ` (${messages.join(", ")})`;
    }

    setPasswordStrength({
      score,
      message
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const getStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0: return "text-red-500";
      case 1: return "text-red-500";
      case 2: return "text-yellow-500";
      case 3: return "text-blue-500";
      case 4: return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Company</CardTitle>
          <CardDescription>
            Register with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button variant="outline" className="w-full" onClick={() => googleSignIn()}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {password && (
                    <div className={`text-xs ${getStrengthColor()}`}>
                      Password strength: {passwordStrength.message}
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={passwordStrength.score < 2}>
                 {
                  registerLoading?<Loader2 className="w-4 h-4 text-slate-600 animate-spin"/>:"Register"
                 }
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}