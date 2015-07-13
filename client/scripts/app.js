var Message = function(user, text, roomname){
  this.username = username;
  this.text = text;
  this.roomname = roomname;
};

var App = function() {
  this._baseUrl = 'https://api.parse.com/1/classes/chatterbox';
  this._lastRetrieve;
  this._currentRoom;
  this._rooms = [];
};

App.prototype.constructor = App;
App.prototype.init = function(){};

App.prototype.send = function(message){
  var context = this;
  var attemtped = false;
  $.ajax({
    url: context._baseUrl,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      debugger;
      context.fetch();
    },
    error: function (data) {
      if(!attemtped) {
        context.send(message);
      } else {
        console.error('chatterbox: failed to send message');
      }
    }
  });
};

App.prototype.addMessage = function(message){
  //check for highlighted words for rolling of the rick
  var $chats = $('#chats');
  var $message = $('<div></div>').addClass('chat');
  var $user = $('<span></span>').addClass('username').text(message.username); 
  var $text = $('<span></span>').addClass('text').text(message.text); 
  $message.append($user, $text);
  $chats.append($message);
};

App.prototype.fetch = function(){
  var context = this;
  $.ajax({
    url: context._baseUrl,
    type: 'GET',
    //Pull these methods out
    success: function(data){
      context._lastRetrieve = new Date();
      if (!data || !data.results || !data.results.length) { return; }
      data.results.forEach(function(message) {
        context.addMessage(message);
      });
    },
    error: function(data){
      console.error('chatterbox: failed to retrieve new messages');
      console.log(data);
    },
    complete: function(data){
      //setTimeOut(this.fetch.bind(this), 250)
    }
  });
};


//To sanitize messages.
App.prototype.sanitize = function(string){
  return escape(string);
};

App.prototype.clearMessages = function(){
  $('#chats').empty();
};
App.prototype.addRoom = function(room){
  this._rooms.push(room);
  $('<option/>').val(room).text(room).appendTo('#roomSelect');
};
App.prototype.addFriend = function(){};
App.prototype.handleSubmit = function(){
};
App.prototype.rockRoll = function(){
  //modal this on highlighted words rick, astley, or never going to give you up (in order)
  //<iframe width="420" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allowfullscreen></iframe>
};


var app = new App();
app.fetch();

$(document).ready(function(){
  $('#clear').click(function(){ app.clearMessages(); });
});