import {Comments} from "../lib/collections/comments.js";
import {Posts} from "../lib/collections/Posts.js";

//Fixture data. If there is no users add the users that defined blow
if (Posts.find().count() === 0) {
    let now = new Date().getTime();

    // Create  users//////////////////////////////
    // first
    let tomId = Meteor.users.insert({
        username: 'Tom Coleman'
        // profile: { name: 'Tom Coleman' }
    });
    let tom = Meteor.users.findOne(tomId);

    //Second
    let sachaId = Meteor.users.insert({
        username: 'Sacha Greif'
        // profile: { name: 'Sacha Greif' }
    });
    let sacha = Meteor.users.findOne(sachaId);

    //Third
    let samanehId = Meteor.users.insert({
        username: 'Samaneh Gh'
        // profile: { name: 'Samaneh Gh'}
    });
    let samaneh = Meteor.users.findOne(samanehId);

    //Forth
    let stefanId = Meteor.users.insert({
        username: 'Stefan Ag'
        // profile: { name: 'Stefan Ag'}
    });
    let stefan = Meteor.users.findOne(stefanId)

    ////////////////////////////////////////////////

    //a post by sacha different way of insert posts
    let telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        userId: sacha._id,
        // author: sacha.profile.name,
        author: sacha.username,
        url: 'http://sachagreif.com/introducing-telescope/',
        submitted: new Date(now - 7 * 3600 * 1000),
        //add comments count
        commentsCount: 2,
        upvoters: [],
        votes: 0

    });

    // a post by stefan
    let gitHubId = Posts.insert({
        title: 'GitHub',
        userId: stefan._id,
        author: stefan.username,
        url: 'https://github.com',
        submitted: new Date(now - 8 * 3600 * 1000),
        commentsCount: 2
    });

    // a post by samaneh
    let googleId = Posts.insert({
        title: 'Google website',
        userId: samaneh._id,
        author:samaneh.username,
        url: 'https://google.com',
        submitted: new Date(now - 9 * 3600 * 1000),
        commentsCount: 0
    });
    /////////////////////////////////////////////////
    //Insert comments
    //a comment by tom
    Comments.insert({
        postId: telescopeId,
        userId: tom._id,
        author: tom.username,
        submitted: new Date(now - 5 * 3600 * 1000),
        body: 'Interesting project Sacha, can I get involved?'
    });

    // a comment by sacha
    Comments.insert({
        postId: telescopeId,
        userId: sacha._id,
        author: sacha.username,
        submitted: new Date(now - 3 * 3600 * 1000),
        body: 'You sure can Tom!'
    });

    //a comment by samaneh
    Comments.insert({
        postId: gitHubId,
        userId: samaneh._id,
        author: samaneh.username,
        submitted: new Date(now - 2 * 3600 * 1000),
        body: 'I am interested in your post!'
    });

    Comments.insert({
        postId: googleId,
        userId: stefan._id,
        author: stefan.username,
        submitted: new Date(now - 2 * 3600 * 1000),
        body: 'Go baby check out my pickle! Do you like what you see?'
    });

    Comments.insert({
        postId: googleId,
        userId: samaneh._id,
        author: samaneh.username,
        submitted: new Date(now - 3 * 3600 * 1000),
        body: 'Oh Yeah!'
    });
    ////////////////////////////////////////////////////
    //Insert posts
    //a post by tom
    Posts.insert({
        title: 'Meteor',
        userId: tom._id,
        author: tom.username,
        url: 'http://meteor.com',
        submitted: new Date(now - 10 * 3600 * 1000),
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });

    // a post by tom
    Posts.insert({
        title: 'The Meteor Book',
        userId: tom._id,
        author: tom.username,
        url: 'http://themeteorbook.com',
        submitted: new Date(now - 12 * 3600 * 1000),
        commentsCount: 0,
        upvoters: [],
        votes: 0
    });
    ///////////////////////////////////////////////////////////

    // Add more posts the way that we need to do pagination to see them
    for (let i = 0; i < 10; i++) {
        Posts.insert({
            title: 'Test post # ' +  i,
            author: sacha.username,
            userId: sacha._id,
            url: 'http://google.com/?q=test-' + i,
            submitted: new Date(now - i * 3600 * 1000),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });
    }

}
    ////////////////////////////////////////////////////

