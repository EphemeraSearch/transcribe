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
                                <div class="loader"></div>
                            <div id="up-next-postcards" class="up-next-postcards" style="right:0;">
                                
                            </div><!--closes up-next-postcards-->
                            <i id="arr-right" class="fa fa-angle-right arr-right" onclick="showCards(1)"></i>
                        </div><!--closes up-next-postcards-box-->
                    </div><!--closes up-next-content-->
                </div><!--closes up-next-->
                
            </div><!--closes filter-queue-->

            <p class="select-card-text">--Please select a Postcard to begin--</p>

            <div class="content-mid-box">








                <div id="tag-transcribe" class="tag-transcribe">
                    <img src="<?= '../assets/images/filter_queue.png' ?>" onclick="filterQueueToggle()">
                    <ul>
                        <li>Tag / transcribe mode:</li>
                        <li><a href="#" class="tag-full-postcard tag-transcribe-mode active" onclick="tagTranFormFields('default'); return false;">Full postcard</a></li>
                        <li><a href="#" class="tag-places tag-transcribe-mode" onclick="tagTranFormFields('places'); return false;">Tag places</a></li>
                        <li><a href="#" class="tag-dates tag-transcribe-mode" onclick="tagTranFormFields('dates'); return false;">Tag dates</a></li>
                        <li><a href="#" class="tag-languages tag-transcribe-mode" onclick="tagTranFormFields('languages'); return false;">Tag languages</a></li>
                    </ul>
                </div><!--closes tag-transcribe-->
                


                <div id="postcardDetailEx" class="postcardDetailEx" style="margin-left: 22px;"></div>





                <div id="postcard-top" class="postcard-top">
                    <ul class="postcard-tabs">
                        <li id="postcard-backside-tab" class="active" onclick="postcardToggleSide('back')">Back Side</li>
                        <li id="postcard-frontside-tab" class="" onclick="postcardToggleSide('front')">Front Side</li>
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

                    <!-- Postcard is Blank --> 
                        <div class="form-field-checkboxes">
                            <div class="field-check-box blank">
                                <input type="checkbox" name="blank-postcard" id="blank-postcard" onclick="postcardBlankToggle()">
                                <span class="checkbox-custom blank"></span>
                                <label for="blank-postcard" class="blank">Postcard is Blank</label>
                            </div>
                        </div><!--blank-->


                        <form id="full-postcard-form" class="full-postcard-form display-form form-item">
                            <h4 class="form-field-heading display-heading">Details:</h4>

                        <!-- Language(s) -->
                            
                            <div id="languages-box" class="form-field-input display-input">

                                <!--
                                <div class="form-field-checkboxes">
                                    <div id="languages-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="languages-checkbox" id="languages-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                        <span class="checkbox-custom"></span>
                                        <label for="languages-checkbox">Language(s):</label>
                                    </div>
                                    <div id="languages-unreadable-box" class="field-check-box hide">
                                        <input type="checkbox" name="languages-unreadable" id="languages-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>
                                        <label for="languages-unreadable">Unreadable</label>
                                    </div>
                                </div>
                                -->

                                <label for="languages-checkbox">Language(s):</label>
                                <select data-placeholder="Choose a language..." name="languages" multiple id="languages" class="chosen-select languages form-input chosen-box"></select>
                            </div><!--closes languages-box-->
                            


                        <!-- Date (as close as possible) -->
                            <div id="dates-box" class="form-field-input display-input">
                                <div class="form-field-checkboxes">
                                    <div id="dates-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="dates-checkbox" id="dates-checkbox" onclick="formFieldToggle(this)" checked="true">
                                        <span class="checkbox-custom"></span>
                                        <label for="dates-checkbox">Date (as close as possible):</label>
                                    </div>
                                    <div id="dates-unreadable-box" class="field-check-box hide">
                                        <input type="checkbox" name="dates-unreadable" id="dates-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>

                                        <!-- <label for="dates-unreadable">Unreadable</label> -->
                                        <label for="dates-unreadable">Illegible</label>

                                    </div>
                                </div><!--closes form-field-checkboxes-->

                                <input type="text" class="form-input" name="dates" id="dates" value="">
                                <span id="dates-err" class="err-message" style="display:none;"></span>
                            </div><!--closes dates-box-->
                            


                        <!-- Postmark date 
                            <div id="postmark-date-box" class="form-field-input display-input">
                                <div class="form-field-checkboxes">
                                    <div id="postmark-date-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="postmark-date-checkbox" id="postmark-date-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                        <span class="checkbox-custom"></span>
                                        <label style="color:blue;" for="postmark-date-checkbox">Postmark date:</label>
                                    </div>
                                    <div id="postmark-date-unreadable-box" class="field-check-box unreadable-box">
                                        <input type="checkbox" name="postmark-date-unreadable" id="postmark-date-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>
                                        <label for="postmark-date-unreadable">Unreadable</label>
                                    </div>
                                </div>

                                <input type="text" name="postmark-date" id="postmark-date" class="needs-toggling toggled">
                            </div>
                        closes postmark-date-box-->
                            




                            <h4 class="form-field-heading display-heading">Places:</h4>

                        <!-- Recipient Name(s) -->
                            <div id="recipient-name-box" class="form-field-input display-input">
                                <div class="form-field-checkboxes">
                                    <div id="recipient-name-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="recipient-name-checkbox" id="recipient-name-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                        <span class="checkbox-custom"></span>
                                        <label for="recipient-name-checkbox">Recipient Name(s):</label>
                                    </div>
                                    <div id="recipient-name-unreadable-box" class="field-check-box hide">
                                        <input type="checkbox" name="recipient-name-unreadable" id="recipient-name-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>

                                        <!-- <label for="recipient-name-unreadable">Unreadable</label> -->
                                        <label for="recipient-name-unreadable">Illegible</label>

                                    </div>
                                </div><!--closes form-field-checkboxes-->

                                <input type="text" name="recipient-name" id="recipient-name" class="form-input">
                            </div><!--closes recipient-name-box-->
                            


                        <!-- Card from (front side) -->
                            <!--
                            <div class="check-box label-check-box form-field-input">
                                <input type="checkbox" name="card-form-checkbox" id="card-form-checkbox" onclick="cardFromToggle()" checked="checked">
                                <span class="checkbox-custom"></span>
                                <label for="card-form-checkbox">Card from (front side):</label>
                            </div>closes check-box
                            <input type="text" name="card-form" id="card-from" class="needs-toggling toggled">
                            -->


                        <!-- Recipient Location -->
                            <div id="recipient-location-box" class="form-field-input display-input">
                                <div class="form-field-checkboxes">
                                    <div id="recipient-location-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="recipient-location-checkbox" id="recipient-location-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                        <span class="checkbox-custom"></span>
                                        <label for="recipient-location-checkbox">Recipient Location:</label>
                                    </div>
                                    <div id="recipient-location-unreadable-box" class="field-check-box">
                                        <input type="checkbox" name="recipient-location-unreadable" id="recipient-location-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>
                                        <!-- <label for="recipient-location-unreadable">Unreadable</label> -->
                                        <label for="recipient-location-unreadable">Illegible</label>
                                    </div>
                                </div><!--closes form-field-checkboxes-->
                                <!-- 
                                <input type="text" name="recipient-location" id="recipient-location" class="" placeholder="Enter your address" -->
         <!-- onFocus="geolocate()"> 
                                <input type="hidden" name="recipient-location-id" id="recipient-location-id"> 
                                -->
                                <div class="chosen-container chosen-container-multi chosen-box" title="" id="recipient_chosen" style="width: 160px;">
                                    <ul id="recipient-chosen-choices" class="chosen-choices">
                                        <li class="search-field">
                                            <input type="text" name="recipient-location" id="recipient-location" class="chosen-search-input form-input" onFocus="geolocate()" style="color: #000;">
                                        </li>
                                        <li><input type="hidden" name="recipient-location-id" id="recipient-location-id"></li>
                                    </ul>
                                    <div class="chosen-drop">
                                        <ul class="chosen-results"></ul>
                                    </div>
                                </div><!--closes chosen-container-->
                            </div><!--closes recipient-location-box-->


                        <!-- Postmark Location (Postmark From) -->
                            <div id="postmark-from-box" class="form-field-input display-input">
                                <div class="form-field-checkboxes">
                                    <div id="postmark-from-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="postmark-from-checkbox" id="postmark-from-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                        <span class="checkbox-custom"></span>
                                        <label for="postmark-from-checkbox">Postmark Location:</label>
                                    </div>
                                    <div id="postmark-from-unreadable-box" class="field-check-box">
                                        <input type="checkbox" name="postmark-from-unreadable" id="postmark-from-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>

                                        <!-- <label for="postmark-from-unreadable">Unreadable</label> -->
                                        <label for="postmark-from-unreadable">Illegible</label>

                                    </div>
                                </div><!--closes form-field-checkboxes-->

                                <div class="chosen-container chosen-container-multi chosen-box" id="postmark_chosen">
                                    <ul id="postmark-chosen-choices" class="chosen-choices">
                                        <li class="search-field"><input type="text" name="postmark-from" id="postmark-from" class="chosen-search-input form-input" onFocus="geolocate()" style="color: #000;"></li>
                                        <li><input type="hidden" name="postmark-from-id" id="postmark-from-id"></li>
                                    </ul>
                                    <div class="chosen-drop">
                                        <ul class="chosen-results"></ul>
                                    </div>
                                </div><!--closes chosen-container-->
                            </div><!--closes postmark-from-box-->
                            

                        <!-- Return address
                            <div id="return-address-box" class="form-field-input">
                                <div class="form-field-checkboxes">
                                    <div id="return-address-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="return-address-checkbox" id="return-address-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                        <span class="checkbox-custom"></span>
                                        <label style="color:blue;" for="return-address-checkbox">Return address</label>
                                    </div>
                                    <div id="return-address-unreadable-box" class="field-check-box">
                                        <input type="checkbox" name="return-address-unreadable" id="return-address-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>
                                        <label for="return-address-unreadable">Unreadable</label>
                                    </div>
                                </div>

                                <input type="text" name="return-address" id="return-address" class="">
                            </div>
                        closes return-address-box-->


                        <!-- Has Postmark (Tag Places)
                            <div id="has-postmark-box" class="form-field-input">
                                <div class="form-field-checkboxes">
                                    <div id="has-postmark-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="has-postmark-checkbox" id="has-postmark-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                        <span class="checkbox-custom"></span>
                                        <label style="color:blue;" for="has-postmark-checkbox">Has postmark</label>
                                    </div>
                                    <div id="has-postmark-unreadable-box" class="field-check-box">
                                        <input type="checkbox" name="has-postmark-unreadable" id="has-postmark-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>
                                        <label for="has-postmark-unreadable">Unreadable</label>
                                    </div>
                                </div>

                                <input type="text" name="has-postmark" id="has-postmark" class="">
                            </div> 
                        closes has-postmark-box-->


                            <!-- tags (in form box) -->
                            <div id="tags-box" class="form-field-input display-input">

                                <!--
                                <div class="form-field-checkboxes">
                                    <div id="tags-toggle-box" class="field-check-box">
                                        <input type="checkbox" name="tags-checkbox" id="tags-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                        <span class="checkbox-custom"></span>
                                        <label for="tags-checkbox">Tag(s)</label>
                                    </div>

                                    <div id="tags-unreadable-box" class="field-check-box hide">
                                        <input type="checkbox" name="tags-unreadable" id="tags-unreadable" class="unreadable" onclick="formFieldUnreadable(this)">
                                        <span class="checkbox-custom"></span>
                                        <label for="tags-unreadable">Unreadable</label>
                                    </div>
                                </div>
                                -->

                                <label for="tags-checkbox">Tag(s)</label>
                                <select data-placeholder="Choose a tag..." name="tags" multiple id="tags" class="chosen-select tags form-input chosen-box">
                                    <option value=""></option>
                                </select>

                                <!-- <input type="text" name="has-postmark" id="has-postmark" class=""> -->
                            </div><!--closes has-postmark-box-->
                            

                        </form><!--closes full-postcard-form-->
                        <div id="tally-total" class="tally-total"></div>
                    </div><!--closes forms-box-->
                    
                </div><!--closes content-mid-->

                <div class="inputs-bottom">
                    <form id="message-text-box" class="bottom-textarea form-field-input display-input active">
                        
                        
                        

                        <!-- 
                        onclick="submitTranscriptionStatus('no_text')"
                        onclick="submitTranscriptionStatus('not_started')"
                        onclick="submitTranscriptionStatus('in_progress')"
                        onclick="submitTranscriptionStatus('completed')" 
                        -->


                    <!-- message-text back -->
                        <div class="message-text-top-inputs">
                            <div id="message-text-top" class="message-text-top">
                                <div class="form-field-checkboxes">
                                    <div id="message-text-toggle-box" class="field-check-box">
                                        <div id="message-text-toggle">
                                            <input type="checkbox" name="message-text-checkbox" id="message-text-checkbox" onclick="formFieldToggle(this)" checked="checked">
                                            <span class="checkbox-custom"></span>
                                            <label id="message-text-heading" for="message-text-checkbox">Message text (back):</label>
                                        </div>
                                        <button id="message-back-button" class="message-text-button" onclick="postcardToggleSide('back'); return false;">Show Back</button>            
                                    </div>
                                </div>
                            </div>
                            <div id="message-text-box-buttons" class="message-text-buttons">
                                <label id="message-back-unreadable-box" class=""><input type="radio" id="message-back-unreadable" name="message-back-option" onclick="submitTranscriptionStatus('illegible')"> Illegible</label>
                                <label id="message-back-needs-work-box"><input type="radio" id="message-back-needs-work" name="message-back-option" onclick="submitTranscriptionStatus('in_progress')"> Needs more work</label>
                                <label><input type="radio" id="message-back-complete" name="message-back-option" onclick="submitTranscriptionStatus('completed')"> Complete</label>
                            </div>
                        </div><!--closes message-text-top-inputs-->
                            <textarea rows="5" cols="50" name="message-text" id="message-text"></textarea>
                            <span id="message-err" class="err-message" style="display:none;"></span>
                    </form><!--closes message-text-back-->





                <!-- message-text front -->
                    <form id="message-text-front-box" class="bottom-textarea form-field-input display-input active">
                        <div class="message-text-top-inputs">
                            <div id="message-text-front-top" class="message-text-top">
                                <div class="form-field-checkboxes">
                                    <div id="message-text-front-toggle-box" class="field-check-box">
                                        <div id="message-text-front-toggle" class="">
                                            <input type="checkbox" name="message-text-front-checkbox" id="message-text-front-checkbox" onclick="formFieldToggle(this); submitTranscriptionStatus('not_present');" checked="checked">
                                            <span class="checkbox-custom"></span>
                                            <label id="message-text-front-heading" for="message-text-front-checkbox">Message text (front):</label>
                                        </div>
                                        <button id="message-front-button" class="message-text-button" onclick="postcardToggleSide('front'); return false;">Show Front</button>                                        
                                    </div>
                                </div>
                            </div>

                            <div id="message-text-front-box-buttons" class="message-text-buttons hide">
                                <label id="message-front-unreadable-box" class=""><input type="radio" id="message-front-unreadable" name="message-front-option" onclick="submitTranscriptionStatus('illegible')"> Illegible</label>
                                <label id="message-front-needs-work-box"><input type="radio" id="message-front-needs-work" name="message-front-option" onclick="submitTranscriptionStatus('in_progress')"> Needs more work</label>
                                <label><input type="radio" id="message-front-complete" name="message-front-option" onclick="submitTranscriptionStatus('completed')"> Complete</label>
                            </div>
                        </div><!--closes message-text-top-inputs-->
                        <textarea rows="5" cols="50" name="message-text-front" id="message-text-front"></textarea>
                    </form><!--closes message-text-front-->

                    <!-- <form id="tags-box" class="tags-box display-form form-field-input display-input"> -->
                        <!--
                        <label for="tags" class="tags form-item">Tag(s)</label><br>
                        <input type="text" name="tags" id="tags" class="tags form-item"> //<== comment this out
                        <select data-placeholder="Choose a tag..." name="tags" multiple id="tags" class="chosen-select tags form-item">
                            <option value=""></option>
                        </select>
                        

                        <button id="search-btn" class="search-btn form-item">
                            <i class="fa fa-search"></i>
                        </button>

                        <div class="tag-rows">
                            <div class="tag-item">
                                <h5>Design:</h5>
                                <span>- no tags yet -</span>
                            </div>

                            <div class="tag-item">
                                <h5>Written Topics:</h5>
                                <span>- no tags yet -</span>
                            </div>

                            <div class="tag-item">
                                <h5>Printed Text:</h5>
                                <span>- no tags yet -</span>
                            </div>

                            <div class="tag-item">
                                <h5>Linguistics:</h5>
                                <span>- no tags yet -</span>
                            </div>

                            <div class="tag-item">
                                <h5>Postmark:</h5>
                                <span>- no tags yet -</span>
                            </div>

                        </div>
                    </form>closes tags-box                     -->



                </div><!--closes inputs-bottom-->
                <div class="buttons-bottom">
                    <div class="buttons-bottom-left">
                        <button id="add-to-collection" class="add-to-collections-btn">Add to my collections <i class="fa fa-caret-down"></i></button><!--closes add-to-collections-btn-->
                        <!-- <button id="skip-postcard" class="skip-postcard-btn">Skip Postcard <i class="fa fa-angle-double-left"></i></button>closes skip-postcard-btn -->
                    </div><!--closes buttons-bottom-left-->

                    <div class="buttons-bottom-right">
                        <!-- <button id="save-postcard" class="save-btn" onclick="formTallyTotal(); return false;">Save</button>closes save-btn  // savePostcard();  -->
                        <button id="skip-postcard" class="skip-postcard-btn"><i class="fa fa-angle-double-left"></i> Skip Postcard</button><!--closes skip-postcard-btn -->                        
                        <button id="next-postcard" class="next-btn ready" onclick="nextPostcard()">Next Postcard <i class="fa fa-angle-double-right"></i></button><!--closes save-btn -->
                    </div><!--closes buttons-bottom-right-->
                </div><!--closes buttons-bottom-->
            </div><!--closes content-mid-box-->
        </div><!--closes content-main | tagging-transcribing-->

<?
include($_SERVER['DOCUMENT_ROOT'] . "/assets/footer.php"); 
?>