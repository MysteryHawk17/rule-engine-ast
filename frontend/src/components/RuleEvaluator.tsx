import React, { useState } from "react";
import { Rule } from "../types/rule.types";

interface RuleEvaluatorProps {
  rule: Rule;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEvaluate: (data: Record<string, any>) => void;
}

export const RuleEvaluator = ({ rule, onEvaluate }: RuleEvaluatorProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<Record<string, any>>({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEvaluate(formData);
    
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Evaluate Rule: {rule.name}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Age</label>
            <input
              type="number"
              onChange={(e) => updateField("age", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Department</label>
            <select
              onChange={(e) => updateField("department", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Department</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Salary</label>
            <input
              type="number"
              onChange={(e) => updateField("salary", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Experience (years)</label>
            <input
              type="number"
              onChange={(e) => updateField("experience", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Evaluate
        </button>
      </form>
    </div>
  );
};


