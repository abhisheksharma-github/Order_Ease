import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
  LayoutDashboard,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";
import { useState as reactUseState } from "react";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  return (
    <div className="mx-auto w-full ">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h1 className=" text-black dark:text-white font-bold md:font-extrabold absolute top-0 left-0 m-4 text-2xl">
            OrderEase
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-5 absolute top-0 right-0 mt-4 mr-4">
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-black dark:text-white hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-black dark:text-white hover:text-orange-500"
            >
              Profile
            </Link>
            <Link
              to="/order/status"
              className="text-black dark:text-white hover:text-orange-500"
            >
              Order
            </Link>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="text-black dark:text-white hover:text-orange-500">
                  Dashboard
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem asChild>
                    <Link to="admin/restaurant">Admin Restaurant</Link>
                  </MenubarItem>
                  <MenubarItem asChild>
                    <Link to="/admin/menu">Admin Menu</Link>
                  </MenubarItem>
                  {user?.admin && (
                    <>
                      <MenubarItem asChild>
                        <Link to="/admin/dashboard">Admin Dashboard</Link>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link to="/admin/restaurant">Restaurant Admin</Link>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link to="/admin/menu">Menu Admin</Link>
                      </MenubarItem>
                      <MenubarItem asChild>
                        <Link to="/admin/orders">Order Admin</Link>
                      </MenubarItem>
                    </>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart className="text-black dark:text-white" />
              {cart.length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -top-3 -right-0 bg-red-400 hover:bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center"
                >
                  {cart.length}
                </Button>
              )}
            </Link>
            <div>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
            </div>
            <div>
              {loading ? (
                <Button className="bg-orange-400 hover:bg-orange-500">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    logout();
                    window.location.href = "/login";
                  }}
                  className="bg-orange-400 hover:bg-orange-500"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* Mobile responsive  */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();
  const [showDashboardMenu, setShowDashboardMenu] = reactUseState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 text-black hover:bg-gray-300"
          variant="outline"
        >
          <Menu size={18} />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>OrderEase</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-2" />

        <SheetDescription className="flex-1 space-y-2">
          <Link to="/" className="nav-link flex items-center gap-2">
            <Menu />
            <span>Home</span>
          </Link>

          <Link to="/profile" className="nav-link flex items-center gap-2">
            <User />
            <span>Profile</span>
          </Link>

          <Link to="/order/status" className="nav-link flex items-center gap-2">
            <HandPlatter />
            <span>Orders</span>
          </Link>

          <Link to="/cart" className="nav-link flex items-center gap-2">
            <ShoppingCart />
            <span>Cart ({cart.length})</span>
          </Link>

          {/* Always show Dashboard menu, but only show admin links if user?.admin */}
          <>
            <button
              className="nav-link w-full text-left flex items-center gap-2"
              onClick={() => setShowDashboardMenu(!showDashboardMenu)}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </button>

            {showDashboardMenu && (
              <div className="ml-6 space-y-2">
                {/* Show these links for all users, adjust as needed */}
                <Link
                  to="/admin/restaurant"
                  className="nav-link flex items-center gap-2"
                >
                  <UtensilsCrossed size={16} />
                  <span>Admin Restaurant</span>
                </Link>
                <Link
                  to="/admin/menu"
                  className="nav-link flex items-center gap-2"
                >
                  <SquareMenu size={16} />
                  <span>Admin Menu</span>
                </Link>
                {user?.admin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="nav-link flex items-center gap-2"
                    >
                      <LayoutDashboard size={16} />
                      <span>Admin Dashboard</span>
                    </Link>
                    <Link
                      to="/admin/restaurant"
                      className="nav-link flex items-center gap-2"
                    >
                      <UtensilsCrossed size={16} />
                      <span>Restaurant Admin</span>
                    </Link>
                    <Link
                      to="/admin/menu"
                      className="nav-link flex items-center gap-2"
                    >
                      <SquareMenu size={16} />
                      <span>Menu Admin</span>
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="nav-link flex items-center gap-2"
                    >
                      <PackageCheck size={16} />
                      <span>Order Admin</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </>
        </SheetDescription>

        <SheetFooter className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">OrderEase</h1>
          </div>

          <SheetClose asChild>
            {loading ? (
              <Button className="bg-orange-400 hover:bg-orange-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={() => {
                  logout();
                  window.location.href = "/login";
                }}
                className="bg-orange-400 hover:bg-orange-500"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
