/**
 * Fix git
 */
$(document).ready(function(){
});

var disLabels = {
	diseaseclassname:'Disease Class:',
	sty:'Semantic Type:',
	doname:'DO Class:',
	type:'Type:',
	mesh:'mesh:'
}

var genLabels = {
	uniprotid:'Uniprot accession:',
	description:'Full name:',
	panthername:'Protein class:',
	dpi:'DPI:',
	dsi:'DSI:',
	pLi:'pLi:'
}

var varLabels = {
	snpid:'SNP Identifer:',
	class_field:'Class:',
	symbol:'Gene Symbol:',
	chromosome:'Chromosome:',
	most_severe_consequence:'Consequence:'
}

function toggleBoxEnt(element,id){
	if($(element).next('div').hasClass('boxentity-open')){
		let closeButton = $('.boxentity.id-'+id);
		closeBoxEnt(closeButton,id);
	}else{
		openBoxEnt(element,id);
	}
}

function openBoxEnt(element,id){
	if(!$(element).next('div').hasClass('boxentity-loaded')){
		if(id.startsWith('C')){
			getDiseaseBox(id);
		}else if(id.startsWith('rs')){
			getVariantBox(id);
		}else{
			getGeneBox(id);
		}
	}
	$('.boxentity.id-'+id).addClass('boxentity-loaded');
	$('.boxentity.id-'+id).addClass('boxentity-open');
	$(element).next('div').show('fast'); 
	$('.boxentity-toggle.toggle-'+id).find('i').removeClass('fa-chevron-down');
	$('.boxentity-toggle.toggle-'+id).find('i').addClass('fa-minus');
	
	
}

function closeBoxEnt(element,id){
	var target = $(element);
	target.hide('fast',function(){
		var target = $(this);
		target.css({
			'left': target.data('originalLeft'),
			'top': target.data('originalTop')
		});
	});
	$('.boxentity.id-'+id).removeClass('boxentity-open');
	$('.boxentity-toggle.toggle-'+id).find('i').addClass('fa-chevron-down');
	$('.boxentity-toggle.toggle-'+id).find('i').removeClass('fa-minus');
}

function getDiseaseBox(id){
	let url = $('.js-data-boxDis-'+id).attr('data-boxentity');
	let boxType='disease';
	$.get(url,function (data){
		let fields = clean(deserializeEntity(data));
		loadBoxElements(boxType,id,fields);
	});
}

function getGeneBox(id){
	let url = $('.js-data-boxGen-'+id).attr('data-boxentity');
	let boxType='gene';
	$.get(url,function (data){
		let fields = clean(deserializeEntity(data));
		loadBoxElements(boxType,id,fields);
	});
}

function getVariantBox(id){
	let url = $('.js-data-boxVar-'+id).attr('data-boxentity');
	let boxType='variant';
	$.get(url,function (data){
		let fields = clean(deserializeEntity(data));
		loadBoxElements(boxType,id,fields);
	});
}

function loadBoxElements(boxType,id,fields){
	let boxId = 'id-'+id; 
	let rows;
	switch (boxType){
		case 'disease':
			let disKeys = ['diseaseclassname','sty','doname','type','mesh'];
			rows = loadBox(disLabels,fields,disKeys);
			break;
		case 'gene':
			let genKeys = ['uniprotid','description','panthername','dpi','dsi','pLi'];
			rows = loadBox(genLabels,fields,genKeys);
			break;
		case 'variant':
			let varKeys = ['class_field','symbol','chromosome','most_severe_consequence']
			rows = loadBox(varLabels,fields,varKeys);
			break;
	}
//	console.log($('#'+boxId));
	$('.'+boxId).find('tbody').append(rows);
}

function loadBox(labels,fields,keys){
	let rows = '';
	for (let x=0;x<keys.length;x++){
		let row = "<tr><td class='text-right'><strong>"+labels[keys[x]]+"</strong></td>" +
				"<td class='no-drag'>"+fields[keys[x]]+"</td></tr>"
		rows = rows.concat(row)
	}
	return rows;
}

function deserializeEntity(data){
	let parsedData = JSON.parse(data);
	let fields = parsedData[0]['fields'];
	if(fields.hasOwnProperty('uniprotid')){
		if(fields['uniprotid']){
			fields['uniprotid'] = splitUprotId(fields['uniprotid']);
		}
	}
	return fields;
}

function splitUprotId(uprotString){
	let link = "<a href='http://www.uniprot.org/uniprot/{{uprotid}}'>{{uprotid}}</a> ";
	let uprotLinks = "";
	let uprotArray = uprotString.split(';');
	for (let i=0;i<uprotArray.length;i++){
		uprotLinks = uprotLinks.concat(link.replace(/{{uprotid}}/g,uprotArray[i]));
	}
	uprotLinks = uprotLinks.trim();
	return uprotLinks
}

function clean(obj) {
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined) {
    	obj[propName] = 'Not Available';
    }
  }
  return obj;
}