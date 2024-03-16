import React from "react";

export enum EFlipDirection {
  left = "left",
  right = "right",
}

interface IProps {
  clickedPosition: {
    x: number;
    y: number;
  } | null;
  flipDirection: EFlipDirection;
  animate: boolean;
  animateDuration: number;
}

export default React.forwardRef<HTMLVideoElement, IProps>(function Wizard(
  { clickedPosition, flipDirection, animate, animateDuration },
  ref
) {
  const style: React.CSSProperties = React.useMemo(() => {
    return {
      position: "absolute",
      left: clickedPosition?.x || 0,
      top: clickedPosition?.y || 0,
      transform: `scaleX(${flipDirection === "left" ? -1 : 1}) scale3d(1,1,1)`,
      transition: animate ? `${animateDuration}s` : "0s",
      //   transition: "3s",
    };
  }, [clickedPosition, flipDirection]);
  return (
    <video
      id="wizard-king"
      autoPlay
      loop
      muted
      ref={ref}
      style={style}
      height={100}
      width={100}
    >
      <source src="wizard-king.mp4" type="video/mp4" />
    </video>
  );
});
