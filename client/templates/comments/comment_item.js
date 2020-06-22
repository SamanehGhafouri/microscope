import './comment_item.html';
import '../posts/post_page.js';

Template.commentItem.helpers({
    submittedText: function () {
        return this.submitted.toString();

    }
});