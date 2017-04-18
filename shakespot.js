// sets the header to the name of the play you have selected
$(document).ready(function() {

    // new ************************************************************************

    $("#choosePlay").change(function() {



        // this snag of code clears out whatever is in the jumbotron
        $("#content").empty();
        $("#ourText").add("div").addClass("content");
        $("#ourText").hide();
        $("#chooseSearch").val('Choose type of search');
        var playSelected = $('#choosePlay').find('option:selected').text(); //$('#choosePlay').prop('name');

        $("#masthead").text(playSelected);
    });
});



// parse function that really needs to be renamed or broken down into different pieces
$(document).ready(function() {




    // end of experimenting ground
    function parse(document) {
        console.log("success");

        $("#chooseSearch").change(function() {

            $("#ourText").show();


            var searchChosen = $('#chooseSearch').val();


            // if user chooses "get character list"
            if (searchChosen == "Get Character List") {

                // this snag of code clears out whatever is in the jumbotron
                $("#content").empty();
                $("#ourText").add("div").addClass("content");
                $("#inputBar").hide();
                // finds persona and moves to text of that tag
                $(document).find("PERSONA").each(function() {
                    var $persona = $(this);
                    $("#content").append("<p class = \"charList\">" + $persona.text() + "</p> <br>");
                });

            }
            // else if for choosing type of search
            else if (searchChosen == "Choose type of search") {

                // this snag of code clears out whatever is in the jumbotron
                $("#content").empty();
                $("#ourText").add("div").addClass("content");
                $("#inputBar").hide();

                // hides the div in case you want a blank screen
                $("#ourText").hide();

            }

            // search by scene or act
            else if (searchChosen == "Search for Scene or Act") {
                // this snag of code clears out whatever is in the jumbotron
                $("#content").empty();
                $("#ourText").add("div").addClass("content");
                $("#inputBar").hide();

                $(document).find("TITLE").each(function() {
                    var $title = $(this);
                    $("#content").append("<div class = \" sectionOfPlay \" > <p class = \"myButton\">" + $title.text() + "</p> </div> <br> <p>" //+    $($title).find('STAGEDIR').text() + "</p> <br>"

                    );


                    //onclick show text of act

                    $(".myButton").click(function() {

                        var txt = $(this).text();
                        console.log(txt);
                        $(document).find("TITLE").each(function() {

                            var $chosenTitle = $(this).parent();
                            //console.log($chosenTitle.text());
                            if ($chosenTitle.text().includes(txt)) {
                                $("#content").empty();
                                $("#ourText").add("div").addClass("content");

                                var $speech = $($chosenTitle).find('SPEECH');
                                var $speaker = $($speech).find('SPEAKER');
                                var $lines = $($chosenTitle).find("LINE");



                                // appends
                                $("#content").append("<div class = \" sectionOfPlay \" > <p class = \"acts\">" + $speech.text() + "</p> </div> <br> <p>");

                                console.log("Woot");
                                console.log($lines.text());

                            }

                        });

                    });

                });



                // end of if else statement
            } else if (searchChosen == "All Stage Directions") {
                // this snag of code clears out whatever is in the jumbotron
                $("#content").empty();
                $("#ourText").add("div").addClass("content");
                $("#inputBar").hide();

                $(document).find("STAGEDIR").each(function() {
                    var $stageDir = $(this);
                    $("#content").append("<p class = \"stageDirections\">" + $stageDir.text() + "</p> <br> <p>");

                });
            }

            // searches for all lines by a single character that the user inputs
            else if (searchChosen == "Search for all lines by character") {
                // this snag of code clears out whatever is in the jumbotron
                $("#content").empty();
                $("#ourText").add("div").addClass("content");

                // sets the input bar to visible
                $("#inputBar").show();

                var characterIsNotThere = false;

                $('#inputBar').bind("enterKey", function(e) {

                    // this snag of code clears out whatever is in the jumbotron
                    $("#content").empty();
                    $("#ourText").add("div").addClass("content");


                    var userInput = $("#inputBar").val().toUpperCase();
                    //userInput = userInput.toUpperCase();

                    // the speaker's words are appended
                    $(document).find("SPEECH").each(function() {
                        var $speech = $(this); //.parent();

                        var $speaker = $($speech).find('SPEAKER');


                        if ($speaker.text().includes(userInput)) {

                            var lines = $($speech).find('LINE');


                            $("#content").append( //"<p>" + $speaker.text() +
                                " <br> <p>" +
                                $speech.text() +
                                '</p> <br>'

                            );

                        } else {

                            characterIsNotThere = true;

                        }

                    });

                });
                $('#inputBar').keyup(function(e) {
                    if (e.keyCode == 13) {
                        $(this).trigger("enterKey");
                    }
                });
                if (characterIsNotThere) {
                    $("#content").append( //"<p>" + $speaker.text() +
                        " <br> <p> No such character in this play </p> <br>"

                    );
                }


            }

            // should really be called "get all dialogue"
            else if (searchChosen == "Get All Dialogue") {

                // this snag of code clears out whatever is in the jumbotron
                $("#content").empty();
                $("#ourText").add("div").addClass("content");
                $("#inputBar").hide();

                $(document).find("SPEECH").each(function() {
                    var $speech = $(this);
                    $("#content").append("<p class = \"fromXML\">" + $speech.text() + "</p> <br> <p>");

                });
            }


            // search for word
            else if (searchChosen == "Search for Word") {

                var wordNotFound = true,
                    wordNotFoundAlreadyAppended = false;
                // this snag of code clears out whatever is in the jumbotron
                $("#content").empty();
                $("#ourText").add("div").addClass("content");

                // sets the input bar to visible
                $("#inputBar").show();
                $('#inputBar').bind("enterKey", function(e) {

                    // this snag of code clears out whatever is in the jumbotron
                    $("#content").empty();
                    $("#ourText").add("div").addClass("content");


                    var userInput = $("#inputBar").val().toUpperCase(); // to uppercase for better includes comparison


                    $(document).find("SPEECH").each(function() {
                        var $speech = $(this);

                        var $speaker = $($speech).find('SPEAKER');


                        var $lines = $($speech).find('LINE');


                        var linesUpperCase = $lines.text().toUpperCase();

                        if (linesUpperCase.includes(userInput)) {
                            wordNotFound = false;

                            // appends to text box
                            $("#content").append(
                                " <br> <p class = \"fromXML\" >" +
                                $lines.text() +
                                '</p> <br>'

                            );

                        }


                    });



                });

                // gets user input on enter key being hit
                $('#inputBar').keyup(function(e) {
                    if (e.keyCode == 13) {
                        $(this).trigger("enterKey");
                    }
                });

                if ((wordNotFound) && (!wordNotFoundAlreadyAppended)) {
                    wordNotFoundAlreadyAppended = true;
                    $("#content").append(
                        " <br> <h2> Word Not Found </h2> <br>"

                    );
                }


            }

        });

    };

    // gets correct play url
    var playURL = 'plays/' + $('#choosePlay').val() + '.xml';

    $.ajax({
        url: playURL, // name of file you want to parse
        dataType: "xml",
        success: parse,
        error: function() {
            alert("Error: Something went wrong");
        }
    });


    $("#choosePlay").change(function() {
        playURL = 'plays/' + $('#choosePlay').val() + '.xml';

        $.ajax({
            url: playURL, // name of file you want to parse
            dataType: "xml",
            success: parse,
            error: function() {
                alert("Error: Something went wrong");
            }
        });

    });


});
