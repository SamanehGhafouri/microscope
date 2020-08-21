import '../client/templates/application/layout.js';
import '../client/templates/posts/posts_list.js';
import '../client/templates/includes/loading.js';
import '../client/templates/posts/post_page.js';
import '../client/templates/application/not_found.js';
import '../client/templates/posts/post_submit.js';
import {Posts} from "./collections/Posts.js";
import '../client/templates/notifications/notifications.js';


import {Comments} from "./collections/comments.js";




Router.configure({
    layoutTemplate: 'layout',

    //This is loading indicator
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    // //wait on data
    // wait on posts and comments
    waitOn: function() {
        //by removing subscribe to comment, we would not be able to see comments
        //because we want to move them to route instead of here
        return [Meteor.subscribe('notifications')]
    }

});



//Routing to a specific post
Router.route('/posts/:_id', {
    name: 'postPage',

    //Subscribe to comments here
    waitOn: function() {
        //subscribe to the singlePost
        return [Meteor.subscribe('singlePosts', this.params._id), Meteor.subscribe('comments', this.params._id)];
    },
    //We can get the proper data context by looking for our post
    // based on the _id we got from the URL
    data: function () { return Posts.findOne(this.params._id);
    }
});

//Routing to Edit posts
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn: function() {
        //subscribe to singlePost to get back our post edit page
        return Meteor.subscribe('singlePosts', this.params._id);
    },
    data: function () { return Posts.findOne(this.params._id);

    }
});

//Creating new post page
Router.route('/submit', {name:'postSubmit'});

//Create a Route Controller to group routing features together
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    postsLimit: function () {
        //return the path like ../6 by client or the default which is 5
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        //return options object. Sort the posts and define a limit for them
        // return {sort: {submitted: -1}, limit: this.postsLimit()};
        return {sort: this.sort, limit: this.postsLimit()};

    },
    //because iron router sends its feature to load more posts we have to put our subscription
    //inside the function and define it
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    waitOn: function () {
        //subscribe to publication
        return Meteor.subscribe('posts', this.findOptions());
    },

    //created function posts to find posts
    posts: function(){
        return Posts.find({}, this.findOptions());
    },
    data: function () {
        // return {posts: Posts.find({}, this.findOptions())};
        //this.posts().count() the num of posts that are currently in cursor
        let hasMore = this.posts().count() === this.postsLimit();
        //telling the postsList route to build its own path using javaScript object as data context
        // this is exactly like {{pathFor 'postsList}} spacebars helper

        //removed this and declare that inside NewPostsController and BestPostsController
        // let nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});

        return {
            posts: this.posts(),
            //
            ready: this.postsSub.ready,
            //if hasMore is true do nextPath else it is null
            nextPath: hasMore ? this.nextPath() : null
        };
    }
});

////New postsController: shows the new posts on the top
NewPostsController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    //define the nextPath here because we have different path now and different router

    nextPath: function () {
        return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
    }

});

/////BestPostController: shows the most voted posts on top
BestPostsController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    //define the nextPath
    nextPath: function () {
        return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})

    }
});

Router.route('/', {
    name: 'home',
    controller: NewPostsController
});

// declare new posts and the popular posts by giving paths to them
Router.route('/new/:postsLimit?', {name: 'newPosts'});
Router.route('/best/:postsLimit?', {name: 'bestPosts'});

// making the posts limit parameter part of the path
// subscribe to the post removed from config. moved form router to route
// adding ? after the parameter name means it is optional! not only localhost:3000/50 but locahost
//since we have our new controller for voting we delete this
// Router.route('/:postsLimit?', {
//     name: 'postsList'

//     // waitOn: function () {
//     //     let limit = parseInt(this.params.postsLimit) || 5;
//     //     // sort the posts based on time they submitted and limit them to any number we want
//     //     return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
//     // },
//     // // setting the data context at the route level
//     // data: function () {
//     //     let limit = parseInt(this.params.postsLimit) || 5;
//     //     // return a javaScript obj instead of a cursor, and we get ride of helper function for posts in posts_list.js
//     //     return{
//     //         posts:Posts.find({}, {sort: {submitted: -1}, limit: limit})
//     //     };
//     // }
//     //everything here moved to routerController to avoid repeating and be neat code
// });

//Define a new route named postsList and mapped it to the root / path
// Router.route('/', {name: 'postsList'});



//Preventing the logged out user to see the posts
//check if the user is logged in
let requireLogin = function(){
    if (! Meteor.user()) {
        if (Meteor.loggingIn()){
            this.render(this.loadingTemplate);
        } else {
            //routing hook that is reactive too
            this.render('accessDenied');
        }

    } else {
        this.next();
    }
}


// not a correct like: localhost/posts/nothing
//even the user enter the collection name correct but wrong id show "notFound"
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
//related to the let requireLogin
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
