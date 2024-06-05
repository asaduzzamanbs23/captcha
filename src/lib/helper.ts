export const generateInitialShapes = () => {
  return Array(25)
    .fill(null)
    .map(() => ({
      isSelected: false,
      color:
        Math.random() < 0.33 ? "Red" : Math.random() < 0.66 ? "Blue" : "Green",
      shape:
        Math.random() < 0.5
          ? Math.random() < 0.33
            ? "Triangle"
            : Math.random() < 0.5
            ? "Square"
            : "Circle"
          : null,
    }));
};

export const randomShapeGenerator = (
  randomShapes: { isSelected: boolean; color: string; shape: string | null }[]
) => {
  const shape =
    Math.random() < 0.33
      ? "Triangle"
      : Math.random() < 0.66
      ? "Square"
      : "Circle";
  if (randomShapes.find((el) => el.shape === shape)) {
    return shape;
  } else {
    randomShapeGenerator(randomShapes);
  }
};

export const randomColorGenerator = (
  randomShapes: { isSelected: boolean; color: string; shape: string | null }[],
  shape: string
) => {
  const color =
    Math.random() < 0.33 ? "Red" : Math.random() < 0.66 ? "Green" : "Blue";
  if (randomShapes.find((el) => el.color === color && el.shape === shape)) {
    return color;
  } else {
    randomColorGenerator(randomShapes, shape);
  }
};
