import { MdAdd } from "react-icons/md";
import { Form, href } from "react-router";
import Dialog from "~/components/Dialog";
import DisplayBox from "~/components/DisplayBox";
import Navbar from "~/components/Navbar";
import SignatureButton from "~/components/SignatureButton";
import { useSession } from "~/lib/auth-client";

export default function Page() {
    const names = ["Rolex", "Benz", "Rolce Royce", "Underwear", "Piano", "Mona Lisa"];
    const { data: session } = useSession();
    return (
        <div className="flex flex-col gap-8 items-center justify-start p-1 h-screen">
            <div className="motion-preset-slide-down-lg motion-scale-x-in w-full flex items-center justify-center">
                <Navbar />
            </div>
            <div className="w-full px-4 flex flex-col lg:flex-row justify-between items-center">
                <h1 className="font-title text-6xl underline">Discover what was <span className="text-red-800">lost</span></h1>
                {session && (
                    <Dialog
                        trigger={
                            <SignatureButton>
                                New <MdAdd size={24} />
                            </SignatureButton>
                        }
                        title="New Entry"
                        close={
                            <div className="btn">
                                Cancel
                            </div>
                        }
                        submit={
                            <div className="btn2">
                                Submit
                            </div>
                        }
                    >
                        <Form className="flex flex-col w-full gap-4" action={href('/')}>
                            <input name="itemName" placeholder="Enter name of item" />
                            <input name="itemDesc" placeholder="Enter item description" />
                        </Form>
                    </Dialog>
                )}
            </div>
            <div className="grid grid-cols-3 gap-4 w-full justify-items-center">
                {names.map((name, index) => {
                    return (
                        <DisplayBox key={index} name={name} />
                    );
                })}
            </div>
        </div>
    )
}

