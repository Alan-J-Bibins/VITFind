import { PrismaClient } from "generated/prisma";
import { MdDelete } from "react-icons/md";
import { Link, redirect, useLoaderData, type LoaderFunctionArgs } from "react-router";
import Navbar from "~/components/Navbar";
import { auth } from "~/lib/auth.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const postId = params.postId;
    const prisma = new PrismaClient();
    let ok = false;
    const session = await auth.api.getSession(request);
    if (!session) {
        throw redirect('/')
    }
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: true
            }
        })
        ok = true;
        return { ok, post, session }
    } catch (error) {
        console.log(error);
        throw redirect('/')
    } finally {
        await prisma.$disconnect();
    }
}

export default function Page() {
    const { post, session } = useLoaderData<typeof loader>();
    return (
        <div className="flex flex-col gap-8 items-center justify-start p-1 min-h-screen">
            <div className="motion-preset-slide-down-lg motion-scale-x-in w-full flex items-center justify-center">
                <Navbar />
            </div>
            <div className="w-full h-full px-8 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-title">{post?.name}</h1>
                    {session?.user.id === post?.author.id && (
                        <button className="flex items-center gap-1 btn2 hover:text-red-500">
                            <MdDelete size={24} />
                            <p>Delete Post</p>
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="bg-black/20 h-full">
                        Image Not Provided
                    </div>
                    <div>
                        <p className="font-bold text-2xl">Lost By: {post?.author.name}</p>
                        <Link to={`mailto:${post?.author.email}`} className="text-xl hover:underline hover:text-red-800">Email: {post?.author.email}</Link>
                        <p className="text-lg">Description: {post?.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
