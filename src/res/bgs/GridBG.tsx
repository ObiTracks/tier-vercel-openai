interface GridSVGProps {
  width?: string;
  height?: string;
  cellSize?: number;
  color?: string;
}

export function GridBG({
  width = '100%',
  height = '100%',
  cellSize = 50,
  color = 'blue', // This prop will not be needed if the color is hardcoded in the animation
}: GridSVGProps) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <pattern
        id="grid"
        width={cellSize}
        height={cellSize}
        patternUnits="userSpaceOnUse"
      >
        <path
          d={`M ${cellSize} 0 V ${cellSize} M 0 ${cellSize} H ${cellSize}`}
          fill="none"
          className="bggrid"
          strokeWidth="1"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

