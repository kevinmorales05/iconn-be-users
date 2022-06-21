const {Router} = require('express');
const { check} = require('express-validator');
const {getTermsConditions, putTermsConditions, deleteTermsConditions} = require('../controllers/termsConditions');
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      TermsConditions:
 *          type: object
 *          properties:
 *              terms_of_use:
 *                  type: string
 *                  description: terms of use
 *              notice_privacy:
 *                  type: integer
 *                  description: notice privacy
 *              createdat:
 *                  type: date
 *                  description: creation date
 *              status:
 *                  type: boolean
 *                  description: terms and conditions status
 */

router.get('/getTermsAndConditions', getTermsConditions);
router.put('/', putTermsConditions);
router.delete('/', deleteTermsConditions);
module.exports = router;