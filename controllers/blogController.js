const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const response = require('./../libs/responseLib')
const timeLib = require('./../libs/timeLib')
const check = require('./../libs/checkLib')
const blogModel = mongoose.model('Blogmodel')
const commentModel = mongoose.model('Commentmodel')

const today = timeLib.now()


let createBlog = (req,res) => {
  
  let blogId = shortid.generate()
  
  let newBlog = new blogModel({
    title : req.body.title,
    blogId : blogId,
    description : req.body.description,
    bodyHtml : req.body.blogBody,
    isPublished : true,
    category : req.body.category,
    author : req.body.author,
    created: today,
    lastModified : today
  })

let tags = (req.body.tags!= undefined && req.body.tags != null && req.body.tags != '')?req.body.tags.split(","):[]

newBlog.tags = tags
newBlog.save((err,result)=>{if(err) {
  console.log(err)
  let apiResponse = response.generate(true,'Failed to create blog',500,null)
  res.send(apiResponse)
}else{
  console.log("Blog saved successfully")
  let apiResponse = response.generate(false,'Blogs Created successfully',200,result)
  res.send(apiResponse)
  //blogModel.insertOne([{result}])
}
})
}
let viewAllBlog = (req,res) => {
blogModel.find().select('-_v -_id' ).lean().exec((err,result)=>
{if(err) {
    console.log(err)
    let apiResponse = response.generate(true,'Failed to find blog details',500,null)
    res.send(apiResponse)
  } else if (check.isEmpty(result)){
    console.log("No Blog found");
    let apiResponse = response.generate(true,'No blog found',404,null)
    res.send(apiResponse)
  } else {
    let apiResponse = response.generate(false,' data loaded successfully',200,result)
    res.send(apiResponse)
  }
}) 
}

