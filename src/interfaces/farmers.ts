export interface Farm {
  id: string;
  name: string;
  address: string;
}

export interface Grower {
  id: string;
  name: string;
  lastName: string;
  email: string;
  farms: Farm[];
}
