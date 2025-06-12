import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema"; // Ensure this file exists and exports these correctly
import { useUserStore } from "@/store/useUserStore"; // Ensure this store provides 'signup' and 'loading' correctly
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react"; // Ensure 'lucide-react' is installed and imported correctly
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    // Explicitly type the event for clarity
    e.preventDefault();

    // Form validation check using userSignupSchema
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }

    // Calling the signup API
    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">OrderEase</h1>
        </div>

        {/* Full Name Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1" // Ensure Tailwind CSS is configured correctly
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.fullname && (
              <span className="text-xs text-red-500">{errors.fullname}</span>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        {/* Contact Input */}
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors.contact && (
              <span className="text-xs text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-10">
          {loading ? (
            <Button
              disabled
              className="w-full bg-orange-500 hover:bg-orange-400 hover:border-red-500" // Remove extra spaces for consistency
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full  bg-orange-500 hover:bg-orange-400 hover:border-red-500 "
            >
              Signup
            </Button>
          )}
        </div>

        <Separator />

        {/* Login Link */}
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
