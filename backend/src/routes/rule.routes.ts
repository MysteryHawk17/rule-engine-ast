import { Router } from 'express';
import { validateObjectId } from '../middlewares/validateRequest';
import { combineRules, createRule, deleteRule, evaluateRule, getAllRules, getRuleById } from '../controllers/ruleController';


const router = Router();

// Base route: /api/rules
router.route('/')
  .post(createRule)
  .get(getAllRules);

router.route('/:id')
  .get(validateObjectId, getRuleById)
  .delete(validateObjectId, deleteRule);

router.post('/evaluate', evaluateRule);
router.post('/combine', combineRules);

export default router;