import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

//to allow client-side post inserts
//we call this to tell meteor this is a set of circumstances under clients are allowed
//clients allowed to insert posts
Posts.allow({
    insert: function (userId, doc) {
        //only allow posting if you are logged in
        //clients allowed to insert posts as long as they have a userId
        return !! userId;

    }
});