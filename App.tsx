import React, { useState } from 'react';
import { Game, GameType } from './types';
import RunnerGame from './components/games/RunnerGame';
import RacerGame from './components/games/RacerGame';
import SudokuGame from './components/games/SudokuGame';
import ScaryGame from './components/games/ScaryGame';
import ChatAssistant from './components/ChatAssistant';
import GameCard from './components/GameCard';

const GAMES: Game[] = [
  {
    id: 'runner',
    title: 'Urban Sprinter',
    description: 'Jump over obstacles and dash through the city in this endless runner inspired by subway classics.',
    type: GameType.ARCADE,
    thumbnail: '🏃',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'racer',
    title: 'Neon Racer',
    description: 'High speed lane-switching action. Avoid traffic and survive as long as you can.',
    type: GameType.RACING,
    thumbnail: '🏎️',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'sudoku',
    title: 'Logic Master',
    description: 'Classic Sudoku puzzle to train your brain. Features simple validation and clean UI.',
    type: GameType.PUZZLE,
    thumbnail: '🧩',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'scary',
    title: 'Escape The Teacher',
    description: 'A text-based AI horror adventure. Make choices to survive the haunted school.',
    type: GameType.ADVENTURE,
    thumbnail: '👻',
    color: 'from-red-900 to-red-600'
  }
];

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const renderGame = () => {
    switch (activeGame?.id) {
      case 'runner': return <RunnerGame />;
      case 'racer': return <RacerGame />;
      case 'sudoku': return <SudokuGame />;
      case 'scary': return <ScaryGame />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setActiveGame(null)}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded transform rotate-45 group-hover:rotate-0 transition-transform"></div>
            <h1 className="text-2xl font-bold tracking-tighter arcade-font bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ARCADE<span className="text-cyan-500">X</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Top Rated</a>
            <a href="#" className="hover:text-white transition-colors">New</a>
            <a href="#" className="hover:text-white transition-colors">Community</a>
          </nav>
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {activeGame ? (
          <div className="h-[80vh] w-full max-w-5xl mx-auto bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setActiveGame(null)}
              className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur text-sm font-bold flex items-center gap-2 transition-colors"
            >
              ← BACK TO HUB
            </button>
            {renderGame()}
          </div>
        ) : (
          <>
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 arcade-font text-white">
                Next Level <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Gaming</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Dive into a curated collection of instant-play arcade classics and AI-powered adventures. No downloads required.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GAMES.map(game => (
                <GameCard key={game.id} game={game} onSelect={setActiveGame} />
              ))}
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8">
              <h3 className="text-xl font-bold mb-6 text-gray-300 arcade-font">Categories</h3>
              <div className="flex gap-4 flex-wrap">
                {Object.values(GameType).map(type => (
                  <span key={type} className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer transition-colors border border-gray-700">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-gray-800 bg-gray-900 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 ArcadeX. Built for Vercel.</p>
      </footer>

      <ChatAssistant />
    </div>
  );
};

export default App;
