  /**
 * 
 */
$(document).ready(function(){
	var formElem = $('#search');
	$('#close_gene_label_id').click(function(){
		var filt = $('#filt_gene_id');
		removeFilterAndSubmit(filt,formElem);
	});
	
	$('#close_disease_label_id').click(function(){
		var filt = $('#filt_disease_id');
		removeFilterAndSubmit(filt,formElem);
	});
	
	$('#close_variant_label_id').click(function(){
		var filt = $('#filt_variant_id');
		removeFilterAndSubmit(filt,formElem);
	});
	
	$('#source_label_id').click(function(){
		var filt = $('#filt_source');
		changeFilterAndSubmit(filt,formElem);
	});
/* JUANMA INICIO */

        var source_init=$('#filt_source').val();
        var osource_init=$('#efilt_originalsource').val();

        var pathname = window.location.pathname;
        var type_id = pathname[2];
        var from_search = pathname[3];
        var subtype = pathname[4];
        $('#filt_source').on( "change", function( event ) {
                if ( $('#filt_source').val() != source_init  )  {
                             $('#efilt_operation_originalsource').prop("disabled", true);
                             $('#efilt_originalsource').prop('disabled', true);
                             $('#efilt_originalsource').append($('<option>', {value: '',text: 'Disabled'}));
                             $("#efilt_originalsource").val("");
                } else if ($('#filt_source').val() == source_init)  {
                        $("#efilt_originalsource option[value='']").remove();
                        $("#efilt_operation_originalsource").prop("disabled", false);
                        $("#efilt_originalsource").prop("disabled", false);
                        $("#efilt_originalsource").val(osource_init);
                }
        }); 

/* JUANMA FINAL */
	
	var urlac = $('.js-data-autocomplete').attr('data-autocomplete');
	
	$("#filt_disease_id").focus(function (){
		$('#filt_disease_id').autocomplete("option","minLength",3);
	})
	.on( "keydown", function( event ) {
		if ( event.keyCode === $.ui.keyCode.TAB &&
			$( this ).autocomplete( "instance" ).menu.active ) {
			event.preventDefault();
		}
	})
  	.autocomplete(
		{
       	source: function(request, response) {
           	$.ajax({
           		maxRows: 15,
   	          	url: urlac,
				datatype: "json",
           	    data: {
               		term: extractLast(request.term),                    
                   	type_id: 0,
                   	filter_gene_id: $("#org_gen").val()
               	},
                success: function(data) {
                	mergedArray = Array();
                	Object.keys(data).forEach(function(key){
                		if(Array.isArray(data[key])){
                			mergedArray = mergedArray.concat(data[key])
                		}
                	});
                	if(mergedArray.length===0){
                		var result = [{
        					label: 'No matches found', 
        				    value: -1 
    				    }];
                		response(result);
                	}else{
                		response(
    	               		$.map(mergedArray, function(item) {
    		                	return { 
    		                   		value: item.id,
    		                   		label: item.value
    		                	};
    					}));
	                }
				}
			})
       	},
		autoFocus: true,
		focus: function(event,ui){
			return false;
		},
  		select: function( event, ui ) {
 			if(ui.item.value!=-1){
  				event.target.value = ui.item.label;
  			}
			return false;
  		}
	});
	
	$('#id_clear').click(function(){
		clearFilters(formElem);
		formElem.submit();
	});
	
	$('#id_reset').click(function(){
		clearFilters(formElem);
	});
	
	$('.extra-filt').click(function(){
		 var id = $(this).attr('id').replace('close_','');
		 var inpElem = $('#'+id);
		 removeFilter(id);
		 formElem.submit();
	});
	
	$('#remove_filters').click(function(){
		var element = $(this).parent();
		var filters = element.find(".dsgn-label-filter-checked");
		filters.each(function(index){
			removeFilter($(this).attr('for'));
		});
		formElem.submit();
	});
});

function removeFilter(id){
	var filt=$('#'+id)
	if(filt.is('input')){
		filt.val('');
		filt.prev().prop('selectedIndex',0);
	}else{
		filt.prop('selectedIndex',0);
		filt.prev().prop('selectedIndex',0);
	}
}

function removeFilterAndSubmit(filtElement,formElement){
	filtElement.val('');
	formElement.submit();
}

function changeFilterAndSubmit(filtElement,formElement){
	filtElement.val('ALL');
	formElement.submit();
}

function clearFilters(form){
	form.find("input:enabled[type=text]").val("");
	form.find("input:enabled[type=select]").val("");
	form.find("select:enabled").prop('selectedIndex',0);
	form.find("input:enabled[type=text]").show(0);
}


function addRemoveFilter(element){
	if($(element).hasClass('dsgn-label-filter')){
		$(element).removeClass('dsgn-label-filter').addClass('dsgn-label-filter-checked')
	}else{
		$(element).removeClass('dsgn-label-filter-checked').addClass('dsgn-label-filter')
	}
}
