import {Posts} from "../lib/collections/Posts.js";
import {Comments} from "../lib/collections/comments.js";

// According to the tutorial meteor.com we should run this from server side
// That is why we put them in if statement of isServer
if (Meteor.isServer) {

    //Publish new collection Posts
    Meteor.publish('posts', function () {
        return Posts.find();

    });

    //Publish new collection Comments
    Meteor.publish('comments', function (postId) {
        //we put subscription inside the route
        check(postId, String);
        return Comments.find({postId: postId});

    });
}
