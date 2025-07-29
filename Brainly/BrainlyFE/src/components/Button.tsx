import { ReactElement } from "react";

interface ButtonProps {
    variant : 'primary' | 'secondary' | 'share';
    text  : string;
    startIcon? : ReactElement | string;
    onClick? : (event: React.MouseEvent<HTMLButtonElement>) => void;
    loading? : boolean;
    fullWidth? : boolean;
    className?: string;
    style?: React.CSSProperties;
}

const variantClasses = {
    primary: 'bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 text-white',
    secondary: 'bg-grey-200 text-grey-400',
    share : 'bg-white text-purple-600 border border-purple-600',
}

const defaultStyle = `
  px-3 py-2 rounded-md font-light flex justify-center items-center gap-2 
rounded-xl p-2 w-30 cursor-pointer shadow-[0_4px_30px_rgba(128,0,255,0.3)] 
hover:shadow-[0_6px_40px_rgba(128,0,255,0.6)] transition-all duration-300 ease-in-out 
transform hover:scale-105  font-orbitron shadow-none
`;

export function Button({ variant, text, startIcon, onClick, loading = false, fullWidth = false, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${variantClasses[variant]} 
        ${className || ""}
        ${defaultStyle} 
        ${fullWidth ? "w-full" : ""} 
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      disabled={loading}
    >
      {loading && <h3>Loading...</h3>}
      {!loading && startIcon && (
        <span>
          {typeof startIcon === "string" ? (
            <img src={startIcon} alt="icon" className="w-5 h-5" />
          ) : (
            startIcon
          )}
        </span>
      )}
      {!loading && text}
    </button>
  );
}
