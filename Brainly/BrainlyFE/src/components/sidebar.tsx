import { FaTwitter, FaYoutube } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { Logo } from "../svgs/logo";
import { SidebarItem } from "./sidebarItem";

interface SidebarProps {
  ytClick: boolean;
  setYtClick: React.Dispatch<React.SetStateAction<boolean>>;
  twClick: boolean;
  setTwClick: React.Dispatch<React.SetStateAction<boolean>>;
  docClick: boolean;
  setDocClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ ytClick, setYtClick, twClick, setTwClick, docClick, setDocClick }: SidebarProps) {
  const handleItemClick = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setYtClick(false);
    setTwClick(false);
    setDocClick(false);
    setter(true);
  };

  return (
    // Vertically centered using top-1/2 and -translate-y-1/2
    <div className="fixed top-1/2 -translate-y-1/2 left-4 z-50">
        <div 
            className="h-auto w-16 rounded-3xl bg-gradient-to-b from-purple-600 to-purple-900/70
            shadow-lg border border-purple-300/30 flex flex-col items-center py-6 gap-4"
            style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
            <SidebarItem 
                icon={<Logo />} 
                text="All" 
                onClick={() => {
                    setYtClick(false);
                    setTwClick(false);
                    setDocClick(false);
                }} 
            />
            <SidebarItem 
                icon={<FaYoutube />} 
                text="YouTube" 
                onClick={() => handleItemClick(setYtClick)} 
            />
            <SidebarItem 
                icon={<FaTwitter />} 
                text="Twitter" 
                onClick={() => handleItemClick(setTwClick)} 
            />
            <SidebarItem 
                icon={<IoLinkSharp />} 
                text="Docs" 
                onClick={() => handleItemClick(setDocClick)} 
            />
        </div>
    </div>
  );
}