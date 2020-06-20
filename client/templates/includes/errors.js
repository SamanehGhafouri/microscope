import './errors.html';
import {Errors} from "../../helpers/errors.js";

Template.errors.helpers({
    errors: function () {
        // a cursor is typically a database object that has
        // functionality like next() for get the next object.
        return Errors.find();

    }
});
