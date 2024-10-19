# Rule Engine API

A flexible and powerful rule engine built with Node.js, TypeScript, Express, and MongoDB. This system allows you to create, combine, and evaluate complex business rules using Abstract Syntax Trees (AST).

## Features

- 🌳 AST-based rule representation
- 🔄 Dynamic rule creation and combination
- ✨ Flexible rule evaluation
- 🚀 RESTful API
- 📝 MongoDB persistence
- 🔍 Type-safe implementation with TypeScript
- ⚡ Express.js for efficient routing
- 🛡️ Input validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mysteryhawk17/rule-engine-ast.git
cd rule-engine-ast/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rule-engine
```

4. Build the TypeScript code:

```bash
npm run build
```

5. Start the server:

```bash
npm start
```

6. You can also run the server in watch mode

```bash
npm run dev
```

## Project Structure

```
src/
├── index.ts                 # Application entry point
├── types/                 # TypeScript type definitions
│   └── ruleEngine.d.ts
├── models/               # MongoDB models
│   └── Rule.ts
├── services/            # Business logic
│   ├── ruleParser.service.ts
│   └── ruleEvaluator.service.ts
├── controllers/         # Route controllers
│   └── ruleController.ts
├── middleware/          # Custom middleware
│   └── validateRequest.ts
└── routes/             # API routes
    └── rule.routes.ts
```

## API Endpoints

### Create Rule

```http
POST /api/rules
Content-Type: application/json

{
  "name": "Sales Rule",
  "description": "Rule for sales department",
  "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
}
```

### Get All Rules

```http
GET /api/rules
```

### Get Rule by ID

```http
GET /api/rules/:id
```

### Delete Rule

```http
DELETE /api/rules/:id
```

### Evaluate Rule

```http
POST /api/rules/evaluate
Content-Type: application/json

{
  "ruleId": "64f5a2b1e2b5c21234567890",
  "data": {
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 3
  }
}
```

### Combine Rules

```http
POST /api/rules/combine
Content-Type: application/json

{
  "ruleIds": ["64f5a2b1e2b5c21234567890", "64f5a2b1e2b5c21234567891"]
}
```

## Rule String Syntax

The rule engine accepts rule strings in the following format:

```
((condition1 AND condition2) OR (condition3 AND condition4)) AND condition5
```

Where conditions can be:

- Comparisons: `>`, `<`, `=`, `>=`, `<=`
- Logical operators: `AND`, `OR`
- Field references: `age`, `department`, `salary`, etc.
- Values: numbers or strings (strings must be in single quotes)

Example rule strings:

```
"((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
"((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
}
```

## Development

1. Run in development mode:

```bash
npm run dev
```

2. Run tests:

```bash
npm test
```

3. Lint code:

```bash
npm run lint
```


## Performance Considerations

- The rule engine uses AST for efficient rule evaluation
- MongoDB indexes are created for frequently queried fields
- Rule combination is optimized to minimize redundant checks

## Security

- Input validation for all API endpoints
- MongoDB injection prevention
- Rate limiting (to be implemented)
- Request size limiting
- Proper error message sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- MongoDB for the database
- Express.js team
- TypeScript team
- Node.js community
