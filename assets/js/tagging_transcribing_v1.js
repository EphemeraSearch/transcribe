/*=====================================
    Up Next: Load Postcards
=====================================*/
var userToken = '1c5a3d95569e7a8d45fdb811123eac6f31693174';

function upNextLoadPostcards(which) {
    console.log('upNextLoadPostcards:', which);
    urlToLoad = 'http://ephemera-pw-staging.herokuapp.com/api/ephemera/';
    if (which == 'all') urltoload = 'http://ephemera-pw-staging.herokuapp.com/api/ephemera/';
    if (which == 'places') urltoload = 'http://ephemera-pw-staging.herokuapp.com/api/ephemera/?needs_dates=true';
    if (which == 'dates') urltoload = 'http://ephemera-pw-staging.herokuapp.com/api/ephemera/?needs_places=true';
    if (which == 'languages') urltoload = 'http://ephemera-pw-staging.herokuapp.com/api/ephemera/?needs_languages=true';
    
    $.ajax({
        url: urlToLoad,
        type: "GET",
        datatype: "json",
        headers: {'Authorization': 'Token ' + userToken},
        //data: {xyz: 123},
        success: function (response) {
            // console.log(response);
            // console.log(response.results);
            var x = response.results;
            // console.log('x= ' + x);
            var my_html = '';
            for (var i = 0; i < x.length; i++) {
                // console.log(x[i].pictures.file);
                my_html += "<img id='" + x[i].pictures[0].id + "' class='active-cards' detail='" + x[i].detail + "' src='" + x[i].pictures[0].thumbnail_300 + "' onclick='displaySelectedPostcard(this)'>";
            }
            // console.log(my_html);
            $('#up-next-postcards').html(my_html);
        },
        error: function(data, errorThrown) {
            //alert('request failed :'+errorThrown);
        }
    });
}

/*=======================================
    Postcard: Display Selected Postcard
=======================================*/

