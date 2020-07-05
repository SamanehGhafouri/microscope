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
// Template.postsList.helpers({
//   posts: function () {
//     //sort posts based on the date submitted
//     return Posts.find({}, {sort: {submitted: -1}});
//
//   }
// });
//To define our hook we put a wrapper around our posts in html
Template.postsList.onRendered(function () {
  //define the hook
  this.find('.wrapper')._uihooks = {
    //moveElement will call whenever an elements position changes instead of Blaze's default behavior
    // node: the element currently being moved to a new position in DOM
    // next: element right after the new position that node is being moved to
    moveElement: function (node, next) {

      //make jQuary object
      let $node = $(node), $next = $(next);
      //offset: retrieve the current position of an element relative to the document and returns obj contain top and left
      let oldTop = $node.offset().top;
      //get the outer height of an element
      let height = $node.outerHeight(true);

      //find all the elements between next and node
      let $inBetween = $next.nextUntil(node);
      if ($inBetween.length === 0)
        $inBetween = $node.nextUntil(next)

      //now put node in place
      $node.insertBefore(next);

      //measure new top
      let newTop = $node.offset().top;

      //move node *back* to where it was before
      $node
          .removeClass('animate')
          .css('top', oldTop - newTop);

      //push every other element down or up to put them back
      $inBetween
          .removeClass('animate')
          .css('top', oldTop < newTop ? height : -1 * height)

      //force a redraw
      $node.offset();

      //reset everything to 0, animated
      $node.addClass('animate').css('top', 0);
      $inBetween.addClass('animate').css('top', 0);

    }
  }

});