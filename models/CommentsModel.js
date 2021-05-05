const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/blogs');
//import schema
const schema = mongoose.Schema

let commentsSchema = new schema(
    {
        comments: {
            type: String
        },
        commentedBy: {
            type: String,
            unique: true
        },
        commentId:{
            type: String,
            unique: true
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

    mongoose.model('Commentmodel', commentsSchema);

