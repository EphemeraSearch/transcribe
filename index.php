<?
include($_SERVER['DOCUMENT_ROOT'] . "/assets/common.php"); 
?>
        <div class="content-main">
            <div class="content-left">
                <header>
                </header>
                <p>Welcome to Ephemera, a website developed by humans!</p>
                <p>The archive has the following record counts:</p>
                <ul>
                    <li>Ephrmera: <?= 7 ?> <a href="<?= '#' ?>">View all</a></li>
                    <li>Collections: <?= 6 ?> <a href="<?= '#' ?>">View all</a></li>
                    <li>Tags: <?= 10 ?> <a href="<?= '#' ?>">View all</a></li>
                    <li>Places: <?= 15 ?> <a href="<?= '#' ?>">View all</a></li>
                    <li>Profiles: <?= 11 ?> <a href="<?= '#' ?>">View all</a></li>
                    <li>Pictures: <?= 4 ?> <a href="<?= '#' ?>">View all</a></li>
                    <li>Pictures to transcribe: <?= 'FIXME' ?> <a href="<?= '#' ?>">View all</a></li>
                </ul>
                <h2>Lastest ephemera</h2>
                <ul class="lastest-ephemera">
                    <li><a href="<?= '#' ?>">Postcard from Carpenter, Philip P. (Philip Pearsall) to Wm Lloyd Garrison, Esq'r.,, 1874</a></li>
                    <li><a href="<?= '#' ?>">Postcard from Maidene to Vesta Carlisle, 1944</a></li>
                    <li><a href="<?= '#' ?>">Postcard from Tiny Time to Martha Adams, 19*4</a></li>
                    <li><a href="<?= '#' ?>">Postcard from Tiny Time to Martha Adams</a></li>
                    <li><a href="<?= '#' ?>">Postcard from Tiny Time to Martha Adams</a></li>
                    <li><a href="<?= '#' ?>">Postcard from Tiny Tim to Pink Panther, 19*4</a></li>
                    <li><a href="<?= '#' ?>">Postcard from Big Bob to Little Lucy, 197*</a></li>
                </ul>
                <h2>Notification feed</h2>
                <h2>Timeline -- Activity from users I'm following</h2>
                <div class="timeline-activity"></div><!--closes timeline-activity-->
            </div><!--closes content-left-->
            <div class="content-right">
                <h3>The great tagging and transcription project</h3>
                <?

                ?>
                <div class="tag-trans-project">
                    <div class="tag-trans-project-title"><?= 'Date tagging' ?></div>
                    <div class="tag-trans-project-total"><?= '2750/10300' ?></div>
                </div><!--closes tag-trans-project-->

                <div class="tag-trans-project">
                    <div class="tag-trans-project-title"><?= 'Place tagging' ?></div>
                    <div class="tag-trans-project-total"><?= '4733/10300' ?></div>
                </div><!--closes tag-trans-project-->

                <div class="tag-trans-project">
                    <div class="tag-trans-project-title"><?= 'Language tagging' ?></div>
                    <div class="tag-trans-project-total"><?= '5911/10300' ?></div>
                </div><!--closes tag-trans-project-->

                <div class="tag-trans-project">
                    <div class="tag-trans-project-title"><?= 'Full tagging' ?></div>
                    <div class="tag-trans-project-total"><?= '2137/10300' ?></div>
                </div><!--closes tag-trans-project-->

                <h3>How you can help</h3>
                <p>Postcards are a connection to the past and a great trove of data for geneaologists and historians, but for them to be useful, we need help tagging them with dates, placed and full transcriptions. Jump in and help:</p>
                <div class="tag-buttons-box">
                    <button>Tag languages</button>
                    <button>Tag dates</button>
                    <button>Tag places</button>
                    <button>Tag transcription</button>
                </div><!--closes tag-buttons-box-->
                <h3>Recent transcriptions</h3>
                <p>Michael added an english translation "Dear Vista Hi friend! I thought I would write a letter..." to postcard <?= '#5932' ?></p>
                <img src="<?= 'assets/images/postcard-5932.png' ?>">
                <p>Aj added an a language to postcard <?= '#2986' ?></p>
                <img src=" <?= 'assets/images/postcard-2986.png' ?>">
            </div><!--closes content-right-->
        </div><!--closes content-main-->
<?
include($_SERVER['DOCUMENT_ROOT'] . "/assets/footer.php");
?>
