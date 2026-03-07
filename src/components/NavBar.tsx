// // import logo from "src/assets/react.svg";

import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router";
import Logo from "/src/assets/logo.jpg";
import { Show, UserButton } from "@clerk/react";

export default function NavBar() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full shadow-lg border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center px-4">
        <div className="container flex h-16 items-center justify-around ">
          <div className="flex items-center gap-2 font-bold text-lg">
            <img src={Logo} className="h-10 w-10 rounded-2xl" />
            <span className="hidden sm:inline-block">SkillMentor</span>
          </div>
          <div className="hidden md:flex items-center justify-center gap-4">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/mentor"}>Mentors</NavLink>
            <NavLink to={"/"}>Services</NavLink>
            <NavLink to={"/"}>About</NavLink>
          </div>
          <div className="flex justify-center gap-5">
            <div className="flex items-center gap-3">

              <Show when="signed-out">
                <Link to={"/login"}>
                  <Button variant={"outline"}>Login</Button>
                </Link>
                <Link to={"/register"}>
                  <Button className="bg-[#4bbeff] hover:bg-[#28adfb]">
                    Signup
                  </Button>
                </Link>
              </Show>

              <Show when='signed-in'>
                <Link to={"/dashboard"}>
                  <Button className="bg-[#4bbeff] hover:bg-[#28adfb]">
                    Dashboard
                  </Button>
                </Link>
              <UserButton/>

              </Show>

            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* --- LOGO --- */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="hidden sm:inline-block">Brand.ai</span>
        </div>

        {/* --- DESKTOP NAV --- */}

        {/* --- RIGHT ACTIONS --- */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="default">Login</Button>

          {/* --- MOBILE NAV (Sheet) --- */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link to="/docs" className="text-lg font-medium">
                  Docs
                </Link>
                <Link to="/pricing" className="text-lg font-medium">
                  Pricing
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Helper sub-component for dropdown items
