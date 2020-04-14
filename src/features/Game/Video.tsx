import React, { useRef, useState } from 'react';
import Measure from 'react-measure';
import { useCardRatio } from './useCardRatio';
import { useOffsets } from './useOffsets';

export function Video({ mediaStream }) {
  const videoRef = useRef();
  const [container, setContainer] = useState({ height: 0, width: 0 });
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleResize(contentRect) {
    setContainer({
      height: Math.round(contentRect.bounds.width / aspectRatio),
      width: contentRect.bounds.width,
    });
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    videoRef.current.play();
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div ref={measureRef} style={{ height: `${container.height}px` }}>
          <video
            ref={videoRef}
            onCanPlay={handleCanPlay}
            style={{ top: `-${offsets.y}px`, left: `-${offsets.x}px` }}
            autoPlay
            playsInline
            muted
          />
        </div>
      )}
    </Measure>
  );
}
