import { auth } from "@/auth";
import { headers } from "next/headers";

const Home = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        return (
            <div className="flex flex-1 justify-center items-center grow p-8">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-7xl text-slate-900 dark:text-slate-100">Hello {session?.user?.name}</h1>
                    <p className="text-slate-600 dark:text-slate-400">You are logged in as {session?.user?.email}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 justify-center items-center grow p-8 hscren">
            <p className="text-7xl text-slate-900 dark:text-slate-100">You are not logged in ...</p>
        </div>
    );
};

export default Home;
