const controller = require("../controllers/authController");
const validator = require("../config/validationbody");

module.exports = (app) => {
  // Set CORS headers for all requests
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * tags:
   *   name: Authentication
   *   description: Endpoint for user login
   */

  /**
   * @swagger
   * /api/auth/signin:
   *   post:
   *     summary: Log in an existing user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 example: johndoe
   *               password:
   *                 type: string
   *                 example: mypassword123
   *     responses:
   *       200:
   *         description: Successful login
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserLoginResponse'
   *       401:
   *         description: Invalid credentials
   *       404:
   *         description: User not found
   *       500:
   *         description: Server error
   */
  app.post("/api/auth/signin", validator.loginValidator, controller.signin);
};