let viewByBlogId = (req,res) => {
  blogModel.find({'blogId':req.params.blogId},(err,result)=>
  {if(err) {
      console.log(err)
      let apiResponse = response.generate(true,'Failed to load blog details',500,null)
      res.send(apiResponse)
    } else if (check.isEmpty(result)){
      let apiResponse = response.generate(true,'Failed to find the blog by blogId ',404,null)
      res.send(apiResponse)
    } else {
      let apiResponse = response.generate(false,'data loaded successfully',200,result)
      res.send(apiResponse)
    }
  } )
  }
  let viewByCategory = (req,res) => {
    blogModel.find({'category':req.params.category},(err,result)=>
    {if(err) {
        console.log(err)
        let apiResponse = response.generate(true,'Failed to load blog details',500,null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)){
        console.log("No Blog found");
        let apiResponse = response.generate(true,'Failed to find the blog by category ',404,null)
        res.send(apiResponse)
      } else {
        let apiResponse = response.generate(false,'blog loaded successfully',200,result)
        res.send(apiResponse)
      }
    } )
    }
    let viewByAuthor = (req,res) => {
      blogModel.find({'author':req.params.author},(err,result)=>
      {if(err) {
          console.log(err)
          let apiResponse = response.generate(true,'Failed to load blog details',500,null)
          res.send(apiResponse)
        } else if (check.isEmpty(result)){
          console.log("No Blog found");
          let apiResponse = response.generate(true,'Failed to find the blog by author ',404,null)
          res.send(apiResponse)
        } else {
          let apiResponse = response.generate(false,'blog loaded successfully',200,result)
          res.send(apiResponse)
        }
      } )
      }
      let editBlog = (req,res) => {
        let options = req.body;
        console.log(options);
        blogModel.updateOne({'blogId':req.params.blogId},options,{multi:true}).exec((err,result)=>
        {if(err) {
            console.log(err)
            let apiResponse = response.generate(true,'Failed to load blog details',500,null)
            res.send(apiResponse)
          } else if (check.isEmpty(result)){
            console.log("No Blog found");
            let apiResponse = response.generate(true,'Failed to find and edit the blog',404,null)
            res.send(apiResponse)
          } else {
            let apiResponse = response.generate(false,'blog edited successfully',200,result)
            res.send(apiResponse)
          }
        } )
        }
        let increaseBlogView = (req,res) => {
          blogModel.findOne({'blogId':req.params.blogId},(err,result)=>
          {if(err) {
              console.log(err)
              let apiResponse = response.generate(true,'Failed to load blog details',500,null)
              res.send(apiResponse)
            } else if (check.isEmpty(result)){
              console.log("No Blog found");
              let apiResponse = response.generate(true,'No blog found',404,null)
              res.send(apiResponse)
            } else {
              result.views += 1;
              resultsave((err,result)=>{
                if(err) {
                console.log(err)
                let apiResponse = response.generate(true,'No blog found',404,null)
                res.send(apiResponse)
              }else{
                console.log(result,"Blog Updated successfully")
                let apiResponse = response.generate(false,'blog edited successfully',200,result)
                res.send(apiResponse)
              }
              })
            }
          } )
          }
          let deleteBlog = (req,res) => {
           
            blogModel.remove({'blogId':req.params.blogId},(err,result)=>
            {if(err) {
                console.log(err)
                let apiResponse = response.generate(true,'Failed to load blog details',500,null)
                res.send(apiResponse)
              } else if (check.isEmpty(result)){
                console.log("No Blog found")
                let apiResponse = response.generate(true,'No blog found',404,null)
                res.send(apiResponse)
              } else {
                let apiResponse = response.generate(false,'blog deleted successfully',200,result)
                res.send(apiResponse)
              }
            } )
            }
            let deleteAllBlog = (req,res) => {
              blogModel.find().select('-_v -_id' ).lean().remove().exec((err,result)=>
              {if(err) {
                  console.log(err)
                  let apiResponse = response.generate(true,'Failed to find blog details',500,null)
                  res.send(apiResponse)
                } else if (check.isEmpty(result)){
                  console.log("No Blog found");
                  let apiResponse = response.generate(true,'No blog found',404,null)
                  res.send(apiResponse)
                } else {
                  let apiResponse = response.generate(false,' data loaded successfully',200,result)
                  res.send(apiResponse)
                }
              }) 
              }

              
              //coments code
              let getAllCommentsByBlogId = (req,res) => {
                commentModel.find().select('-_v -_id' ).lean().exec((err,result)=>
                {if(err) {
                    console.log(err)
                    let apiResponse = response.generate(true,'Failed to find comment details',500,null)
                    res.send(apiResponse)
                  } else if (check.isEmpty(result)){
                    console.log("No comments found");
                    let apiResponse = response.generate(true,'No comments found',404,null)
                    res.send(apiResponse)
                  } else {
                    let apiResponse = response.generate(false,' data loaded successfully',200,result)
                    res.send(apiResponse)
                  }
                }) 
              }


              let createComment = (req,res) => {
  
                let commentId = shortid.generate()
                
                let newComment = new commentModel({
                  comments : req.body.comments,
                  commentedBy:req.body.commentedBy,
                  commentId : commentId,
                  created: today,
                  lastModified : today
                })
              
              newComment.save((err,result)=>{if(err) {
                console.log(err)
                let apiResponse = response.generate(true,'Failed to create a comment',500,null)
                res.send(apiResponse)
              }else{
                console.log("comment saved successfully")
                let apiResponse = response.generate(false,'Comment Created successfully',200,result)
                res.send(apiResponse)
              }
              })
              }
            
  
              
  
      


  
  module.exports= {
    createBlog : createBlog,
    getAllBlog : viewAllBlog,
    viewByBlogId : viewByBlogId,
    viewByCategory : viewByCategory,
    viewByAuthor : viewByAuthor,
    editBlog : editBlog,
    increaseBlogView : increaseBlogView,
    deleteBlog : deleteBlog,
    deleteAllBlog : deleteAllBlog,
    getAllComments: getAllCommentsByBlogId,
    createComment: createComment
  }



