export interface Farm {
  id: string;
  name: string;
  address: string;
}

export interface Farmer {
  id: string;
  name: string;
  lastName: string;
  email: string;
  farms: Farm[];
}

export interface AdaptedFarmer {
  id: string;
  name: string;
  lastName: string;
  email: string;
  farms: Farm[];
}
