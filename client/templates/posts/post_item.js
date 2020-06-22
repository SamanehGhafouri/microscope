import './post_item.html';
import '../posts/post_edit.js';
import '../../../lib/collections/Posts.js';
import '../../../lib/permissions.js';
import {Comments} from "../../../lib/collections/comments.js";

Template.postItem.helpers({
  ownPost: function(){
    return this.userId === Meteor.userId();
  },

  domain: function() {
    let a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },

  //helper function for commentCount
  commentsCount: function () {
    return Comments.find({postId: this._id}).count();

  }
});



