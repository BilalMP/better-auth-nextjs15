import Link from "next/link";
import AuthButton from "./auth-button";
import ModeToggle from "./mode-toggle";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-3 px-10 top-0 left-0 right-0 z-50 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <Link
                href="/"
                className="text-2xl font-bold text-slate-900 dark:text-slate-100"
            >
                Better Auth
            </Link>
            <div className="flex gap-5">
                <ModeToggle />
                <AuthButton />
            </div>
        </nav>
    );
};

export default Navbar;
