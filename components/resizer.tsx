'use client'

import React, { useEffect } from "react";

export const Resizer = ({ width, setWidth }: { width: number, setWidth: (width: number) => void }) => {

  const [isMoving, setIsMoving] = React.useState(false);
  const [right, setRight] = React.useState(width - 4);

  useEffect(() => {
    setRight(width - 4);
  }, [width]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMoving]);
  
  const handleResizerMouseDown = () => setIsMoving(true);

  const handleMouseMove = (event: MouseEvent) => {
    if (isMoving) {
      setWidth(Math.min(700, Math.max(280, window.innerWidth - event.clientX)));
    }
  }

  const handleMouseUp = () => setIsMoving(false);

  return (
    <div className={`fixed bottom-0 w-2 hover:bg-gray-400/20 cursor-col-resize z-30`} style={{ right, height: `calc(100svh - 56px)` }} onMouseDown={handleResizerMouseDown} />
  )
}