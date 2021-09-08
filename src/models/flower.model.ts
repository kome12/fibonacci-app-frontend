export type Flower = {
  _id: string;
  name: string;
  imageURL: string;
  price: number;
  isActive: boolean;
  isSecret: boolean;
};

export type BuyFlower = {
  fireBaseUserId: string;
  flowerId: string;
  price: number;
};
