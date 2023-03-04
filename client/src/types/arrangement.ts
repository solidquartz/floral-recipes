export type ArrangedFlower = {
  flower_id: number;
  stem_quantity: string;
};

export type Arrangement = {
  id: number;
  arrangement_name: string;
  arrangement_quantity: number;
  flowers: ArrangedFlower[];
};
