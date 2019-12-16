/*=====================================
    Up Next: Load Postcards
=====================================*/
// var userToken = '1c5a3d95569e7a8d45fdb811123eac6f31693174';
// var userToken = '9d2ddfc135b317c7068b826b13cdac8f6413c4d5';
// var userToken = '26965aaa7dd76101390e50d0a5c515fab1b7529e';
// var userToken = '02fb11b97a86020fb66d5afa52f3ba295dbc201e';
var userToken = 'd8e47df490c9a13ac4f098a642f338d1161fb6b7';


//var endpoint = 'http://ephemerasearch-staging.herokuapp.com/api'
var endpoint = 'http://0.0.0.0:8000/api'

function upNextLoadPostcards(which) {
    // console.log('userToken: ' + userToken);
    // console.log('upNextLoadPostcards:', which);
    // var urlToLoad = 'http://ephemerasearch-staging.herokuapp.com/api/ephemera/?has_images=true';
    // var urlToLoad = 'http://ephemerasearch-staging.herokuapp.com/api/ephemera/?has_images=true&expand=images';
    var urlToLoad = endpoint + '/ephemera/?has_images=true&expand=images&limit=100';

    if (which == 'all') { urlToLoad = endpoint + '/ephemera/?has_images=true&expand=images&limit=100'; }

    if (which == 'dates') { urlToLoad = endpoint + '/ephemera/?has_images=true&has_dates=false&expand=images&limit=100'; }

    if (which == 'places') { urlToLoad = endpoint + '/ephemera/?has_images=true&has_places=false&expand=images&limit=100'; }

    if (which == 'languages') { urlToLoad = endpoint + '/ephemera/?has_images=true&has_languages=false&expand=images&limit=100'; }

    console.log(urlToLoad);
    $.ajax({
        url: urlToLoad,
        type: "GET",
        datatype: "json",
        headers: {'Authorization': 'Token ' + userToken},
        success: function (response) {
            console.log(response);
            // console.log(response.results);
            var x = response.results;
            // console.log('x= ' + x);
            var my_html = '';

            for (var i = 0; i < x.length; i++) {
                // console.log(x[i].images[0].thumbnail_300);
                // console.log(x[i].images.length);

                if (x[i].images.length == 0) {                                                                              // TODO: Add ,places
                    my_html += "<img id='" + x[i].pk + "' class='active-cards' detail='" + x[i].detail + '?expand=languages,images,places,tags,ephemeronlinks' + "' src='../assets/images/postcard_thumb_placeholder.jpg' width='250px' height='165px' onclick='displaySelectedPostcard(this)'>";
                } else {
                    my_html += "<img id='" + x[i].pk + "' class='active-cards' detail='" + x[i].detail + '?expand=languages,images,places,tags,ephemeronlinks' + "' src='" + x[i].images[0].thumbnail_300 + "' onclick='displaySelectedPostcard(this)'>";
                }
            }
            // console.log(my_html);
            $('#up-next-postcards').html(my_html);
        },
        error: function(data, errorThrown) {
            //alert('request failed :'+errorThrown);
        }
    });
}


/*===================================================================================================================================
    Postcard: Display Selected Postcard
===================================================================================================================================*/
var postcardData = null; // global postcard info
var postcardDetail = null; // global postcard link
var postcardDetailEx = null;
var postcardPk = null; // global postcard pk
var postcardId = null; // global postcard frontside im id
var postcardBackId = null; // global postcard backside img id
var postcardFrontId = null; // global postcard frontside img id
var postcardSide = null;

