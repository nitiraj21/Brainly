export function Input({placeholder, reference, className} : { placeholder: string,reference?:any, className?: string }) {
    return <div>
        <input ref={reference}  type="text" className={`border border-purple-600 rounded-md p-2 w-full ${className}`} placeholder={placeholder} />
    </div>
}