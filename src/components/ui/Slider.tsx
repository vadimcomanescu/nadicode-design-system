import * as React from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from "motion/react"
import { cn } from "../../lib/utils"

interface SliderProps {
  label: string
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  onChangeEnd?: (value: number) => void
  disabled?: boolean
  formatValue?: (value: number) => string
  className?: string
  showHashMarks?: boolean
  snapToDeciles?: boolean
  rubberBand?: boolean
}

const TRACK_HEIGHT = 52
const TRACK_RADIUS = 12
const HANDLE_SIZE = 18
const HANDLE_MIN_LEFT = 10
const DWELL_MS = 800
const HASH_COUNT = 8
const RUBBER_BAND_DEADZONE = 10
const RUBBER_BAND_FACTOR = 0.15

const SPRING_SNAP: SpringOptions = { stiffness: 400, damping: 30, mass: 0.8 }
const SPRING_RUBBER: SpringOptions = { stiffness: 300, damping: 25, mass: 0.5 }

function clampNum(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi)
}

function quantize(v: number, step: number, min: number, max: number) {
  const steps = Math.round((v - min) / step)
  return clampNum(min + steps * step, min, max)
}

function snapToDecile(ratio: number): number {
  return Math.round(ratio * 10) / 10
}

function defaultFormat(value: number, min: number, max: number): string {
  const range = max - min
  if (range <= 1) {
    return value.toFixed(2)
  }
  if (Number.isInteger(value)) {
    return String(value)
  }
  return value.toFixed(1)
}

