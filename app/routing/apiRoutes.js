var bodyParser = require("body-parser");
var friends = require("../data/friends.js");

module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get("/api/users", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/users", function (req, res) {
        var mostCompatible = {
            name: "",
            photo: "",
            scoreDifference: 999,
            percentMatch: ""
        };
        var newUser = req.body;
        var newUserScores = req.body.scores;
        for (i = 0; i < friends.length; i++) {
            //reset total difference each time 
            //so it doesn't start from previous friends' difference
            var totalDifference = 0;
            //loop through each user's score
            //simultaneously looping through new user's scores
            console.log(friends[i].name);
            for (q = 0; q < friends[i].scores.length; q++) {
                totalDifference += Math.abs(parseInt(friends[i].scores[q]) - parseInt(newUserScores[q]));
                console.log("==========================");
                console.log("Subtracting " + parseInt(friends[i].scores[q]) + " minus " + (parseInt(newUserScores[q])));
                console.log("Adding " + Math.abs(parseInt(friends[i].scores[q]) - parseInt(newUserScores[q])) + " to totalDifference");
                console.log(totalDifference);
            }
            console.log("------------ Final Total ------------");
            console.log(totalDifference);
            if (totalDifference < mostCompatible.scoreDifference) {
                mostCompatible.name = friends[i].name,
                mostCompatible.photo = friends[i].photo,
                mostCompatible.scoreDifference = totalDifference,
                mostCompatible.percentMatch = ((40 - parseInt(totalDifference)) / 40) * 100 + "%",
                console.log("Most Compatible: " + mostCompatible.name)
                console.log("Score Difference: " + mostCompatible.scoreDifference);
                console.log("Percent Match: " + mostCompatible.percentMatch);
            }
        }

        friends.push(newUser);
        res.json(mostCompatible);
    });
}