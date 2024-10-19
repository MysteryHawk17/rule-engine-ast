import { useEffect, useState } from "react";
import { Rule } from "./types/rule.types";
import { api } from "./services/api";
import { RuleBuilder } from "./components/RuleBuilder";
import { RulesList } from "./components/RuleList";
import { RuleEvaluator } from "./components/RuleEvaluator";

export const App = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    const response = await api.getAllRules();
    setRules(response.data);
  };

  const handleCreateRule = async (data: {
    name: string;
    description: string;
    ruleString: string;
  }) => {
    try {
      await api.createRule(data);
      loadRules();
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const handleDeleteRule = async (id: string) => {
    try {
      await api.deleteRule(id);
      loadRules();
    } catch (error) {
      console.error("Error deleting rule:", error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEvaluate = async (data: Record<string, any>) => {
    if (!selectedRule) return;

    try {
      const response = await api.evaluateRule(selectedRule._id, data);
      setEvaluationResult(response.data);
    } catch (error) {
      console.error("Error evaluating rule:", error);
    }
  };

  const handleCombineRules = async (data: string[]) => {
  
    if (data.length < 2) {
      return;
    }
    try {
      await api.combineRules(data);
      loadRules();
    } catch (error) {
      console.error("Error combining rules:", error);
    }
  };

  return (
    <div className="min-h-screen  m-10">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Rule Engine</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <RuleBuilder onSubmit={handleCreateRule} />
          </div>

          <div className="space-y-8">
            <RulesList
              rules={rules}
              onDelete={handleDeleteRule}
              onSelect={setSelectedRule}
              onCombine={handleCombineRules}
            />

            {selectedRule && (
              <RuleEvaluator rule={selectedRule} onEvaluate={handleEvaluate} />
            )}

            {evaluationResult && (
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Evaluation Result</h2>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-lg">
                    Result: {evaluationResult.result ? "Passed" : "Failed"}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Evaluated at:{" "}
                    {new Date(evaluationResult.evaluatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
