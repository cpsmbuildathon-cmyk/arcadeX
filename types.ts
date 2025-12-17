export enum GameType {
  ARCADE = 'ARCADE',
  PUZZLE = 'PUZZLE',
  ADVENTURE = 'ADVENTURE',
  RACING = 'RACING'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  type: GameType;
  thumbnail: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
