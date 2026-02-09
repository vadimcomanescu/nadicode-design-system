import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { UploadIcon } from "@/components/ui/icons/upload"
import { XIcon } from "@/components/ui/icons/x"
import { UserIcon } from "@/components/ui/icons/user"
import { MouseSpotlight } from "./MouseEffect"

interface AvatarUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string
    onChange?: (file: File) => void
}

export function AvatarUpload({ className, value, onChange, ...props }: AvatarUploadProps) {
    const [preview, setPreview] = useState<string | undefined>(value)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            onChange?.(file)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            onChange?.(file)
        }
    }

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent triggering the file input click
        setPreview(undefined)
        if (inputRef.current) {
            inputRef.current.value = "" // Clear the file input
        }
        onChange?.(null as unknown as File) // Pass null or undefined to indicate removal
    }

    return (
        <div
            className={cn("group relative flex flex-col items-center gap-4", className)}
            {...props}
        >
            <MouseSpotlight className="rounded-full">
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={cn(
                        "relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-white/10 bg-surface/40 transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]",
                        !preview && "hover:bg-surface/60"
                    )}
                >
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="Avatar"
                                className="h-full w-full object-cover transition-opacity group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <UploadIcon size={24} className="mb-1" />
                                <span className="text-xs font-medium text-center">Change</span>
                            </div>
                            {preview && (
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className="absolute top-0 right-0 p-1 m-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/90"
                                    title="Remove image"
                                >
                                    <XIcon size={12} />
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-1 text-text-secondary transition-colors group-hover:text-accent">
                            <UserIcon size={40} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <UploadIcon size={24} className="mb-1" />
                                <span className="text-xs font-medium text-center">Upload</span>
                            </div>
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </MouseSpotlight>
            <span className="text-sm font-medium text-text-secondary">
                Click or drag to upload
            </span>
        </div>
    )
}
