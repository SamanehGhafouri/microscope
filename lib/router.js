import '../client/templates/application/layout.js';
import '../client/templates/posts/posts_list.js';
import '../client/templates/includes/loading.js';

import {Posts} from "./collections/Posts";

Router.configure({
    layoutTemplate: 'layout',
    // This is loading indicator
    loadingTemplate: 'loading',
    //wait on data
    waitOn: function () { return [Meteor.subscribe('posts')]; }

});

//Define a new route named postsList and mapped it to the root / path
Router.route('/', {name: 'postsList'});