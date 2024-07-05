import { BillDetail, BillPerson } from "./bill";

export interface user {
  name: string;
  consumption: BillDetail[];
  bbumbai: BillPerson[];
}
