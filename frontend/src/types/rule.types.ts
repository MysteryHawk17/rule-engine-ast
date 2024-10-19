export interface Rule {
  _id: string;
  name: string;
  description?: string;
  ast: Node;
  createdAt: Date;
  updatedAt: Date;
}

export interface Node {
  type: "operator" | "operand";
  operator?: string;
  left?: Node;
  right?: Node;
  field?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}
