// interface Block {
//   className: string;
//   classLocation: string;
//   teacher: string;
//   description: string;
//   type?: BlockType;
// }

// type BlockType = "mandatory" | "pep-rally" | "cte-priority";
export type BlockColor = BlockType | (undefined | "default");

export interface Block {
  openSeats: number;
  date: Date;
  description: string;
  id: string;
  location: string;
  currentStudents: number;
  maxStudents: number;
  name: string;
  teacher: {
    email?: string;
    name: string;
  };
  type: BlockType;
  waitlisted?: boolean;
}

export enum BlockType {
  CtePriority = "CTE_PRIORITY",
  Mandatory = "MANDATORY",
  Normal = "NORMAL",
  PepRally = "PEP_RALLY",
}

export interface Profile {
  name: string;
  cellconfirmed: string;
  email: string;
  school_id: string;
  cellnumber: null;
  carrier: null;
  carrierid: null;
  txtonconfirm: string;
  lastname: string;
  firstname: string;
  administrator: string;
  teacher: string;
  student: string;
  active: string;
  frontrow: string;
  locationid: null;
  id: string;
  canRequest: string;
  canText: string;
  defaultPeriod: string;
  autoroster: string;
  emailnotificationoption: string;
  daysSinceSync: string;
  virtuallink: null;
  maxhotspots: string;
}