function displaySelectedPostcard(which) {
    // console.log(which);
    $(which).addClass('selected');
    var y = document.getElementById('postcard-top');
    var visibleFields = document.getElementsByClassName('display-input');
    postcardDetailEx = which.getAttribute('detail');


    var postcardDetailExStr = "<span id='inner-postcardDetailEx'>Postcard Detail: <a href='" + postcardDetailEx + "'target='_blank'>" + postcardDetailEx + ',tags' + "</a></span>";
    $('#postcardDetailEx').html(postcardDetailExStr);
    // postcardId = which.getAttribute('id');

    // console.log(which);
    // console.log(postcardId);
    // console.log(postcardDetail);

    $.ajax({
        url: postcardDetailEx,
        type: "GET",
        datatype: "json",
        headers: {'Authorization': 'token ' + userToken},
        // data: ajaxURL,
        success: function (response) {
            // console.log('');
            // console.log('======Postcard: Display Selected Postcard======');

            y.classList.add('display');
            var x = response; // postcard's data
            postcardData = x // makes postcard's data global
            postcardDetail = x.detail;
            postcardPk = x.pk; // set postcard's pk

            console.log('');
            console.log('---- Display Selected Postcard ----');

            console.log(x);
            // console.log(postcardDetail);

            var latestTextBack = '';
            var latestTextFront = '';
            var messageStatusBack = '';
            var messageStatusFront = '';
            // console.log('total images: ' + x.images.length);
            if (x.images.length != 2) {
                // define postcard's message text (one side)
                latestTextBack = x.images[0].latest_transcription;
                latestTextFront = null;

                // define postcard's message text status (one side)
                messageStatusBack = x.images[0].transcription_status;
                messageStatusFront = null;

                // display postcard's images (one side)
                post_backside = "<img id='edited_postcard' detail='" + x.pk + "' src='" + x.images[0].file + "'>";
                post_frontside = "-- no image found --";

                // $('#message-text-front-box').addClass('disabled');
            } else {
                // define postcard's message text (both sides)
                latestTextBack = x.images[0].latest_transcription;
                latestTextFront = x.images[1].latest_transcription;

                // define postcard's message text status (both sides)
                messageStatusBack = x.images[0].transcription_status;
                messageStatusFront = x.images[1].transcription_status;

                // display postcard's images (both sides)
                post_backside = "<img id='edited_postcard' detail='" + x.pk + "' src='" + x.images[1].file + "'>";
                post_frontside = "<img id='edited_postcard_back' detail='" + x.pk + "' src='" + x.images[0].file + "'>";
            }

            // console.log(latestText);
            // console.log(x.pictures[0].latest_transcription.text);

            var postcardInput = formFieldTotal;
            var postcardInputDif = 0;
            var postcardInputTotal = 0;

            // console.log('postcardInput= ' + postcardInput);

            var eLinks = x.ephemeronlinks; // postcard's languages | places
        // ------ languages ------
            // console.log('languages found: ' + x.languages.length);
            // console.log('languages found: ' + x.languages.length);
            if (x.languages.length == 0) {
                $("#languages").chosen("destroy");
                $('#languages').empty();
                appendLanguages(langArray);
                $('#languages')[0].parentElement.classList.remove('completed');

                // uncheck checkbox / hide field
                // $('#languages_chosen').addClass('hide');
                // $('#languages-unreadable-box').addClass('hide');
                // $('#languages-checkbox').prop("checked", false);
            } else {
                $('#languages')[0].parentElement.classList.add('completed');
                var l = x.languages; // postcard's languages
                for (var i = 0; i < l.length; i++) {
                    var langStr = l[i].detail.split('/'); // convert l (http://ephemera-pw-staging.herokuapp.com/api/languages/12/) into array
                    var langPk = langStr[5]; // assign langPk to link's pk number (12)
                    // console.log(langPk); // 12
                    $("#languages option[value=" + langPk + "]").attr('selected','selected');
                    $("#languages").trigger("chosen:updated");
                }
                // for (var i = 0; i < eLinks.length; i++) {
                //     if (eLinks[i].content_type == 'language') {
                //         $("#languages option[value=" + eLinks[i].pk + "]").attr('selected','selected');
                //         $("#languages").trigger("chosen:updated");
                //     }
                // }


                // check checkbox / show field
                // $('#languages_chosen').removeClass('hide');
                // $('#languages-unreadable-box').removeClass('hide');
                // $('#languages-checkbox').prop("checked", true);
            }
            // console.log($('#languages')[0].parentElement);



            var formBlank = null;
            if (x.tx_status_writing == 'not_present') {
                $('#blank-postcard').attr('checked', true);

                for (var i = 0; i < formField.length; i++) {
                    formField[i].classList.add('disable');
                }
                updateTally('blank');
            } else {
                for (var i = 0; i < formField.length; i++) {
                    formField[i].classList.remove('disable');
                }
                updateTally();
            }





        // ------ dates ------
            var datesHidden = null;
            var datesLegible = null;
            // console.log('tx_status_dates: ' + x.tx_status_dates);

            if (x.year == null || x.year == '') {
                $('#dates').val('');
            } else {
                $('#dates').val(x.year);
            }

            if (x.tx_status_dates == 'not_present') { datesHidden = true; datesLegible = true; } // field has been toggled off (no content)
            if (x.tx_status_dates == 'unknown') { datesHidden = false; datesLegible = true; } // field hasn't been started yet
            if (x.tx_status_dates == 'illegible') {  datesHidden = false; datesLegible = false; } // field has been marked illegible (unreadable)
            if (x.tx_status_dates == 'in_progress') {  datesHidden = false; datesLegible = true; } // field has been worked on
            if (x.tx_status_dates == 'completed') { // field has content
                datesHidden = false;
                datesLegible = true;
                $('#dates-box').addClass('completed');
            } else {
                $('#dates-box').removeClass('completed');
            }

            if (datesHidden == true) {
                // check checkbox / hide field
                $('#dates').addClass('hide');
                $('#dates-unreadable-box').addClass('hide');
                $('#dates-checkbox').prop("checked", false);
            } else {
                // uncheck checkbox / hide field
                $('#dates').removeClass('hide');
                $('#dates-unreadable-box').removeClass('hide');
                $('#dates-checkbox').prop("checked", true);
            }

            if (datesLegible != true) {
                // check checkbox / disable field
                $('#dates').addClass('disable');
                $('#dates-toggle-box').addClass('disable');
                $('#dates-unreadable').attr("checked", true);
            } else {
                // uncheck checkbox / hide field
                $('#dates').removeClass('disable');
                $('#dates-toggle-box').removeClass('disable');
                $('#dates-unreadable').removeAttr("checked", false);
            }


        // ------ postmark-date ------
            // if (x.year == null || x.year == '') {
                // $('#postmark-date').val('');
                // $('#postmark-date')[0].parentElement.classList.remove('completed');
            // } else {
                // $('#postmark-date').val(x.year);
                // $('#postmark-date')[0].parentElement.classList.add('completed');
            // }
            // console.log($('#postmark-date')[0].parentElement);








        // ------ recipient-name ------
            var namesHidden = null;
            var namesLegible = false;
            // console.log('tx_status_names: ' + x.tx_status_names);

            if (x.recipient == null || x.recipient == '') {
                $('#recipient-name').val('');
            } else {
                $('#recipient-name').val(x.recipient);
            }

            if (x.tx_status_names == 'unknown') { namesHidden = false; namesLegible = true; } // field hasn't been started yet
            if (x.tx_status_names == 'not_present') { namesHidden = true; namesLegible = true; } // field has been toggled off (no content)
            if (x.tx_status_names == 'illegible') {  namesHidden = false; namesLegible = false; } // field has been marked illegible (unreadable)
            if (x.tx_status_names == 'in_progress') {  namesHidden = false; namesLegible = true; } // field has been worked on
            if (x.tx_status_names == 'completed') { namesHidden = false; namesLegible = true; } // field has content

            if (namesHidden == true) {
                // check checkbox / hide field
                $('#recipient-name').addClass('hide');
                $('#recipient-name-unreadable-box').addClass('hide');
                $('#recipient-name-checkbox').prop("checked", false);
            } else {
                // uncheck checkbox / show field
                $('#recipient-name').removeClass('hide');
                $('#recipient-name-unreadable-box').removeClass('hide');
                $('#recipient-name-checkbox').prop("checked", true);
            }

            if (namesLegible != true) {
                // check checkbox / disable field
                $('#recipient-name').addClass('disable');
                $('#recipient-name-toggle-box').addClass('disable');
                $('#recipient-name-unreadable').attr("checked", true);
            } else {
                // uncheck checkbox / hide field
                $('#recipient-name').removeClass('disable');
                $('#recipient-name-toggle-box').removeClass('disable');
                $('#recipient-name-unreadable').removeAttr("checked", true);
            }










        // ------ recipient-location ------
            var chosenChildren = $('#recipient-chosen-choices')[0].childNodes;
            var recipPlaceCompleted = false;
            // console.log('tx_status_places: ' + x.tx_status_places);

            if (x.places.length == 0) { // no places
                for (var i = 0; i < chosenChildren.length; i++) {
                    if (chosenChildren[i].className == 'search-choice') {
                        chosenChildren[i].remove();
                    }
                }

            } else {
                for (var i = 0; i < chosenChildren.length; i++) {
                    if (chosenChildren[i].className == 'search-choice') {
                        chosenChildren[i].remove();
                    }
                }

                // var p = x.places; // postcard's places
                // for (var i = 0; i < p.length; i++) {
                    // var placeStr = p[i].split('/'); // convert l (http://ephemera-pw-staging.herokuapp.com/api/languages/12/) into array
                    // var placePk = placeStr[5]; // assign langPk to link's pk number (12)
                    // $('#recipient-chosen-choices').prepend("<li class='search-choice' detail='" + placeArray[placePk].place_id + "'><span>" + placeArray[placePk].name + "</span><a class='search-choice-close' onclick='searchChoiceClose(this)'></a></li>") // append li into ul

                // }
                for (var i = 0; i < eLinks.length; i++) {
                    if (eLinks[i].place_category == 'destination') {
                        var recipObjectId = eLinks[i].object_id;
                        // console.log('recipObjectId: ' + recipObjectId);
                        // console.log('places.length ' + x.places.length);
                        for (var ii = 0; ii < x.places.length; ii++) {
                            if (x.places[ii].pk == recipObjectId) {
                                // $('#recipient-chosen-choices').prepend("<li class='search-choice' detail='" + eLinks[i].content_object.place_id + "'><span>" + eLinks[i].content_object.name + "</span><a class='search-choice-close' onclick='searchChoiceClose(this)'></a></li>") // append li into ul
                                $('#recipient-chosen-choices').prepend("<li class='search-choice' detail='" + x.places[ii].place_id + "'><span>" + x.places[ii].name + "</span><a class='search-choice-close' onclick='searchChoiceClose(this)'></a></li>") // append li into ul
                            }
                        }
                    }
                }

                if (x.tx_status_places == 'completed') {
                    $('#recipient-location-box').addClass('completed');
                } else {
                    $('#recipient-location-box').removeClass('completed');
                }
            }



        // ------ postmark-from ------
            var chosenChildrenPost = $('#postmark-chosen-choices')[0].childNodes;
            var postPlaceCompleted = false;
            // console.log('tx_status_places: ' + x.tx_status_places);

            if (x.places.length == 0) { // no places
                for (var i = 0; i < chosenChildrenPost.length; i++) {
                    if (chosenChildrenPost[i].className == 'search-choice') {
                        chosenChildrenPost[i].remove();
                    }
                }

            } else {
                for (var i = 0; i < chosenChildrenPost.length; i++) {
                    if (chosenChildrenPost[i].className == 'search-choice') {
                        chosenChildrenPost[i].remove();
                    }
                }


                for (var i = 0; i < eLinks.length; i++) {
                    // var placeStr = p[i].split('/'); // convert l (http://ephemera-pw-staging.herokuapp.com/api/languages/12/) into array
                    // var placePk = placeStr[5]; // assign langPk to link's pk number (12)
                    // $('#recipient-chosen-choices').prepend("<li class='search-choice' detail='" + placeArray[placePk].place_id + "'><span>" + placeArray[placePk].name + "</span><a class='search-choice-close' onclick='searchChoiceClose(this)'></a></li>") // append li into ul
                    if (eLinks[i].place_category == 'origin') {
                        var postObjectId = eLinks[i].object_id;
                        for (var ii = 0; ii < x.places.length; ii++) {
                            if (x.places[ii].pk == postObjectId) {
                                // $('#postmark-chosen-choices').prepend("<li class='search-choice' detail='" + eLinks[i].content_object.place_id + "'><span>" + eLinks[i].content_object.name + "</span><a class='search-choice-close' onclick='searchChoiceClose(this)'></a></li>") // append li into ul
                                $('#postmark-chosen-choices').prepend("<li class='search-choice' detail='" + x.places[ii].place_id + "'><span>" + x.places[ii].name + "</span><a class='search-choice-close' onclick='searchChoiceClose(this)'></a></li>") // append li into ul
                            }
                        }
                    }
                }

                if (x.tx_status_places == 'completed') {
                    $('#postmark-location-box').addClass('completed');
                } else {
                    $('#postmark-location-box').removeClass('completed');
                }
            }











        // ------ message-text (back) ------
            // console.log('message text (back) status: ' + messageStatusBack);
            var messageBackComplete = false;

            if (messageStatusBack != null) {
                    if (latestTextBack == null) {
                    $('#message-text').val('');
                } else {
                    $('#message-text').val(latestTextBack.text);
                    $('#message-back-needs-work').prop("checked", true);
                }

                if (messageStatusBack == 'not_started') {
                    $('#message-text-checkbox').prop("checked", true);
                    $('#message-back-unreadable-box').prop("checked", false);
                    $('#message-back-needs-work').prop("checked", false);
                    $('#message-back-complete').prop("checked", false);
                }
                if (messageStatusBack == 'illegible') {
                    $('#message-back-unreadable').prop("checked", true);
                    $('#message-text').addClass('disable');
                } else {
                    $('#message-text').removeClass('disable');
                }
                if (messageStatusBack == 'in_progress') { $('#message-back-needs-work').prop("checked", true); }
                if (messageStatusBack == 'completed') {
                    $('#message-back-complete').prop("checked", true);
                    messageBackComplete = true;
                }
                if (messageStatusBack == 'not_present') {
                    // uncheck checkbox / hide fields
                    $('#message-text').addClass('hide');
                    $('#message-text-box-buttons').addClass('hide');
                    $('#message-text-checkbox').prop("checked", false);

                    $('#message-text')[0].parentElement.classList.add('hidden');
                    $('#message-text-box').addClass('not-present');
                } else {
                    // check checkbox / show fields
                    $('#message-text').removeClass('hide');
                    $('#message-text-box-buttons').removeClass('hide');
                    $('#message-text-checkbox').prop("checked", true);
                }

            } else {
                $('#message-text').val('');

                // check checkbox / show fields
                $('#message-text-box').addClass('disable');
                $('#message-text').addClass('hide');
                $('#message-text-box-buttons').addClass('hide');
                $('#message-text-checkbox').prop("checked", false);
            }
            if (messageBackComplete == true) {
                // $('#message-text')[0].parentElement.classList.add('completed');
                $('#message-text-box').addClass('completed');
            } else {
                // $('#message-text')[0].parentElement.classList.remove('completed');
                $('#message-text-box').removeClass('completed');
            }











        // ------ message-text (front) ------
            // console.log('message text (front) status: ' + messageStatusFront);
            var messageFrontComplete = false;
            if (messageStatusFront != null) {
                if (latestTextFront == null) {
                    $('#message-text-front').val('');
                } else {
                    $('#message-text-front').val(latestTextFront.text);
                    $('#message-front-needs-work').prop("checked", true);
                }

                if (messageStatusFront == 'not_started') {
                    $('#message-text-front-checkbox').prop("checked", true);
                    $('#message-front-unreadable-box').prop("checked", false);
                    $('#message-front-needs-work').prop("checked", false);
                    $('#message-front-complete').prop("checked", false);
                }
                if (messageStatusFront == 'illegible') {
                    $('#message-front-unreadable').prop("checked", true);
                    $('#message-text-front').addClass('disable');
                } else {
                    $('#message-text-front').removeClass('disable');
                }
                if (messageStatusFront == 'in_progress') { $('#message-front-needs-work').prop("checked", true); }
                if (messageStatusFront == 'completed') {
                    $('#message-front-complete').prop("checked", true);
                    messageFrontComplete = true;
                }
                if (messageStatusFront == 'not_present') {
                    // uncheck checkbox / hide fields
                    $('#message-text-front').addClass('hide');
                    $('#message-text-front-box-buttons').addClass('hide');
                    $('#message-text-front-checkbox').prop("checked", false);

                    $('#message-text-front-box').addClass('not-present');
                    $('#message-text-front')[0].parentElement.classList.add('hidden');
                } else {
                    // check checkbox / show fields
                    $('#message-text-front-checkbox').prop("checked", true);
                    $('#message-text-front')[0].parentElement.classList.remove('hidden');
                }
            } else {
                $('#message-text-front').val('');
            }
            // console.log('messageFrontComplete: ' + messageFrontComplete);
            if (messageFrontComplete == true) {
                // $('#message-text-front')[0].parentElement.classList.add('completed');
                $('#message-text-front-box').addClass('completed')
            } else {
                // $('#message-text-front')[0].parentElement.classList.remove('completed');
                $('#message-text-front-box').removeClass('completed')
            }



            postcardSide = 'back';
            postcardToggleSide('back');






        // ------ tags ------
            // console.log('tags found: ' + x.tags.length);
            if (x.tags.length == 0) {
                $("#tags").chosen("destroy");
                $('#tags').empty();
                appendTags(tagArray);
                $('#tags')[0].parentElement.classList.remove('completed');
            } else {
                $('#tags')[0].parentElement.classList.add('completed');
                var t = x.tags; // postcard's tags
                for (var i = 0; i < t.length; i++) {
                    // var tagStr = t[i].split('/'); // convert t (http://ephemera-pw-staging.herokuapp.com/api/tags/4/) into array
                    // var tagPk = tagStr[5]; // assign tagPk to link's pk number (4)
                    // console.log(tagPk); // 4
                    $("#tags option[value=" + t[i].pk + "]").attr('selected','selected');
                    $("#tags").trigger("chosen:updated");
                }
            }
            // console.log($('#tags')[0].parentElement);

            postcardInputDif = formFieldTotal - postcardInput;
            postcardInputTotal =  formFieldTotal - postcardInputDif;
            formTallyTotal = postcardInputTotal;
            // updateTally();
            tallyVisibleFields();
            // console.log(x.pictures);
            postcardBackId = x.images[0].pk;
            postcardFrontId = x.images[1].pk;
            // console.log(postcardBackId);
            // console.log(postcardFrontId);

            $('#postcard-backside').html(post_backside);
            $('#postcard-frontside').html(post_frontside);


            $('#message-front-button').addClass('active');
            $('.content-mid-box').addClass('enabled');
            $('.select-card-text').addClass('disabled');
            $('#tag-transcribe').addClass('enabled');

        },
        error: function(data, errorThrown) {
            //alert('request failed :'+errorThrown);
        }
    });
}


