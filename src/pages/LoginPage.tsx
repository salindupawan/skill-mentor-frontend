import { SignIn } from "@clerk/react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
        <SignIn />
    </div>
  )
}
