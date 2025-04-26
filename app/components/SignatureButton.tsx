export default function SignatureButton({
    children,
    type = "button"
}: {
    children: React.ReactNode,
    type?: "button" | "reset" | "submit"
}) {
    return (

        <div className="group relative motion-preset-slide-down-lg motion-scale-x-in-75">
            <div className="bg-black absolute inset-0" />
            <button type={type} className="relative flex items-center justify-center px-4 py-2 border-2 border-black bg-orange-200
                group-hover:-translate-1 group-hover:bg-orange-300 transition-all group-hover:text-red-800
            ">
                {children}
            </button>
        </div>

    )
}

