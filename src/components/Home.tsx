import React, { useRef } from "react";
import Wizard, { EFlipDirection } from "./Wizard";

export default function Home() {
  const [flipDirection, setFlipDirection] = React.useState<EFlipDirection>(
    EFlipDirection.left
  );
  const [clickedPosition, setClickedPosition] = React.useState<{
    x: number;
    y: number;
  } | null>({ x: 0, y: 0 });
  const [animate, setAnimate] = React.useState<boolean>(false);
  const [animateDuration, setAnimateDuration] = React.useState<number>(2);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  //   const handleClick = React.useCallback(
  //     (e: React.MouseEvent<HTMLDivElement>) => {
  //       const videoElement = videoElementRef.current;
  //       if (videoElement) {
  //         const videoRect = videoElement.getBoundingClientRect();
  //         const setPostion = () =>
  //           setClickedPosition({ x: e.clientX, y: e.clientY });
  //         if (e.clientX < videoRect.left) {
  //           if (flipDirection !== EFlipDirection.right) {
  //             setFlipDirection(EFlipDirection.right);
  //             setTimeout(setPostion, 500);
  //           } else {
  //             setPostion();
  //           }
  //         } else if (e.clientX > videoRect.left + videoElement.width) {
  //           if (flipDirection !== EFlipDirection.left) {
  //             setFlipDirection(EFlipDirection.left);
  //             setTimeout(setPostion, 500);
  //           } else {
  //             setPostion();
  //           }
  //         }
  //       }
  //     },
  //     [flipDirection]
  //   );

  const getDuration = (position: any) => {
    const { prevPos, x, y } = position;
    const Xmax = Math.abs(prevPos.x - x);
    const Ymax = Math.abs(prevPos.y - y);
    const maxDiff = Math.max(Xmax, Ymax);
    const index = Number((maxDiff / 200).toFixed(0));
    const transitionDuration = index === 0 ? 2 : index + 2;
    setAnimateDuration(transitionDuration);
  };

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const videoElement = videoElementRef.current;
      setAnimate(false);
      if (videoElement) {
        const videoRect = videoElement.getBoundingClientRect();
        const setPostion = () => {
          setClickedPosition((prevPos) => {
            const x = e.clientX;
            const y = e.clientY;
            getDuration({ prevPos, x, y });
            return { x: x - 50, y: y - 50 };
          });
          setAnimate(true);
        };

        if (e.clientX < videoRect.left) {
          if (flipDirection !== EFlipDirection.right) {
            setFlipDirection(EFlipDirection.right);
            setTimeout(setPostion, 100);
          } else {
            setPostion();
          }
        } else if (e.clientX > videoRect.left) {
          if (flipDirection !== EFlipDirection.left) {
            setFlipDirection(EFlipDirection.left);
            setTimeout(setPostion, 100);
          } else {
            setPostion();
          }
        }
      }
    },
    [flipDirection]
  );

  return (
    <div style={{ flex: 1, position: "relative" }} onClick={handleClick}>
      <Wizard
        ref={videoElementRef}
        clickedPosition={clickedPosition}
        flipDirection={flipDirection}
        animateDuration={animateDuration}
        animate={animate}
      />
    </div>
  );
}