/*===========================================================================================
    Postcard: Toggle Tabs
=============================================================================================*/
function postcardToggleSide(which) {
    console.log('');
    console.log('---- Postcard: Toggle Tabs ----');
    console.log('which: ' + which);
    if (which == 'back') {
        // change tabs
        $('#postcard-backside').addClass('display');
        $('#postcard-backside-tab').addClass('active');
        $('#postcard-frontside').removeClass('display');
        $('#postcard-frontside-tab').removeClass('active');

        // toggle/hide buttons
        $('#message-back-button').removeClass('active');
        $('#message-front-button').addClass('active');

        if ($('#message-text-box').hasClass('not-present')) {
            $('#message-text-box').removeClass('not-present');
            $('#message-text-toggle').removeClass('disable');
        } else {
            if ($('#message-text-checkbox')[0].checked == true) {
                // enable postcard back message text
                $('#message-text-box-buttons').removeClass('hide');
            }
            if ($('#message-back-unreadable')[0].checked == false) {
                // console.log('remove disable');
                $('#message-text').removeClass('disable');
            }
            // console.log($('#message-back-unreadable'));

            $('#message-text-toggle').removeClass('disable');
        }

        // console.log($('#message-text-checkbox'));
        if ($('#message-text-front-box').hasClass('not-present')) {
            $('#message-text-front-box').removeClass('not-present');
            $('#message-text-front-toggle').addClass('disable');
        } else {
            // disable postcard front message text
            $('#message-text-front-box-buttons').addClass('hide');
            $('#message-text-front').addClass('disable');
            $('#message-text-front-toggle').addClass('disable');
        }

        postcardSide = 'back';
    }
    if (which == 'front') {
        // change tabs
        $('#postcard-frontside').addClass('display');
        $('#postcard-frontside-tab').addClass('active');
        $('#postcard-backside').removeClass('display');
        $('#postcard-backside-tab').removeClass('active');

        // toggle/hide buttons
        $('#message-front-button').removeClass('active');
        $('#message-back-button').addClass('active');

        // disable postcard back message text
        $('#message-text-box-buttons').addClass('hide');
        $('#message-text').addClass('disable');
        $('#message-text-toggle').addClass('disable');

        if ($('#message-text-front-checkbox')[0].checked == true) {
            // enable postcard front message text
            $('#message-text-front-box-buttons').removeClass('hide');
        }
        if ($('#message-front-unreadable')[0].checked == false) {
            $('#message-text-front').removeClass('disable');
        }
        $('#message-text-front-toggle').removeClass('disable');



        postcardSide = 'front';
    }
}


/*===========================================================================================
    Filter and Queue: Toggle On/Off
=============================================================================================*/
var toggleCount = 0;
function filterQueueToggle() {
    var x = document.getElementById('filter-queue');
    var y = document.getElementById('tag-transcribe');
    x.classList.toggle('fq-toggled');
    y.classList.toggle('fq-toggled-up');
    if (toggleCount != 0) {
        y.classList.toggle('fq-toggled');
    } else {
        toggleCount++
    }
}


/*===========================================================================================
    Form: Field Tally Total
=============================================================================================*/
var formField = document.getElementsByClassName('form-field-input'); // global variable
var formFieldTotal = formField.length; // 10
var updatedFieldTotal = formFieldTotal - 2; // default form (excludes 2 fields)
var formTallyTotal = 0; // for user's total fields completed
var formTallyStr = "<span id='inner-tally-total'>Postcard Progress:" + formTallyTotal +  "/" + updatedFieldTotal + "</span>";

$(window).load(function fieldTallyTotal() {
    $('#tally-total').append(formTallyStr);
});

