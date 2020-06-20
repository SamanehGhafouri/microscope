import '../../client/templates/includes/errors.js';
import {Mongo} from "meteor/mongo";

// Local (client-only) collection
export const Errors = new Mongo.Collection(null);

let throwError;
throwError = function (message) {

    console.log(" Errors Collection ", Errors);
    console.log(" Errors Collection Size (Before): ", Errors.find().count())
    Errors.insert({message: message});
    console.log(" Errors Collection Size (After): ", Errors.find().count())
    console.log(" Errors Collection Inserted Object: ", Errors.findOne())

};
Meteor.throwError = throwError;