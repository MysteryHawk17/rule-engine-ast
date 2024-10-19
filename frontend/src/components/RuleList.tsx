import { useState } from "react";
import { Rule } from "../types/rule.types";

interface RulesListProps {
  rules: Rule[];
  onDelete: (id: string) => void;
  onSelect: (rule: Rule) => void;
  onCombine: (ruleIds: string[]) => void;
}

export const RulesList = ({
  rules,
  onDelete,
  onSelect,
  onCombine,
}: RulesListProps) => {
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([]);

  const handleCheckboxChange = (ruleId: string) => {
    if (selectedRuleIds.includes(ruleId)) {
      setSelectedRuleIds(selectedRuleIds.filter((id) => id !== ruleId));
    } else {
      setSelectedRuleIds([...selectedRuleIds, ruleId]);
    }
  };

  const handleCombineRules = () => {
    onCombine(selectedRuleIds);
    setSelectedRuleIds([]);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Rules</h2>
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule._id} className="p-4 border rounded hover:bg-gray-50">
              <div className="flex flex-col gap-10 md:ustify-between items-start">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="mr-4 mt-1"
                    checked={selectedRuleIds.includes(rule._id)}
                    onChange={() => handleCheckboxChange(rule._id)}
                  />
                  <div>
                    <h3 className="font-semibold">{rule.name}</h3>
                    {rule.description && (
                      <p className="text-gray-600 text-sm mt-1">
                        {rule.description}
                      </p>
                    )}
                    <p className="text-gray-500 text-xs mt-2">
                      Created: {new Date(rule.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelect(rule)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => onDelete(rule._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleCombineRules}
          disabled={selectedRuleIds.length < 2}
          className={`mt-6 px-4 py-2 rounded text-white ${
            selectedRuleIds.length < 2
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Combine Selected Rules
        </button>
      </div>
    </div>
  );
};