function updateTally(which) {
    if (formTallyTotal < updatedFieldTotal) {
        $('#inner-tally-total').text("Postcard Progress:" + formTallyTotal +  "/" + updatedFieldTotal);
        $('#tally-total').removeClass("complete");
        $('.next-btn').removeClass('ready');
    } else {
        $('#inner-tally-total').text("Postcard Progress: Complete!");
        $('#tally-total').addClass("complete");
        $('.next-btn').addClass('ready');
    }

    // console.log(which);
    // if postcard is blank
    if (which == 'blank') {
        if ($('#tally-total').hasClass('card-blank')) {
            $('#tally-total').removeClass("card-blank");
            $('.next-btn').removeClass('ready');
        } else {
            $('#inner-tally-total').text("Postcard Progress: Blank");
            $('#tally-total').addClass("card-blank");
            $('.next-btn').addClass('ready');
        }
    }
}


/*===========================================================================================
    Form: Save Field Input(s)
=============================================================================================*/
var callType = 'PUT';
var input = '';
var inputContext = '';
var inputId = '';
var inputVal = '';
var inputType = '';
var inputParent = '';
var inputItem = '';


var currentYear = new Date().getFullYear();

$(".form-field-input :input").each(function(){
    $(this).blur(function(){

        inputData = {};

        callType = 'PUT';

        input = $(this);
        inputContext = input.context;
        inputId = inputContext.id;
        inputVal = inputContext.value;
        inputType = inputContext.type;
        inputParent = inputContext.parentElement;

        var inputCheck = true;
        var postcardURL = postcardDetail;

        // console.log('Postcard link: ' + postcardDetail);
        // inputType != 'radio'
        if (inputType != 'checkbox' && inputType != 'submit' && inputType != 'radio') {
            console.log('');
            console.log('======= Form: Save Field Input(s) =======');
            console.log('Data: ' + inputVal + ' was received (^o^)');
            console.log(input);
            console.log(inputId);

            if (inputId == 'languages') { inputCheck = null; inputItem = 'languages';}

            if (inputId == 'dates') {
                inputData.year = inputVal;
                inputItem = 'dates';
                if (inputVal < 1850 || inputVal > currentYear) {
                    inputCheck = null;
                    $('#dates-err').html("Date must be between 1850 - " + currentYear);
                    $('#dates-err').css("display", "block");
                } else {
                    $('#dates-err').css("display", "none");
                }
            }

            // if (inputId == 'postmark-date') { inputData.recipient = inputVal; }

            if (inputId == 'recipient-name') { inputData.recipient = inputVal; inputItem = 'names'; }

            if (inputId == 'postmark-from') { inputCheck = null; inputItem = 'places'; }

            if (inputId == 'recipient-location') { inputCheck = null; inputItem = 'places'; }

            // if (inputId == 'return-address') { inputData.recipient = inputVal; }

            // if (inputId == 'has-postmark') { inputData.recipient = inputVal; }

            if (inputId == 'tags') { inputCheck = null; inputItem = 'tags'; }

            if (inputId == 'message-text' && postcardDetail != null) {
                postcardId = postcardBackId;
                $('#message-back-needs-work').prop("checked", true);
                submitTranscriptionStatus('in_progress');

                // inputData.image_id = postcardId;
                inputData.image = postcardId;
                inputData.text = inputVal;
                // inputData.action = 'add';

                postcardURL = endpoint + '/transcriptions/';
                // postcardDetail = 'http://ephemerasearch-staging.herokuapp.com/api/transcriptions/add/';
                callType = 'POST';
            }
            if (inputId == 'message-text-front' && postcardDetail != null) {
                postcardId = postcardFrontId;
                $('#message-front-needs-work').prop("checked", true);
                submitTranscriptionStatus('in_progress');

                // inputData.image_id = postcardId;
                inputData.image = postcardId;
                inputData.text = inputVal;
                // inputData.action = 'add';

                postcardURL = endpoint + '/transcriptions/';
                // postcardDetail = 'http://ephemerasearch-staging.herokuapp.com/api/transcriptions/add/';
                callType = 'POST';
            }

            if (inputVal != '' && inputVal != null && inputCheck != null) {
                if (inputParent.classList.contains('completed')) {
                    console.log('Input has already been counted (0ᴗ0)!');
                } else { // doesn't contain .completed
                    // console.log('Field has been counted (^ᴗ^)');
                    inputParent.classList.add('completed');
                    formTallyTotal++
                    updateTally();
                }
            } else {
                console.log('inputVal is empty!! (0o0)');
                if (inputParent.classList.contains('completed') && inputCheck != null) {
                    // console.log('Input has been deleted (xᴗx)!');
                    inputParent.classList.remove('completed');
                    formTallyTotal--
                    updateTally();
                }
                inputCheck = null;
            }

            // inputCheck = null;
            // postcardDetail = null;
            console.log(postcardDetail);
            if (postcardDetail != null && inputCheck != null) {
                $.ajax({
                    url: postcardURL,
                    type: callType,
                    datatype: "json",
                    headers: {'Authorization': 'Token ' + userToken},
                    data: inputData,
                    success: function (response) {

                        // alert('successful : ' + html);
                        // if (input.hasClass('completed')) {
                        //     console.log('Input has already been counted (0ᴗ0)!');
                        // } else { // doesn't contain .completed
                        //     console.log('Field has been counted (^ᴗ^)');
                        //     input.addClass('completed');
                        //     formTallyTotal++
                        //     updateTally();
                        // }
                        console.log(inputItem);
                        setTxStatus(inputItem);



                    },
                    error: function(data, errorThrown) {
                        //alert('request failed :'+errorThrown);
                    }
                });
            } else {
                console.log('failed: no postcard chosen (x_x)');
            }
        } else {
            // console.log('input is a checkbox');
        }
    })
});

/*============================================================================================
    Form: Set TX Status
=============================================================================================*/
function setTxStatus(which) {
    console.log('');
    console.log('---- Form: Set TX Status ----');
    console.log(which);

    var targetPostcardId = postcardDetail.split('/');
    var targetData = {};

    if (which != 'writing') {
        targetData.status = 'completed';
    } else {
        if ($('#blank-postcard')[0].checked == true) { // blank is check
        targetData.status = 'not_present';
        } else { // blank has been unchecked
            targetData.status = 'in_progress';
        }
    }
    targetData.item = which;


    console.log(targetData);
    // var statusCheck = null;
    // if (statusCheck != null) {
    if (postcardDetail != null && which != '' && which != null) {
        $.ajax({
            url: endpoint + "/ephemera/" + targetPostcardId[5] + "/set_tx_status/",
            // type: 'POST',
            type: 'PATCH',
            datatype: "json",
            headers: {'Authorization': 'Token ' + userToken},
            data: targetData,
            success: function (response) {
                // alert('successful : ' + html);
            },
            error: function(data, errorThrown) {
                //alert('request failed :'+errorThrown);
            }
        });
    } else {
        console.log('failed: no postcard chosen (x_x)');
    }
}


/*============================================================================================
    Form: Submit Transcription Status
=============================================================================================*/
function submitTranscriptionStatus(which) {
    var postcardSideId = null;
    var postcardMessage = null;
    var postcardMessageVal = null;
    var postcardMessageStr = null;
    console.log('');
    console.log('--- Form: Submit Transcription Status ---');

    if (postcardSide == 'back') { postcardSideId = postcardBackId; postcardMessage = '#message-text'; }
    if (postcardSide == 'front') { postcardSideId = postcardFrontId; postcardMessage = '#message-text-front'; }

    if (which == 'illegible') {
        $(postcardMessage).addClass('disable');
    } else {
        $(postcardMessage).removeClass('disable');
    }
    /*
    if (which == 'no_text' && postcardSide == 'back') {
        $('#message-back-unreadable').prop('checked', false);
        $('#message-back-needs-work').prop('checked', false);
        $('#message-back-complete').prop('checked', false);
    }
    if (which == 'no_text' && postcardSide == 'front') {
        $('#message-front-unreadable').prop('checked', false);
        $('#message-front-needs-work').prop('checked', false);
        $('#message-front-complete').prop('checked', false);
    }
    */

    console.log(which); // no_text | not_started | in_progress | completed
    console.log('postcardSide: ' + postcardSide); // back | front
    // console.log(postcardFrontId);
    // console.log(postcardBackId);
    console.log('postcardSideId: ' + postcardSideId);
    console.log($(postcardMessage)[0].value);
    postcardMessageVal = $(postcardMessage)[0].value.split(' ');
    console.log(postcardMessageVal);

    var sideCheck = null;
    if (sideCheck == null && postcardMessageVal != null && postcardMessageVal.length > 1 || which == 'illegible') {
        $.ajax({
            url: endpoint + "/images/" + postcardSideId + "/set_tx_status/",
            type: "PATCH",
            datatype: "json",
            headers: {'Authorization': 'Token ' + userToken},
            // data: {transcription_status: which},
            data: {status: which},
            success: function (response) {
                // alert('successful : ' + html);
                if (postcardSide == 'back') {
                    $('#message-err').css('display', 'none');
                }
                if (postcardSide == 'front') {
                    $('#message-front-err').css('display', 'none');
                }
            },
            error: function(data, errorThrown) {
                //alert('request failed :'+errorThrown);
            }
        });
    } else {
        if (postcardSide == 'back') {
            $('#message-back-unreadable').prop('checked', false);
            $('#message-needs-work').prop('checked', false);
            $('#message-complete').prop('checked', false);

            // reveal err message
            $('#message-front-err').html('Message text: (back) is empty');
            $('#message-err').css('display', 'block');
        }
        if (postcardSide == 'front') {
            $('#message-front-unreadable').prop('checked', false);
            $('#message-front-needs-work').prop('checked', false);
            $('#message-front-complete').prop('checked', false);

            // reveal err message
            $('#message-front-err').html('Message text: (front) is empty');
            $('#message-front-err').css('display', 'block');
        }

    }
}


