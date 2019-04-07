/**
 *  
 */
$(document).ready(function(){
	//$('[data-toggle="popover"]').popover();
	$('[data-toggle="tooltip"]').tooltip();   
	
	$('*[data-poload]').click(function(event) {
  		event.preventDefault();
  	    var e=$(this);
  	    var type_id = e.data('entity-type');
    	if(e.data('bs.popover')==null||e.data('bs.popover').hasContent().length==0){
    		$.get(e.data('poload'),function(result) {
    			e.popover({
    						title:loadCardTitle(result), 
    						content: loadCardInfo(type_id,result),
    						html: true,
    						template: '<div class="popover popover-medium"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    					}).popover('show');
    			$('.close-popover').click(function(event){
    				event.preventDefault();
    				var host = $(this).parent().parent().parent();
    				host.prev().popover('hide');
    			});
    		});
    	}
    	else{
    		e.popover('toggle');
    		$('.close-popover').click(function(event){
				event.preventDefault();
				var host = $(this).parent().parent().parent();
				host.prev().popover('hide');
			});
    	}
  	    
  	});
	
  	$('.boxentity').draggable({
			distance:1,
			cancel:'.no-drag',
			containment:"body"
	});
  	
  	$('.boxentity').data({
  	    'originalLeft': $(".boxentity").css('left'),
  	    'originalTop': $(".boxentity").css('top')
  	});
  	
  	$('.dsgn-trunc-hidd').each(function(index,element){
  		 if (element.scrollWidth > $(element).innerWidth()+2) {
  			 $(element).append("<a href='#' class='hidden dsgn-trunc-expand'><i class='fas fa-angle-left'></i></a>");
  			 $(element).after("<a href='#' class='dsgn-trunc-expand'><i class='fas fa-angle-right'></i></a>");
         }
  	});
  	expandColumnText();
  	$(window).resize(function(){
  		$('.dsgn-trunc-hidd').each(function(index,element){
  	  		if (element.scrollWidth > $(element).innerWidth()+2) {
  	  			if($(element).find('a.dsgn-trunc-expand').length===0){
  	  				$(element).append("<a href='#' class='hidden dsgn-trunc-expand'><i class='fas fa-angle-left'></i></a>");
  	  				$(element).after("<a href='#' class='dsgn-trunc-expand'><i class='fas fa-angle-right'></i></a>");
  	  			}else{
  	  				$(element).nextAll('a.dsgn-trunc-expand').show();
  	  			}
  	  		} else {
  	  			$(element).nextAll('a.dsgn-trunc-expand').hide();
  	  		}
  	  	});
  		expandColumnText();
  	});
  	
  	$('#Incr_id').change(function(){
  		document.getElementById("search").submit();
  	});
  	
  	var urlLoc = window.location.href;
  	$('#shareUrl').val(urlLoc);
  	
  	$('#shareCopy').click(function(){
  		var copyText =$("#shareUrl");
  		copyText.select();
  		document.execCommand('copy');
  		$('#resCopy').html('<div id="alertCopy"><a href="#" class="close dsgn-alert-close" data-dismiss="alert" aria-label="close">&times;</a> Link copied to the clipboard.</div>')
  		$('#alertCopy').addClass('alert dsgn-alert dsgn-alert-info alert-dismissible');
  	});
  	
});

function split(val)  {
	var result = val.split(/::\s*/);
	return result;
}

function extractLast(term) {
	return split(term).pop();
}

function loadCardTitle(data){
	var htmlString = data[0].name+"<a href='#' class='close-popover fas fa-times' style='float:right; text-decoration:none;color:inherit;'></a>";
	return htmlString;
}

function loadCardInfo(type,data){
	var htmlCard = ""; 
	switch (type){
		case 0:
			htmlCard = formatDiseaseCard(data);
			break;
		case 1:
			htmlCard = formatGeneCard(data);
			break;
		case 2: 
			htmlCard = formatVariantCard(data);
			break;
		default:
			alert("Invalid type");
			break;
	}
	return htmlCard;
}

function formatDiseaseCard(disData){
	var disAttributes = disData[0], disVocabulary = disData[1], disSynom = disData[2],disMapsText="<table class='table table-condensed'>", disSynmText="<table class='table table-condensed'>";
	disVocabulary = orderDiseaseTableKeys(disVocabulary);
	$.each(disVocabulary,function(key,value){
		disMapsText += diseaseMappingTable(key,value);
	});
	$.each(disSynom,function(key,value){
		disSynmText += diseaseSynoymsTable(key, value);
	});
	disMapsText+="</table>";
	var diseaseCard = 
		"<div>" +
			"<ul class='nav nav-tabs'>" +
				"<li class='tab active'><a class='unstyled-link' href='#tab1' data-toggle='tab'>General Info</a></li>" +
				"<li class='tab'><a class='unstyled-link' href='#tab2' data-toggle='tab'>Vocabulary</a></li>" +
				"<li class='tab'><a class='unstyled-link' href='#tab3' data-toggle='tab'>Synonyms</a></li>" +
			"</ul>" +
			"<div class='tab-content' style='padding-top: 15px'>" +
				"<div class='tab-pane active' id='tab1'>" +
					"<table class='table'>" +
						"<tr>" +
							"<td class='text-right'><strong>Name:</strong></td>" +
							"<td>"+disAttributes.name+"</td>" +
						"</tr>" +
						"<tr>" +
							"<td class='text-right'><strong>Type:</strong></td>" +
							"<td>"+disAttributes.type+"</td>" +
						"</tr>" +
						"<tr>" +
							"<td class='text-right'><strong>MeSH Class:</strong></td>" +
							"<td>"+disAttributes.meshClass+"</td>" +
						"</tr>" +
						"<tr>" +
							"<td class='text-right'><strong>Semantic Type:</strong></td>" +
							"<td>"+disAttributes.semanticType+"</td>" +
						"</tr>" +
						"<tr>" +
							"<td class='text-right'><strong>Phenotypes:</strong></td>" +
							"<td>"+disAttributes.phenotypes+"</td>" +
						"</tr>" +
						"<tr>" +
							"<td class='text-right'><strong>Disease Ontology:</strong></td>" +
							"<td>"+disAttributes.diseaseOntology+"</td>" +
						"</tr>" +
					"</table>" +
				"</div>" +
				"<div class='tab-pane container-fluid' id='tab2'>" +
					disMapsText+
				"</div>" +
				"<div class='tab-pane container-fluid' id='tab3'>" +
					disSynmText+
				"</div>" +
			"</div>" +
		"</div>";
	
	diseaseCard = diseaseCard.replace("null","Not Available");
	
	return diseaseCard;
}

function formatGeneCard(genData){
	var genAttributes = genData[0], genSynom=genData[1],geneSynomText="<table class='table table-condensed'>";
	var uprot = splitUprotId(genAttributes.uniprotId)
	$.each(genSynom,function(key,value){
		geneSynomText += geneSynoymsTable(key,value);
	});
	geneSynomText += "</table>";
	var geneCard = "<div>" +
		"<ul class='nav nav-tabs'>" +
			"<li class='tab active'><a class='unstyled-link' href='#tab1' data-toggle='tab'>General Info</a></li>" +
			"<li class='tab'><a class='unstyled-link' href='#tab2' data-toggle='tab'>Synonyms</a></li>" +
		"</ul>" +
		"<div class='tab-content' style='padding-top: 15px'>" +
			"<div class='tab-pane active' id='tab1'>" +
				"<table class='table table-condensed'>" +
					"<tr>" +
						"<td class='text-right'><strong>Entrez Id:</strong></td>" +
						"<td>"+genAttributes.entrezId+"</td>" +
					"</tr>"+ 
					"<tr>" +
						"<td class='text-right'><strong> Gene Symbol:</strong></td>" +
						"<td><a target='_blank' href='http://www.ncbi.nlm.nih.gov/gene/"+genAttributes.entrezId+"'>"+genAttributes.name+"</a></td>" +
					"</tr>" +
					"<tr>" +
						"<td class='text-right'><strong>Uniprot accession:</strong></td>" +
						"<td>"+uprot+"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class='text-right'><strong>Full name:</strong></td>" +
						"<td>"+genAttributes.description+"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class='text-right'><strong>Protein class:</strong></td>" +
						"<td>"+genAttributes.protClass+"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class='text-right'><strong>DPI:</strong></td>" +
						"<td>"+genAttributes.dpi+"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class='text-right'><strong>DSI:</strong></td>" +
						"<td>"+genAttributes.dsi+"</td>" +
					"</tr>" +
					"<tr>" +
					"<td class='text-right'><strong>pLi:</strong></td>" +
					"<td>"+genAttributes.pli+"</td>" +
				"</tr>" +
				"</table>" +
			"</div>" +
			"<div class='tab-pane container-fluid' id='tab2'>" +
				geneSynomText+
			"</div>" +
		"</div>" +
	"</div>";
	return geneCard;
}

function formatVariantCard(varData){
	var varAttributes = varData[0],varCons = JSON.parse(varData[1]),varConsText="";
	$.each(varCons,function(key,value){
		varConsText += varConseqTable(key,value['fields']);
	});
	console.log(varConsText);
	var variantCard = "<div>" +
		"<ul class='nav nav-tabs'>" +
			"<li class='tab active'><a class='unstyled-link' href='#tab1' data-toggle='tab'>General Info</a></li>" +
			"<li class='tab'><a class='unstyled-link' href='#tab2' data-toggle='tab'>Consequences</a></li>" +
		"</ul>" +
		"<div class='tab-content' style='padding-top: 15px'>" +
			"<div class='tab-pane active' id='tab1'>" +
				"<table class='table table-condensed'>" +
					"<tr>" +
						"<td class='text-right'><strong>SNP Identifier:</strong></td>" +
						"<td>"+varAttributes.name+"</td>" +
					"</tr>"+
					"<tr>" +
						"<td class='text-right'><strong>Class:</strong></td>" +
						"<td>"+varAttributes.varClass+"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class='text-right'><strong>Gene Symbol:</strong></td>" +
						"<td>"+varAttributes.geneSymbol+"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class='text-right'><strong>Chromosome:</strong></td>" +
						"<td>"+varAttributes.chromosome+"</td>" +
					"</tr>" +
					"<tr>" +
						"<td class='text-right'><strong>Consequence:</strong></td>" +
						"<td>"+varAttributes.consequence+"</td>" +
					"</tr>" +
				"</table>" +
			"</div>" +
			"<div class='tab-pane container-fluid' id='tab2'><table><tr><th class='col-md-4'>Symbol</th><th class='col-md-4'>Consequence</th><th class='col-md-4'>Protein change</th>" +
				varConsText+
			"</table></div>" +
		"</div>" +
	"</div>";
	return variantCard;
}

function diseaseMappingTable(key,value){
	var string = "<tr><td class='col-md-2'>"+key+"</td>";
	var  ids="",names="";
	for(var i=0;i<value.length;i++){
		var mapArray = value[i];
		ids += "<a class='mapId' onclick="+vocalLinkPage(key,mapArray[0])+" href='#' data-toggle='tooltip'>"+ mapArray[0]+"</a>";
		names += "<span class='mapName'>"+mapArray[1]+"</span>";
	}
	names = names.replace('undefined',"");
	string += "<td class='col-md-4'>"+ids+"</td>";
	string += "<td class='col-md-6>"+names+"</td>";
	string += "</tr>";
	
	return string;
}

function diseaseSynoymsTable(key,value){
	var string=""; 
	if(!value.isPTl){
		var string = "<tr><td class='col-md-6'>"+value.name+"</td></tr>";
	}
	return string;
}

function geneSynoymsTable(key,value){
	var string=""; 
	if(!value.isofficial){
		var string = "<tr><td class='col-md-6'>"+value.vocabulary+"</td></tr>";
	}
	return string;
}

function varConseqTable(key,value){
	var string=""; 
	string = "<tr><td class='col-md-4'>"+value.symbol+"</td><td class='col-md-4'>"+value.consequence+"</td><td class='col-md-4'>"+value.protein_change+"</td></tr>";
	return string;
}

function orderDiseaseTableKeys(mapObj){
	var keys = Object.keys(mapObj);
	var mappings = {
			'cui':[0,'UMLS:'],
			'ICD9CM':[1,'ICD9CM:'],
			'MSH':[2,'MeSH:'],
			'OMIM':[3,'OMIM:'],
			'DO':[4,'DO:'],
			'ORDO':[5,'ORDO:'],
			'EFO':[6,'EFO:'],
			'NCI':[7,'NCI:'],
			'HPO':[8,'HPO:'],
			'MONDO':[9,'MONDO:']
	}
	tempArray =  new Array();
	keys.forEach(function(element){
		tempArray[mappings[element][0]]=[mappings[element][1],mapObj[element]];
	});
	var sortedHash = {}
	tempArray.forEach(function(element){
		sortedHash[element[0]]=element[1];
	});
	return sortedHash;
}

function vocalLinkPage(key,value){
	var link="#";
	var links ={
			'UMLS:':"http://linkedlifedata.com/resource/umls/id/",
			'MeSH:':"https://meshb.nlm.nih.gov/record/ui?ui=",
			'OMIM:':"https://www.omim.org/entry/",
			'HPO:':"https://hpo.jax.org/app/browse/term/",
			'DO:':"http://disease-ontology.org/?id=DOID:",
			'ORDO:':"https://www.orpha.net/consor/cgi-bin/Disease_Search_Simple.php?lng=EN&Disease_Disease_Search_diseaseType=ORPHA&Disease_Disease_Search_diseaseGroup=",
			'EFO:':"http://www.ebi.ac.uk/efo/EFO_",
			'NCI:':"https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI%20Thesaurus&code=",
			'MONDO:':"https://monarchinitiative.org/disease/",
			'ICD9CM:':"https://icd.codes/icd9cm/"
	}
	if(links[key]){
		link = "window.open('"+links[key]+value.replace('.','')+"','_blank\');";
	}
	return link;
}

function removeUndefined(value){
	return value;
}

//function toggleBoxEnt(element){
//	elName = $(element).attr('name');
//	if($('div[name='+elName+']').next('div').hasClass('boxentity-open')){
//		closeBoxEnt($('div[name='+elName+']').next().find('button'));
//	}else{
//		openBoxEnt(element);
//	}
//}
//
//function openBoxEnt(element){
//	var elName =  $(element).attr('name');
//	$(element).next('div').show('fast'); 
//	$('div[name='+elName+']').next('div').addClass('boxentity-open');
//	$('div[name='+elName+']').find('div i').removeClass('fa-chevron-down');
//	$('div[name='+elName+']').find('div i').addClass('fa-minus');
//}
//
//function closeBoxEnt(element){
//	var target = $(element).parent();
//	target.hide('fast',function(){
//		var target = $(this);
//		target.css({
//			'left': target.data('originalLeft'),
//			'top': target.data('originalTop')
//		});
//	});
//	$('div[name='+elName+']').next('div').removeClass('boxentity-open');
//	$('div[name='+elName+']').find('div i').addClass('fa-chevron-down');
//	$('div[name='+elName+']').find('div i').removeClass('fa-minus');
//}

function expandColumnText(){
	$('a.dsgn-trunc-expand').click(function (event){
  		event.preventDefault();
  		if($(this).prev().hasClass('dsgn-trunc-hidd')){
  			$(this).prev().removeClass('dsgn-trunc-hidd').addClass('dsgn-trunc-show');
  			$(this).prev().find('a').removeClass('hidden');
  			$(this).addClass('hidden');
  		}else if($(this).parent().hasClass('dsgn-trunc-show')){
  			$(this).parent().removeClass('dsgn-trunc-show').addClass('dsgn-trunc-hidd');
  			$(this).parent().next().removeClass('hidden');
  			$(this).addClass('hidden');
  		}
  	});
}

function getBaseUrl() {
    var re = new RegExp(/^.*\//);
    return re.exec(window.location.href);
}

