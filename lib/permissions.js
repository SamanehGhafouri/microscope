import '../lib/collections/Posts.js';
import '../client/templates/posts/post_item.js';
//check that the userId specified owns the documents
let ownsDocument;
ownsDocument = function (userId, doc) {
    return doc && doc.userId === userId;

}