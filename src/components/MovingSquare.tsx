import { useEffect, useState } from "react";

const MovingSquare = ({
  width,
  height,
  onMove,
}: {
  width: number;
  height: number;
  onMove: (position: { top: number; left: number }) => void;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newPosition = {
        top: Math.random() * (height - 250),
        left: Math.random() * (width - 250),
      };
      setPosition(newPosition);
      onMove(newPosition);
    }, 1000);

    return () => clearInterval(interval);
  }, [width, height, onMove]);

  return (
    <div
      className={`absolute w-[250px] h-[250px] border-2 border-[#A3A8AD]`}
      style={{
        top: position.top,
        left: position.left,
      }}
    />
  );
};

export default MovingSquare;
