import { useMemo } from "react";

export type BubblyBackgroundProps = React.ButtonHTMLAttributes<HTMLDivElement>;

export function BubblyBackground(props: BubblyBackgroundProps) {
  const spacing = 15;
  const minRadius = 0.5;
  const maxRadius = 20;
  const baseGridSize = 30;

  // Generate in a much larger area to account for rotation
  const generateSize = baseGridSize * 3;

  const circles = useMemo(() => {
    const generatedCircles: React.ReactNode[] = [];

    // Create wave points
    const wavePoints = [];
    const numPoints = 8;
    const amplitude = baseGridSize * spacing * 0.1;
    const frequency = 3;

    // Rotation angle in radians
    const angle = (15 * Math.PI) / 180;

    // Center point for rotation
    const centerX = (baseGridSize * spacing) / 2;
    const centerY = (baseGridSize * spacing) / 2;

    // Create multiple wave paths for more variation
    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * baseGridSize * spacing;
      // Primary wave
      const y1 =
        (baseGridSize * spacing) / 2 +
        amplitude *
          Math.sin((x / (baseGridSize * spacing)) * frequency * Math.PI);
      wavePoints.push({ x, y: y1 });

      // Secondary wave, offset vertically
      const y2 =
        (baseGridSize * spacing) / 2 +
        amplitude *
          Math.sin(
            (x / (baseGridSize * spacing)) * frequency * Math.PI + Math.PI / 2
          );
      wavePoints.push({ x, y: y2 });
    }

    // Generate circles in a much larger area, shifted to ensure coverage
    const offset = generateSize - baseGridSize;
    for (let x = -offset; x < baseGridSize + offset; x++) {
      for (let y = -offset; y < baseGridSize + offset; y++) {
        // Original position
        const originalX = x * spacing + maxRadius;
        const originalY = y * spacing + maxRadius;

        // Rotate position around center
        const translatedX = originalX - centerX;
        const translatedY = originalY - centerY;
        const rotatedX =
          translatedX * Math.cos(angle) - translatedY * Math.sin(angle);
        const rotatedY =
          translatedX * Math.sin(angle) + translatedY * Math.cos(angle);
        const circleX = rotatedX + centerX;
        const circleY = rotatedY + centerY;

        // Find the closest wave point
        let minDistance = Infinity;
        for (const point of wavePoints) {
          const distance = Math.sqrt(
            Math.pow(circleX - point.x, 2) + Math.pow(circleY - point.y, 2)
          );
          minDistance = Math.min(minDistance, distance);
        }

        const maxDistance = Math.sqrt(
          Math.pow(baseGridSize * spacing, 2) +
            Math.pow(baseGridSize * spacing, 2)
        );

        // Calculate radius from minRadius to maxRadius based on distance
        const influence = Math.pow(minDistance / maxDistance, 2);
        const radius = minRadius + (maxRadius - minRadius) * influence;

        generatedCircles.push(
          <circle
            cx={circleX}
            cy={circleY}
            fill="currentColor"
            key={`${x}-${y}`}
            r={radius}
          />
        );
      }
    }
    return generatedCircles;
  }, [generateSize]);

  return (
    <div style={{ width: "100%", height: "100%" }} {...props}>
      <svg
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%" }}
        viewBox={`0 0 ${baseGridSize * spacing} ${baseGridSize * spacing}`}
      >
        {circles}
      </svg>
    </div>
  );
}

BubblyBackground.displayName = "BubblyBackground";
