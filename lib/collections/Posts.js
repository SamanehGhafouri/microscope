import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');


//define postInsert that we put in our post_submit.js
Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        let user = Meteor.user();
        let post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        let postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});






//to allow client-side post inserts
//we call this to tell meteor this is a set of circumstances under clients are allowed
//clients allowed to insert posts
// Posts.allow({
//     insert: function (userId, doc) {
//         //only allow posting if you are logged in
//         //clients allowed to insert posts as long as they have a userId
//         return !! userId;
//
//     }
// });