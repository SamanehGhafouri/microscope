import './post_submit.html';
import '../includes/access_denied.js';
import '../../../client/helpers/errors.js';
import '../includes/errors.js';
import {validatePost} from "../../../lib/collections/Posts";

//create template for showing errors below to make sure that the user enter URL and a Title
Template.postSubmit.onCreated(function () {
    Session.set('postSubmitErrors', {});

});

Template.postSubmit.helpers({
    //errorMessage returns the message itself
    errorMessage: function(field) {
        return Session.get('postSubmitErrors')[field];
    },
    //errorClass checks for the presence of a message and returns has-error if such a message exists
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

//Creating posts: insert some input to the submit table and to be added to our list in the first page
Template.postSubmit.events({
    'submit form': function (e) {
        // to make sure the browser doesnt try to submit the form
        e.preventDefault();

        let post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        //Call validatePost function in Posts.js from here
        let errors = validatePost(post);
        if (errors.title || errors.url)
            return Session.set('postSubmitErrors', errors);

        //Meteor method call: better abstraction and security
        //always have two arguments, error and result
        Meteor.call('postInsert', post, function (error, result) {
            //display the error to the user and abort
            if (error)
                // we want to show an error message to the user to warn them
                // that is why we use throwError
                return Meteor.throwError(error.reason);

            // No post with the same URL
            // show this result but route anyway
            if (result.postExists)
                Meteor.throwError('This link has already been posted');

            Router.go('postPage', {_id: result._id});
        });

        //     REMOVE THIS PLEASE!!!!!!!!!!!!!!!!!
        //generate _id for the object that has been inserted into the database
        // post._id = Posts.insert(post);
        // // construct a URL to browse to
        // Router.go('postPage', post);

        // Router.go('postsList');
    }
});