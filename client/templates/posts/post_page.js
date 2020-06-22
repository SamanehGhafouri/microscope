import './post_page.html';
import '../comments/comment_item.js';
import {Comments} from "../../../lib/collections/comments.js";
import '../comments/comment_submit.js';
import {Posts} from "../../../lib/collections/Posts";


//Template for adding comments under posts
Template.postPage.helpers({
    comments: function () {

        return Comments.find({postId: this._id});

    }
});