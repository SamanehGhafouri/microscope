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

  // reflect the UI if a user has already voted or not logged in
  upvotedClass: function () {
    let userId = Meteor.userId();
    //if the user logged in but not voted shows blue
    if (userId && !_.include(this.upvoters, userId)){
      return 'btn-info upvotable';
    } else {
      return 'disabled';
    }

  }

  //helper function for commentCount we remove this because we use denormalization
  // commentsCount: function () {
  //   return Comments.find({postId: this._id}).count()};


});

// Call a server upvote Method when the user clicks on the button.
Template.postItem.events({
  'click .upvotable': function (e) {
    e.preventDefault();
    // console.log('this is for vote');
    // console.log(e);
    Meteor.call('upvote', this._id);

  }
});



