import { Meteor } from 'meteor/meteor';
Meteor.startup(() => {
  // code to run on server at startup
UserList = new Mongo.Collection('userlist');
UserList.insert({username: "admin", password: "admin" });
});
