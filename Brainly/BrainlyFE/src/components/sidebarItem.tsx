import { ReactElement } from "react";

export function SidebarItem({ text, icon, onClick }: { text: string; icon: React.ReactElement, onClick?: () => void }) {

  return (
    <div className="flex flex-col items-center gap-1 text-white cursor-pointer hover:transition-all duration-300 ease-in-out 
transform hover:scale-110  font-orbitron shadow-none  hover-shadow-none">
      <div className="group-hover: transition-all duration-300">
        <div onClick={onClick} className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}

