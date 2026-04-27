import React from 'react';
import { useSnakeGame, GRID_SIZE } from '../hooks/useSnakeGame';

export const SnakeGame: React.FC = () => {
  const { snake, food, score, gameOver, isPaused, resetGame } = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      
      {/* Absolute Header for Score to match design layout */}
      <div className="absolute top-4 right-4 flex gap-8 z-20 pointer-events-none hidden md:flex">
        <div className="text-right">
          <p className="text-[10px] uppercase text-white/40 tracking-widest">High Score</p>
          <p className="text-xl font-mono text-pink-500">000,420</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase text-white/40 tracking-widest">Current Score</p>
          <p className="text-xl font-mono text-green-400 underline decoration-2 underline-offset-4 pointer-events-auto">
            {score.toString().padStart(6, '0')}
          </p>
        </div>
      </div>
      
      {/* Mobile visible score */}
      <div className="md:hidden flex justify-between w-full max-w-[400px] mb-4">
         <div className="text-left">
           <p className="text-[10px] uppercase text-white/40 tracking-widest">Current Score</p>
           <p className="text-xl font-mono text-green-400 underline decoration-2 underline-offset-4">{score.toString().padStart(6, '0')}</p>
         </div>
      </div>

      <div className="relative">
        {/* Game Board */}
        <div 
          className="grid relative z-10 w-[400px] h-[400px] border border-white/5 bg-transparent"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            
            const isSnakeIndex = snake.findIndex((segment) => segment.x === x && segment.y === y);
            const isHead = isSnakeIndex === 0;
            const isSnake = isSnakeIndex > 0;
            const isFood = food.x === x && food.y === y;

            let cellClass = "bg-transparent w-full h-full";
            
            if (isHead) {
              cellClass = "bg-green-400 shadow-[0_0_15px_#4ade80] z-10 rounded-sm";
            } else if (isSnake) {
              // Fade opacity slightly for tail
              const opacity = Math.max(20, 80 - (isSnakeIndex * 5));
              cellClass = `bg-green-400/${opacity} z-10 rounded-sm`;
            } else if (isFood) {
              cellClass = "bg-pink-500 shadow-[0_0_20px_#ec4899] z-10 rounded-full scale-75";
            }

            return (
              <div key={index} className={cellClass} />
            );
          })}
        </div>

        {/* Overlays */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-30">
            <h3 className="text-4xl font-bold text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,1)] mb-4">SYSTEM FAILURE</h3>
            <p className="text-cyan-400 mb-6 font-mono text-xl text-shadow">Final Score: {score}</p>
            <button 
              onClick={resetGame}
              className="px-6 py-2 bg-transparent border-2 border-green-400 text-green-400 font-bold uppercase tracking-widest hover:bg-green-400 hover:text-black transition-all hover:shadow-[0_0_15px_#4ade80]"
            >
              Restart Protocol
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30">
            <h3 className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,1)] tracking-widest">PAUSED</h3>
          </div>
        )}

        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/10 text-[10px] text-white/60 tracking-wider uppercase whitespace-nowrap z-20">
          Press [Arrows] to Navigate &bull; [Space] to Pause
        </div>
      </div>
    </div>
  );
};
