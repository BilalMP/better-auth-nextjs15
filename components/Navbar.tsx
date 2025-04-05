import Link from "next/link";
import AuthButton from "./auth-button";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-3 px-10 top-0 left-0 right-0 z-50 bg-slate-100">
            <Link
                href="/"
                className="text-2xl font-bold"
            >
                Better Auth
            </Link>
            <AuthButton />
        </nav>
    );
};

export default Navbar;
