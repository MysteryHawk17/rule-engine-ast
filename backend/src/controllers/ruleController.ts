import { Request, Response } from 'express';
import { RuleParserService } from '../services/ruleParser.service';
import { RuleEvaluatorService } from '../services/ruleEvaluator.service';
import RuleModel from '../models/Rule';

const parser = new RuleParserService();
const evaluator = new RuleEvaluatorService();

interface CreateRuleBody {
  name: string;
  description?: string;
  ruleString: string;
}

interface EvaluateRuleBody {
  ruleId: string;
  data: Record<string, any>;
}

interface CombineRulesBody {
  ruleIds: string[];
}

export const createRule = async (req: Request<{}, {}, CreateRuleBody>, res: Response) => {
  try {
    const { name, description, ruleString } = req.body;
    if (!ruleString || !name) {
      res.status(400).json({ 
        error: 'Rule string and name are required',
        details: {
          name: !name ? 'Name is required' : null,
          ruleString: !ruleString ? 'Rule string is required' : null
        }
      });
      return;
    }

    const ast = parser.parse(ruleString);
    
    const rule = await RuleModel.create({
      name,
      description,
      ast
    });

    res.status(201).json({
      success: true,
      data: rule
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: (error as Error).message 
    });
  }
};

export const evaluateRule = async (req: Request<{}, {}, EvaluateRuleBody>, res: Response) => {
  try {
    const { ruleId, data } = req.body;
    if (!ruleId || !data) {
       res.status(400).json({ 
        success: false,
        error: 'Rule ID and data are required',
        details: {
          ruleId: !ruleId ? 'Rule ID is required' : null,
          data: !data ? 'Data object is required' : null
        }
      });
      return;
    }

    const rule = await RuleModel.findById(ruleId);
    if (!rule) {
       res.status(404).json({ 
        success: false,
        error: 'Rule not found'
      });
      return;
    }

    const result = evaluator.evaluate(rule.ast, data);
    
    res.json({
      success: true,
      data: {
        result,
        ruleId,
        evaluatedAt: new Date()
      }
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: (error as Error).message 
    });
  }
};

export const combineRules = async (req: Request<{}, {}, CombineRulesBody>, res: Response) => {
  try {
    const { ruleIds } = req.body;
    console.log(ruleIds);
    if (!ruleIds || !Array.isArray(ruleIds) || ruleIds.length === 0) {
       res.status(400).json({ 
        success: false,
        error: 'Valid array of rule IDs is required',
        details: {
          ruleIds: !ruleIds ? 'Rule IDs array is required' : 
                  !Array.isArray(ruleIds) ? 'Rule IDs must be an array' :
                  'At least one rule ID is required'
        }
      });
      return;
    }

    const rules = await RuleModel.find({ _id: { $in: ruleIds } });
    
    if (rules.length !== ruleIds.length) {
      const foundIds = rules.map(r => r._id.toString());
      const missingIds = ruleIds.filter(id => !foundIds.includes(id));
      
       res.status(404).json({ 
        success: false,
        error: 'One or more rules not found',
        details: {
          missingRules: missingIds
        }
      });
      return;
    }

    const combinedAst = evaluator.combineRules(rules.map(r => r.ast));
    
    const combinedRule = await RuleModel.create({
      name: `Combined Rule (${rules.map(r => r.name).join(', ')})`,
      description: `Automatically combined rule from IDs: ${ruleIds.join(', ')}`,
      ast: combinedAst
    });

    res.status(201).json({
      success: true,
      data: combinedRule
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: (error as Error).message 
    });
  }
};

export const getAllRules = async (_req: Request, res: Response) => {
  try {
    const rules = await RuleModel.find().select('-ast').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: rules
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: (error as Error).message 
    });
  }
};

export const getRuleById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const rule = await RuleModel.findById(req.params.id);
    
    if (!rule) {
       res.status(404).json({
        success: false,
        error: 'Rule not found'
      });
      return;
    }

    res.json({
      success: true,
      data: rule
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: (error as Error).message 
    });
  }
};

export const deleteRule = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const rule = await RuleModel.findByIdAndDelete(req.params.id);
    
    if (!rule) {
      res.status(404).json({
        success: false,
        error: 'Rule not found'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        message: 'Rule successfully deleted',
        deletedRule: rule
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: (error as Error).message 
    });
  }
};