import { Outlet, useLoaderData, useNavigate, useRouteLoaderData } from "react-router";
import { signOut } from "~/lib/auth-client";

export const loader = async () => {
    return { Val: "Hello mother" }
}

export default function Page() {
    const { session } = useRouteLoaderData('routes/_protected')
    const navigate = useNavigate();
    return (
        <main>
            <h1 className="font-title text-4xl">Profile Page </h1>
            {session && <p>Client Signed in as {session.user.name}</p>}
            <button className="p-4 hover:bg-black/10" onClick={() => {
                signOut()
                navigate('/')
            }}>
                Sign Out
            </button>
            <Outlet />
        </main>
    );
}
