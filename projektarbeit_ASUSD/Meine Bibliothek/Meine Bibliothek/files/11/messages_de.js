(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: DE (German, Deutsch)
 */
$.extend($.validator.messages, {
	required: "Dieses Feld ist ein Pflichtfeld.",
	maxlength: $.validator.format("Geben Sie bitte maximal {0} Zeichen ein."),
	minlength: $.validator.format("Geben Sie bitte mindestens {0} Zeichen ein."),
	rangelength: $.validator.format("Geben Sie bitte mindestens {0} und maximal {1} Zeichen ein."),
	email: "Geben Sie bitte eine g&uuml;ltige E-Mail Adresse ein.",
	url: "Geben Sie bitte eine g&uuml;ltige URL ein.",
	date: "Bitte geben Sie ein g&uuml;ltiges Datum ein.",
	number: "Geben Sie bitte eine Nummer ein.",
	digits: "Geben Sie bitte nur Ziffern ein.",
	equalTo: "Bitte denselben Wert wiederholen.",
	range: $.validator.format("Geben Sie bitte einen Wert zwischen {0} und {1} ein."),
	max: $.validator.format("Geben Sie bitte einen Wert kleiner oder gleich {0} ein."),
	min: $.validator.format("Geben Sie bitte einen Wert größer oder gleich {0} ein."),
	creditcard: "Geben Sie bitte eine gültige Kreditkarten-Nummer ein.",
        postalinsa: "Ung&uuml;ltiges format, erlaubte zeichen(0-9, ,-).",
        passwordStrength : "DEUTSCH! Password must contain at least one capital letter and one digit DEUTSCH!"
});

}));