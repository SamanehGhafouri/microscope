import '../client/templates/application/layout.js';
import '../client/templates/posts/posts_list.js';
import '../client/templates/includes/loading.js';
import '../client/templates/posts/post_page.js';
import '../client/templates/application/not_found.js';

import {Posts} from "./collections/Posts";

Router.configure({
    layoutTemplate: 'layout',

    //This is loading indicator
    // loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
    // //wait on data
    // waitOn: function () { return [Meteor.subscribe('posts')]; }

});

//Define a new route named postsList and mapped it to the root / path
Router.route('/', {name: 'postsList'});

//Routing to a specific post
Router.route('/posts/:_id', {
    name: 'postPage',
    //We can get the proper data context by looking for our post
    // based on the _id we got from the URL
    data: function () { return Posts.findOne(this.params._id);

    }
});


// not a correct like: localhost/posts/nothing
//even the user enter the collection name correct but wrong id show "notFound"
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
