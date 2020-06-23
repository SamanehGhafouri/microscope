import {Mongo} from "meteor/mongo";
import {Posts} from "./Posts";


export const Comments = new Mongo.Collection('comments');

//To check error and let user to submit their comments
Meteor.methods({
    commentInsert: function (commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            body: String
        });

        let user = Meteor.user();
        let post = Posts.findOne(commentAttributes.postId);

        if(!post)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');

        let comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        // update the post with the number of comments
        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        return Comments.insert(comment);

    }
});

