import React from "react";
import Colors from "../../theme/Colors";
import { Button } from "../../components/ui/button";
import { MoveRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col space-y-4">
      <h1 className="text-[100px] font-bold">404</h1>
      <p>Page not found</p>
      <Button variant={"nest"} size={"lg"} onClick={() => location.href = "/"}>
        <span>Back to home</span>
        <MoveRight />
      </Button>
    </div>
  );
}
