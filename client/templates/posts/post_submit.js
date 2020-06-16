import './post_submit.html';
import {Posts} from "../../../lib/collections/Posts";

//Creating posts: insert some input to the submit table and to be added to our list in the first page
Template.postSubmit.events({
    'submit form': function (e) {
        // to make sure the browser doesnt try to submit the form
        e.preventDefault();

        let post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };
        //generate _id for the object that has been inserted into the database
        post._id = Posts.insert(post);
        // construct a URL to browse to
        Router.go('postPage', post);

    }
});