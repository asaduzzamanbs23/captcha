const ImageGrid = ({
  imageData,
  squarePosition,
  randomShapes,
  handleClick,
}: {
  imageData: string;
  handleClick: (idx: number) => void;
  squarePosition: { top: number; left: number };
  randomShapes: { isSelected: boolean; color: string; shape: string | null }[];
}) => {
  return (
    <div className="relative">
      <img
        alt="captured"
        src={imageData}
        className="block w-[640px] h-[480px]"
      />
      <div
        className="absolute w-[250px] h-[250px] grid grid-cols-5 grid-rows-5 bg-[#C2C5C7] opacity-50 border-2 border-white"
        style={{
          top: squarePosition.top,
          left: squarePosition.left,
        }}
      >
        {randomShapes.map((el, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className={`relative flex justify-center items-center border-2 border-white cursor-pointer ${
              el.isSelected && "bg-white"
            }`}
          >
            {el.shape ? (
              <span
                className={`text-white text-3xl`}
                style={{ color: el.color.toLowerCase() }}
              >
                {el.shape === "Triangle"
                  ? "▲"
                  : el.shape === "Square"
                  ? "■"
                  : "●"}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
