//importing mongoose
const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/blogs');
//import schema
const schema = mongoose.Schema

let blogSchema = new schema(
    {
        title: {
            type: String,
            default: 'Default title'
        },
        blogId: {
            type: String,
            unique: true
        },
        description: {
            type: String,
            default: 'description'
        },
        bodyHtml: {
            type: String,
            default: 'BodyHtml'
        },

        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        tags: [],

        category: {
            type: String,
            default: ''
        },
        author: {
            type: String,
            default: 'no author'
        },
        created: {
            type:Date,
            default:Date.now
        },
        lastModified: {
            type:Date,
            default:Date.now
            
        },
      
    });

    mongoose.model('Blogmodel', blogSchema);






