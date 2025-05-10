const verifySignUp = require("../middleware/verifySignup");
const controller = require("../controllers/authController");
const validator = require("../config/validationbody");

module.exports = (app) => {
  // set CORS headers for all requests
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: User successfully registered
   *       400:
   *         description: Duplicate username or email
   *       422:
   *         description: Validation error
   */
  // POST /api/auth/signup
  app.post(
    "/api/auth/signup",
    [
      validator.createUserValidator,              // validate request body
      verifySignUp.checkDuplicateUsernameOrEmail  // check for existing username/email
    ],
    controller.signup
  );

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
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successful login
   *       401:
   *         description: Invalid credentials
   */
  // POST /api/auth/signin
  app.post("/api/auth/signin", validator.loginValidator, controller.signin);
};
