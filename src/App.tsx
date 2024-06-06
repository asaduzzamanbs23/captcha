import { useEffect, useState } from "react";

import CameraCapture from "./components/CameraCapture";
import MovingSquare from "./components/MovingSquare";
import ImageGrid from "./components/ImageGrid";

import {
  generateInitialShapes,
  randomColorGenerator,
  randomShapeGenerator,
} from "./lib/helper";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [isPassed, setIsPassed] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [totalAttempt, setTotalAttempt] = useState(0);
  const [imageData, setImageData] = useState<string>();
  const [squarePosition, setSquarePosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [randomShapes, setRandomShapes] = useState(generateInitialShapes());

  const [shapeToBeSelect, setShapeToBeSelect] = useState(
    randomShapeGenerator(randomShapes)
  );
  const [colorToBeSelect, setColorToBeSelect] = useState(
    randomColorGenerator(randomShapes, shapeToBeSelect as string)
  );

  const validShapeNumber = randomShapes.reduce((count, obj) => {
    // initial valid shape count
    if (obj.color === colorToBeSelect && obj.shape === shapeToBeSelect) {
      return count + 1;
    }
    return count;
  }, 0);

  // Handlers
  const handleCapture = (image: string) => {
    setImageData(image);
  };

  const handleSquareMove = (position: { top: number; left: number }) => {
    setSquarePosition(position);
  };

  const handleClick = (index: number) => {
    const temp = [...randomShapes];
    temp[index].isSelected = !temp[index].isSelected;
    setRandomShapes(temp);
  };

  const handleValidation = () => {
    // user selected shape count
    let userSelectedShapeNumber = 0;
    let userSelectedValidShapeNumber = 0;
    randomShapes.forEach((el) => {
      el.isSelected && userSelectedShapeNumber++;
      el.isSelected &&
        el.color === colorToBeSelect &&
        el.shape === shapeToBeSelect &&
        userSelectedValidShapeNumber++;
    });

    setIsPassed(
      userSelectedShapeNumber === userSelectedValidShapeNumber &&
        userSelectedShapeNumber === validShapeNumber
    );
    setIsValidate(true);
    setTotalAttempt(totalAttempt + 1);
  };

  const handleReset = () => {
    const shapes = generateInitialShapes();
    const shape = randomShapeGenerator(shapes);
    const color = randomColorGenerator(shapes, shape as string);
    setImageData("");
    setIsPassed(false);
    setIsValidate(false);
    setRandomShapes(shapes);
    setShapeToBeSelect(shape);
    setColorToBeSelect(color);
  };

  useEffect(() => {
    // after 3 time wrong submission block user submission
    let timer: number;
    if (!isPassed && totalAttempt >= 3) {
      setCounter(5 * (totalAttempt - 2));
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [totalAttempt, isPassed]);

  return (
    <>
      <div className="bg-[#03285D] flex justify-center h-screen">
        <div className="bg-white m-auto p-10">
          <p className="text-[#346BB8] font-semibold text-3xl text-center pb-10">
            {isValidate
              ? "Result"
              : imageData
              ? `Select ${colorToBeSelect + " " + shapeToBeSelect}`
              : "Take Selfie"}
          </p>
          {!imageData ? (
            <div className="w-[640px] h-[540px] relative">
              <CameraCapture
                onCapture={handleCapture}
                setIsCameraReady={setIsCameraReady}
                isLoading={!(colorToBeSelect && shapeToBeSelect)}
              />
              {isCameraReady && (
                <MovingSquare
                  width={640}
                  height={480}
                  onMove={handleSquareMove}
                />
              )}
            </div>
          ) : !isValidate ? (
            <>
              <ImageGrid
                imageData={imageData}
                randomShapes={randomShapes}
                handleClick={handleClick}
                squarePosition={squarePosition}
              />
              <div className="flex justify-center">
                <button
                  onClick={handleValidation}
                  className="bg-[#DE9A0C] px-4 py-2 text-white font-semibold active:translate-y-1 mt-5"
                >
                  Validate
                </button>
              </div>
            </>
          ) : (
            <div className="w-[640px] h-[480px] text-xl font-semibold flex justify-center items-center">
              {isPassed ? (
                <span className="text-green-400">You passed the CAPTCHA!</span>
              ) : (
                <div className="flex justify-center flex-col">
                  <p className="text-red-400 text-center">
                    You failed the CAPTCHA!
                  </p>
                  <button
                    onClick={handleReset}
                    disabled={totalAttempt >= 3 && counter > 0}
                    className="bg-[#DE9A0C] px-4 py-2 text-white font-semibold active:translate-y-1 mt-5"
                  >
                    {totalAttempt < 3
                      ? "Try again"
                      : counter > 0
                      ? `Try again after ${counter} seconds`
                      : "Try again"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
