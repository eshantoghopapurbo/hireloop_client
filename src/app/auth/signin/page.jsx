"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  TextField,
  InputGroup,
  Button,
  Label
} from "@heroui/react";

import { Eye, EyeSlash, Envelope, ShieldCheck } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client"; // আপনার অথেনটিকেশন ক্লায়েন্ট অনুযায়ী
import { useState } from "react";

export default function SigninPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        return;
      }
      else {
        setSuccess("signed in successfully ! redirecting....");
        // ফর্ম রিসেট করার জন্য এটি ব্যবহার করুন:
        setFormData({
          email: "",
          password: "",
        });

        router.push(redirectTo);
      }


    } catch (err) {
      console.error("Signin Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader className="flex flex-col gap-1 items-center justify-center pb-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome Back
          </h1>
          <p className="text-small text-zinc-500 dark:text-zinc-400">
            Sign in to your Hireloop account
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <TextField>
            <Label>Email</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Envelope className="text-xl text-zinc-400" />
              </InputGroup.Prefix>
              <InputGroup.Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="text-zinc-900 dark:text-zinc-50 bg-transparent w-full focus:outline-none"
              />
            </InputGroup>
          </TextField>

          {/* Password */}
          <TextField>
            <div className="flex justify-between items-center mb-1">
              <Label>Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <InputGroup>
              <InputGroup.Prefix>
                <ShieldCheck className="text-xl text-zinc-400" />
              </InputGroup.Prefix>
              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="text-zinc-900 dark:text-zinc-50 bg-transparent w-full focus:outline-none"
              />
              <InputGroup.Suffix>
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlash className="text-xl text-zinc-400" />
                  ) : (
                    <Eye className="text-xl text-zinc-400" />
                  )}
                </button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>

          {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-xl">{error}</div>}
          {success && <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-950/30 rounded-xl">{success}</div>}

          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-small text-zinc-500 dark:text-zinc-400">
          New too HireLoop?{" "}
          <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-primary hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </Card>
    </div>
  );
}