const express = require("express")
const mongoose = require("mongoose")
//mongoose.connect('mongodb://localhost/users_test');
require("../models/Blogmodel")
const appconfig = require("../config/appconfig")
const blogController = require("../controllers/blogController")
const auth = require("../middlewares/auth")

let app = express()

let setRouter = (app) => {
  let baseUrl = appconfig.apiVersion + "/blogs"
  //all the routes
  app.get(baseUrl + "/all", auth.isAuthenticated, blogController.getAllBlog)
  app.get(
    baseUrl + "/view/:blogId",
    auth.isAuthenticated,
    blogController.viewByBlogId
  )
  app.get(
    baseUrl + "/view/by/author/:author",
    auth.isAuthenticated,
    blogController.viewByAuthor
  )
  app.get(
    baseUrl + "/view/by/category/:category",
    auth.isAuthenticated,
    blogController.viewByCategory
  )
  app.post(
    baseUrl + "/:blogId/delete",
    auth.isAuthenticated,
    blogController.deleteBlog
  )
  app.post(
    baseUrl + "/deleteAll",
    auth.isAuthenticated,
    blogController.deleteAllBlog
  )
  app.put(
    baseUrl + "/:blogId/edit",
    auth.isAuthenticated,
    blogController.editBlog
  )
  app.post(baseUrl + "/create", auth.isAuthenticated, blogController.createBlog)
  app.get(
    baseUrl + "/:blogId/count/view",
    auth.isAuthenticated,
    blogController.increaseBlogView
  )
}

module.exports = {
  setRouter: setRouter,
}
