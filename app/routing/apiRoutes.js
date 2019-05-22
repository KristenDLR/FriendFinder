var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app){

  //Display JSon of all possible friends
app.get("/api/friends", function(req, res) {

  console.log(friends)

  res.json(friends)
})

//handle incoming survey results
app.post("/api/friends", function(req, res){

  //User input
 var incomingSurv = req.body;
 var surveyResponse = incomingSurv.scores;

  //best matches
 var matches = "";
 //minimum difference the user and friend found have in common
 var minDifference = 30;

 // surveyResponse[i] = parseInt(surveyResponse[i]);

 //for loop all existing friends
 for(var i = 0; i < friends.length; i++){
  //difference in quesions
  var diff = 0;
  for(var j = 0; j < surveyResponse.length; j++){
    diff += Math.abs(friends[i].scores[j] - surveyResponse[j]);
    console.log(diff);
  }

  //the difference is the lowest found, friend match occurres
  if(diff < minDifference){
    minDifference = diff;
    matches = friends[i];
    console.log(matches);
  }

 }

 friends.push(incomingSurv);
 res.json({status: matches});





});
};
