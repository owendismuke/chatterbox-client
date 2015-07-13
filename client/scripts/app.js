var App = function() {
  this.baseUrl = 'https://api.parse.com/1/classes/chatterbox';
};

App.prototype.constructor = App;
App.prototype.init = function(){};

App.prototype.retrieveNewMessages = function(){
  $.ajax({
    url: baseUrl,
    type: 'GET',
    //Pull these methods out
    success: function(data){
      debugger;

    },
    error: function(data){
      console.error('chatterbox: failed to retrieve new messages');
      console.log(data);
     debugger;
    }
  });
};

App.prototype.send = function(){};
App.prototype.fetch = function(){};
App.prototype.clearMessages = function(){};
App.prototype.addMessage = function(){};
App.prototype.addRoom = function(){};
App.prototype.addFriend = function(){};
App.prototype.handleSubmit = function(){};



var app = new App();