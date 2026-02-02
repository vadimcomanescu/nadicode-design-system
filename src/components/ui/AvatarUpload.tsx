import * as React from "react"
import { Upload, User } from "lucide-react"
import { cn } from "../../lib/utils"
import { MouseSpotlight } from "./MouseEffect"

interface AvatarUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string
    onChange?: (file: File) => void
}

export function AvatarUpload({ className, value, onChange, ...props }: AvatarUploadProps) {
    const [preview, setPreview] = React.useState<string | undefined>(value)
    const inputRef = React.useRef<HTMLInputElement>(null)

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
                        <img
                            src={preview}
                            alt="Avatar"
                            className="h-full w-full object-cover transition-opacity group-hover:opacity-50"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-1 text-text-secondary transition-colors group-hover:text-accent">
                            <User className="h-10 w-10" strokeWidth={1.5} />
                        </div>
                    )}

                    {/* Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Upload className="h-8 w-8 text-white drop-shadow-md" />
                    </div>

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
