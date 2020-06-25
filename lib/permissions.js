
//check that the userId specified owns the documents
export function ownsDocument(userId, doc) {

    return doc && doc.userId === userId;

}
