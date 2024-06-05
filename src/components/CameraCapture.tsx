import { useRef, useEffect } from "react";

const CameraCapture = ({
  isLoading,
  onCapture,
  setIsCameraReady,
}: {
  isLoading: boolean;
  onCapture: (data: string) => void;
  setIsCameraReady: (data: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // take camera access
    let stream: MediaStream;
    navigator.mediaDevices.getUserMedia({ video: true }).then((s) => {
      stream = s;
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        videoRef.current.play();
        setIsCameraReady(true);
      }
    });

    return () => {
      setIsCameraReady(false);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [setIsCameraReady]);

  const captureImage = () => {
    // take picture & save picture
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      context &&
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      const imageData = canvasRef.current.toDataURL("image/png");
      onCapture(imageData);
    }
  };

  return (
    <>
      <video ref={videoRef} width="640" height="480" />
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          onClick={captureImage}
          className="bg-[#DE9A0C] px-4 py-2 text-white font-semibold active:translate-y-1 mt-5"
        >
          {isLoading ? "Loading..." : "CONTINUE"}
        </button>
      </div>
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />
    </>
  );
};

export default CameraCapture;
