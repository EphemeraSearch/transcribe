<?
include($_SERVER['DOCUMENT_ROOT'] . "/assets/common.php"); 
?>

        <div class="content-main tagging-transcribing">
            <div class="tagging-transcribing-top">
                <div class="my-postcard-box">
                    <img src="<?= '../assets/images/avatar-placeholder.png' ?>" class="user-avatar">
                    <div class="my-postcard-points">
                        My Postcard Points
                        <div class="today-total-box">
                            <div class="today-total-points">
                                Today<span><?= '25' ?></span>
                            </div><!--closes today-points-->
                            <div class="today-total-points">
                                All Time<span><?= '367' ?></span>
                            </div><!--closes total-points-->
                        </div><!--closes today-total-box-->
                    </div><!--closes my-postcard-points-->
                </div><!--closes my-postcard-box-->
                <div class="top-text">
                    <h3>Postcard Tagging and Transcribing</h3>
                    <p>Full transcribing earns 5 points. You've earned <?= '25' ?> today!:</p>
                </div><!--closes top-text-->
                <div class="see-leaderboard-box">
                    <?= '2145' ?> tags, dates &amp; transcriptions added!<br /> <a href="#">See Leaderboard</a>
                </div><!--closes see-leaderboard-box-->
            </div><!--closes tagging-transcribing-top-->





            <div id="filter-queue" class="filter-queue fq-toggled">
                <img src="<?= '../assets/images/filter_queue_toggled.png' ?>" class="filter-queue-side-img" onclick="filterQueueToggle()">
                <div class="recently-transcribed-box">
                    <p>Recently transcribed</p>
                    <i id="rt-arr-left" class="fa fa-angle-left rt-arr-left" onclick="recentlyTranscribedCardsSlider(-1)"></i>
                    <div id="recently-transcribed" class="recently-transcribed" style="right:0;">
                        <img class="rt-active-cards" src="<?= '../assets/images/filter-queue6.png' ?>">
                        <img class="rt-active-cards" src="<?= '../assets/images/filter-queue3.png' ?>">
                        <img class="rt-active-cards" src="<?= '../assets/images/filter-queue5.png' ?>">
                        <img class="rt-active-cards" src="<?= '../assets/images/filter-queue4.png' ?>">
                        <img class="rt-active-cards" src="<?= '../assets/images/filter-queue1.png' ?>">
                    </div><!--closes recently-transcribed-->
                    <i id="rt-arr-right" class="fa fa-angle-right rt-arr-right disable" onclick="recentlyTranscribedCardsSlider(1)"></i>
                </div><!--closes recently-transcribed-box-->

                <div class="currently-transcribed">
                    <p>Currently transcribing</p>
                    <img src="<?= '../assets/images/filter-queue2.png' ?>">
                </div><!--closes currently-transcribed-->












                <div class="up-next">
                    <ul>
                        <li>Up next:</li>
                        <li><a href="#" class="up-next-selector active" onclick="upNextLoadPostcards('all'); upNextSelectorActiveState(this); return false;">Full postcard</a></li>
                        <li><a href="#" class="up-next-selector" onclick="upNextLoadPostcards('places'); upNextSelectorActiveState(this); return false;"> Tag places</a></li>
                        <li><a href="#" class="up-next-selector" onclick="upNextLoadPostcards('dates'); upNextSelectorActiveState(this); return false;">Tag dates</a></li>
                        <li><a href="#" class="up-next-selector" onclick="upNextLoadPostcards('languages'); upNextSelectorActiveState(this); return false;">Tag languages</a></li>
                    </ul>














                    <i class="fa fa-times x-icon" onclick="filterQueueToggle()"></i>
                    <div class="up-next-content">                    
                        <div class="transcription-filter">
                            <p>Transcription Filter:</p>
                            <input type="text" name="tag-location" id="tag-location" value="<?= 'France' ?>"><br>
                            <input type="text" name="tag-year" id="tag-year" value="<?= '1939' ?>"><br>
                            <input type="text" name="tag-year" id="tag-year" value="<?= '1939' ?>">
                        </div><!--closes transcription-filter-->
                        <div class="up-next-postcards-box">
                            <i id="arr-left" class="fa fa-angle-left arr-left disable" onclick="showCards(-1)"></i>
                            <div id="up-next-postcards" class="up-next-postcards" style="right:0;">

                            </div><!--closes up-next-postcards-->
                            <i id="arr-right" class="fa fa-angle-right arr-right" onclick="showCards(1)"></i>
                        </div><!--closes up-next-postcards-box-->
                    </div><!--closes up-next-content-->
                </div><!--closes up-next-->
                
            </div><!--closes filter-queue-->


            

            <div class="content-mid-box">



                <div id="tag-transcribe" class="tag-transcribe fq-toggled">
                    <img src="<?= '../assets/images/filter_queue.png' ?>" onclick="filterQueueToggle()">
                    <ul>
                        <li>Tag / transcribe mode:</li>
                        <li><a href="#" class="tag-full-postcard tag-transcribe-mode active" onclick="tagTranscribeModeActiveState(this); return false;">Full postcard</a></li>
                        <li><a href="#" class="tag-places tag-transcribe-mode" onclick="tagTranscribeModeActiveState(this); return false;">Tag places</a></li>
                        <li><a href="#" class="tag-dates tag-transcribe-mode" onclick="tagTranscribeModeActiveState(this); return false;">Tag dates</a></li>
                        <li><a href="#" class="tag-languages tag-transcribe-mode" onclick="tagTranscribeModeActiveState(this); return false;">Tag languages</a></li>
                    </ul>
                </div><!--closes tag-transcribe-->
                
                <div id="postcard-top" class="postcard-top">
                    <ul class="postcard-tabs">
                        <li id="postcard-backside-tab" class="active" onclick="postcardTabsToggleBackside()">Back Side</li>
                        <li id="postcard-frontside-tab" class="" onclick="postcardTabsToggleFrontside()">Front Side</li>
                    </ul><!--closes postcard-tabs-->
                    <div class="postcard-toolbar">
                        <i class="fa fa-compress toolbar-icon"></i>
                        <i class="fa fa-search-plus toolbar-icon"></i>
                        <i class="fa fa-search-minus toolbar-icon"></i>
                        <i class="fa fa-undo toolbar-icon"></i>
                        <i class="fa fa-undo toolbar-icon redo"></i>
                        <i class="fa fa-question-circle toolbar-icon"></i>
                    </div><!--closes postcard-toolbar-->
                </div><!--closes postcard-top-->
                <div class="content-mid">
                    <div id="postcard-backside" class="full-postcard display">
                        <p>--Please select a Postcard to begin--</p>
                    </div><!--closes full-postcard | postcard-backside-->
                    <div id="postcard-frontside" class="full-postcard postcard-frontside">
                        <p>--Please select a Postcard to begin--</p>
                    </div><!--closes full-postcard | postcard-frontside-->

                    <div class="forms-box">

                        <div class="check-box label-check-box">
                            <input type="checkbox" name="blank-postcard" id="blank-postcard" onclick="postcardBlankToggle()">
                            <span class="checkbox-custom blank"></span>
                            <label for="blank-postcard" class="blank">Postcard is Blank</label>
                        </div><!--closes check-box-->


                        <form id="full-postcard-form" class="full-postcard-form display-form form-item">
                            <h4>Details:</h4>










                            <label for="languages">Language(s):</label><br>
                            <!-- <input type="text" name="languages" id="languages"> -->
                            <select data-placeholder="Choose a language..." name="languages" multiple id="languages" class="chosen-select languages form-item">
                            <select>

                            <br>











                            <label for="date">Date (as close as possible):</label><br>
                            <input type="text" name="date" id="date" value=""><br>
                            <div class="check-box label-check-box">
                                <input type="checkbox" name="details-from-checkbox" id="details-from-checkbox" onclick="detailsFromToggle()" checked="checked">
                                <span class="checkbox-custom"></span>
                                <label for="details-from-checkbox">Postmark date:</label>
                            </div><!--closes check-box-->
                            <input type="text" name="details-from" id="details-from" class="needs-toggling toggled"><br>
                            <h4>Places:</h4>
                            <label for="recipient-name">Recipient Name(s):</label><br>
                            <input type="text" name="recipient-name" id="recipient-name" class=""><br>

                            <div class="check-box label-check-box">
                                <input type="hidden" name="card-form-checkbox" id="card-form-checkbox" onclick="cardFromToggle()" checked="checked">
                                <!-- <span class="checkbox-custom"></span> -->
                                <!-- <label for="card-form-checkbox">Card from (front side):</label> -->
                            </div><!--closes check-box-->
                            <input type="hidden" name="card-form" id="card-from" class="needs-toggling toggled"><br>
                            
                            <label for="places-form">Postmark from:</label><br>
                            <input type="text" name="places-form" id="places-form" class=""><br>

                            <label for="recipient-location">Recipient Location:</label><br>
                            <input type="text" name="recipient-location" id="recipient-location" class=""><br>
                        </form><!--closes full-postcard-form-->

                        <form id="tag-places-form" class="tag-places-form form-item">
                            <h4>Places:</h4>
                            <label for="recipient-name" id="tp-recipient-name-label" class="">Recipient Name(s):</label><br>
                            <input type="text" name="recipient-name" id="tp-recipient-name" class=""><br>
                            <div class="check-box">
                                <input type="checkbox" name="recipient-name-unreadable" id="recipient-name-unreadable" onclick="tpRecipientNameUnreadableToggle()">
                                <span class="checkbox-custom unreadable-custom"></span>
                                <label for="recipient-name-unreadable" class="">Unreadable</label>
                            </div><!--closes check-box-->
                            <label for="recipient-location" id="tp-recipient-location-label" class="">Recipient Location:</label><br>
                            <input type="text" name="recipient-location" id="tp-recipient-location" class=""><br>
                            <div class="check-box">
                                <input type="checkbox" name="recipient-location-unreadable" id="recipient-location-unreadable" onclick="tpRecipientLocationUnreadableToggle()">
                                <span class="checkbox-custom unreadable-custom"></span>
                                <label for="recipient-location-unreadable" class="">Unreadable</label>
                            </div><!--closes check-box-->
                            <div class="check-box label-check-box">
                                <input type="checkbox" name="return-address-checkbox" id="return-address-checkbox" onclick="tpReturnAddressToggle()">
                                <span class="checkbox-custom"></span>
                                <label for="return-address-checkbox" id="return-address-label" class="">Return address</label>
                            </div><!--closes check-box-->
                            <div id="tag-places-return-address" class="needs-toggling">
                                <input type="text" name="return-address" id="return-address" class="">
                                <div class="check-box">
                                    <input type="checkbox" name="return-address-unreadable" id="return-address-unreadable" onclick="tpReturnAddressUnreadableToggle()">
                                    <span class="checkbox-custom unreadable-custom"></span>
                                    <label for="return-address-unreadable" class="">Unreadable</label>
                                </div><!--closes check-box-->
                            </div><!--closes tag-places-return-address-->
                            <div class="check-box label-check-box">
                                <input type="checkbox" name="has-postmark-checkbox" id="has-postmark-checkbox" onclick="tpHasPostmarkToggle()">
                                <span class="checkbox-custom"></span>
                                <label for="has-postmark-checkbox" id="has-postmark-label" class="">Has postmark:</label>
                            </div><!--closes check-box-->
                            <div id="tag-places-has-postmark" class="needs-toggling">
                                <input type="text" name="has-postmark" id="has-postmark" class="">
                                <div class="check-box">
                                    <input type="checkbox" name="has-postmark-unreadable" id="has-postmark-unreadable" onclick="tpHasPostmarkUnreadableToggle()">
                                    <span class="checkbox-custom unreadable-custom"></span>
                                    <label for="has-postmark-unreadable" class="">Unreadable</label>
                                </div><!--closes check-box-->
                            </div><!--closes check-box label-check-box-->
                        </form><!--closes tag-places-form-->    

                        <form id="tag-dates-form" class="tag-dates-form form-item">
                            <h4>Details:</h4>
                            <label for="td-date">Date (as close as possible):</label><br>
                            <input type="text" name="td-date" id="td-date"><br>
                            
                            <div class="check-box label-check-box">
                                <input type="checkbox" name="details-from-checkbox" id="td-details-from-checkbox" onclick="tdPostmarkFromToggle()">
                                <span class="checkbox-custom"></span>
                                <label for="td-details-from-checkbox">Postmark from:</label>
                            </div><!--closes check-box-->
                            <input type="text" name="details-from" id="td-details-from" class="needs-toggling"><br>
                        </form><!--closes tag-dates-form-->

                        <form id="tag-languages-form" class="tag-languages-form form-item">
                            <h4>Details:</h4>
                            <label for="languages">Language(s):</label><br>
                            <input type="text" name="languages" id="languages"><br>
                        </form>
                    </div><!--closes forms-box-->
                </div><!--closes content-mid-->

                <div class="inputs-bottom">
                    <form id="message-text-box" class="bottom-textarea display-form form-item">
						<div style="float: right; padding-right: 40px;"><label><input type="radio" name="complete" value="false">Needs more work</label> &nbsp; <label><input type="radio" name="complete" value="true"> Complete</label></div>
                        <label for="message-text">Message text:</label><br>
                        <textarea rows="5" cols="50" name="message-text" id="message-text"></textarea>
                    </form><!--closes bottom-textarea-->



                    











                    <form id="tags-box" class="tags-box display-form">
                        <label for="tags" class="tags form-item">Tag(s)</label><br>
                        <!-- <input type="text" name="tags" id="tags" class="tags form-item"> -->
                        <!-- <input data-placeholder="Choose a tag..." name="tags" multiple id="tags" class="chosen-select tags form-item"> -->
                        <select data-placeholder="Choose a tag..." name="tags" multiple id="tags" class="chosen-select tags form-item">
                            <option value=""></option>
                        </select>










        <!-- <div class="chosen-container chosen-container-multi">
            <ul class="chosen-choices">
                <li class="search-choice"></li>
                <li class="search-field">
                    <input class="chosen-search-input" type="text" autocomplete="off">
                </li>
            </ul>

            <div class="chosen-drop">
                <ul class="chosen-results">
                    <li class="active-result">ads</li>
                    <li class="active-result">ads</li>
                    <li class="active-result">ads</li>
                    <li class="active-result">ads</li>
                    <li class="active-result">ads</li>
                </ul>
            </div>
        </div> -->















                        <button id="search-btn" class="search-btn form-item">
                            <i class="fa fa-search"></i>
                        </button>

                        <div class="tag-rows">
                            <div class="tag-item">
                                <h5>Design:</h5>
                                <span>- no tags yet -</span>
                            </div><!--closes tag-item-->

                            <div class="tag-item">
                                <h5>Written Topics:</h5>
                                <span>- no tags yet -</span>
                            </div><!--closes tag-item-->

                            <div class="tag-item">
                                <h5>Printed Text:</h5>
                                <span>- no tags yet -</span>
                            </div><!--closes tag-item-->

                            <div class="tag-item">
                                <h5>Linguistics:</h5>
                                <span>- no tags yet -</span>
                            </div><!--closes tag-item-->

                            <div class="tag-item">
                                <h5>Postmark:</h5>
                                <span>- no tags yet -</span>
                            </div><!--closes tag-item-->

                        </div><!--closes tag-row-->                    
                    </form><!--closes tags-box-->
                </div><!--closes inputs-bottom-->
                <div class="buttons-bottom">
                    <div class="buttons-bottom-left">
                        <button id="add-to-collection" class="add-to-collections-btn">Add to my collections <i class="fa fa-caret-down"></i></button><!--closes add-to-collections-btn-->
                        <button id="skip-postcard" class="skip-postcard-btn">Skip Postcard <i class="fa fa-angle-double-left"></i></button><!--closes skip-postcard-btn -->
                    </div><!--closes buttons-bottom-left-->

                    <div class="buttons-bottom-right">
                        <button id="save-postcard" class="save-btn" onclick="savePostcard()">Save</button><!--closes save-btn -->
                        <button id="next-postcard" class="next-btn">Next <i class="fa fa-angle-double-right"></i></button><!--closes save-btn -->
                    </div><!--closes buttons-bottom-right-->
                </div><!--closes buttons-bottom-->
            </div><!--closes content-mid-box-->
        </div><!--closes content-main | tagging-transcribing-->

<?
include($_SERVER['DOCUMENT_ROOT'] . "/assets/footer.php"); 
?>