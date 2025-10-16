export interface PlayerStats {
  pontos: number;
  rebotes: number;
  assistencias: number;
  roubos: number;
  tocos: number;
  arremessosTentados: number;
  arremessosConvertidos: number;
  arremessos3Tentados: number;
  arremessos3Convertidos: number;
  lancesLivresTentados: number;
  lancesLivresConvertidos: number;
  turnovers: number;
  jogos: number;
  airballs?: number;
  cestas_contra?: number;
}

export interface Player {
  id: string;
  nome: string;
  apelido?: string;
  stats: PlayerStats;
  created_at?: string;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      players: {
        Row: Player;
        Insert: Omit<Player, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Player, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
