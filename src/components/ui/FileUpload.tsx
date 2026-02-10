import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { FileIcon, XIcon } from "@/components/ui/icons"
import { UploadIcon } from "./icons/upload"

const fileUploadVariants = cva(
  "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-border bg-surface hover:border-accent/50 hover:bg-surface-hover",
        active: "border-accent bg-accent/5",
        error: "border-destructive bg-destructive/5",
      },
      size: {
        sm: "p-4 gap-2",
        default: "p-8 gap-3",
        lg: "p-12 gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface UploadedFile {
  name: string
  size: number
  type: string
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof fileUploadVariants> {
  /** Accepted file types (e.g. ".pdf,.jpg") */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Max file size in bytes */
  maxSize?: number
  /** Current uploaded files */
  files?: UploadedFile[]
  /** Called when files are selected */
  onChange?: (files: File[]) => void
  /** Called when a file is removed */
  onRemove?: (index: number) => void
  /** Custom helper text */
  helperText?: string
  /** Disabled state */
  disabled?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      variant,
      size,
      accept,
      multiple = false,
      maxSize,
      files = [],
      onChange,
      onRemove,
      helperText,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList || disabled) return
      const selectedFiles = Array.from(fileList)
      onChange?.(selectedFiles)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragOver(true)
    }

    const handleDragLeave = () => setIsDragOver(false)

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFiles(e.dataTransfer.files)
    }

    const resolvedVariant = isDragOver ? "active" : variant

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        <div
          className={cn(
            fileUploadVariants({ variant: resolvedVariant, size }),
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload files"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
            disabled={disabled}
          />
          <UploadIcon size={24} className="text-text-tertiary" />
          <div className="text-center">
            <p className="text-sm text-text-primary">
              <span className="font-medium text-accent">Click to upload</span> or drag and drop
            </p>
            {helperText && (
              <p className="text-xs text-text-tertiary mt-1">{helperText}</p>
            )}
            {maxSize && (
              <p className="text-xs text-text-tertiary mt-0.5">
                Max size: {formatFileSize(maxSize)}
              </p>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <ul className="space-y-2" aria-label="Uploaded files">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface p-2.5"
              >
                <FileIcon size={16} className="shrink-0 text-text-tertiary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{file.name}</p>
                  <p className="text-xs text-text-tertiary">{formatFileSize(file.size)}</p>
                </div>
                {onRemove && (
                  <button
                    onClick={() => onRemove(index)}
                    className="shrink-0 rounded p-1 text-text-tertiary hover:text-destructive hover:bg-destructive/10 transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    <XIcon size={14} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload, fileUploadVariants }
