import './post_submit.html';
import {Posts} from "../../../lib/collections/Posts";

//Creating posts: insert some input to the submit table and to be added to our list in the first page
Template.postSubmit.events({
    'submit form': function (e) {
        e.preventDefault();

        let post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };
        post._id = Posts.insert(post);
        Router.go('postPage', post);

    }
});