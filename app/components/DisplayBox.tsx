import type { User } from "generated/prisma";
import { href, Link } from "react-router";

export default function DisplayBox({ postId, name, author, image }: { postId: string, name: string, author: User, image?: string }) {
    return (
        <Link to={href('/posts/:postId', { postId })} className="border-2 border-black bg-orange-100 w-full h-full p-4 transition-all
            hover:bg-orange-800/20
            ">
            {!image && (
                <div className="min-h-44 bg-black/20">
                </div>
            )}
            <div className="flex justify-between items-center">
                <p> {name} </p>
                <p>Lost By: {author.name}</p>
            </div>
        </Link>
    )
}

