const createBlog = require('./blogController.js')
const getAllBlog = require('./blogController.js')
const viewByBlogId = require('./blogController.js')
const viewByCategory = require('./blogController.js')
const viewByAuthor = require('./blogController.js')
const editBlog = require('./blogController.js')
const increaseBlogView = require('./blogController.js')
const deleteBlog = require('./blogController.js')
const deleteAllBlog = require('./blogController.js')
const getAllComments = require('./blogController.js')
const createComment = require('./blogController.js')
const appconfig = require ('./config/appconfig')
const mongoose = require('mongoose')
const {MongoClient} = require('mongodb');
const blogModel = mongoose.model('Blogmodel');

mongoose.model(name, schema)


 

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.appconfig.db, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.blogAppDb);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  test('the test will create a blog', done => {
    function getAllBlog(req,res) {
      try {
        expect(res).toBe(blogModel.find().select('-_v -_id' ).lean().exec());
        done();
      } catch (error) {
        done(error);
      }
    }
  
    fetchData(getAllBlog(req,res));
  });

});