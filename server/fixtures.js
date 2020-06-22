import {Comments} from "../lib/collections/comments.js";
import {Posts} from "../lib/collections/Posts.js";

//Fixture data
if (Posts.find().count() === 0) {
    let now = new Date().getTime();

    // Create two users
    // first
    let tomId = Meteor.users.insert({
        profile: { name: 'Tom Coleman' }
    });
    let tom = Meteor.users.findOne(tomId);

    //Second
    let sachaId = Meteor.users.insert({
        profile: { name: 'Sacha Greif' }
    });
    let sacha = Meteor.users.findOne(sachaId);

    //a post by sacha
    let telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        userId: sacha._id,
        author: sacha.profile.name,
        url: 'http://sachagreif.com/introducing-telescope/',
        submitted: new Date(now - 7 * 3600 * 1000)
    });

    //a comment by tom
    Comments.insert({
        postId: telescopeId,
        userId: tom._id,
        author: tom.profile.name,
        submitted: new Date(now - 5 * 3600 * 1000),
        body: 'Interesting project Sacha, can I get involved?'
    });

    // a comment by sacha
    Comments.insert({
        postId: telescopeId,
        userId: sacha._id,
        author: sacha.profile.name,
        submitted: new Date(now - 3 * 3600 * 1000),
        body: 'You sure can Tom!'
    });

    //a post by tom
    Posts.insert({
        title: 'Meteor',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://meteor.com',
        submitted: new Date(now - 10 * 3600 * 1000)
    });

    // a post by tom
    Posts.insert({
        title: 'The Meteor Book',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://themeteorbook.com',
        submitted: new Date(now - 12 * 3600 * 1000)
    });
}