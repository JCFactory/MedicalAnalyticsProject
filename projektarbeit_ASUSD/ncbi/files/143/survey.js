/* MR-65 */
if (typeof (jQuery) != 'undefined') {
    (function ($) {
        $(function () {
            var min = Math.ceil(1);
            var max = Math.floor(100000);
            var randomNum = Math.floor(Math.random() * (max - min)) + min;
            var surveyUrl = "/coreutils/surveys/qualtric_survey_homepage.js?" + randomNum.toString();
            $.getScript(surveyUrl, function () {
            }).fail(function (jqxhr, settings, exception) {
                console.info('Error loading survey: ', exception);
            });
        });
    })(jQuery);
}