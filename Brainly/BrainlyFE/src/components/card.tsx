
import { ShareIcon } from "../svgs/shareIcon";
import { CrossIcon } from "../svgs/crossIcon";
import { useEffect, useState } from "react";
import brainLogo from "/icons/brainlyNoBG.png"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { YoutubeIcon } from "../svgs/YoutubeIcon";
import { FaLink, FaTwitter, FaYoutube } from "react-icons/fa";




interface cardProps {
    type: string;
    title: string;
    link: string;
    contentId: string;
    landing : boolean;
    onDelete: ((id: string) => void) | null;
    onSummarizeClick?: () => void;
    chatGPTThumbnail?: string;
    aiGlitter?: string;
    shared? : boolean;
}



export function Card({ type, title, link, contentId, onDelete, onSummarizeClick, landing,  chatGPTThumbnail, aiGlitter, shared }: cardProps) {
    const [expanded, setExpanded] = useState(false);
    const Navigate = useNavigate();
  
    useEffect(() => {
      if (type === "twitter" && (window as any).twttr?.widgets) {
        (window as any).twttr.widgets.load();
      }
    }, [type, link, expanded]); 
  
    return (
      <div className="min-w-64">
        <div className={`
          bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 
          backdrop-blur-md border border-purple-500/30 rounded-xl p-4 w-80 cursor-pointer 
          shadow-[0_4px_30px_rgba(128,0,255,0.3)] hover:shadow-[0_6px_40px_rgba(128,0,255,0.6)] 
          transition-all duration-300 ease-in-out transform ${landing? 'h-full' : ''} ${shared? 'h-90' : ''}
          ${expanded ? 'h-auto' : 'h-85 overflow-hidden relative'} 
          will-change-transform ring-1 ring-purple-400/20 text-white font-michroma text-sm font-semibold
          hover:ring-purple-500/50 hover:bg-purple-600/80 hover:scale-[1.03] hover:-translate-y-1 hover: shadow-none
        `}>

                <div className="flex justify-between">
                    <div className="flex items-center text-md">
                        <div className="text-gray-500  h-12 w-12 ">  
                        <img src={brainLogo} alt="Brain Logo" className="h-12 w-12 rounded-full " />
                        </div>
                        {title}
                </div>
                <div className="flex items-center">
                  {type == "youtube" &&  <div className="pr-3 text-gray-200">
                        <FaYoutube/>
                    </div>}
                    {type == "twitter" &&  <div className="pr-3 text-gray-200">
                        <FaTwitter/>
                    </div>}
                    {type == "link" &&  <div className="pr-3 text-gray-200">
                        <FaLink/>
                    </div>}
                    <div className="pr-2 text-gray-200"
                        onClick={() => {
                            onDelete && onDelete(contentId);
                            setExpanded(false);
                          }}>
                        <CrossIcon/>
                    </div>
                </div>
            </div>
            <div className="pt-4 pb-2">
          {type === "youtube" && (
            <iframe
              width="560"
              className="w-full"
              height="315"
                src={
                link.includes("youtu.be")
                  ? `https://www.youtube.com/embed/${link.split("youtu.be/")[1].split("?")[0]}`
                  : link.includes("watch?v=")
                  ? `https://www.youtube.com/embed/${link.split("v=")[1].split("&")[0]}`
                  : ""
              }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a  href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
          {type === "link" && (
            <div>
            <img 
              src={chatGPTThumbnail} 
              alt="Link Preview"
              onClick={() => window.open(link, "_blank")} 
              loading="lazy"
/>
            </div>
            )}
        </div>

                {!expanded &&!landing &&  !shared &&(
                    <div className="absolute bottom-0 left-0 w-80 h-20 bg-gradient-to-t from-purple-600 via-purple-600/20 to-transparent flex justify-center items-end">
                        <button 
                            onClick={() => setExpanded(true)}
                            className="text-grey-900 text-border-black font-semibold mb-2 mt-2 px-4 py-2 font-orbitron"
                        >
                            See more
                        </button>
                    </div>
                )}

                {expanded && !landing && (
                    <div className="grid cols-2 flex justify-center items-end">
                      <div className="flex gap-2">
                        <button
                            className="text-grey-200 font-semibold mb-2 mt-2 font-orbitron"
                            onClick={onSummarizeClick}
                        >
                            Summarize
                        </button>
                        <img src={aiGlitter} className="w-5 h-8"/>
                        </div>
                        <button
                            onClick={() => { setExpanded(false);}}
                            className="text-grey-200 font-semibold mb-2 mt-2 font-orbitron"
                        >
                            See less
                        </button>
                        
                    </div>

                    
                    
                )}
        </div>
    </div>
    );
}
