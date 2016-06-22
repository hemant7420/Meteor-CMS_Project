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

Template.admin.created = function () {
	
	$('head').append('<link rel="stylesheet" href="css/stylesheets/style.css"/>'); };


Template.main.helpers({
    'isHome': function(){
        var a=Session.get('templatename');
        if(!a)
        {
            return ('temp2');            
        }

        else
        {
            return (a);            
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
                Session.set('templateadmin','admin1');   
                Session.set('loggedin',1);    		
        	}
        	else
        	{
        		Session.set('templateadmin','admin');  
        	}
        },

        'submit .url-form': function(event) {
            event.preventDefault();
            console.log(Meteor.users.find().count());
            var url_Text = event.target.urlText.value;
            
            Session.set('templatename',url_Text);   
            
        },
        

        'submit .logout': function(event){
            Session.set('templateadmin','admin'); 
            Session.set('loggedin',0); 
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
