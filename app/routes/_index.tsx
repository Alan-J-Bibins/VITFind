import { PrismaClient, type Post } from "generated/prisma";
import { MdAdd } from "react-icons/md";
import { Form, href, useLoaderData, type ActionFunctionArgs } from "react-router";
import Dialog, { useDialogClose } from "~/components/Dialog";
import DisplayBox from "~/components/DisplayBox";
import Navbar from "~/components/Navbar";
import SignatureButton from "~/components/SignatureButton";
import { useSession } from "~/lib/auth-client";
import { auth } from "~/lib/auth.server";

export const loader = async () => {
    const prisma = new PrismaClient();
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                author: true,
            },
        })
        return { ok: true, posts }
    } catch (error) {
        console.log(error)
        return { ok: false, error }
    } finally {
        await prisma.$disconnect();
    }
}

export const action = async ({ request }: ActionFunctionArgs) => {
    console.log("Hello motha")
    const formData = await request.formData();
    const itemName = String(formData.get('itemName'));
    const itemDesc = String(formData.get('itemDesc'));
    const prisma = new PrismaClient();
    const session = await auth.api.getSession(request);
    if (!session?.user) {
        return { ok: false, error: "Session not found" }
    }
    try {
        await prisma.post.create({
            data: {
                name: itemName,
                desc: itemDesc,
                userId: session?.user.id
            }
        })
        return { ok: true }
    } catch (error) {
        console.log(error);
        return { ok: false, error }
    } finally {
        await prisma.$disconnect();
    }
}

export default function Page() {
    const names = ["Rolex", "Benz", "Rolce Royce", "Underwear", "Piano", "Mona Lisa"];
    const { data: session } = useSession();
    const { ok, posts } = useLoaderData<typeof loader>();
    console.log(posts);
    return (
        <div className="flex flex-col gap-8 items-center justify-start p-1 min-h-screen">
            <div className="motion-preset-slide-down-lg motion-scale-x-in w-full flex items-center justify-center">
                <Navbar />
            </div>
            <div className="w-full px-4 flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-title text-6xl underline leading-24">Discover what was <span className="text-red-800">lost</span></h1>
                {session && (
                    <Dialog
                        trigger={
                            <>
                                <div className="lg:block hidden">
                                    <SignatureButton>
                                        New <MdAdd size={24} />
                                    </SignatureButton>
                                </div>
                                <div className="lg:hidden block bottom-8 right-8 fixed bg-orange-200 p-2 rounded-full shadow-sharp-br-sm border-2 border-black
                                    active:bg-orange-300 transition-all">
                                    <MdAdd size={24} />
                                </div>
                            </>
                        }
                        title="New Entry"
                    >
                        <Form className="flex flex-col w-full gap-4" action="/?index" method="post">
                            <input name="itemName" placeholder="Enter name of item" className="inp" required />
                            <textarea name="itemDesc" placeholder="Enter item description" className="inp" required />
                            <div className="flex justify-between items-center w-full">
                                <div />
                                <div className='flex items-center justify-center gap-2'>
                                    <button
                                        type="submit"
                                        className="btn2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </Dialog>
                )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 px-2 lg:px-8 gap-4 w-full justify-items-center ">
                {posts?.length === 0 ? (
                    <div>Could not fetch posts</div>
                ) : (
                    posts?.map((post, index) => {
                        return (
                            <DisplayBox key={index} name={post.name} postId={post.id} author={post.author} />
                        );
                    })
                )}
            </div>
        </div>
    )
}

