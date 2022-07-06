export type Dish = {
  id: string;
  item: string;
  code: number;
  price: number;
  ingredients: string;
  kind: string;
  quantity: number;
  restaurant_id: Restaurant["id"];
}

type Location = {
  lat: number;
  long: number;
}

export type Restaurant = {
  id: number;
  name: string;
  locations: Location[];
}
