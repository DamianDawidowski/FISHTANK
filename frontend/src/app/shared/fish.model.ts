export class Fish {
  public id: number;
  public commonName: String;
  public latinName: String;
  public commonLength: number;
  public pictureLink: String;
  public phMin: number;
  public phMax: number;
  public dhMin: number;
  public dhMax: number;
  public tempMin: number;
  public tempMax: number; 
  public schooling: boolean;
  
  //calmness values
  // 0 - shy, delicate fish, suggested monospecies tank;
  // 1 - shy, less active, may be dominated by aggressive fish during feeding;
  // 2 - normal, or behaviour unknown;
  // 3 - active fish, not aggresive, but may dominate shy fish during feeding;
  // 4 - aggresive and territorial;
  // 5 - predatory and piscivorous;
  // 6 - extremely aggresive, suggested monospecies tank;
  public calmness: number;

  constructor( commonName: string, latinName: string, commonLength: number, pictureLink: string, phMin: number, phMax: number, dhMmin: number, dhmax: number, tempMin: number, tempMax: number, calmness: number, schooling: boolean) {
    this.commonName = commonName;
    this.latinName = latinName;
    this.commonLength = commonLength;
    this.pictureLink = pictureLink;
    this.phMin = phMin;
    this.phMax = phMax;
    this.dhMin = dhMmin;
    this.dhMax = dhmax;
    this.tempMin = tempMin;
    this.tempMax = tempMax; 
    this.calmness = calmness; 
    this.schooling = schooling;
  } 
}
