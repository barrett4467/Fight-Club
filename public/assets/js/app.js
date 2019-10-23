$(function () {
    $(".characterButton").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr("data-id");
        console.log("id: " + id);
        window.location.href = "/fight/" + id;
        playGame();
    });

    var characterAttack = 0;
    var score = 0;
    var hits = 0;
    var wins = 0;

    //sets the html to show beginning scores and Opp HP
    $(".score").html(`Score: ${score}`);

    //grabs data from handlebars stores in objects
    var character = {
        name: $("#characterName").attr("data-val"),
        hp: $("#characterHp").attr("data-val"),
        attack1: $("#character-attack1").attr("data-val"),
        attack2: $("#character-attack2").attr("data-val")
    }
    var opponent = {
        name: $("#opponentName").attr("data-val"),
        hp: $("#opponentHp").attr("data-val"),
        attack1: $("#opponent-attack1").attr("data-val"),
        attack2: $("#opponent-attack2").attr("data-val")
    }

    console.log("Character:")
    console.log(character);
    console.log("Opponent:")
    console.log(opponent);

    function checkStats() {
        if ($("#character-attack1").attr("data-clicked") || $("#character-attack2").attr("data-clicked")) {
            var loser;
            
            var oppAttackArr = [opponent.attack1, opponent.attack2];
            //randomizes the opp attack 
            var oppAttack = oppAttackArr[Math.floor(Math.random(oppAttackArr) * oppAttackArr.length)];
            
            console.log("==========================");
            console.log("Attack: " + characterAttack);
            console.log("Opp Attack: " + oppAttack);
            console.log("Character Hp: " + character.hp);
            console.log("Opponent Hp: " + opponent.hp);
            console.log("==========================");

            //checks if character wins
            if (character.hp > 0 && opponent.hp > 0) {
                if (characterAttack > oppAttack) {
                    console.log("Character wins round!");
                    opponent.hp -= characterAttack;
                    console.log(`Updated opp hp: ${opponent.hp}`);

                    hits++;
                    wins++;
                    
                    //more of a bonus might add something that multiplies this later  
                    if (wins === 5){
                        score = score + 10 * wins;
                        console.log("Booost!!");
                    } else {
                        score = score + 10;
                        console.log("Score Change")
                    };
                    
                    //updates the html to show correct scores and Opp HP
                    $(".score").html(`Score: ${score}`);
                    $(".oppStats").html(`Opp HP: ${opponent.hp}`);

                    console.log("Score: " + score);
                    console.log("Hits: " + hits);
                    console.log("Wins: " + wins);

                //checks for ties 
                } else if (characterAttack === oppAttack) {
                    console.log("You've tied!!");
                    hits++;
                    console.log("hits: " + hits);

                //checks if character loses
                } else {
                    console.log("Character loses!");
                    character.hp -= oppAttack;
                    hits++;

                    //resets wins counter
                    wins = 0;

                    //stops score from hitting a negative number 
                    if (score === 0){
                        score = 0;
                    } else {
                        score = score - 10;
                    }   
                    //updates the html to show correct scores and hp 
                    $(".score").html(`Score: ${score}`);
                    $(".stats").html(`Character HP: ${character.hp}`);

                    console.log(`Score:  ${score}`);
                    console.log(`Updated character hp: ${character.hp}`);
                    console.log(`Hits: ${hits}`);
                    console.log(`Wins: ${wins}`);
                };
            //this is the end game 
            } else {
                if (character.hp <= 0) {
                    loser = character.name;
                    console.log(`Ending hits: ${hits}`);
                    console.log(`Ending HP: ${character.hp}`);
                    console.log(`Your character ${character.name} lost!`)
                } else if (opponent.hp <= 0) {
                    loser = opponent.name;
                    console.log(`You've won!!`);
                };
                //this is eventually going to pull up the leaderboard 
                alert(`Game Over!! ${loser} has lost!`);

                //will load leaderboard
                
                // $.ajax("/api/leaderboard/", characterStats.id, {
                //     type: "POST",
                //     data: score
                // }).then(function(data){
                //     location.href = "/leaderboard/" + id;
                // })
            };

        };
    };

    playGame();

    function playGame() {

        $("#character-attack1").on("click", function () {
            $("#character-attack1").attr("data-clicked", true);
            characterAttack = character.attack1;
            console.log(characterAttack);
            checkStats();
        });
        $("#character-attack2").on("click", function () {
            $("#character-attack2").attr("data-clicked", true);
            characterAttack = character.attack2;
            console.log(characterAttack);
            checkStats();
        });

    };
});