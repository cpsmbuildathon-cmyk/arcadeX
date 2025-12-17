import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(game)}
      className="group relative h-64 w-full bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-[0_0_25px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-white/20"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
      
      <div className="absolute top-4 right-4">
         <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-black/50 rounded backdrop-blur-sm text-white border border-white/10">
           {game.type}
         </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
        <h3 className="text-xl font-bold text-white mb-1 arcade-font group-hover:text-cyan-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300">
          {game.description}
        </p>
        <div className="mt-4 flex items-center text-cyan-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          PLAY NOW <span className="ml-2">→</span>
        </div>
      </div>
      
      {/* Thumbnail Placeholder */}
      <div className="w-full h-1/2 flex items-center justify-center text-6xl opacity-50 group-hover:scale-110 transition-transform duration-500">
        {game.thumbnail}
      </div>
    </div>
  );
};

export default GameCard;
