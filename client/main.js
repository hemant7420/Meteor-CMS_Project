import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base'

import './main.html';

Router.route('/admin', {
    template: 'adminmain'
});

Router.route('/', {template: 'main'});

Template.temp1.created = function () { 
	$('head').append('<link rel="stylesheet" href="css/stylesheets/style2.css"/>'); };


Template.temp2.created = function () { 
	$('head').append('<link rel="stylesheet" href="css/stylesheets/style1.css"/>'); };

Template.temp3.created = function () { 
    $('head').append('<link rel="stylesheet" href="css/stylesheets/style3.css"/>'); };

Template.admin.created = function () {
	
	$('head').append('<link rel="stylesheet" href="css/stylesheets/style.css"/>'); };

Template.registerHelper('templatename',function(input){
  return Session.get("templatename");
});

Template.main.helpers({
    'isHome': function(){
        var a=Session.get('templatename');
        if (Template[a]) 
        {
            return (a);            
        }
        else
        {
            return 'temp3';
        }
    }
});

Template.adminmain.helpers({
    'isAdmin': function(){
        var a=Session.get('templateadmin');
        if(!a)
        {
            return ('admin');            
        }
        else
        {
            return (a);            
        }
    }
});
if (Meteor.isClient) {
    Template.adminmain.events({
        'submit .login-form': function(event) {
            event.preventDefault();
            console.log(Meteor.users.find().count());
            var username = event.target.login_Email.value;
            var password = event.target.login_Password.value;
        	if(username==='admin' && password==='admin')
        	{
                Session.setPersistent({loggedin: 1, templateadmin: "admin1"});  		
        	}
        	else
        	{
                Session.setPersistent({templateadmin: "admin"});  
        	}
        },

        'submit .url-form': function(event) {
            event.preventDefault();
            console.log(Meteor.users.find().count());
            var url_Text = event.target.urlText.value;
            Session.setPersistent('templatename',url_Text);
            
        },
        
        'submit .logout': function(event){
    
            Session.setPersistent({loggedin: 0, templateadmin: "admin"});
        }
    });
}

// Template.loginButtons.events({
//     'click #login-buttons-logout' : function (event, template) {
//         Meteor.logout(function(err) {
//             Router.go('/home');
//         });
//     }
// });


// if(Meteor.userId()=='Y8bTBM4AojiahjJh8' )
//          {
//              Router.go('/home');             
//          }
//          else
//              {
//              Router.go('/');             
//          }
// console.log(Meteor.userId());
