import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { AnimatedIcon } from "./AnimatedIcon"

import { cn } from "../../lib/utils"
import { Button } from "./Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./Popover"

export interface ComboboxProps {
  options: { label: string; value: string }[]
  placeholder?: string
  emptyText?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function Combobox({
  options,
  placeholder = "Select option...",
  emptyText = "No option found.",
  value,
  onValueChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(value || "")

  const selectedValue = value !== undefined ? value : internalValue

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-text-primary"
        >
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
          <AnimatedIcon icon={ChevronsUpDown} className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === selectedValue ? "" : currentValue
                    if (onValueChange) {
                      onValueChange(newValue)
                    } else {
                      setInternalValue(newValue)
                    }
                    setOpen(false)
                  }}
                  className="text-text-primary"
                >
                  <AnimatedIcon
                    icon={Check}
                   
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
