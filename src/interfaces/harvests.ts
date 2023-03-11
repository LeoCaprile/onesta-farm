export interface Grower {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

export interface Farm {
  id: string;
  name: string;
  address: string;
}

export interface Client {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

export interface Commodity {
  id: string;
  name: string;
}

export interface Variety {
  id: string;
  name: string;
}

export interface Harvests {
  id: string;
  grower: Grower;
  farm: Farm;
  client: Client;
  commodity: Commodity;
  variety: Variety;
  createdAt: string;
}

export interface HarvestsAdapted {
  id: string;
  grower: string;
  farm: string;
  client: string;
  commodity: string;
  variety: string;
  createdAt: string;
}
