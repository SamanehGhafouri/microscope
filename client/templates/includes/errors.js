import './errors.html';
import {Errors} from "../../helpers/errors.js";

Template.errors.helpers({
    errors: function () {
        // a cursor is typically a database object that has
        // functionality like next() for get the next object.
        return Errors.find();

    }
});

//Set a timeout for errors after few seconds of showing the error
// they disapear
Template.error.onRendered(function () {
    let error = this.data;
    Meteor.setTimeout(function () {
        Errors.remove(error._id);

    }, 3000);

})