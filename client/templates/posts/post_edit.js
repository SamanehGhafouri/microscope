import './post_edit.html';
import {Posts} from "../../../lib/collections/Posts";
import '../../../lib/router.js';

Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        let currentPostId = this._id;

        let postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        }

        Posts.update(currentPostId, {$set: postProperties}, function(error) {
            if (error){
                // display the error to the user
                alert(error.reason);

            }else {
                Router.go('postPage', {_id: currentPostId});
            }

        });

    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this  post?")) {
            let currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }

    }
});