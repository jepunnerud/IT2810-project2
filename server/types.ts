import type { Model, Types, Document, HydratedDocument } from "mongoose";

export interface UserType extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: String;
  password: String;
}

export interface Gametype extends Document {
  _id: string;
  players: Types.ObjectId[];
  completed: boolean;
  winner: Types.ObjectId;
  mostKills: Types.ObjectId;
}

export interface HitOrderType extends Document {
  game: Types.ObjectId;
  player: Types.ObjectId;
  hunting: Types.ObjectId;
}

export interface assassinationType extends Document {
  game: Types.ObjectId;
  player: Types.ObjectId;
  assassinated: Types.ObjectId;
}

export interface assassinationModel
  extends Model<assassinationType, Record<string, never>> {
  getBestKiller(gameId: string): Promise<HydratedDocument<assassinationType>>;
}
