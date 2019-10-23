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
    var defense = 0;

    //sets the html to show beginning scores and Opp HP
    $(".score").html(`Score: ${score}`);

    //grabs data from handlebars stores in objects
    var character = {
        id: $("#selectedChar").attr("data-val"),
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

    console.log(character);

    function checkStats() {
        if ($("#character-attack1").attr("data-clicked") || $("#character-attack2").attr("data-clicked")) {
            var loser;
            var change = 0;
            var oppAttackArr = [opponent.attack1, opponent.attack2];
            //randomizes the opp attack 
            var oppAttack = oppAttackArr[Math.floor(Math.random(oppAttackArr) * oppAttackArr.length)];
            
            $("#oppUpdate").html(``);
            $("#update").html(``);
            $("#status").html(``);

            console.log("==========================");
            console.log("Attack: " + characterAttack);
            console.log("Opp Attack: " + oppAttack);
            console.log("Character Hp: " + character.hp);
            console.log("Opponent Hp: " + opponent.hp);
            console.log("==========================");

            //checks if character wins
            if (character.hp > 0 && opponent.hp > 0) {

                if (parseInt(characterAttack) > parseInt(oppAttack)) {
                    console.log("Character wins round!");
                    opponent.hp -= characterAttack;
                    console.log(`Updated opp hp: ${opponent.hp}`);

                    hits++;
                    wins++;
                    $("#oppUpdate").html(`<p>Opponent Attack: -${characterAttack}</p>`);
                    $("#status").html(`<p>Way to Go!</p>`);
                    //more of a bonus might add something that multiplies this later  
                    if (wins === 5){
                        score = defense + score + 10 * wins;
                        console.log("Booost!!");
                    } else {
                        score = score + 10 + defense;
                        console.log("Score Change")
                    };
                    if(opponent.hp > 0){
                        $(".oppStats").html(`Opponent HP: ${opponent.hp}`);
                    } else {
                        $(".oppStats").html(`Opponent HP: 0`);
                    }
                    //updates the html to show correct scores and Opp HP
                    $(".score").html(`Score: ${score}`);
                    $(".oppStats").html(`Opp HP: ${opponent.hp}`);

                    console.log("Score: " + score);
                    console.log("Hits: " + hits);
                    console.log("Wins: " + wins);

                //checks for ties 
                } else if (characterAttack === oppAttack) {
                    $("#status").html(`<p>Nice block!</p>`);
                    console.log("You've tied!!");
                    hits++;
                    defense = defense + 5;
                    console.log("defense: " + defense);
                    console.log("hits: " + hits);

                //checks if character loses
                } else {
                    $("#status").html(`<p>Better luck next time!</p>`);
                    console.log("Character loses!");
                    character.hp -= oppAttack;
                    hits++;
                    
                    //resets wins counter
                    wins = 0;

                    //sets score 
                    score = score + defense * hits;

                    $("#update").html(`<p>Opponent Attack: -${oppAttack}</p>`);
                    //updates the html to show correct scores and hp 
                    $(".score").html(`Score: ${score}`);
                    if(character.hp > 0){
                        $(".stats").html(`Character HP: ${character.hp}`);
                    } else {
                        $(".stats").html(`Character HP: 0`);
                    }
                    

                    console.log(`Score:  ${score}`);
                    console.log(`Updated character hp: ${character.hp}`);
                    console.log(`Hits: ${hits}`);
                    console.log(`Wins: ${wins}`);
                };
            //this is the end game 
            } else {

                if (character.hp === 0 || character.hp < 0) {
                    loser = character.name;
                    console.log(`Ending hits: ${hits}`);
                    console.log(`Ending HP: ${character.hp}`);
                    console.log(`Your character ${character.name} lost!`)
                    //will post score, needs logic to determine if its high enough to score 
                    $.ajax("/api/leaderboards/", {
                        type: "POST",
                        data: {
                            score
                        }
                    }).then(function(data){
                        console.log("Data: " + data);
                        setTimeout(window.location.reload(), 2000);
                    })

                    window.location.href = "/leaderboards/";
                
                } else if (opponent.hp <= 0) {
                    loser = opponent.name;
                    console.log(`You've won!!`);
                    //will post score, needs logic to determine if its high enough to score 
                    $.ajax("/api/leaderboards/", {
                        type: "POST",
                        data: {
                            score
                        }
                    }).then(function(data){
                        console.log("Data: " + data);
                        location.href = "/leaderboards/";
                        setTimeout(window.location.reload(), 2000);
                    })

                    window.location.href = "/leaderboards/";
                
                };

                


            };

        };
    };

    playGame();

    function playGame() {

        //tracks which attack user presses
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