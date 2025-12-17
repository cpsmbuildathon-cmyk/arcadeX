import React, { useRef, useEffect, useState, useCallback } from 'react';

const RunnerGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameState = useRef({
    playerY: 200,
    velocity: 0,
    gravity: 0.6,
    jumpStrength: -12,
    isJumping: false,
    obstacles: [] as { x: number, width: number, height: number }[],
    speed: 5,
    score: 0,
    running: true
  });

  const resetGame = () => {
    gameState.current = {
      playerY: 200,
      velocity: 0,
      gravity: 0.6,
      jumpStrength: -12,
      isJumping: false,
      obstacles: [],
      speed: 5,
      score: 0,
      running: true
    };
    setScore(0);
    setGameOver(false);
  };

  const jump = useCallback(() => {
    if (!gameState.current.isJumping && gameState.current.running) {
      gameState.current.velocity = gameState.current.jumpStrength;
      gameState.current.isJumping = true;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      if (!gameState.current.running) return;

      const state = gameState.current;
      const width = canvas.width;
      const height = canvas.height;
      const groundHeight = 50;

      // Physics
      state.velocity += state.gravity;
      state.playerY += state.velocity;

      // Ground Collision
      if (state.playerY > height - groundHeight - 40) { // 40 is player height
        state.playerY = height - groundHeight - 40;
        state.velocity = 0;
        state.isJumping = false;
      }

      // Obstacle Spawning
      if (Math.random() < 0.015) {
        state.obstacles.push({
          x: width,
          width: 30,
          height: 40 + Math.random() * 30
        });
      }

      // Logic & Drawing
      ctx.clearRect(0, 0, width, height);

      // Draw Ground
      ctx.fillStyle = '#10b981'; // Emerald
      ctx.fillRect(0, height - groundHeight, width, groundHeight);

      // Draw Player
      ctx.fillStyle = '#3b82f6'; // Blue
      ctx.fillRect(50, state.playerY, 30, 40);

      // Draw Obstacles
      ctx.fillStyle = '#ef4444'; // Red
      state.obstacles.forEach((obs, index) => {
        obs.x -= state.speed;
        ctx.fillRect(obs.x, height - groundHeight - obs.height, obs.width, obs.height);

        // Collision Detection
        if (
          50 < obs.x + obs.width &&
          50 + 30 > obs.x &&
          state.playerY + 40 > height - groundHeight - obs.height
        ) {
          state.running = false;
          setGameOver(true);
        }

        // Cleanup
        if (obs.x + obs.width < 0) {
          state.obstacles.splice(index, 1);
          state.score += 10;
          setScore(state.score);
          if (state.score % 100 === 0) state.speed += 0.5;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') jump();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [jump]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4">
      <div className="mb-4 flex justify-between w-full max-w-[600px] text-white arcade-font">
        <span>Urban Sprinter</span>
        <span>Score: {score}</span>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="bg-gray-800 border-4 border-blue-500 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          onClick={jump}
        />
        {gameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg">
            <h2 className="text-3xl text-red-500 font-bold mb-4 arcade-font">WASTED</h2>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded arcade-font transition-all"
            >
              TRY AGAIN
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-gray-400 text-sm">Tap screen or Press Space/Arrow Up to Jump</p>
    </div>
  );
};

export default RunnerGame;
