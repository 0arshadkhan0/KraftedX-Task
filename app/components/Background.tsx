'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

export default function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Each blob's position
  const blob1X = useMotionValue(100);
  const blob1Y = useMotionValue(200);
  const blob2X = useMotionValue(800);
  const blob2Y = useMotionValue(150);
  const blob3X = useMotionValue(400);
  const blob3Y = useMotionValue(500);
  const blob4X = useMotionValue(600);  // New blob
  const blob4Y = useMotionValue(300);  // New blob

  // Smooth mouse tracking with a faster and more fluid spring
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150 });  // Faster spring for better responsiveness
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150 });  // Faster spring for better responsiveness

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Helper function to prevent overlap between blobs with quick, smooth separation
  const preventOverlap = (bx1: any, by1: any, bx2: any, by2: any, minDist: number) => {
    const x1 = bx1.get();
    const y1 = by1.get();
    const x2 = bx2.get();
    const y2 = by2.get();

    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDist) {
      // Stronger separation force but smooth transition
      const angle = Math.atan2(dy, dx);
      const overlap = minDist - distance;
      const moveX = Math.cos(angle) * (overlap * 0.15);  // Stronger separation force (adjusted)
      const moveY = Math.sin(angle) * (overlap * 0.15);  // Stronger separation force (adjusted)

      // Smooth the separation with spring effects for quick, fluid movement
      bx1.set(x1 - moveX);
      by1.set(y1 - moveY);
      bx2.set(x2 + moveX);
      by2.set(y2 + moveY);
    }
  };

  // Animation frame updates with faster and fluid blob movement
  useAnimationFrame((t) => {
    const cx = smoothX.get();
    const cy = smoothY.get();

    const updateBlob = (bx: any, by: any, speed: number, baseX: number, baseY: number) => {
      const x = bx.get();
      const y = by.get();

      const dx = cx - x;
      const dy = cy - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Floating pattern with more dynamic, fluid-like motion
      const floatX = baseX + Math.sin(t / 500 + baseX) * 60 + Math.cos(t / 600 + baseX) * 40;
      const floatY = baseY + Math.cos(t / 600 + baseY) * 60 + Math.sin(t / 700 + baseY) * 40;

      if (distance < 250) {
        // Attract toward cursor with faster strength for more responsiveness
        const strength = 0.1;  // Increased strength for faster movement
        bx.set(x + dx * strength);
        by.set(y + dy * strength);
      } else {
        // Return to float pattern if not near cursor
        bx.set(floatX);
        by.set(floatY);
      }
    };

    updateBlob(blob1X, blob1Y, 0.5, 100, 200);
    updateBlob(blob2X, blob2Y, 0.3, 800, 150);
    updateBlob(blob3X, blob3Y, 0.4, 400, 500);
    updateBlob(blob4X, blob4Y, 0.35, 600, 300);

    // Prevent blobs from overlapping by checking distances and applying stronger separation force
    const minDist = 150; // Minimum distance between blobs
    preventOverlap(blob1X, blob1Y, blob2X, blob2Y, minDist);
    preventOverlap(blob1X, blob1Y, blob3X, blob3Y, minDist);
    preventOverlap(blob1X, blob1Y, blob4X, blob4Y, minDist);
    preventOverlap(blob2X, blob2Y, blob3X, blob3Y, minDist);
    preventOverlap(blob2X, blob2Y, blob4X, blob4Y, minDist);
    preventOverlap(blob3X, blob3Y, blob4X, blob4Y, minDist);
  });

  const common = 'absolute rounded-full mix-blend-screen blur-3xl opacity-40 pointer-events-none';

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Radial Gradient with Dark Center and Light Outer Edges */}
      <div className="absolute inset-0 bg-gradient-radial from-[#000000] via-transparent to-[#000000] opacity-50">
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className={`${common} w-[600px] h-[600px] bg-[#7f00ff]`}  // Made this blob bigger
      />
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className={`${common} w-[400px] h-[400px] bg-[#3f00ff]`}
      />
      <motion.div
        style={{ x: blob3X, y: blob3Y }}
        className={`${common} w-[450px] h-[450px] bg-[#9900ff]`}
      />
      <motion.div
        style={{ x: blob4X, y: blob4Y }}
        className={`${common} w-[450px] h-[450px] bg-[#ff00cc]`}  // New color for the new blob
      />
    </div>
  );
}
