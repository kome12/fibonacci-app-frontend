export interface Flower {
  _id: string;
  name: string;
  imageURL: string;
  price: number;
  isActive: boolean;
  isSecret: boolean;
}

export interface BuyFlower {
  fireBaseUserId: string;
  flowerId: string;
  price: number;
}
