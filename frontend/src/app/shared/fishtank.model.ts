 export class Fishtank { 
    public id: number;
    public userId: number;
    public tankName: string; 
    public length: number;
    public height: number; 
    public depth: number; 
    public ph: number; 
    public dh: number; 
    public temperature: number;
    public fishesInTank: string[] =[];
  
    constructor(userId: number, tankName: string, length: number, height: number, depth: number, ph?: number, dh?: number, temperature?: number, fishesInTank?: string[]) {
      this.userId = userId;
      this.tankName = tankName;
      this.length = length;
      this.height = height;
      this.depth = depth;
      this.ph = ph;
      this.dh = dh;
      this.temperature = temperature;
      this.fishesInTank = fishesInTank;
    } 
  }