function displaySelectedPostcard(which) {
    // console.log(which);
    var y = document.getElementById('postcard-top');
    var postcardDetail = which.getAttribute('detail');
    // console.log(postcardDetail);

    $.ajax({
        url: postcardDetail,
        type: "GET",
        datatype: "json",
        headers: {'Authorization': 'token ' + userToken},
        // data: ajaxURL,
        success: function (response) {
            y.classList.add('display');

            var x = response;
            // console.log(x);
            // console.log(x.pictures);
            post_backside = "<img id='edited_postcard' detail='" + x.pk + "' src='" + x.pictures[1].file + "'>";
            post_frontside = "<img src='" + x.pictures[0].file + "'>";
            $('#postcard-backside').html(post_backside);
            $('#postcard-frontside').html(post_frontside);
            // container id = postcard-frontside
        },
        error: function(data, errorThrown) {
            //alert('request failed :'+errorThrown);
        }
    });
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
            url: 'http://ephemera-pw-staging.herokuapp.com/api/transcriptions/',
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

/*=====================================
    Filter and Queue: Toggle On/Off
=====================================*/
function filterQueueToggle() {
    var x = document.getElementById('filter-queue');
    x.classList.toggle('fq-toggled');
    document.getElementById('tag-transcribe').classList.toggle('fq-toggled');
}

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

/*===========================================
    Tag Transcribe Mode: Toggle Active State
============================================*/

function tagTranscribeModeActiveState(which) {
    var fpForm = document.getElementById('full-postcard-form');
    var tpForm = document.getElementById('tag-places-form');
    var tdForm = document.getElementById('tag-dates-form');
    var tlForm = document.getElementById('tag-languages-form');    
    var formArray = [fpForm, tpForm, tdForm, tlForm];
    var formArrayTotal = formArray.length;

    // var x = document.getElementById('postcard-form');


    
    var mtBox = document.getElementById('message-text-box');
    var tagsBox = document.getElementById('tags-box');
    

    var x = document.getElementsByClassName('tag-transcribe-mode');
    var xTotal = x.length;
    for (var i = 0; i < xTotal; i++ ) {
        x[i].classList.remove('active');
    }
    which.classList.add('active');
    // console.log(which.classList);

    for (var i = 0; i < formArrayTotal; i++ ) {
        formArray[i].classList.remove('display-form');
    }
    
    // if tag Full postcard was selected, display full-postcard-form
    if (which.classList.contains('tag-full-postcard')) {
        // console.log('tag-full-postcard classlist triggered');
        mtBox.classList.add('display-form');
        tagsBox.classList.add('display-form');
        fpForm.classList.add('display-form');
    } else {
        mtBox.classList.remove('display-form');
        tagsBox.classList.remove('display-form');        
    }

    // if tag Tag places was selected, display tag-places-form
    if (which.classList.contains('tag-places')) {
        tpForm.classList.add('display-form');
    }

    // if tag Tag dates was selected, display tag-dates-form
    if (which.classList.contains('tag-dates')) {
        tdForm.classList.add('display-form');
    }

    // if tag Tag dates was selected, display tag-dates-form
    if (which.classList.contains('tag-languages')) {
        tlForm.classList.add('display-form');
    }

    var f = document.getElementsByClassName('display-form');
    // console.log(f);
    var nonread = document.getElementById('has-postmark-unreadable');
}


/*===========================================
    Full postcard: Toggle Blank Postcard
============================================*/
function postcardBlankToggle() {
    var x = document.getElementsByClassName('form-item');
    for (var i = 0; i < x.length; i++) {
        x[i].classList.toggle('disable');
    }
}

/*===========================================
    Tag Transcribe Forms: Toggle Form Inputs
============================================*/

/*=================== START: Full postcard: Toggle Form Inputs ===================*/



/*--------- Full postcard: Postmark from ---------*/
function detailsFromToggle() {
    var x = document.getElementById('details-from');
    x.classList.toggle('toggled');
}
/*--------- Full postcard: Card from (front side) ---------*/
function cardFromToggle() {
    var x = document.getElementById('card-from');
    x.classList.toggle('toggled');
}
/*=================== END OF: Full postcard: Toggle Form Inputs ===================*/


/*=================== START: Tag places: Toggle Form Inputs ===================*/
/*--------- Tag places: Recipient Name - Unreadable ---------*/
// Recipient Name(s) Unreadable toggle
function tpRecipientNameUnreadableToggle() {
    var x = document.getElementById('tp-recipient-name');
    var y = document.getElementById('tp-recipient-name-label');
    x.classList.toggle('unreadable');
    y.classList.toggle('unreadable-label');
}
/*--------- Tag places: Recipient Location - Unreadable ---------*/
// Recipient Location Unreadable toggle
function tpRecipientLocationUnreadableToggle() {
    var x = document.getElementById('tp-recipient-location');
    var y = document.getElementById('tp-recipient-location-label');
    x.classList.toggle('unreadable');
    y.classList.toggle('unreadable-label');
}
/*--------- Tag places: Return address + Unreadable ---------*/
// Return address toggle
function tpReturnAddressToggle() {
    var x = document.getElementById('tag-places-return-address');
    x.classList.toggle('toggled');
}
// Return address - Unreadable toggle
function tpReturnAddressUnreadableToggle() {
    var x = document.getElementById('return-address');
    var y = document.getElementById('return-address-label');
    x.classList.toggle('unreadable');
    y.classList.toggle('unreadable-label');
}
/*--------- Tag places: Has postmark + Unreadable ---------*/
// Has postmark toggle 
function tpHasPostmarkToggle() {
    var x = document.getElementById('has-postmark');
    x.classList.toggle('toggled');
}
// Has postmark - Unreadable toggle
function tpHasPostmarkUnreadableToggle() {
    var x = document.getElementById('postmark-checkbox-container');
    var y = document.getElementById('postmark-form-box');
    x.classList.toggle('unreadable');
    y.classList.toggle('unreadable');
}
/*=================== END OF: Tag places: Toggle Form Inputs ===================*/


/*=================== START: Tag dates: Toggle Form Inputs ===================*/
/*--------- Tag dates: Postmark from ---------*/
// Postmark from toggle 
function tdPostmarkFromToggle() {
    var x = document.getElementById('td-details-from');
    x.classList.toggle('toggled');
}
/*=================== END OF: Tag dates: Toggle Form Inputs ===================*/


// global variables
// get postcard-backside box and postcard-backside-tab 
var w = document.getElementById('postcard-backside-tab');
var x = document.getElementById('postcard-backside');

// get postcard-frontside and postcard-frontside-tab
var y = document.getElementById('postcard-frontside-tab');
var z = document.getElementById('postcard-frontside');

/*=====================================
    Postcard: Display Backside
=====================================*/
function postcardTabsToggleBackside() {
    if (x.classList.contains('display')){
        // console.log('postcard-backside contains display');
    } else {
        // console.log('postcard-backside does not contain display');
        // add classes for postcard-backside & postcard-backside-tab
        w.classList.add('active');
        x.classList.add('display');

        // remove classes from postcard-frontside & postcard-frontside-tab
        y.classList.remove('active');        
        z.classList.remove('display');
    }
}
/*=====================================
    Postcard: Display Frontside
=====================================*/
function postcardTabsToggleFrontside() {
    if (z.classList.contains('display')){
        // console.log('postcard-frontside contains display');
    } else {
        // console.log('postcard-frontside does not contain display');
        // remove classes from postcard-backside & postcard-backside-tab
        w.classList.remove('active');
        x.classList.remove('display');

        // add classes for postcard-frontside & postcard-frontside-tab
        y.classList.add('active');        
        z.classList.add('display');        
    }
}

/*=====================================
    Tags: Input Autofill
=====================================*/
$( function() {
    var t = document.getElementById('tags');
    var design = ['']; // design.push('Tag')
    var availableTags = [
      "Design: Tag",
      "Design: Cool",

      "Printed Text: Tag",
      "Printed Text: Latin",

      "Postmark: Tag",
      "Postmark: Yee",

      "Written Topics: Tag",
      "Written Topics: Jazz",
    
      "Linguistics: Tag",
      "Linguistics: Yeah"
    ];
    for (var i = 0; i < availableTags.length; i++) {
        // console.log(availableTags[i]);
    }

    var aria = document.getElementsByClassName('ui-menu-item');
    for (var i = 0; i < aria.length; i++) {
        console.log('aria= ' + aria);
    }

    // console.log(design);
    $( "#tags" ).autocomplete({
      source: availableTags
    });
});

// var tagInput = document.getElementById('tags');

// tagInput.addEventListener('keyup', function(event) {
//     event.preventDefault(); 
//     if (event.keycode === 13) { // Enter key = 13
//         console.log(tagInput.value);
//     }
// })

// var checkboxes = document.querySelectorAll("input[type=text]");
// console.log(checkboxes);

