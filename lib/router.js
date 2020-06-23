import '../client/templates/application/layout.js';
import '../client/templates/posts/posts_list.js';
import '../client/templates/includes/loading.js';
import '../client/templates/posts/post_page.js';
import '../client/templates/application/not_found.js';
import '../client/templates/posts/post_submit.js';
import {Posts} from "./collections/Posts.js";
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
        return Meteor.subscribe('posts');
    }

});

//Define a new route named postsList and mapped it to the root / path
Router.route('/', {name: 'postsList'});

//Routing to a specific post
Router.route('/posts/:_id', {
    name: 'postPage',

    //Subscribe to comments here
    waitOn: function() {
        return Meteor.subscribe('comments', this.params._id);
    },
    //We can get the proper data context by looking for our post
    // based on the _id we got from the URL
    data: function () { return Posts.findOne(this.params._id);
    }
});

//Routing to Edit posts
Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    data: function () { return Posts.findOne(this.params._id);

    }
});

//Creating new post page
Router.route('/submit', {name:'postSubmit'});

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
