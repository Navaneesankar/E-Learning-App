import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
  onProgress: (state: { playedSeconds: number }) => void;
  onComplete: () => void;
}

export function VideoPlayer({ url, onProgress, onComplete }: VideoPlayerProps) {
  const handleProgress = (state: { playedSeconds: number }) => {
    onProgress(state);
  };

  const handleEnded = () => {
    onComplete();
  };

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        onProgress={handleProgress}
        onEnded={handleEnded}
      />
    </div>
  );
}