// Animated fill bar, isolated to avoid useTransform hook ordering issues
function FillBar({
  fillSpring,
  radius,
}: {
  fillSpring: ReturnType<typeof useSpring>
  radius: number
}) {
  const width = useTransform(fillSpring, (v: number) =>
    `${clampNum(v * 100, 0, 100)}%`
  )
  return (
    <motion.div
      className="absolute top-0 left-0 h-full bg-surface-hover"
      style={{ width, borderRadius: radius }}
    />
  )
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      label,
      value: controlledValue,
      defaultValue = 0.5,
      min = 0,
      max = 1,
      step = 0.01,
      onChange,
      onChangeEnd,
      disabled = false,
      formatValue,
      className,
      showHashMarks = true,
      snapToDeciles = true,
      rubberBand = true,
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const currentValue = isControlled ? controlledValue : internalValue

    const trackRef = React.useRef<HTMLDivElement>(null)
    const isDragging = React.useRef(false)
    const isClick = React.useRef(true)
    const pointerStartX = React.useRef(0)
    const dwellTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const [isHovered, setIsHovered] = React.useState(false)
    const [isActive, setIsActive] = React.useState(false)
    const [isEditing, setIsEditing] = React.useState(false)
    const [editText, setEditText] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const ratio = max === min ? 0 : (currentValue - min) / (max - min)

    // Motion values for animated fill
    const fillMotion = useMotionValue(ratio)
    const fillSpring = useSpring(fillMotion, SPRING_SNAP)

    // Rubber band motion
    const rubberBandX = useMotionValue(0)
    const rubberBandSpring = useSpring(rubberBandX, SPRING_RUBBER)
    const rubberBandScale = useTransform(
      rubberBandSpring,
      [-40, 0, 40],
      [1.02, 1, 1.02]
    )

    // Sync fillMotion when value changes externally (not during drag)
    React.useEffect(() => {
      if (!isDragging.current) {
        fillMotion.set(ratio)
      }
    }, [ratio, fillMotion])

    const setValue = React.useCallback(
      (newValue: number) => {
        const quantized = quantize(newValue, step, min, max)
        if (!isControlled) {
          setInternalValue(quantized)
        }
        onChange?.(quantized)
      },
      [step, min, max, isControlled, onChange]
    )

    const getValueFromPointer = React.useCallback(
      (clientX: number): { value: number; ratio: number; overflow: number } => {
        const track = trackRef.current
        if (!track) return { value: min, ratio: 0, overflow: 0 }
        const rect = track.getBoundingClientRect()
        const rawRatio = (clientX - rect.left) / rect.width
        const overflow =
          rawRatio < 0
            ? rawRatio * rect.width
            : rawRatio > 1
              ? (rawRatio - 1) * rect.width
              : 0
        const clamped = clampNum(rawRatio, 0, 1)
        const rawValue = min + clamped * (max - min)
        return { value: rawValue, ratio: clamped, overflow }
      },
      [min, max]
    )

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return
        e.preventDefault()
        const target = e.currentTarget
        target.setPointerCapture(e.pointerId)

        isDragging.current = false
        isClick.current = true
        pointerStartX.current = e.clientX

        const { value: newValue, ratio: rawRatio } = getValueFromPointer(e.clientX)

        // Start dwell timer for editable value
        dwellTimer.current = setTimeout(() => {
          if (isClick.current) {
            setIsEditing(true)
            setEditText(
              formatValue
                ? formatValue(currentValue)
                : defaultFormat(currentValue, min, max)
            )
          }
        }, DWELL_MS)

        setIsActive(true)

        // Set value immediately for feedback
        if (snapToDeciles) {
          const snappedRatio = snapToDecile(rawRatio)
          const snappedValue = min + snappedRatio * (max - min)
          fillMotion.set(snappedRatio)
          setValue(snappedValue)
        } else {
          fillMotion.set((newValue - min) / (max - min))
          setValue(newValue)
        }
      },
      [
        disabled,
        getValueFromPointer,
        setValue,
        snapToDeciles,
        min,
        max,
        fillMotion,
        formatValue,
        currentValue,
      ]
    )

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isActive || disabled) return

        const dx = Math.abs(e.clientX - pointerStartX.current)
        if (dx > 3) {
          isDragging.current = true
          isClick.current = false
          if (dwellTimer.current) {
            clearTimeout(dwellTimer.current)
            dwellTimer.current = null
          }
        }

        if (isDragging.current) {
          const { value: newValue, ratio: newRatio, overflow } =
            getValueFromPointer(e.clientX)

          // Rubber banding
          if (rubberBand && Math.abs(overflow) > RUBBER_BAND_DEADZONE) {
            const sign = overflow > 0 ? 1 : -1
            const excess = Math.abs(overflow) - RUBBER_BAND_DEADZONE
            const damped = Math.log1p(excess * RUBBER_BAND_FACTOR) * 20
            rubberBandX.set(sign * damped)
          } else {
            rubberBandX.set(0)
          }

          fillMotion.set(newRatio)
          setValue(newValue)
        }
      },
      [
        isActive,
        disabled,
        getValueFromPointer,
        rubberBand,
        rubberBandX,
        fillMotion,
        setValue,
      ]
    )

    const handlePointerUp = React.useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (disabled) return
        e.currentTarget.releasePointerCapture(e.pointerId)

        if (dwellTimer.current) {
          clearTimeout(dwellTimer.current)
          dwellTimer.current = null
        }

        // Release rubber band
        rubberBandX.set(0)

        if (isClick.current && snapToDeciles) {
          const { ratio: rawRatio } = getValueFromPointer(e.clientX)
          const snappedRatio = snapToDecile(rawRatio)
          const snappedValue = min + snappedRatio * (max - min)
          const quantized = quantize(snappedValue, step, min, max)
          fillMotion.set(snappedRatio)
          setValue(quantized)
          onChangeEnd?.(quantized)
        } else {
          onChangeEnd?.(currentValue)
        }

        isDragging.current = false
        isClick.current = true
        setIsActive(false)
      },
      [
        disabled,
        rubberBandX,
        snapToDeciles,
        getValueFromPointer,
        min,
        max,
        step,
        fillMotion,
        setValue,
        onChangeEnd,
        currentValue,
      ]
    )

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return
        let newValue = currentValue
        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            e.preventDefault()
            newValue = clampNum(currentValue + step, min, max)
            break
          case "ArrowLeft":
          case "ArrowDown":
            e.preventDefault()
            newValue = clampNum(currentValue - step, min, max)
            break
          case "Home":
            e.preventDefault()
            newValue = min
            break
          case "End":
            e.preventDefault()
            newValue = max
            break
          default:
            return
        }
        fillMotion.set((newValue - min) / (max - min))
        setValue(newValue)
        onChangeEnd?.(newValue)
      },
      [disabled, currentValue, step, min, max, fillMotion, setValue, onChangeEnd]
    )

    // Editable value handlers
    const commitEdit = React.useCallback(() => {
      setIsEditing(false)
      const parsed = parseFloat(editText)
      if (!isNaN(parsed)) {
        const clamped = clampNum(parsed, min, max)
        const quantized = quantize(clamped, step, min, max)
        fillMotion.set((quantized - min) / (max - min))
        setValue(quantized)
        onChangeEnd?.(quantized)
      }
    }, [editText, min, max, step, fillMotion, setValue, onChangeEnd])

    const handleEditKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          commitEdit()
        } else if (e.key === "Escape") {
          setIsEditing(false)
        }
      },
      [commitEdit]
    )

    React.useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }, [isEditing])

    // Handle position: use percentage with a minimum pixel offset via calc()
    const handleLeftExpr = `clamp(${HANDLE_MIN_LEFT}px, calc(${ratio * 100}% - ${HANDLE_SIZE / 2}px), calc(100% - ${HANDLE_SIZE + 4}px))`

    // Value dodge: detect if handle overlaps label or value
    const handleCenterPercent = ratio * 100
    const labelDodge = handleCenterPercent < 25
    const valueDodge = handleCenterPercent > 75

    const formattedValue = formatValue
      ? formatValue(currentValue)
      : defaultFormat(currentValue, min, max)

    const interacting = isHovered || isActive

    return (
      <motion.div
        ref={ref}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        aria-label={label}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "relative w-full select-none touch-none outline-none",
          "rounded-xl bg-surface overflow-hidden",
          "transition-[filter] duration-200",
          "focus-visible:ring-1 focus-visible:ring-accent",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        style={{ height: TRACK_HEIGHT }}
        animate={{
          filter: interacting ? "brightness(1.08)" : "brightness(1)",
        }}
        transition={{ duration: 0.2 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerEnter={() => !disabled && setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
      >
        {/* Inner track with rubber band scaling */}
        <motion.div
          ref={trackRef}
          className="absolute inset-0"
          style={{ scaleX: rubberBandScale, transformOrigin: "center" }}
        >
          {/* Fill region */}
          <FillBar fillSpring={fillSpring} radius={TRACK_RADIUS} />

          {/* Hash marks */}
          {showHashMarks && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              }}
              animate={{ opacity: interacting ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {Array.from({ length: HASH_COUNT }, (_, i) => {
                const pos = ((i + 1) / (HASH_COUNT + 1)) * 100
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-text-primary/[0.08]"
                    style={{ left: `${pos}%` }}
                  />
                )
              })}
            </motion.div>
          )}

          {/* Handle */}
          <motion.div
            className="absolute top-1/2 pointer-events-none"
            style={{
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
              borderRadius: HANDLE_SIZE / 2,
              y: "-50%",
              left: handleLeftExpr,
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
            animate={{
              opacity: interacting ? 1 : 0,
              scaleX: interacting ? 1 : 0.25,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          />

          {/* Label (left-aligned) */}
          <motion.span
            className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary text-base pointer-events-none select-none"
            animate={{
              opacity: interacting && labelDodge ? 0.3 : 1,
              scale: interacting && labelDodge ? 0.92 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {label}
          </motion.span>

          {/* Value display (right-aligned) */}
          {!isEditing && (
            <motion.span
              className="absolute right-5 top-1/2 -translate-y-1/2 font-mono text-text-primary text-base pointer-events-none select-none"
              animate={{
                opacity: interacting && valueDodge ? 0.3 : 1,
                scale: interacting && valueDodge ? 0.92 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {formattedValue}
            </motion.span>
          )}

          {/* Editable value input */}
          {isEditing && (
            <input
              ref={inputRef}
              type="text"
              className="absolute right-5 top-1/2 -translate-y-1/2 font-mono text-text-primary text-base bg-transparent border-none outline-none w-20 text-right"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={handleEditKeyDown}
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            />
          )}
        </motion.div>
      </motion.div>
    )
  }
)

Slider.displayName = "Slider"

export { Slider }
export type { SliderProps }
