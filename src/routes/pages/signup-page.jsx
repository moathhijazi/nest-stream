import { Github, Goal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useToast } from "../../context/sonner";
import { AuthAPI } from "../../api";

import React, { useState } from "react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);

    if (!email || !username || !password) {
      return toast.warning("All fileds are required!");
    }

    try {
      const response = await AuthAPI.register({
        username,
        email,
        password,
        provider: "nest",
      });
      const statusCode = response.data.statusCode;
      setLoading(false);
      if (statusCode == 200) {
        const token = response.data.token;
        localStorage.setItem('accessToken' , token);
        return toast.success(response.data.message[0], {
          closeButton : false,
          onAutoClose: () => {
            window.location.href = "/"
          },
          duration : 1500
        });
      }
      console.log(response.data);
      return toast.warning(response.data.message[0]);
    } catch (e) {
      const errorMessage = e?.response?.data?.message;
      console.log(e?.response?.data);
      setLoading(false);
      return toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col space-y-10 justify-center items-center">
      <h2 className="font-bold sm:text-md md:text-lg lg:text-2xl">
        Welcome to <code className="text-[#f1455f]">nest stream</code> <br />
        Create new account!
      </h2>
      <div className="p-4 bg-[#39393e] rounded-sm sm:w-[50%] md:w-[45%] lg:w-[30%] shadow-md ">
        <p className="text-center text-sm">Continue signing up with</p>
        <div className="flex flex-col w-full mt-6">
          <button className="w-full h-[50px] rounded hover:bg-[#252528] flex justify-start items-center p-2 space-x-12 bg-[#3d3d41]">
            <Goal />
            <span>Google account provider</span>
          </button>
          <div className="w-full border-[.4px] border-[#39393e]"></div>
          <button className="w-full h-[50px] rounded hover:bg-[#252528] flex justify-start items-center p-2 space-x-12 bg-[#3d3d41]">
            <Github />
            <span>Github account provider</span>
          </button>
        </div>
        <div className="w-full border-t-[.4px] border-t-[#dfdfe3] p-2 mt-6 flex justify-center">
          <span className="text-xs bg-[#39393e] p-2 -mt-6">
            Or Continue with
          </span>
        </div>
        <div className="w-full flex flex-col">
          <div className="my-1">
            <Input
              type="email"
              placeholder="Username : john_doe ..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-1">
            <Input
              type="email"
              placeholder="Email : johndoe@example.com ..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-1">
            <Input
              type="password"
              placeholder="Password : ****** ..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="nest"
            size="lg"
            className="w-[120px] mt-4"
            disabled={loading || !email || !password || !username}
            onClick={() => handleSubmit()}
          >
            <span>Sign up</span>
          </Button>
        </div>
      </div>
      <p className="sm:w-[50%] md:w-[45%] lg:w-[30%]">
        <a
          href="/login"
          className="text-[#f1455f] hover:underline cursor-pointer"
        >
          Click here
        </a>{" "}
        if you already have an account
      </p>
    </div>
  );
}
