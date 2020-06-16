import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

//to allow client-side post inserts
Posts.allow({
    insert: function (userId, doc) {
        //only allow posting if you are logged in
        return !! userId;

    }
});