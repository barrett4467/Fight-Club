$(function(){
        $(".characterButton").on("click", function(){
            var id = $(this).data("id");
            console.log(id);
            $.get ("/api/characters/" + id, function(data){
                var character = data;
                console.log(character);
            });
            res.json(id);
            return id;

        });
    
    var score = 100;
    var wins = 0;
    var hits = 0;
    
    function checkStats(characterAttack, oppAttackOptions){
        if ($("#character-attack1").data("clicked")|| $("#character-attack2").data("clicked")){
            var loser;

            //sets the player attack = to the players attack score
            console.log("Attack: " + characterAttack);
    
            //randomizes the opp attack either 5 or 15 
            var oppAttack = oppAttackOptions[Math.floor(Math.random(oppAttackOptions)*oppAttackOptions.length)];
            console.log("Opp Attack: " + oppAttack);
    
            if (character.hp > 0 && opponent.hp > 0){
                if (characterAttack > oppAttack){
                    console.log("Character wins round!");
                    opponent.hp -= characterAttack;
                    console.log(`Updated opp hp: ${opponent.hp}`);
                    hits++;
                    wins++;
                    score = score + 10 * wins;
                    console.log("Score: " + score);
                    console.log("Hits: " + hits);
                
                } else if (character.hp === opponent.hp){
                    console.log("You've tied!!");
                    hits++;
                    console.log("hits: " + hits);
                } else {
                    console.log("Character loses!");
                    character.hp -= oppAttack;
                    hits++;
                    wins = 0;
                    score = score - 10;
                    console.log("Score: " + score);
                    console.log(`Updated character hp: ${character.hp}`);
                    console.log("hits: " + hits);
                };
    
            } else {
                if (character.hp <= 0){
                    loser = character.name;
                    console.log(`Ending hits: ${hits}`);
                    console.log(`Ending HP: ${character.hp}`);
                    console.log(`Your character ${character.name} lost!`)
                } else if (opponent.hp <= 0){
                    loser = opponent.name;
                    console.log("You've won!!");
                };
                //this is eventually going to pull up the leaderboard 
                alert(`Game Over!! ${loser} has lost!`);
            };
    
        };
    };
    
    function playGame (){
        var characterAttack = 0;
        var oppAttackOptions = [5, 20];
        
        $("#character-attack1").on("click", function(event){
            $(this).data("clicked", true);
            var characterAttack1 = character.attack;
            characterAttack = characterAttack1;
            checkStats(characterAttack, oppAttackOptions);
        });
        $("#character-attack2").on("click", function(event){
            $(this).data("clicked", true);
            var characterAttack2 = character.attack + 5;
            characterAttack = characterAttack2;
            checkStats(characterAttack, oppAttackOptions);
        });
    
    };
    
    playGame();

})

