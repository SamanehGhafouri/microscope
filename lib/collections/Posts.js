import { Mongo } from 'meteor/mongo';
import {ownsDocument} from "../permissions.js";

export const Posts = new Mongo.Collection('posts');

//This will give permission to the user to update and remove posts which he/she owns
Posts.allow({
    update: function (userId, post) { return ownsDocument(userId, post); },
    remove: function (userId, post) { return ownsDocument(userId, post); },
});

// Create deny() to make sure users can only edit specific fields. to not edit others posts
Posts.deny({
    update: function (userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

//Add new deny for Edit validation from the server//////////////
Posts.deny({
    update: function (userId, post, fieldName, modifier) {
        let errors = validatePost(modifier.$set);
        return errors.title || errors.url;

    }
});
//////////////////////////////////////////////////////////////////

// Create validation function to return errors if URL and Title are missing
export function validatePost (post){
    let errors = {};

    if (!post.title)
        errors.title = "Please fill in a headline";

    if (!post.url)
        errors.url = "Please fill in a URL";

    return errors;
}

//define postInsert that we put in our post_submit.js
Meteor.methods({
    postInsert: function(postAttributes) {
        // check(Meteor.userId(), String);
        check(this.userId, String)
        check(postAttributes, {
            title: String,
            url: String
        });

        //Server-side validate post. User gets error from server if try to submit empty form from console.
        let errors = validatePost(postAttributes);
        if (errors.title || errors.url)
            throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");


        //Latency compensation
        // if (Meteor.isServer) {
        //     postAttributes.title += "(Approved!)";
        //     // wait for 5 seconds
        //     Meteor._sleepForMs(5000);
        // } else {
        //     postAttributes.title += "(processing your request.)";
        // }

        //Dont allow to submit the same URL by user
        let postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        let user = Meteor.user();
        let post = _.extend(postAttributes, {
            userId: user._id,
            author: user.profile.username,
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
//This needs to be removed
// Posts.allow({
//     insert: function (userId, doc) {
//         //only allow posting if you are logged in
//         //clients allowed to insert posts as long as they have a userId
//         return !! userId;
//
//     }
// });