/*===========================================================================================
    Form: Get Place
=============================================================================================*/
// var placeArray = [];
var placeArray = [];

$(window).load(function getPlaces(){
    $.ajax({
        url: endpoint + '/places/?limit=100',
        type: "GET",
        datatype: "json",
        headers: {'Authorization': 'Token ' + userToken},
        // data: ajaxURL,
        success: function (response) {
            var x = response.results;
            // console.log(x);
            for (var i = 0; i < x.length; i++) {
                // console.log(x[i]);
                placeArray[x[i].pk] = {name: x[i].name, place_id: x[i].place_id};
            }
            // console.log(placeArray[18]);
            // console.log(placeArray[18].name);

        },
        error: function(data, errorThrown) {
            console.log('function getPlaces failed');
        }
    });
});


/*===========================================================================================
    Form: Get Languages
=============================================================================================*/
var langArray = [];
var moreUsefulLangArray = {};

$(window).load(function getLangauges(){
    $.ajax({
        url: endpoint + '/languages/?limit=100',
        type: "GET",
        datatype: "json",
        headers: {'Authorization': 'Token ' + userToken},
        // data: ajaxURL,
        success: function (response) {
            var x = response.results;
            // console.log(x);
            for (var i = 0; i < x.length; i++) {
                // console.log(x[i]);
                langArray.push({pk: x[i].pk, get_language_display: x[i].get_language_display});
                moreUsefulLangArray[x[i].pk] = x[i].get_language_display;
            }
            // console.log(moreUsefulLangArray);
            appendLanguages(langArray);
        },
        error: function(data, errorThrown) {
            console.log('function getLanguages failed');
        }
    });
});

/*---------------------------------
    Languages: Append Languages
-----------------------------------*/
function appendLanguages(which){
    // console.log(Object.keys(which));
    // console.log($('#languages'));
    /*
    for (var i=1; i<Object.keys(which).length; i++) {
        // console.log(Object.keys(which)[i] + which[i]);
        let language_pk = Object.keys(which)[i];
        let language_name = which[i];
        $('#languages').append("<option value='" + language_pk + "'>" + language_name + "</option>");
    }
    */
    for (var i = 0; i < which.length; i++) {
        let language_pk = which[i].pk;
        let language_name = which[i].get_language_display;
        $('#languages').append("<option value='" + language_pk + "'>" + language_name + "</option>");
        // console.log(which[i]);
    }
    $("#languages").chosen();
    // $("#languages").chosen("chosen:updated");
}
/*-------------------------------
    Languages: Add / Remove Call
---------------------------------*/
$('.languages').on('change', function(evt, params) {
    console.log('');
    console.log('====== Languages: Add / Remove Call ======');
    // console.log(params);
    // var pCard = $('#edited_postcard') // postcard chosen - used for getting var pk (next line)
    // var pk = pCard.attr('detail'); // postcard pk - used for ajax url
    var selectedPk = '';
    var selectedName = '';
    var selectedAction = '';
    var inputParent = $(this).context.parentElement;

    // console.log($(this).context.parentElement);
    console.log(inputParent);

    if (inputParent.classList.contains('completed')) {
        console.log('Input has already been counted (0ᴗ0)!');
    } else {
        console.log('Field has been counted (^ᴗ^)');
        inputParent.classList.add('completed');
        formTallyTotal++
        updateTally();
    }

    if (postcardDetail != null) {
        if (params.selected != undefined) {
            selectedPk = params.selected;
            selectedAction = 'add';
            // console.log(selectedAction + ' langPk:' + selectedPk + ' into cardPk:' + pk + '\'s language array (^-^)');
        } else {
            selectedPk = params.deselected;
            selectedAction = 'remove';
            // console.log(selectedAction + ' langPk:' + selectedPk + ' from cardPk:' + pk + '\'s language array (o_o)!');
        }

        // console.log(pCard);
        selectedName = 'language';

        // console.log(postcardDetail);
        // console.log(selectedAction);
        var langCheck = null;
        if (langCheck == null) {
            $.ajax({
                // url: postcardDetail,
                url: postcardDetail + selectedAction + '/',
                // url: 'http://ephemerasearch-staging.herokuapp.com/api/ephemeronlinks/',
                // url: 'http://ephemerasearch-staging.herokuapp.com/api/ephemeronlinks/' + selectedAction + '/',

                type: "POST",
                // type: "PATCH",
                // type: "PUT",
                datatype: "json",
                headers: {'Authorization': 'Token ' + userToken},

                // data: {nick: selectedName, pk: selectedPk, action: selectedAction},
                // data: {content_type: selectedName, pk: selectedPk},
                data: {content_type: selectedName, object_id: selectedPk},
                // data: {content_type: selectedName, object_id: postcardPk, action: selectedAction},

                success: function (html) {
                    //alert('request succeeded);
                },
                error: function(data, errorThrown) {
                    //alert('request failed :'+errorThrown);
                }
            });
        }

    } else {
        console.log('failed: no postcard chosen (x_x)');
        $("#languages").chosen("destroy");
        $('#languages').empty();
        appendLanguages(langArray);
    }
});


/*============================================================================================
    Form: Get Tags
=============================================================================================*/
var tagArray = [];

$(window).load(function getTags(){
    $.ajax({
        url: endpoint + '/tags/?limit=100',
        type: "GET",
        datatype: "json",
        headers: {'Authorization': 'Token ' + userToken},
        // data: ajaxURL,
        success: function (response) {
            var x = response.results;
            // console.log(x);
            for (var i = 0; i < x.length; i++) {
                // console.log(x[i]);
                tagArray.push({pk: x[i].pk, name: x[i].name});
                // moreUsefulLangArray[x[i].pk] = x[i].name;
            }
            // console.log(moreUsefulLangArray);
            appendTags(tagArray);
        },
        error: function(data, errorThrown) {
            console.log('function getTags failed');
        }
    });
});

/*---------------------------------
    Tags: Append Tags
-----------------------------------*/
function appendTags(which){
    for (var i = 0; i < which.length; i++) {
        let tag_pk = which[i].pk;
        let tag_name = which[i].name;
        $('#tags').append("<option value='" + tag_pk + "'>" + tag_name + "</option>");
        // console.log(which[i]);
    }
    $("#tags").chosen();
}
/*-------------------------------
    Tags: Add / Remove Call
---------------------------------*/
$('.tags').on('change', function(evt, params) {
    console.log('');
    console.log('====== Tags: Add / Remove Call ======');
    // console.log(params);
    // var pCard = $('#edited_postcard') // postcard chosen - used for getting var pk (next line)
    // var pk = pCard.attr('detail'); // postcard pk - used for ajax url
    var selectedPk = '';
    var selectedName = '';
    var selectedAction = '';
    var inputParent = $(this).context.parentElement;

    // console.log($(this).context.parentElement);
    console.log(inputParent);

    if (inputParent.classList.contains('completed')) {
        console.log('Input has already been counted (0ᴗ0)!');
    } else {
        console.log('Field has been counted (^ᴗ^)');
        inputParent.classList.add('completed');
        formTallyTotal++
        updateTally();
    }

    if (postcardDetail != null) {
        if (params.selected != undefined) {
            selectedPk = params.selected;
            selectedAction = 'add';
            // console.log(selectedAction + ' tagPk:' + selectedPk + ' into cardPk:' + pk + '\'s tag array (^-^)');
        } else {
            selectedPk = params.deselected;
            selectedAction = 'remove';
            // console.log(selectedAction + ' tagPk:' + selectedPk + ' from cardPk:' + pk + '\'s tag array (o_o)!');
        }

        // console.log(pCard);
        selectedName = 'tag';
        console.log(postcardDetail);

        $.ajax({
            url: postcardDetail + selectedAction + '/',
            type: "POST",
            datatype: "json",
            headers: {'Authorization': 'Token ' + userToken},
            data: {content_type: selectedName, object_id: selectedPk},
            success: function (html) {
                //alert('request succeeded);
                if ($(this).hasClass('completed')) {
                    console.log('Input has already been counted (0ᴗ0)!');
                } else {
                    console.log('Field has been counted (^ᴗ^)');
                    $(this).addClass('completed');
                    formTallyTotal++
                    updateTally();
                }
            },
            error: function(data, errorThrown) {
                //alert('request failed :'+errorThrown);
            }
        });

    } else {
        console.log('failed: no postcard chosen (x_x)');
        $("#tags").chosen("destroy");
        $('#tags').empty();
        appendTags(tagArray);
    }
});


