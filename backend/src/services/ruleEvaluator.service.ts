import { Node } from '../types/ruleEngine';

export class RuleEvaluatorService {
  public evaluate(node: Node, data: Record<string, any>): boolean {
    if (node.type === 'operator') {
      const leftResult = this.evaluate(node.left!, data);
      const rightResult = this.evaluate(node.right!, data);

      switch (node.operator) {
        case 'AND':
          return leftResult && rightResult;
        case 'OR':
          return leftResult || rightResult;
        default:
          throw new Error(`Unknown operator: ${node.operator}`);
      }
    }

    if (node.type === 'operand') {
      const fieldValue = data[node.field!];
      
      switch (node.operator) {
        case '>':
          return fieldValue > node.value;
        case '<':
          return fieldValue < node.value;
        case '=':
          return fieldValue === node.value;
        case '>=':
          return fieldValue >= node.value;
        case '<=':
          return fieldValue <= node.value;
        default:
          throw new Error(`Unknown comparison operator: ${node.operator}`);
      }
    }

    throw new Error('Invalid node type');
  }

  public combineRules(rules: Node[]): Node {
    if (rules.length === 0) {
      throw new Error('No rules to combine');
    }
    if (rules.length === 1) {
      return rules[0];
    }

    // Combine rules with AND operator
    return rules.reduce((combined, rule) => ({
      type: 'operator',
      operator: 'AND',
      left: combined,
      right: rule
    }));
  }
}