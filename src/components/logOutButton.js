"use client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "@/utils/authActions";
function LogOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogOut() {
    setLoading(true);
    try {
      const {error} = await LogOut();
      if(error)
      {
        throw error;
      }
       toast("Success", {
        description: "LoggedOut  successfully!",
      });
       router.push("/");
    } catch (err) {
      if (err.message) {
        toast("Error", {
          description: err.message,
        });
      } else {
        toast("Error", {
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    }finally{
        setLoading(false);
    }
  }
  return (
    <Button
      onClick={handleLogOut}
      disabled={loading}
      className={`flex items-center justify-center px-4 py-2 w-20 rounded 
    bg-gray-800 text-white border border-gray-800 hover:border-gray-500
    dark:bg-gray-700 dark:text-white dark:border-white dark:hover:border-gray-400 
    ${loading ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
    >
      {loading ? <Loader2 className="mr-2 h-4 w-20 animate-spin" /> : "LogOut"}
    </Button>
  );
}

export default LogOutButton;