/*=========================================================================================
    Postcard: Toggle Blank Form
==========================================================================================*/
var formField = document.getElementsByClassName('form-field-input');
var formHeading = document.getElementsByClassName('form-field-heading');

function postcardBlankToggle() {
    var blankCheck = $('#blank-postcard')[0].checked;

    console.log($('#blank-postcard'));
    console.log('checked= ' + $('#blank-postcard')[0].checked);

    for (var i = 0; i < formField.length; i++) {
        if (blankCheck == true) {
            formField[i].classList.add('disable');
            formHeading[0].classList.add('disable');
            formHeading[1].classList.add('disable');
        } else {
            formField[i].classList.remove('disable');
            formHeading[0].classList.remove('disable');
            formHeading[1].classList.remove('disable');
        }
    }
    updateTally('blank');
    setTxStatus('writing');
}


/*============================================================================================
    Form: Google Map Autofill
=============================================================================================*/
// This sample uses the Autocomplete widget to help the user select a place, then it retrieves the address components associated with that place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('recipient-location'), {types: ['geocode']});

    autocomplete2 = new google.maps.places.Autocomplete(
        document.getElementById('postmark-from'), {types: ['geocode']});

    // Avoid paying for data that you don't need by restricting the set of place fields that are returned to just the address components.
    autocomplete.setFields(['address_component', 'place_id']);
    autocomplete2.setFields(['address_component', 'place_id']);

    // When the user selects an address from the drop-down, populate the address fields in the form.
    // autocomplete.addListener('place_changed', fillInAddress('autocomplete'));
    // autocomplete2.addListener('place_changed', fillInAddress('autocomplete2'));

    // autocomplete.addListener('place_changed', fillInAddress, function() {
    //     inputHidden = 'recipient-location-id';
    //     var place = autocomplete.getPlace();
    // });
    // autocomplete2.addListener('place_changed', fillInAddress, function() {
    //     inputHidden = 'postmark-from-id';
    //     var place = autocomplete2.getPlace();
    // });


    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        fillInAddress('recipient-location-id');
        var place = autocomplete.getPlace();
    });
    google.maps.event.addListener(autocomplete2, 'place_changed', function() {
        fillInAddress('postmark-from-id');
        var place = autocomplete2.getPlace();
    });
}

var inputChild = '';
var textBoxParent = '';
function fillInAddress(which) {
    var inputRec = document.getElementById(which);
    var selectedId = '';
    // var selectedName = 'place';
    var selectedName = 'place';

    // var selectedAction = 'add';
    // var selectedAction = 'set_category';
    var selectedAction = 'set';

    var textVal = '';
    var addPlace = false;

    var inputUl = '';
    var inputTextBox = '';

    var selectedCategory = '';

    console.log('');
    console.log('------- fillInAddress -------');
    console.log(which);

    if (which == 'recipient-location-id') {
        place = autocomplete.getPlace();
        textVal = $('#recipient-location').val() // get value from input field
        inputChild = $('#recipient-chosen-choices')[0].childNodes;
        inputUl = '#recipient-chosen-choices';
        inputTextBox = '#recipient-location';
        textBoxParent = '#recipient-location-box';
        // selectedCategory = 'recipient';
        selectedCategory = 'destination';
    } else {
        place = autocomplete2.getPlace();
        textVal = $('#postmark-from').val() // get value from input field
        inputChild = $('#postmark-chosen-choices')[0].childNodes;
        inputUl = '#postmark-chosen-choices';
        inputTextBox = '#postmark-from';
        textBoxParent = '#postmark-from-box';
        // selectedCategory = 'postmark';
        selectedCategory = 'origin';
    }

    selectedId = place.place_id;
    if (inputChild.length != 5){
        for (var i = 0; i < inputChild.length; i++) {
            // console.log($(chi[i]));
            // if ()
            if ($(inputChild[i])[0].className == 'search-choice') {
                var inputChildAttr = $(inputChild[i]).attr('detail');
                // console.log('inputChildAttr= ' + inputChildAttr);
                // console.log('selectedId= ' + selectedId);
                if (selectedId == inputChildAttr) {
                    console.log('This location was already added (X_x)!');
                    addPlace = false;
                    break; // end loop
                } else {
                    console.log("This location was not added yet (0o0)");
                    addPlace = true;
                }
            }
        }
    } else {
        console.log("This location was not added yet (0o0)");
        addPlace = true;
    }
    if (addPlace == true) {
        $(inputUl).prepend("<li class='search-choice' detail='" + selectedId + "'><span>" + textVal + "</span><a class='search-choice-close' onclick='searchChoiceClose(this)'></a></li>") // append li into ul
    }
    $(inputTextBox).val(''); // clear input field


    // Get the place details from the autocomplete object.
    inputRec.value = place.place_id;
    // selectedAction = 'set_category';
    // console.log(inputRec); // hidden input


    // if (inputTextBox == '#postmark-from') { addPlace = false; } // disable ajax call
    console.log('');
    console.log('--place call--');
    console.log(postcardDetail);

    // addPlace = false;
    if (postcardDetail != null && addPlace == true) {
        $.ajax({
            url: postcardDetail + 'add/',
            type: 'POST',
            datatype: "json",
            headers: {'Authorization': 'Token ' + userToken},
            // data: {nick: selectedName, place_id: selectedId, action: selectedAction, place_category: 'origin'},
            data: {content_type: selectedName, place_id: selectedId, place_category: selectedCategory},
            success: function (response) {
                if (inputChild.length != 5){
                    console.log($(textBoxParent));
                    if ($(textBoxParent).hasClass('completed')) {
                        // something
                    } else {
                        $(textBoxParent).addClass('completed')
                        formTallyTotal++
                        updateTally();
                    }
                } else {
                    if ($(textBoxParent).hasClass('completed')) {
                        $(textBoxParent).removeClass('completed')
                        formTallyTotal--
                        updateTally();
                    } else {
                        // something
                    }
                }
            },
            error: function(data, errorThrown) {
                //alert('request failed :'+errorThrown);
            }
        });
    } else {
        console.log('failed: no postcard chosen (x_x)');
    }

    for (var component in componentForm) {
        $('#' + component).val('');
        // document.getElementById(component).disabled = false;
        // $('#' + component).disabled(false);
    }

    // Get each component of the address from the place details, and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {

        var val = place.address_components[i][componentForm[addressType]];
        $('#' + addressType).val('');
        // document.getElementById(addressType).value = val;
      }
    }
}

// Bias the autocomplete object to the user's geographical location, as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle(
            {center: geolocation, radius: position.coords.accuracy});
        autocomplete.setBounds(circle.getBounds());
      });
    }
}


/*============================================================================================
    Form: Close Search Choice
=============================================================================================*/
function searchChoiceClose(which) {
    var placeId = $(which.parentElement).attr('detail');
    var selectedName = 'place';
    // var selectedAction = 'remove';
    console.log('');
    console.log('======== Close Search Choice ========');
    console.log(placeId); // place_id

    if (postcardDetail != null) {
        $.ajax({
            url: postcardDetail + 'remove/',
            type: 'POST',
            datatype: "json",
            headers: {'Authorization': 'Token ' + userToken},
            data: {content_type: selectedName, place_id: placeId},

            success: function (response) {
                if (inputChild.length == 5){
                    console.log($(textBoxParent));
                    $(textBoxParent).removeClass('completed')
                    formTallyTotal--
                    updateTally();
                }
            },
            error: function(data, errorThrown) {
                //alert('request failed :'+errorThrown);
            }
        });
    } else {
        console.log('failed: no postcard chosen (x_x)');
    }

    which.parentElement.remove(); // remove li from ul
}


/*============================================================================================
    Tag / transcribe mode: Toogle Form Fields
=============================================================================================*/
//  -- formField --                      -- formTab --            -- formHeading --
// [0] - languages                       [0] - full postcard      [0] - details
// [1] - dates                           [1] - tag places         [1] - places
// [2] - recipient name                  [2] - tag dates
// [3] - recipient location              [3] - tag languages
// [4] - postmark from
// [5] - tags
// [6] - inputs bottom (message text), (tags)

