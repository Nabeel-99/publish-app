import { auth, signIn, signOut } from "@/auth";
import { LogOut, Plus } from "@deemlol/next-icons";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-12 py-4 bg-white shadow-md">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">Publish App</h1>
        </Link>
        <div className="flex items-center font-bold  gap-6">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <Plus className="sm:hidden size-6" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="hover:text-black/50 cursor-pointer"
                >
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="sm:hidden size-5" />
                </button>
              </form>

              <Link href={`/user/${session?.id}}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <button
                type="submit"
                className="cursor-pointer hover:text-black/50"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
