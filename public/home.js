$(function(){
    var roomId;

    $.ajax({
        type: "GET",
        url: "/api/rooms",
    }).done(function (rooms){
        if (rooms[0] != null){
            roomId = rooms[0].id;
        }
        
        getMessages();

        $.each(rooms, function(key,room){
            var a = '<a href="#" data-room-id="' + room.id + '" class="room list-group-item">' + room.name + '</a>';
            $("#rooms").append(a);
        })
    });

    $("#post").click(function(){
        var message = {
            text: $("#message").val()
        };

        $.ajax({
            type:"POST",
            url:"/api/rooms/"+ roomId + "/messages",
            data: message
        }).done( function(){
            $("#message").val("");
            getMessages();
        });
    });

    $("#delete").click(function(){
        $.ajax({
            type: "DELETE",
            url: "/api/rooms/" + roomId + "/messages"
        }).done(function(){
            $("#messages").val("");
        });
    });

    function getMessages(){
        $.ajax({
            type:"GET",
            url: "/api/rooms/"+roomId+"/messages",
        }).done( function(data){
            
            $("#roomName").text("Message for " + data.room.name);
            var messages = "";

            $.each(data.messages, function(key,message){    
                messages += message.text + '\r';
            });

            $("#messages").val(messages);
        })
    }
})