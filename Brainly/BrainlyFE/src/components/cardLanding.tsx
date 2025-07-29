interface CardLandingProps {
    image: string;
    title: string;
    className?: string;
    onClick?: () => void;
}

export function CardLanding({image, title, className, onClick}: CardLandingProps) {
    return(
        <div className={`bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer ${className || ''}`}
             onClick={onClick}>
            <img className="w-16 h-16 sm:w-24 sm:h-24 object-contain" loading = "lazy" src={image} alt={title} />
            <h3 className="text-lg sm:text-xl font-semibold font-orbitron text-white text-glow-pulse text-center">{title}</h3>
        </div>
    )
}
