import mongoose, { Schema, Document } from 'mongoose';
import { Rule } from '../types/ruleEngine';


const NodeSchema = new Schema({
  type: { type: String, required: true, enum: ['operator', 'operand'] },
  operator: { type: String, enum: ['AND', 'OR', '>', '<', '=', '>=', '<='] },
  left: { type: Schema.Types.Mixed },
  right: { type: Schema.Types.Mixed },
  field: String,
  value: Schema.Types.Mixed
});

const RuleSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  ast: { type: NodeSchema, required: true },
}, { timestamps: true });

export default mongoose.model<Rule & Document>('Rule', RuleSchema);