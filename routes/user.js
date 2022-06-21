const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, postUser, saveUserFromFacebook, saveUserFromGoogle, putUser, deleteUser, patchUser, getUser, registerUser } = require('../controllers/users');
const router = Router();
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/', putUser);

/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: users email
 *              pass:
 *                  type: string
 *                  description: user´s password
 *              secretKey:
 *                  type: string
 *                  description: secret key
 * 
 */

/**
 * @swagger
 * /api/users/register/:
 *  post:
 *      summary: crate new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      $ref: '#/components/schemas/Users'
 *      responses:
 *          200:
 *              description: new User created
 */
router.post('/register/', registerUser)
router.post('/add/', [
    check('name')
        .exists()
        .withMessage('Name is required'),
    check('lastName')
        .exists()
        .isLength({ min: 3 })
        .withMessage('LastName is required'),
    check(
        "pass", "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ).isString()
        .isLength({ min: 8 })
        .not()
        .isLowercase()
        .not()
        .isUppercase()
        .not()
        .isNumeric()
        .not()
        .isAlpha(),
    check('email', 'Email is required').exists()
        .isEmail().withMessage('Invalid email'),
    check('termsAndConditions')
        .exists()
        .withMessage('Terms and conditions is required'),

], postUser);
router.put('/', [
    check('name')
        .exists()
        .withMessage('Name is required'),
    check('photo')
        .exists()
        .withMessage('Photo is required'),
    check('email', 'Email is required').exists()
        .isEmail().withMessage('Invalid email'),
    check('telephone')
        .exists()
        .withMessage('Telephone is required'),

], saveUserFromFacebook);
router.put('/', saveUserFromGoogle);
router.delete('/', deleteUser);
router.patch('/', patchUser);
module.exports = router;