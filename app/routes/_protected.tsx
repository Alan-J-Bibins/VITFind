import { Outlet, type LoaderFunctionArgs } from "react-router";
import Navbar from "~/components/Navbar";
import { authenticateSession } from "~/lib/utils.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { session } = await authenticateSession(request);
    return { session }
}

export default function Layout() {
    return (
        <main className="flex flex-col justify-center items-center p-1 gap-4 w-full">
            <Navbar />
            <div className="w-full px-8">
                <Outlet />
            </div>
        </main>
    );
}
