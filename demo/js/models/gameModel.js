
//gameModel class handles most of the game logic such as holding the buttons ids and keeping track of time. it also keeps track if a game is finished.
define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var GameModel = Backbone.Model.extend({
		Buttons: function(){
			return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
		},
		
		UpdateTimer: function(){
			
				setInterval(this.onTick.bind(this),10);
			
		},
		//this function kchecks if game has finished otherwise it updates the models time.
		onTick:function()
		{
			if(!this.get('gameIsFinsihed'))
			{
				var s = this.get('s');
				var m = this.get('m');
				var ms = this.get('ms');
				ms++;
				if(ms>99){ms = 00; s++;}
				if(s>59){s = 00; m++;}
				if(m>99){
					//TODO: something better than this.
					m = 99;
				}
				this.set('ms', ms);
				this.set('s', s);
				this.set('m', m);
				if(ms<10){ms = "0"+ms;}
				if(s<10){s = "0"+s;}
				if(m<10){m = "0"+m;}
				this.set('name', m+':'+s+':'+ms);
			}
			else{clearInterval(this);}	
		},
		//returns a new random number.
		NewRandomNumber:function()
		{
			return Math.floor((Math.random()*24)+0);
		},
		//Checks if the game is finished.
		IsFinished:function()
		{
			var NUMBER_FOR_FINISH = 50
			this.set('NumberOfPressesLeft',NUMBER_FOR_FINISH - this.get('CorrectPresses'));
			if(this.get('CorrectPresses') >= NUMBER_FOR_FINISH)
			{
				return true;
			}
			return false;
		}
    });
	//returns an instance of GameModel.
  	return GameModel;

});


