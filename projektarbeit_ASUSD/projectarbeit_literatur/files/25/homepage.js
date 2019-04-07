/**
 * Javascript for scores on screen listing page
 */
 
(function( yourcode ) {

	yourcode( window.jQuery, window, document );

} (function( $, window, document ) {
	
	$(function( ) {

        $("#searchType").on( "change", function( ) {
            if( $(this).val( ) == "publication" ) {
                $("#publicationSearch").show( );
                $("#geneSearch").hide( );
                $("#pubSearch").focus( );
            } else {
                $("#geneSearch").show( );
                $("#publicationSearch").hide( );
                $("#search").focus( );
            }
        });

	});
	

}));