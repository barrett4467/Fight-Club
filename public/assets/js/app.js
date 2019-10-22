$(function () {

    $(".btn").on("click", function (event) {
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
        playGame(data);
    })

    function checkStats(characterAttack, oppAttackOptions, data) {
        if ($("#character-attack1").attr("data-clicked") || $("#character-attack2").attr("data-clicked")) {
            var loser;
            var hits = 0;
            var wins = 0;
            var score = 100;
            //sets the player attack = to the players attack score
            console.log("Attack: " + characterAttack);

            //randomizes the opp attack either 5 or 15 
            var oppAttack = oppAttackOptions[Math.floor(Math.random(oppAttackOptions) * oppAttackOptions.length)];
            console.log("Opp Attack: " + oppAttack);
            var characterHp = data.hp;
            //this is a tester value don't shoot me
            var opponentHp = 150;

            console.log("Character Hp: " + characterHp);
            console.log("Opponent Hp: " + opponentHp);
            if (characterHp > 0 && opponentHp > 0) {
                if (characterAttack > oppAttack) {
                    console.log("Character wins round!");
                    opponentHp -= characterAttack;
                    console.log(`Updated opp hp: ${opponentHp}`);
                    hits++;
                    wins++;
                    score = score + 10 * wins;
                    console.log("Score: " + score);
                    console.log("Hits: " + hits);
                    console.log("Wins: " + wins);

                } else if (characterHp === opponentHp) {
                    console.log("You've tied!!");
                    hits++;
                    console.log("hits: " + hits);
                } else {
                    console.log("Character loses!");
                    characterHp -= oppAttack;
                    hits++;
                    wins = 0;
                    score = score - 10;
                    console.log("Score: " + score);
                    console.log(`Updated character hp: ${characterHp}`);
                    console.log("hits: " + hits);
                    console.log("Wins: " + wins);
                };

            } else {
                if (characterHp <= 0) {
                    loser = character.name;
                    console.log(`Ending hits: ${hits}`);
                    console.log(`Ending HP: ${characterHp}`);
                    console.log(`Your character ${character.name} lost!`)
                } else if (opponentHp <= 0) {
                    loser = opponent.name;
                    console.log("You've won!!");
                };
                //this is eventually going to pull up the leaderboard 
                alert(`Game Over!! ${loser} has lost!`);
            };

        };
    };

    function playGame(data) {
        var characterAttack = 0;
        var oppAttackOptions = [5, 20];

        $("#character-attack1").on("click", function (event) {
            $("#character-attack1").attr("data-clicked", true);
            var characterAttack1 = data.attack_points_1;
            characterAttack = characterAttack1;
            console.log(characterAttack);
            checkStats(characterAttack, oppAttackOptions, data);
        });
        $("#character-attack2").on("click", function (event) {
            $("#character-attack2").attr("data-clicked", true);
            var characterAttack2 = data.attack_points_2;
            characterAttack = characterAttack2;
            console.log(characterAttack);
            checkStats(characterAttack, oppAttackOptions, data);
        });

    };
});