function tagTranFormFields(which) {
    console.log('');
    console.log('---------- tagTranFormFields ----------');
    var formTab = document.getElementsByClassName('tag-transcribe-mode');


    console.log(which + ' was chosen');
    for (var i = 0; i < formTab.length; i++) {
        formTab[i].classList.remove('active');
        if (which == 'default') { formTab[0].classList.add('active'); } // full postcard
        if (which == 'places') { formTab[1].classList.add('active'); } // tag places
        if (which == 'dates') { formTab[2].classList.add('active'); } // tag dates
        if (which == 'languages') { formTab[3].classList.add('active'); } // tag languages
    }

    formFieldTotal = 10;
    for (var i = 0; i < formField.length; i++) {
        formField[i].classList.remove('display-input');

        // console.log(formField[i]);
        if (which == 'default') {
            formField[i].classList.add('display-input'); // all
            // formField[5].classList.remove('display-input'); // return address
            // formField[6].classList.remove('display-input'); // has postmark

            $('.inputs-bottom').removeClass('disabled');
        }
        if (which == 'places') {
            formField[2].classList.add('display-input'); // recipient name
            formField[3].classList.add('display-input'); // recipient location
            // formField[5].classList.add('display-input'); // return address
            // formField[6].classList.add('display-input'); // has postmark

            $('.inputs-bottom').addClass('disabled');
        }
        if (which == 'dates') {
            formField[1].classList.add('display-input'); // dates
            formField[4].classList.add('display-input'); // postmark from

            $('.inputs-bottom').addClass('disabled');
        }
        if (which == 'languages') {
            formField[0].classList.add('display-input'); // languages

            $('.inputs-bottom').addClass('disabled');
        }
    }

    // field heading
    for (var i = 0; i < formHeading.length; i++) {
        formHeading[i].classList.remove('display-heading');
        if (which == 'default') {
            formHeading[i].classList.add('display-heading'); // all
        }
        if (which == 'places') {
            formHeading[1].classList.add('display-heading'); // places (h4)
        }
        if (which == 'dates') {
            formHeading[0].classList.add('display-heading'); // details (h4)
        }
        if (which == 'languages') {
            formHeading[0].classList.add('display-heading'); // details (h4)
        }
    }
    tallyVisibleFields();
}

/*============================================================================================
    Form: Tally Visible Fields
=============================================================================================*/
function tallyVisibleFields() {
    var visibleFields = document.getElementsByClassName('display-input');

    formTallyTotal = 0;
    updatedFieldTotal = 0;
    // console.log(visibleFields);
    for (var i = 0; i < visibleFields.length; i++) {
        if (visibleFields[i].classList.contains('completed')){
            // console.log('Is completed');
            formTallyTotal++
        } else {
            // console.log('Still needs work');
        }

        if (visibleFields[i].classList.contains('hidden')){
            updatedFieldTotal--
        }
        updatedFieldTotal++

        if (visibleFields[i].classList.contains('disable')){
            // console.log('Form is blank');
        } else {
            updateTally();
        }
    }
    // console.log('updatedFieldTotal= ' + updatedFieldTotal)
    // console.log('formTallyTotal= ' + formTallyTotal);
}


/*============================================================================================
    Form Field: Toogle
=============================================================================================*/
var targetField = '';

function formFieldToggle(which) {
    console.log('');
    console.log('----- Form Field: Toogle -----');
    console.log(which);
    var targetInput = '';
    var targetCheckBox = '';
    var targetContext = $(which).context;
    var targetId = targetContext.id;
    var targetParent = targetContext.parentElement.parentElement.parentElement;
    var targetChecked = targetContext.checked;

    var messageCheck = null;
    var stopCall = null;


    // if (targetId == 'languages-checkbox') { targetInput='#languages_chosen'; targetCheckBox='#languages-unreadable-box'; targetField='languages'; }
    if (targetId == 'dates-checkbox') { targetInput='#dates'; targetCheckBox='#dates-unreadable-box'; targetField='dates'; }
    // if (targetId == 'postmark-date-checkbox') { targetInput='#postmark-date'; targetCheckBox='#postmark-date-unreadable-box'; targetField='postmark-date'; }
    if (targetId == 'recipient-name-checkbox') { targetInput='#recipient-name'; targetCheckBox='#recipient-name-unreadable-box'; targetField='names'; }
    if (targetId == 'recipient-location-checkbox') { targetInput='#recipient_chosen'; targetCheckBox='#recipient-location-unreadable-box'; targetField='places'; }
    if (targetId == 'postmark-from-checkbox') { targetInput='#postmark_chosen'; targetCheckBox='#postmark-from-unreadable-box'; targetField='places'; }
    // if (targetId == 'return-address-checkbox') { targetInput='#return-address'; targetCheckBox='#return-address-unreadable-box'; targetField='return-address'; }
    // if (targetId == 'has-postmark-checkbox') { targetInput='#has-postmark'; targetCheckBox='#has-postmark-unreadable-box'; targetField='has-postmark'; } // postmark location
    // if (targetId == 'tags-checkbox') { targetInput='#tags_chosen'; targetCheckBox='#tags-unreadable-box'; targetField='tags'; }
    if (targetId == 'message-text-checkbox') {
        targetInput='#message-text';
        targetCheckBox='#message-text-box-buttons';
        targetField='message-text';
        stopCall = true;

        messageCheck = $('#message-text-checkbox')[0].checked;
        if (messageCheck == false) {
            submitTranscriptionStatus('not_present');
        }
    }
    if (targetId == 'message-text-front-checkbox') {
        targetInput='#message-text-front';
        targetCheckBox='#message-text-front-box-buttons';
        targetField='message-text-front';
        stopCall = true;

        messageCheck = $('#message-text-front-checkbox')[0].checked;
        if (messageCheck == false) {
            submitTranscriptionStatus('not_present');
        }
    }

    console.log('(O-o) toggle | Target Input: ' + targetInput + ' | & | ' + 'Target CheckBox: ' + targetCheckBox + ' |');

    if (targetChecked == false) {
    // $(targetInput).toggle();
    // $(targetCheckBox).toggle();
    $(targetInput).addClass('hide');
    $(targetCheckBox).addClass('hide');

    targetParent.classList.add('hidden');
    updatedFieldTotal--

    console.log($(which));
    // console.log(postcardDetail);

    var targetPostcardId = postcardDetail.split('/'); // gets pk of postcard from detail link
    var targetData = {};

    targetData.item = targetField;
    targetData.status = 'not_present';

    // console.log(targetPostcardId[5]);
    console.log(targetData);
    // console.log(postcardData);

    // var targetCheck = null;
    // if (targetCheck == null) {
        if (postcardDetail != null && targetChecked == false && stopCall != true) {
            $.ajax({
                url: endpoint + "/ephemera/" + targetPostcardId[5] + "/set_tx_status/",
                // type: "POST",
                type: "PATCH",
                datatype: "json",
                headers: {'Authorization': 'Token ' + userToken},
                data: targetData,
                success: function (html) {
                    // alert('successful : ' + html);
                    // fieldMarkEmpty();
                },
                error: function(data, errorThrown) {
                    //alert('request failed :'+errorThrown);
                }
            });
        }
    } else {
        console.log(targetId);
        console.log('messageCheck: ' + messageCheck);
        // if (targetId != 'message-text-checkbox' && targetId != 'message-text-front-checkbox') {
            console.log('(O-o)! field re-toogled');
            $(targetInput).removeClass('hide');
            $(targetCheckBox).removeClass('hide');

            targetParent.classList.remove('hidden');
            updatedFieldTotal++
        // }
    }
    updateTally();
}


/*============================================================================================
    Form Field: Toogle Unreadable
=============================================================================================*/
function formFieldUnreadable(which) {
    console.log('');
    console.log('----- Form Field: Toogle Unreadable -----');
    var targetInput = '';
    var targetCheckBox = '';
    var targetContext = $(which).context;
    var targetId = targetContext.id;
    var targetParent = targetContext.parentElement.parentElement.parentElement;
    var targetChecked = targetContext.checked;

    // if (targetId == 'languages-unreadable') { targetInput='#languages_chosen'; targetCheckBox='#languages-toggle-box'; }
    if (targetId == 'dates-unreadable') { targetInput='#dates'; targetCheckBox='#dates-toggle-box'; targetField = 'dates'; }
    // if (targetId == 'postmark-date-unreadable') { targetInput='#postmark-date'; targetCheckBox='#postmark-date-toggle-box'; }
    if (targetId == 'recipient-name-unreadable') { targetInput='#recipient-name'; targetCheckBox='#recipient-name-toggle-box'; targetField = 'names'; }
    if (targetId == 'recipient-location-unreadable') { targetInput='#recipient_chosen'; targetCheckBox='#recipient-location-toggle-box'; targetField = 'places'; }
    if (targetId == 'postmark-from-unreadable') { targetInput='#postmark_chosen'; targetCheckBox='#postmark-from-toggle-box'; targetField = 'places'; }
    // if (targetId == 'return-address-unreadable') { targetInput='#return-address'; targetCheckBox='#return-address-toggle-box'; }
    // if (targetId == 'has-postmark-unreadable') { targetInput='#postmark_chosen'; targetCheckBox='#has-postmark-toggle-box'; }
    // if (targetId == 'tags-unreadable') { targetInput='#tags_chosen'; targetCheckBox='#tags-toggle-box'; }
    // if (targetId == 'message-back-unreadable') { targetInput='#message-text'; targetCheckBox='#message-back-needs-work'; targetField='tags'; }

    if (targetChecked == true) {
        console.log('(-_-) disable | Target Input: ' + targetInput + ' | & | ' + 'Target CheckBox: ' + targetCheckBox + ' |');
        var targetPostcardId = postcardDetail.split('/');
        var targetData = {};

        $(targetInput).addClass('disable');
        $(targetCheckBox).addClass('disable');

        targetParent.classList.remove('completed');
        formTallyTotal--

        targetData.item = targetField;
        targetData.status = 'illegible';

        console.log(targetData);
        // console.log(targetPostcardId);
        console.log('targetPostcardId= ' + targetPostcardId[5]); // postcard's pk

        // var targetCheck = null;
        // if (targetCheck == null) {
        if (postcardDetail != null) {
            $.ajax({
                url: endpoint + "/ephemera/" + targetPostcardId[5] + "/set_tx_status/",
                // type: "POST",
                type: "PATCH",
                datatype: "json",
                headers: {'Authorization': 'Token ' + userToken},
                data: targetData,
                success: function (html) {
                    // alert('successful : ' + html);
                },
                error: function(data, errorThrown) {
                    //alert('request failed :'+errorThrown);
                }
            });
        }
    } else { // field is checked
        $(targetInput).removeClass('disable');
        $(targetCheckBox).removeClass('disable');

        targetParent.classList.add('completed');
        formTallyTotal++
    }
    updateTally();
}


