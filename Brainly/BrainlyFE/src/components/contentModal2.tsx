import { CrossIcon } from "../svgs/crossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";



type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (item: { title: string; link: string; type: string }) => void;
  };
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Link = 'link'
}
export function ContentModal2({ open, onClose, onSubmit }: Props) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    let link = null;
    let title = null;
    


    function addContent() {
        const title = titleRef.current?.value ?? '';
        const link = linkRef.current?.value ?? '';
        onSubmit({ title, link, type }); 
      }
    return (
        <div>
            {open && (
              <div
              className="absolute z-50"
              style={{
                top: '2700.3823852539062px',
                left: '700.93359375px',
              }}
            >
                    <div className="flex flex-col justify-center">
                        <span className=" bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600  p-4 rounded-md">

                            <div className="flex justify-end">
                                <div onClick={onClose} className="cursor-pointer">
                                    <CrossIcon />
                                </div>
                            </div>
                            <div>
                                <div className="m-4">
                                <Input reference={titleRef} placeholder={"Title"} />
                                </div>
                                <div className="m-4">
                                <Input reference={linkRef} placeholder={"Link"} />
                                </div>
                                <div>
                                    <h1 className="mt-4 font-orbitron text-white text-md">Type</h1>
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
