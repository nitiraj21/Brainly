import { CrossIcon } from "../svgs/crossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";



type Props = {
    open: boolean;
    onClose: () => void;
};
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Link = "link",
}
export function CreateContentModal({ open, onClose }: Props) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);


    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(
            "https://brainlybe.onrender.com/api/v1/content",
            {
                title,
                type,
                link,
            },
            {
                headers: {
                    Authorization: localStorage.getItem("authorization"),
                },
            }
        );

        // Close the modal after successfully adding content
        onClose();
    }

    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-gray-900 bg-opacity-50 fixed top-0 left-0 flex justify-center items-center z-50 ">
                    <div className="flex flex-col justify-center">
                        <span className=" bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600  p-4 rounded-md">
                            <div className="flex justify-end">
                                <div onClick={onClose} className="cursor-pointer">
                                    <CrossIcon />
                                </div>
                            </div>
                            <div className="flex justify-center p-3 "><h2 className="text-lg font-bold font-orbitron text-white text-glow-pulse">Add a new Neuron</h2></div>
                            <div>
                                <div className="m-3">
                                <Input reference={titleRef} placeholder={"Title"} />
                                </div>
                                <div className="m-3">
                                <Input reference={linkRef} placeholder={"Link"} />
                                </div>
                                <div>
                                    <h1 className="mt-4 font-orbitron text-white text-glow-pulse">Type</h1>
                                    <div className="flex gap-2 p-4">
                                        <Button
                                            text="Youtube"
                                            variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                            onClick={() => {
                                                setType(ContentType.Youtube);
                                            }}
                                        ></Button>
                                        <Button
                                            text="Twitter"
                                            variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                            onClick={() => {
                                                setType(ContentType.Twitter);
                                            }}
                                        ></Button>
                                        <Button
                                            text="Link"
                                            variant={type === ContentType.Link ? "primary" : "secondary"}
                                            onClick={() => {
                                                setType(ContentType.Link);
                                            }}
                                        ></Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={addContent} variant="primary" text="Submit" />
                            </div>
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
