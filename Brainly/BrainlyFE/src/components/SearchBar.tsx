import React from 'react';
import { Button } from "./Button";
import { Input } from "./Input";

interface SearchbarProps {
    ref: React.RefObject<HTMLInputElement>;
    onClick: () => void;
    remove: boolean;
}

export const Searchbar = React.forwardRef<HTMLInputElement, SearchbarProps>(({ onClick, remove }, ref) => {
    return (
        <div className="flex flex-wrap items-center justify-center sm:flex-nowrap gap-4 w-full">
            <Input 
                reference={ref}
                placeholder="Search your brain..."
                className="w-full"
            />
            
            <Button
                variant="primary"
                text={remove ? "Clear" : "Search"}
                onClick={onClick}
                className="flex-shrink-0"
            />
        </div>
    );
});