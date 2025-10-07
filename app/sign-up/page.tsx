import SignUpForm from "@/components/sign-up-form";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

const SignUp = async () => {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }

    return <SignUpForm />;
};

export default SignUp;
