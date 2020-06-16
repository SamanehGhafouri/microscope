import { Posts } from '../../../lib/collections/Posts.js';
import './post_item.js';
import './posts_list.html';
let postsData = [
  {
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  }, 
  {
    title: 'Meteor',
    url: 'http://meteor.com'
  }, 
  {
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  }
];
Template.postsList.helpers({
  posts: function () {
    //sort posts based on the date submitted
    return Posts.find({}, {sort: {submitted: -1}});

  }
});

