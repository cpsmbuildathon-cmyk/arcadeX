import React, { useState } from 'react';
import { generateScaryStory } from '../../services/geminiService';

const ScaryGame: React.FC = () => {
  const [story, setStory] = useState("You are trapped in the gloomy halls of High School 666 after detention. The Evil Teacher, Ms. T, is roaming the corridors. You hear footsteps nearby. What do you do?");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleAction = async () => {
    if (!input.trim()) return;
    setLoading(true);
    
    const newHistory = [...history, story];
    setHistory(newHistory);
    
    // Call Gemini for the next part of the story
    const nextScene = await generateScaryStory(story, input);
    
    setStory(nextScene);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black border border-red-900 rounded-lg shadow-2xl h-full flex flex-col">
      <h2 className="text-3xl text-red-600 font-bold mb-6 arcade-font text-center animate-pulse">
        Escape the Teacher
      </h2>
      
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 p-4 bg-gray-900 rounded border border-gray-800">
        <p className="text-gray-400 italic text-sm">Previous...</p>
        {history.slice(-2).map((h, i) => (
           <p key={i} className="text-gray-500 text-sm border-l-2 border-gray-700 pl-2">{h.substring(0, 100)}...</p>
        ))}
        
        <div className="text-lg text-gray-200 leading-relaxed font-mono">
           {loading ? <span className="animate-pulse text-red-500">Listening for footsteps...</span> : story}
        </div>
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAction()}
          placeholder="Ex: Hide in locker, Run to gym..."
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border border-gray-700"
          disabled={loading}
        />
        <button 
          onClick={handleAction}
          disabled={loading}
          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded font-bold transition-colors disabled:opacity-50"
        >
          ACT
        </button>
      </div>
    </div>
  );
};

export default ScaryGame;
