import { Mongo } from 'meteor/mongo';


export const Assemblies = new Mongo.Collection('assemblies');


Assemblies.startCaching();

Assemblies.before.insert(function beforeInsert(userId, doc) {
  doc.object = { field1: 'value 1', field2: 'value 2' };
});


Meteor.methods({
  async test() {
    const _id = Assemblies.insert({
      field0: 'value 0'
    });

    return {
      cache: Assemblies.getCache(_id),
      findOne: Assemblies.findOne(_id),
      docInDB: await Assemblies.rawCollection().findOne({ _id }, { projection: { _id: true, field0: true, object: true } })
    }
  }
});
