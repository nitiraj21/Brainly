import React, { useState } from "react";
import { Input } from "./Input";
import axios from "axios";
import { Button } from "./Button";
import { CrossIcon } from "../svgs/crossIcon";


type Props = {    open: boolean;
    onClose: () => void;
    contentId: string;
};
export function SumModal({ open, onClose, contentId }: Props) {
    const [summary, setSummary] = useState<string>("");
    const  [fullSummary, setFullSummary] = useState("");
    const [loading, IsLoading] = useState(false);

    async function fetchSummary() {
        try {
            IsLoading(true);
          const response = await axios.post(
            "https://brainlybe.onrender.com/api/v1/brain/summarize",
            { contentId },
            {
              headers: {
                Authorization: localStorage.getItem("authorization"),
              },
            }
          );
      
          const full = response.data?.summary || "";
          setFullSummary(full);
          setSummary("");
          IsLoading(false)
      
          let i = -1;
          const typingInterval = setInterval(() => {
            if (i < full.length) {
              setSummary((prev) => prev + full.charAt(i));
              i++;
            } else {
              clearInterval(typingInterval);
              
            }
          }, 15);
        } catch (error) {
          IsLoading(false)
          console.error("Error summarizing content:", error);
          alert("The model is overloaded, please try again in some time.");
        }
      }
      


    return (        <div>
            {open && (
  <div className="w-screen h-screen bg-gray-900 bg-opacity-50 fixed top-0 left-0 flex justify-center items-center z-50">
    <div className="max-w-[22rem] max-h-[30rem] bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 
        backdrop-blur-md border border-purple-500/30 rounded-xl shadow-[0_4px_30px_rgba(128,0,255,0.3)] 
        hover:shadow-[0_6px_40px_rgba(128,0,255,0.6)] transition-all duration-300 ease-in-out transform 
        overflow-y-auto p-4 custom-scroll ">
      
      <div className="flex justify-end">
        <div onClick={onClose} className="cursor-pointer">
          <span onClick={()=>{
                    setSummary("");        }}
                 className="text-white"><CrossIcon/></span>
        </div>
      </div>

      <div className="flex justify-center p-3">
        <h2 className="text-lg font-orbitron font-bold bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 bg-clip-text text-transparent">
          Summarize Content
        </h2>
      </div>
      {loading &&<div><span className="text-white font-orbitron text-lg">Summarizing, please wait</span><span className="text-white font-orbitron text-lg animate-blink ">|</span></div> }

      <p className="whitespace-pre-line break-words text-md font-michroma font-bold bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 bg-clip-text text-transparent">
        {summary}
      </p>

      <div className="flex justify-center mt-4">
        <Button
          onClick={fetchSummary}
          className="bg-purple-500 text-white px-4 py-2 rounded-md"
          variant="primary"
          text="Fetch Summary"
        />
      </div>
    </div>
  </div>
)}

        </div>  
    );
}
