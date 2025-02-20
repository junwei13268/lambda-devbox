'use client'

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "./button";

export const Select = (props: {
  id: string
  value: string
  onSelect: (value: string) => void
  options: string[]
  direction?: 'top' | 'bottom'
}) => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('#' + props.id)) {
      setIsOpen(false);
    }
  }

  const handleInputClick = (e: React.MouseEvent) => {setIsOpen(!isOpen);(e.target as HTMLInputElement).blur();}

  return (
    <div id={props.id} className="relative">
      <Input value={props.value} readOnly onClick={handleInputClick} />
      <svg onClick={handleInputClick} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 -translate-y-1/2 right-2 h-4 w-4 opacity-50" aria-hidden="true"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      {isOpen && <div className={`z-30 absolute flex gap-1 flex-col popover w-full bg-background border rounded-md p-1`} style={{ bottom: props.direction === 'top' ? '110%' : 'auto', top: props.direction !== 'top' ? '110%' : 'auto' }}>
        {props.options.map((option, index) => (
          <button onClick={() => {
            props.onSelect(option);
            setIsOpen(false);
          }} className={`${option === props.value ? 'bg-secondary' : ''} hover:bg-secondary rounded-md p-2 text-start text-sm`} key={index}>{option}</button>
        ))}
      </div>}
    </div>
  )
}