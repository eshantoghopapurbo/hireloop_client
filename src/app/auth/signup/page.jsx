
"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  TextField,
  InputGroup,
  Button,
  Label
} from "@heroui/react";

import {Description, Radio, RadioGroup} from "@heroui/react";

import { Eye, EyeSlash, Person, Envelope, ShieldCheck } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";   // এটা ঠিক আছে
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"seeker",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
  setFormData((prev) => ({ ...prev, role: value }));
  console.log("Selected role:", value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Form Data:", formData);
      const { data, error: authError } = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role:formData.role,
        callbackURL:"/dashboard/recruiter" ,
      });   
      console.log(data);

      if (authError) {
        setError(authError.message || "Signup failed.");
        return;
      }

      setSuccess("Account created successfully! Check your email.");
      setFormData({ name: "", email: "", password: "", role: "" });

    } catch (err) {
      console.error("Signup Error:", err);
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
            Create an Account
          </h1>
          <p className="text-small text-zinc-500 dark:text-zinc-400">
            Sign up to get started
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <TextField>
            <Label>Full Name</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Person className="text-xl text-zinc-400" />
              </InputGroup.Prefix>
              <InputGroup.Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-zinc-900 dark:text-zinc-50 bg-transparent w-full focus:outline-none"
              />
            </InputGroup>
          </TextField>

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
                onChange={handleInputChange}
                className="text-zinc-900 dark:text-zinc-50 bg-transparent w-full focus:outline-none"
              />
            </InputGroup>
          </TextField>

          {/* Password */}
          <TextField>
            <Label>Password</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <ShieldCheck className="text-xl text-zinc-400" />
              </InputGroup.Prefix>
              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
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
           <div className="flex flex-col gap-4">
      <Label className="text-white">Subscription plan</Label>
      <RadioGroup defaultValue="seeker" name="role" orientation="horizontal" onChange={handleRoleChange}> 
        <Radio value="seeker">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
          <Radio.Content>
         <Label className="text-white">job seeker</Label>
          </Radio.Content>
        </Radio>
        <Radio value="recruiter">
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
             <Radio.Content>
          <Label className="text-white" >Recruiter</Label>
          </Radio.Content>        
        </Radio>
      </RadioGroup>
    </div>

          {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-xl">{error}</div>}
          {success && <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-950/30 rounded-xl">{success}</div>}

          <Button
            type="submit"
            color="primary"
            className="w-full font-semibold"
            isLoading={isLoading}
          >
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center text-small text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}