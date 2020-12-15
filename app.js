import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';


export const Assemblies = new Mongo.Collection('assemblies');

const schema = new SimpleSchema({
  field0: {
    type: String,
    optional: true
  },
  object: {
    type: Object,
    optional: true,
    blackbox: true
  },
  userId: {
    type: SimpleSchema.RegEx.Id,
    autoValue() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId };
      }

      this.unset();
    }
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }

      this.unset();
    }
  },
  updatedAt: {
    type: Date,
    autoValue() {
      return new Date();
    }
  }
});

Assemblies.attachSchema(schema);

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
