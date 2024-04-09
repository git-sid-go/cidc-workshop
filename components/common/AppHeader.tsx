import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function AppHeader() {
  return (
    <header>
      <nav className="fixed inset-x-0 top-0 p-4 shadow-md backdrop-blur-md flex justify-between">
        <div>
          <SignedIn>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href="/dashboard"
            >
              Home
            </Link>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href="/my-profile"
            >
              My profile
            </Link>
          </SignedIn>

          <SignedOut>
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href="/dashboard"
            >
              Get started
            </Link>
          </SignedOut>
        </div>
        <UserButton afterSignOutUrl="/" />
      </nav>
    </header>
  );
}
