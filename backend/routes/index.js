const express = require("express")
const router = express.Router()
const passport = require("passport")
const usersValidators = require("../controllers/usersValidators")
const isAdmin = require("../controllers/isAdmin")
const usersControllers = require("../controllers/usersControllers")
const articlesControllers = require("../controllers/articlesControllers")
const articlesUtilitiesControllers = require("../controllers/articlesUtilitiesControllers")

// USERS ROUTES
router.route("/login").post(usersControllers.logIn)
router
  .route("/signup")
  .post(usersValidators.signUpValidator, usersControllers.signUp)

router
  .route("/user/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersValidators.updateAccountValidator,
    usersControllers.updateAccount
  )

router.route("/users").get(usersControllers.getAccounts)

// USER DIRECTIONS ROUTES
router
  .route("/user/directions")
  .post(
    usersValidators.addDirectionsValidator,
    passport.authenticate("jwt", { session: false }),
    usersControllers.addDirection
  )

router
  .route("/user/direction/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersControllers.updateDirection
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    usersControllers.deleteDirection
  )

// articles routers
router.route("/articles").get(articlesControllers.getAllArticles)

router
  .route("/article/:id")
  .get(articlesControllers.getArticle)
  .put(articlesControllers.updateArticle)
  .delete(articlesControllers.deleteArticle)

router.route("/article").post(articlesControllers.addArticle)

// ARTICLESUTILS ROUTES
router
  .route("/utils")
  .get(articlesUtilitiesControllers.getArticlesUtilities)
  .post(
    // passport.authenticate("jwt", { session: false }),
    // isAdmin,
    articlesUtilitiesControllers.addArticlesUtility
  )

router
  .route("/util/:id")
  .put(
    // passport.authenticate("jwt", { session: false }),
    // isAdmin,
    articlesUtilitiesControllers.updateArticlesUtility
  )
  .delete(
    // passport.authenticate("jwt", { session: false }),
    // isAdmin,
    articlesUtilitiesControllers.deleteArticlesUtility
  )

module.exports = router
