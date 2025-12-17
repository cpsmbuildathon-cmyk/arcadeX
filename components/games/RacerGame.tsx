import React, { useRef, useEffect, useState } from 'react';

const RacerGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameState = useRef({
    lane: 1, // 0: Left, 1: Center, 2: Right
    playerY: 450,
    cars: [] as { lane: number, y: number, color: string }[],
    speed: 5,
    score: 0,
    running: true
  });

  const laneX = [100, 200, 300];

  const resetGame = () => {
    gameState.current = {
      lane: 1,
      playerY: 450,
      cars: [],
      speed: 5,
      score: 0,
      running: true
    };
    setScore(0);
    setGameOver(false);
  };

  const moveLeft = () => {
    if (gameState.current.lane > 0) gameState.current.lane--;
  };

  const moveRight = () => {
    if (gameState.current.lane < 2) gameState.current.lane++;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    const render = () => {
      if (!gameState.current.running) return;
      frameCount++;
      const state = gameState.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw Road
      ctx.fillStyle = '#333';
      ctx.fillRect(50, 0, 300, height);
      
      // Draw Lane markers
      ctx.strokeStyle = '#fff';
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(150, 0);
      ctx.lineTo(150, height);
      ctx.moveTo(250, 0);
      ctx.lineTo(250, height);
      ctx.stroke();

      // Spawn Enemy Cars
      if (frameCount % Math.max(30, 100 - Math.floor(state.score / 50)) === 0) {
         state.cars.push({
           lane: Math.floor(Math.random() * 3),
           y: -60,
           color: ['#ef4444', '#eab308', '#a855f7'][Math.floor(Math.random() * 3)]
         });
      }

      // Draw Player Car
      const playerX = laneX[state.lane] - 20; // Center in lane
      ctx.fillStyle = '#0ea5e9'; // Sky Blue
      ctx.shadowColor = '#0ea5e9';
      ctx.shadowBlur = 10;
      ctx.fillRect(playerX, state.playerY, 40, 70);
      ctx.shadowBlur = 0;

      // Draw Enemy Cars & Logic
      state.cars.forEach((car, index) => {
        car.y += state.speed;
        const carX = laneX[car.lane] - 20;
        
        ctx.fillStyle = car.color;
        ctx.fillRect(carX, car.y, 40, 70);

        // Collision
        if (
          state.lane === car.lane &&
          state.playerY < car.y + 70 &&
          state.playerY + 70 > car.y
        ) {
          state.running = false;
          setGameOver(true);
        }

        // Cleanup
        if (car.y > height) {
          state.cars.splice(index, 1);
          state.score += 10;
          setScore(state.score);
          if (state.score % 200 === 0) state.speed += 1;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.current.running) return;
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 p-4">
      <div className="mb-4 flex justify-between w-full max-w-[400px] text-white arcade-font">
        <span>Neon Racer</span>
        <span>Score: {score}</span>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={600}
          className="bg-green-900 border-4 border-yellow-500 rounded-lg shadow-lg"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 md:hidden">
            <button onClick={moveLeft} className="w-16 h-16 bg-white/20 rounded-full text-white text-2xl">←</button>
            <button onClick={moveRight} className="w-16 h-16 bg-white/20 rounded-full text-white text-2xl">→</button>
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <h2 className="text-3xl text-yellow-500 font-bold mb-4 arcade-font">CRASHED</h2>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded arcade-font"
            >
              RACE AGAIN
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-gray-400 text-sm hidden md:block">Use Arrow Left/Right to Steer</p>
    </div>
  );
};

export default RacerGame;
