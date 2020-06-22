import './comment_submit.html';

Template.commentSubmit.onCreated(function () {
    Session.set('commentSubmitErrors', {});
});
////////////////////////////////////////////////////////////
Template.commentSubmit.helpers({
    errorMessage: function (field) {
        return Session.get('commentSubmitErrors')[field];

    },
    errorClass: function (field) {
        return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
    }
});
/////////////////////////////////////////////////////////////

Template.commentSubmit.events({
    'submit form': function (e, template) {
        e.preventDefault();

        let $body = $(e.target).find('[name=body]');
        let comment = {
            body: $body.val(),
            postId: template.data._id
        };

        let errors = {};
        if (! comment.body){
            errors.body = "Please write some content";
            return Session.set('commentSubmitErrors', errors);
        }

        Meteor.call('commentInsert', comment, function (error, commentId) {
            if (error){
                //fixed the old one by putting Meteor in the front
                Meteor.throwError(error.reason);
            }else {
                $body.val('');
            }


        });

    }
});