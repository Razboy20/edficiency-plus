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
  __typename?: "Block";
  currentStudents: number;
  date: Date;
  description: string;
  id: string;
  location: string;
  maxStudents: number;
  name: string;
  teacher: {
    email: string;
    id: string;
    name: string;
    __typename?: "Teacher";
    block?: Block;
    blocks: Array<Block>;
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
