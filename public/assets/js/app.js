$(function () {

    $(".btn").on("click", function () {
        var character = {
            id: $(this).data("id"),
            name: $("#name").attr("data-val"),
            hp: $("#hp").attr("data-val"),
            attack1: $("#attack-1").attr("data-val"),
            attack2: $("#attack-2").attr("data-val")
        }
        console.log(character);
        var id = $(this).data("id");
        $.ajax("/api/fight/:" + id, {
            type: "POST",
            data: character
        }).then(function () {
            location.href = "/fight/" + id;
        });
    });

    var characterStats;
    $.ajax("/api/fight/" + $("#selectedChar").attr("data-val"), {
        type: "GET"
    }).then(function (data) {
        characterStats = data;
        console.log(characterStats);
        playGame(characterStats);
    })
    var score = 0;
    var hits = 0;
    var wins = 0;
    //this is a tester value don't shoot me
    var opponentHp = 150;
    $(".oppStats").html(`Opp HP: ${opponentHp}`);
    $(".score").html(`Score: ${score}`);

    function checkStats(character, oppAttackOptions) {
        if ($("#character-attack1").attr("data-clicked") || $("#character-attack2").attr("data-clicked")) {
            var loser;
            //sets the player attack = to the players attack score
            console.log("Attack: " + character.attack);

            //randomizes the opp attack either 5 or 15 
            var oppAttack = oppAttackOptions[Math.floor(Math.random(oppAttackOptions) * oppAttackOptions.length)];
            console.log("Opp Attack: " + oppAttack);


            console.log("Character Hp: " + character.hp);
            console.log("Opponent Hp: " + opponentHp);
            if (character.hp > 0 && opponentHp > 0) {
                if (character.attack > oppAttack) {
                    console.log("Character wins round!");
                    opponentHp -= character.attack;
                    $(".oppStats").html(`Opp HP: ${opponentHp}`);
                    console.log(`Updated opp hp: ${opponentHp}`);
                    hits++;
                    wins++;
                    if (wins === 5){
                        score = score + 10 * wins;
                    } else {
                        score = score + 10;
                    };

                    $(".score").html(`Score: ${score}`);
                    console.log("Score: " + score);
                    console.log("Hits: " + hits);
                    console.log("Wins: " + wins);

                } else if (character.attack === oppAttack) {
                    console.log("You've tied!!");
                    hits++;
                    console.log("hits: " + hits);
                } else {
                    console.log("Character loses!");
                    character.hp -= oppAttack;
                    hits++;
                    wins = 0;

                    //stops score from hitting a negative number 
                    if (score === 0){
                        score = 0;
                    } else {
                        score = score - 10;
                    }
                    console.log(`Score:  ${score}`);
                    $(".score").html(`Score: ${score}`);
                    $(".stats").html(`Character HP: ${character.hp}`);
                    console.log(`Updated character hp: ${character.hp}`);
                    console.log(`Hits: ${hits}`);
                    console.log(`Wins: ${wins}`);
                };

            } else {
                if (character.hp <= 0) {
                    loser = "character";
                    console.log(`Ending hits: ${hits}`);
                    console.log(`Ending HP: ${characterStats.hp}`);
                    console.log(`Your character ${characterStats.name} lost!`)
                } else if (opponentHp <= 0) {
                    loser = "opponent";
                    console.log(`You've won!!`);
                };
                //this is eventually going to pull up the leaderboard 
                alert(`Game Over!! ${loser} has lost!`);
            };

        };
    };

    function playGame(characterStats) {
        var characterAttack = 0;
        console.log(`Character: `);
        console.log(characterStats);
        var oppAttackOptions = [2, 4];


        $("#character-attack1").on("click", function () {
            $("#character-attack1").attr("data-clicked", true);
            var characterAttack1 = characterStats.attack_points_1;
            characterStats.attack = characterAttack1;
            console.log(characterStats.attack);
            checkStats(characterStats, oppAttackOptions);
        });
        $("#character-attack2").on("click", function () {
            $("#character-attack2").attr("data-clicked", true);
            var characterAttack2 = characterStats.attack_points_2;
            characterStats.attack = characterAttack2;
            console.log(characterAttack);
            checkStats(characterStats, oppAttackOptions);
        });

    };
});