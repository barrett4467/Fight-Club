$(function(){
    $(".btn").on("click", function(event){
        var id = $(this).data("id");
        console.log(id);
        $.ajax("/fight"+id,{
            type:"POST",
            data: id
        }).then(function(){
            location.href= "/fight/"+id;
        })
    })

});