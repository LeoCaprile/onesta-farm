export interface Variety {
  id: string;
  name: string;
}

export interface Commodity {
  id: string;
  name: string;
  varieties: Variety[];
}
