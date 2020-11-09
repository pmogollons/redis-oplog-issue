import { Mongo } from 'meteor/mongo';


const Assemblies = new Mongo.Collection('assemblies');


Assemblies.startCaching();
