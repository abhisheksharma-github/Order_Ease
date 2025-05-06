import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const loading = false;
  return (
    <div className="flex items-center justify-center ">
      <form className="flex flex-col gap-4 md:border md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2 mr-2">Reset Password</h1>
          <p className="text-sm text-gray-400 pt-1">Enter your new password</p>
        </div>
        <div className="relative mb-1">
          <Input
            type="password"
            value={newPassword}
            placeholder="New Password"
            name="password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-10 py-5 border border-gray-300 rounded-lg w-full"
          />
          <LockKeyhole className="absolute inset-y-0 left-3 w-5 h-5 text-gray-600 my-auto pointer-events-none" />
        </div>
        {loading ? (
          <button
            className="w-full bg-orange-500 hover:bg-orange-400 hover:border-red-500 text-white text-lg flex items-center justify-center"
            disabled
          >
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            Please wait...
          </button>
        ) : (
          <button className="w-full bg-orange-500 hover:bg-orange-400 text-white text-lg flex items-center justify-center hover:border-rose-500">
            Password Reset
          </button>
        )}
        <span className="mt-1">
          Back to{" "}
          <Link to="/login" className="text-blue-400">
            Login Page
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
