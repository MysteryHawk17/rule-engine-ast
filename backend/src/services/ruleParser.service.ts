import { Node, Operator } from '../types/ruleEngine';

export class RuleParserService {
  private pos: number = 0;
  private input: string = '';

  public parse(ruleString: string): Node {
    this.pos = 0;
    this.input = ruleString.replace(/\s+/g, ' ').trim();
    return this.parseExpression();
  }

  private parseExpression(): Node {
    let left = this.parseTerm();

    while (this.pos < this.input.length) {
      const operator = this.parseOperator();
      if (!operator) break;

      const right = this.parseTerm();
      left = {
        type: 'operator',
        operator: operator as Operator,
        left,
        right
      };
    }

    return left;
  }

  private parseTerm(): Node {
    this.consumeWhitespace();

    if (this.input[this.pos] === '(') {
      this.pos++; // Skip '('
      const node = this.parseExpression();
      this.pos++; // Skip ')'
      return node;
    }

    // Parse field comparison
    const field = this.parseIdentifier();
    this.consumeWhitespace();
    const operator = this.parseComparisonOperator();
    this.consumeWhitespace();
    const value = this.parseValue();

    return {
      type: 'operand',
      operator: operator as Operator,
      field,
      value
    };
  }

  private parseIdentifier(): string {
    this.consumeWhitespace();
    let identifier = '';
    while (this.pos < this.input.length && /[a-zA-Z_]/.test(this.input[this.pos])) {
      identifier += this.input[this.pos++];
    }
    return identifier;
  }

  private parseOperator(): string | null {
    this.consumeWhitespace();
    if (this.input.startsWith('AND', this.pos)) {
      this.pos += 3;
      return 'AND';
    }
    if (this.input.startsWith('OR', this.pos)) {
      this.pos += 2;
      return 'OR';
    }
    return null;
  }

  private parseComparisonOperator(): string {
    this.consumeWhitespace();
    let operator = '';
    while (this.pos < this.input.length && /[><=]/.test(this.input[this.pos])) {
      operator += this.input[this.pos++];
    }
    return operator;
  }

  private parseValue(): any {
    this.consumeWhitespace();
    if (this.input[this.pos] === "'") {
      this.pos++; // Skip opening quote
      let value = '';
      while (this.pos < this.input.length && this.input[this.pos] !== "'") {
        value += this.input[this.pos++];
      }
      this.pos++; // Skip closing quote
      return value;
    }
    
    let value = '';
    while (this.pos < this.input.length && /[0-9.]/.test(this.input[this.pos])) {
      value += this.input[this.pos++];
    }
    return Number(value);
  }

  private consumeWhitespace(): void {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }
}
