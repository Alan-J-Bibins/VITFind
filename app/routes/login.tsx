import { useSession, signIn, signOut } from "~/lib/auth-client";

export default function Page() {
    const {
        data: session,
        isPending, //loading state
        error, //error object 
        refetch //refetch the session
    } = useSession()
    return (
        <div>
            {!session && (
                <button className="p-4 hover:bg-black/10" onClick={() => {
                    console.log("SIGN IN CLICKED");
                    signIn.social({
                        provider: "google",
                        callbackURL: "/profile",
                        errorCallbackURL: "/",
                    })
                }}>
                    Sign In to Google
                </button>
            )}
            {session && <p>Client Signed in as {session.user.name}</p>}
            <button className="p-4 hover:bg-black/10" onClick={() => signOut()}>
                Sign Out
            </button>
        </div>
    )
}