/*============================================================================================
    Form Field: Mark Empty
=============================================================================================*/
function fieldMarkEmpty() {
    console.log('');
    console.log('----- Form Field: Mark Empty -----');
    // console.log(which);
    // console.log(postcardDetail);

    var targetPostcardId = postcardDetail.split('/'); // gets pk of postcard from detail link
    var targetData = {};

    targetData.item = targetField;
    targetData.has_targetField  = true;

    // console.log(targetPostcardId[5]);
    console.log(targetData);
    console.log(postcardData);

    // var targetCheck = null;
    // if (targetCheck == null) {
    if (postcardDetail != null) {
        $.ajax({
            url: endpoint + "/ephemera/" + targetPostcardId[5] + "/mark_empty/",
            type: "POST",
            datatype: "json",
            headers: {'Authorization': 'Token ' + userToken},
            data: targetData,
            success: function (html) {
                // alert('successful : ' + html);
            },
            error: function(data, errorThrown) {
                //alert('request failed :'+errorThrown);
            }
        });
    }
}


/*============================================================================================
    Form Field: Complete Message Text
=============================================================================================*/
function completeMessageText(which) {
    var targetInput = '';
    var targetRadio = '';
    var targetHeading = '';
    var targetCheck = null;

    if (which == 'back') { targetInput = '#message-text'; targetRadio = '#message-back-needs-work-box'; targetHeading = '#message-text-top'; }
    if (which == 'front') { targetInput = '#message-text-front'; targetRadio = '#message-front-needs-work-box'; targetHeading = '#message-text-front-top';}

    if (targetCheck != null){
        $(targetInput).toggleClass('disable');
        $(targetRadio).toggleClass('disable');
        $(targetHeading).toggleClass('disable');
    }
}


/*============================================================================================
    Form Field: Next Postcard
=============================================================================================*/
function nextPostcard() {
    console.log('');
    console.log('-- Form Field: Next Postcard --');
    var x = document.getElementsByClassName('active-cards');
    for (var i = 0; i < x.length; i++) {
        // console.log(x[i]);
        if (x[i].classList.contains('selected')) {
            console.log('selected postcard');
            console.log(x[i]);
            console.log('next postcard');
            console.log(x[i+1]);

            if (i != x.length) {
                console.log(i);
                x[i].classList.remove('selected');
                showCards(1);
                displaySelectedPostcard(x[i+1]);
                $('#next-postcard').removeClass('disable');
            } else {
                $('#next-postcard').addClass('disable');
            }
            break;
        }
    }
}






















/*=============================================================================
    *** tagging_transcribing_v1 old js ***
=============================================================================*/

/*========================================
    Up Next Selector: Toggle Active State
=========================================*/

function upNextSelectorActiveState(which) {
    var x = document.getElementsByClassName('up-next-selector');
    for (var i = 0; i < x.length; i++ ) {
        x[i].classList.remove('active');
    }
    // console.log(which);
    which.classList.add('active');
}

/*========================================
    Recently Transcribed: Postcard Slider
=========================================*/
var rtActiveCards = document.getElementsByClassName('rt-active-cards');
var rtCardId = rtActiveCards.length - 1;
var rtCardLimit = 1;
var recentTransPos = 0;
var recentTransPosTotal = 0;

function recentlyTranscribedCardsSlider(which) {
    var arrL = document.getElementById('rt-arr-left');
    var arrR = document.getElementById('rt-arr-right');
    var x = rtActiveCards;
    var y = document.getElementById('recently-transcribed');


    // console.log('rtCardId = ' + rtCardId);
    if (which == 1) { // user clicked arr-right
        rtCardLimit--;
        rtCardId++;
        // +100 accounts for the img's margin
        recentTransPos = recentTransPosTotal + x[rtCardId].offsetWidth + 100;
        recentTransPosTotal = recentTransPos;
        y.style.right = recentTransPosTotal + "px";
    } else { // user clicked arr-left
        // -100 accounts for the img's margin
        recentTransPos = recentTransPosTotal - x[rtCardId].offsetWidth - 100;
        recentTransPosTotal = recentTransPos;
        y.style.right = recentTransPosTotal + "px";
        rtCardLimit++;
        rtCardId--;
    }
    // disable arrR when cardLimit >= x.length // 8/8
    if (rtCardLimit <= 1) {
        arrR.classList.add('disable');
    } else {
        arrR.classList.remove('disable');
    }
    // disable arrL when cardLimit <= 1 // 1/8
    if (rtCardLimit >= x.length) {
        arrL.classList.add('disable');
    } else {
        arrL.classList.remove('disable');
    }
}

/*========================================
    Up Next Selector: Postcard Slider
=========================================*/
var cardLimit = 1;
var cardId = 0;
var upNextPos = 0;
var upNextPosTotal = 0;

function showCards(which) {
    var arrL = document.getElementById('arr-left');
    var arrR = document.getElementById('arr-right');
    var x = document.getElementsByClassName('active-cards');
    var y = document.getElementById('up-next-postcards');

    if (which == 1) { // user clicked arr-right
        // +7 accounts for the img's margin
        upNextPos = upNextPosTotal + x[cardId].offsetWidth + 7;
        // set total
        upNextPosTotal = upNextPos;
        // set style right to upNextPosTotal
        y.style.right = upNextPosTotal + "px";
        cardLimit++;
        // get next postcard's id
        cardId++;
    } else { // user clicked arr-left
        cardLimit--;
        // get previous postcard's id
        cardId--;
        // -7 accounts for the img's margin
        upNextPos = upNextPosTotal - x[cardId].offsetWidth - 7;
        // set total
        upNextPosTotal = upNextPos;
        // set style right to upNextPosTotal
        y.style.right = upNextPosTotal + "px";
    }
    // disable arrR when cardLimit >= x.length // 8/8
    if (cardLimit >= x.length) {
        arrR.classList.add('disable');
    } else {
        arrR.classList.remove('disable');
    }
    // disable arrL when cardLimit <= 1 // 1/8
    if (cardLimit <= 1) {
        arrL.classList.add('disable');
    } else {
        arrL.classList.remove('disable');
    }
}

/*=======================================
    Postcard: Save Selected Postcard
=======================================*/
function savePostcard() {
    var x = document.getElementById('full-postcard-form');
    console.log(x);
    var inputs = x.querySelectorAll('input[type=text]');
    console.log(inputs);
    var form_message_text = document.getElementById('message-text').value;
    // for
    console.log('form_message_text= ' + form_message_text);

    var y = document.getElementById('edited_postcard');
    // console.log('edited_postcard= ' + y);
    if (y != null) {
        var postcardPk = y.getAttribute('detail');
        console.log('Postcard PK =' + postcardPk);
    }


    console.log('postcardPk= ' + postcardPk);

    form_languages = $('#languages').val();
    console.log('form_languages= ' + form_languages);
    form_date = $('#date').val();
    console.log('message text:', form_message_text);

    if (postcardPk != undefined && form_message_text) {
        $.ajax({
            // url: 'http://ephemera-pw-staging.herokuapp.com/api/transcriptions/',
            // url: postcardDetail + 'add/',
            // url: 'http://ephemera-pw-staging.herokuapp.com/assets/' + postcardPk + '/transcriptions/save/',
            type: "POST",
            datatype: "json",
            headers: {'Authorization': 'token ' + userToken},
            data: {asset: postcardPk, text: form_message_text},
            success: function (response) {
                console.log('POST triggered');
            },
            error: function(data, errorThrown) {
                alert('request failed :'+errorThrown);
            }
        });
    } else {
        console.log('--No Postcard was chosen--');
    }

}
