import {Posts} from "../lib/collections/Posts.js";
import {Comments} from "../lib/collections/comments.js";
import {Notifications} from "../lib/collections/notifications.js";

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

    //Publish new collection Notifications
    Meteor.publish('notifications', function () {
        //by this return we will see all the notifications for all users
        // return Notifications.find();
        // with this code only sync notifications that are relevant to the user.
        return Notifications.find({userId: this.userId, read:false});

    })
}
