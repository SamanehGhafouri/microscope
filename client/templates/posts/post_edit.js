import './post_edit.html';
import {Posts} from "../../../lib/collections/Posts.js";
import '../../../lib/router.js';
import '../includes/errors.js';
import '../../helpers/errors.js';
import {validatePost} from "../../../lib/collections/Posts";

//Edit validation form (SET)//////////////////////////////
Template.postEdit.onCreated(function () {
    Session.set('postEditErrors', {});

});

//Edit validation form (GET)
Template.postEdit.helpers({
    errorMessage: function (field) {
        return Session.get('postEditErrors')[field];
    },

    errorClass: function (field) {
        return !!Session.get('postEditErrors')[field] ? 'has-error' : '';

    }
});
/////////////////////////////////////////////////////////////////////////////

Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        let currentPostId = this._id;

        let postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        }

        // Edit validation
        let errors = validatePost(postProperties);
        if (errors.title || errors.url)
            return Session.set('postEditErrors', errors);

        /////////////////////////////////////////////////////
        Posts.update(currentPostId, {$set: postProperties}, function(error) {
            if (error){
                // display the error to the user
                Meteor.throwError(error.reason);

            }   else {
                Router.go('postPage', {_id: currentPostId});
            }

        });

    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this  post?")) {
            let currentPostId = this._id;
            Posts.remove(currentPostId);
            //since we define new and best posts in home
            Router.go('home');
            // Router.go('postsList');
        }

    }
});