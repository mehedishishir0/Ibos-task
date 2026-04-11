"use client";

import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, "Email/User ID is required"),
  password: z.string().min(1, "Password is required"),
});

type FormType = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormType) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res || res.error) {
        toast.error("Incorrect email or password");
        return;
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="mb-6 text-2xl font-bold text-[#334155]">Sign In</h2>

      <Card className="w-full max-w-xl border border-[#E5E7EB] bg-white rounded-2xl">
        <CardHeader />
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-600"
              >
                Email / User ID
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="text"
                    placeholder="Enter your email/User ID"
                    className="h-12 border-[#D1D5DB]"
                  />
                )}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-600"
              >
                Password
              </Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 border-[#D1D5DB] pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400"
                    >
                      {showPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </div>
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-[#334155] font-medium hover:underline"
                  onClick={() => router.push("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-[#6633FF] text-white mt-4 hover:bg-[#5229d1] rounded-2xl text-lg font-medium"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
