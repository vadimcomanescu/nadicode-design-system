import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/Dialog"
import { Typography } from "../ui/Typography"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { cn } from "../../lib/utils"

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface GalleryBlockProps {
  images?: GalleryImage[]
  columns?: number
  title?: string
  className?: string
}

const defaultImages: GalleryImage[] = [
  { src: "https://picsum.photos/seed/a/600/400", alt: "Abstract gradient", caption: "Design exploration #1" },
  { src: "https://picsum.photos/seed/b/600/600", alt: "Dark interface", caption: "Dashboard concept" },
  { src: "https://picsum.photos/seed/c/600/400", alt: "Color study", caption: "Arctic Glow palette study" },
  { src: "https://picsum.photos/seed/d/600/500", alt: "Typography layout", caption: "Type specimen" },
  { src: "https://picsum.photos/seed/e/600/400", alt: "Component grid", caption: "Component inventory" },
  { src: "https://picsum.photos/seed/f/600/600", alt: "Icon set", caption: "Animated icons showcase" },
]

export function GalleryBlock({
  images = defaultImages,
  columns = 3,
  title = "Gallery",
  className,
}: GalleryBlockProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-6xl px-6">
        {title && (
          <ScrollFadeIn>
            <Typography variant="h2" className="mb-8 text-text-primary">
              {title}
            </Typography>
          </ScrollFadeIn>
        )}

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {images.map((image, index) => (
            <ScrollFadeIn key={index} delay={index * 0.05}>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="group relative w-full overflow-hidden rounded-lg border border-border bg-surface focus-visible:ring-1 focus-visible:ring-accent focus-visible:outline-none"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    {image.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-overlay/80 to-transparent px-3 py-2">
                        <Typography variant="small" className="text-white">
                          {image.caption}
                        </Typography>
                      </div>
                    )}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full"
                  />
                  {image.caption && (
                    <div className="px-6 py-4">
                      <Typography variant="body" className="text-text-primary">
                        {image.caption}
                      </Typography>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
