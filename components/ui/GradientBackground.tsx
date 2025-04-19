'use client';

import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { cn } from '@/lib/utils';

interface Blob {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function GradientBackground() {
  const { x, y } = useMousePosition();
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseBlob = useRef({ x: 0, y: 0 });

  // Define blue-purple color spectrum for the blobs
  const colors = [
    { r: 120, g: 40, b: 220 },     // Vibrant purple-blue
    { r: 75, g: 0, b: 200 },       // Deep blue-purple
    { r: 150, g: 30, b: 255 }      // Bright purple
  ];

  useEffect(() => {
    // Initialize CSS variables with deep purple-blue color
    document.documentElement.style.setProperty('--pointer-color', '120, 40, 220');
    document.documentElement.style.setProperty('--blending-value', 'screen');

    // Set background color to near-black
    document.body.style.backgroundColor = '#000005';

    // Initialize just 3 large oval-shaped blobs with slow movement
    const initialBlobs = Array.from({ length: 3 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      velocityX: (Math.random() - 0.5) * 0.7, // Slower movement
      velocityY: (Math.random() - 0.5) * 0.7, // Slower movement
      width: Math.random() * (80 - 60) + 60,  // Wider width for ovals
      height: Math.random() * (65 - 45) + 45, // Lower height for ovals
      color: `${colors[i % colors.length].r}, ${colors[i % colors.length].g}, ${colors[i % colors.length].b}`,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.2 // Very slow rotation
    }));
    
    setBlobs(initialBlobs);

    const animate = () => {
      setBlobs(prevBlobs => 
        prevBlobs.map(blob => {
          let newX = blob.x + blob.velocityX;
          let newY = blob.y + blob.velocityY;
          let newVelocityX = blob.velocityX;
          let newVelocityY = blob.velocityY;
          let newRotation = blob.rotation + blob.rotationSpeed;

          // Bounce off walls very gently
          if (newX <= 0 || newX >= window.innerWidth) {
            newVelocityX *= -1;
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            newVelocityY *= -1;
          }

          return {
            ...blob,
            x: newX,
            y: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
            rotation: newRotation
          };
        })
      );

      // Smooth mouse following for the interactive blob
      mouseBlob.current.x += (x - mouseBlob.current.x) * 0.05; // Even slower follow
      mouseBlob.current.y += (y - mouseBlob.current.y) * 0.05; // Even slower follow

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [x, y]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#000005] overflow-hidden">
      {/* Mouse-following large oval blob */}
      <div
        className="absolute [mix-blend-mode:screen]"
        style={{
          width: '65vmax',
          height: '55vmax',
          borderRadius: '50%',
          transform: `translate(${mouseBlob.current.x}px, ${mouseBlob.current.y}px) translate(-50%, -50%)`,
          background: `radial-gradient(ellipse at center, rgba(var(--pointer-color), 0.85) 0%, rgba(var(--pointer-color), 0) 70%)`,
          transition: 'transform 0.8s cubic-bezier(0.1, 0.9, 0.2, 1)'
        }}
      />

      {/* Autonomous floating oval blobs */}
      {blobs.map((blob, index) => (
        <div
          key={index}
          className="absolute [mix-blend-mode:screen]"
          style={{
            width: `${blob.width}vmax`,
            height: `${blob.height}vmax`,
            borderRadius: '50%',
            transform: `translate(${blob.x}px, ${blob.y}px) translate(-50%, -50%) rotate(${blob.rotation}deg)`,
            background: `radial-gradient(ellipse at center, rgba(${blob.color}, 0.85) 0%, rgba(${blob.color}, 0) 70%)`,
            transition: 'transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1)'
          }}
        />
      ))}

      {/* Add a subtle overlay to enhance the blend between blobs */}
      <div className="absolute inset-0 bg-[#000005] opacity-10"></div>
    </div>
  );
}