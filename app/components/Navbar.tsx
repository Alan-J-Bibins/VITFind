import { href, NavLink } from "react-router";
import Logo from "./Logo";
import { MdAccountCircle, MdLogin } from "react-icons/md";
import { signIn, useSession } from "~/lib/auth-client";

export default function Navbar() {
    const { data: session } = useSession();
    return (
        <div className="px-4 py-2 border-2 border-black rounded-full shadow-sharp-b w-3/4 bg-red-50 z-50
            flex items-center justify-between hover:translate-y-1 hover:shadow-sharp-br transition-all
            ">
            <NavLink
                to={href("/")}
                className={"ml-2"}
            >
                <Logo />
            </NavLink>
            {!session && (
                <button
                    className="flex items-center justify-center gap-2 px-2 py-1 transition-all border-2 border-transparent rounded-full
                    hover:bg-orange-200 hover:border-black active:bg-orange-200 active:border-black"
                    onClick={() => signIn.social({
                        provider: "google",
                        callbackURL: "/",
                    })}>
                    <MdLogin size={24} />
                    Login
                </button>
            )}
            {session && (
                <NavLink to={href("/profile")} className={"hover:text-lg hover:text-red-800 transition-colors duration-200 p-1"}>
                    <MdAccountCircle size={24} />
                </NavLink>
            )}
        </div>
    )
}

