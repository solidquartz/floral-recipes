import { Arrangement } from "./arrangement";

export type Project = {
  id: number;
  name: string;
  event_date: string;
	arrangements: Arrangement[];
	last_updated: string;
};
