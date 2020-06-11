import '../client/templates/application/layout.js';
import '../client/templates/posts/posts_list.js';

Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'postsList'});