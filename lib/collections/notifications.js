import {Mongo} from "meteor/mongo";
import {ownsDocument} from "../permissions.js";
import {Posts} from "./Posts.js";

export const Notifications = new Mongo.Collection('notifications');

//since we are updating notifications from the client, we need to make sure
// our allow call is bulletproof
//update, user only update a single field, single field is read
Notifications.allow({
    update: function (userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';

    }
});
/////////////////////////////////////////////////////////////////////////////////

//a function to insert notification for each new comments
export function createCommentNotification (comment) {
    let post = Posts.findOne(comment.postId);
    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commentName: comment.author,
            read: false
        });
    }

};
