/*
 * #%L
 * jdispatcher-resources
 * %%
 * Copyright (C) 2007 - 2018 EMBL - European Bioinformatics Institute
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */
var validation = '<div style="text-align: left;">' +
		'<div style="font-weight: bold; padding: 3px; background-color: #5E9E9E; color: #FFFFFF;">Input Validation</div>' +
		'<div style="font-family:sans-serif; font-size=10pt; color=#000000; margin: 10px 0px 10px 0px; padding:10px;">' +
			'<ul style="margin: 0 15px; padding: 0;">' +
				'<li>Filtering the parameters</li>' +
				'<li>Validating the parameters</li>' +
			'</ul>' +
			'<div style="float: right; padding-top: 5px; height: 25px;">' +
				'<img src="../../common/assets/images/loading.gif" style="margin-right: 3px;" /><em>Please wait</em>' +
			'</div>' +
		'</div>' +
'</div>';

if (this.$ != null) {
  $(document).ready(function()
      {
      	// load cookie related JS
      	$.getScript('../../common/assets/js/lib/jquery.cookie-1.0.pack.js', function() {
			restoreEmail();
			$('#jd_toolSubmissionForm').submit(function() {
				storeEmail();
				return true;
			});
		});
		updateLayout();
      }
  );
}

function storeEmail() {
   	// Email stored in cookies
   	var email = $('#email').val();
	var date = new Date();
	date.setMonth(date.getMonth()+1);
	$.cookie('email', email, { path: '/', expires: date });
}

function restoreEmail() {
	var email = $.cookie('email');
	if (email != null) {
		$('#email').val(email);
	}
}

function updateLayout() {
	// Adding Block UI action on submit button
  	$.getScript('../../common/assets/js/lib/jquery.blockUI.js', function() {
        $("#jd_submitButtonPanel input").click(function()
        {
            if(typeof document.getElementById('jd_toolSubmissionForm').
                    checkValidity == "function")
            {
                if(document.getElementById('jd_toolSubmissionForm').
                        checkValidity() === false)
                    return;
            }

        	setTimeout(function() {
        		$.blockUI( { message: validation, css: {width: '300px'} } );
        	}, 100);
        });
        $('#download').each(function() {
        	var download = $(this).hide();
        	$('<a href="#" style="float: right">Close</a>').appendTo(download).click(function() {$.unblockUI();});
        	$('<li><a id="dLink" href="">Download</a></li>').appendTo($('ul.ebi_sideMenu:first')).find('a').click(function() {
        		$.blockUI({ message: download, css: {width: '300px', textAlign: 'left', padding: '5px 15px'} });
        		$('.blockOverlay').attr('title','Click to unblock').click($.unblockUI);
        		return false;
        	});
        });
		$(window).unload(function() {
			$.unblockUI();
		});
	});

  	$('.collapsed').hide().after('<p style=\"float: left; width: 100%;\"><span style="width: 100%; float: left; font-style: italic; margin-bottom: 5px;">The default settings will fulfill the needs of most users.</span><a class="jd_button shadow" style="float: left;">More options...</a><span style="float: left; padding: 5px 10px; font-style: italic;">(Click here, if you want to view or change the default settings.)</span></p>').next('p').find('a').click(function() { $(this).parent().hide().prev().show(); return false; });
  	if (! $('#notification').is(':checked')) {
  		$('#submission').hide();
	}
  	$('#notification').click(function () {
  		if ($(this).is(':checked')) {
  			$('#submission').show();
  		} else {
  			$('#submission').hide();
  		} 
  	});
}

/**
 * Database box
 */
function makeDatabaseBox(selector) {
	$.getScript('../../common/assets/js/form/databaseBox.js', function() {
		$(selector).databaseBox();
	});
}

/**
 * List box
 */
function makeListBox(selector) {
	$.getScript('../../common/assets/js/form/listBox.js', function() {
		$(selector).listBox();
	});
}

/**
 * CONSTRAINTS UTILITY METHODS
 */
function handleCombination(tool, combinationsObject, action)
{

  if(typeof dwr_engine === "undefined" || typeof dwr_jdispatcher === "undefined")
    dwr_init();

  if(dwr_jdispatcher.state() == "rejected")
    return;


  $.when(dwr_engine, dwr_jdispatcher).done
  (function()
  {
    JDispatcher.getScriptObject(tool, combinationsObject,
    function(combinations)
    {
      action(combinations);
    });
  });

}


function dwr_init()
{

  if (typeof this.$ === undefined)
    return;//  in case jQuery was not loaded

  if(typeof this.dwrloaded === "undefined")
  {
    this.dwrloaded = true;

    dwr_engine = $.Deferred();
    dwr_jdispatcher = $.Deferred();

    $.ajax({
      url: '../../services/web/dwr/engine.js',
      cache: true
    }).done(function(){dwr_engine.resolve();});

    $.ajax({
      url: '../../services/web/dwr/interface/JDispatcher.js',
      cache: true
    }).done(function(){dwr_jdispatcher.resolve();});

  }
}




// Selection list methods
// Selects a single option in a select list  
function selectListOption(combo, value) {
	combo.find('option').each(function() {
		if ($(this).val() == ("" + value)) {
 			$(this).attr('selected', 'selected');
 		} else {
 			$(this).removeAttr('selected');
 		}
 	});
}

// Layout the options in a Select list.
// If an option value is not in the list of values, then it will be marked disabled
function layoutOptions(combo, validValues, selectFirstValid) {
	if (validValues && (validValues.length > 0)) {
		var isNumberList = ! validValues[0].length;
		combo.find("option").each(function(){
			var val = $(this).val();
			if (isNumberList) {
				val = +val;
			}
			var index = $.inArray(val, validValues);
			if (index == -1) {
				$(this).addClass('disabled');
			} else {
				$(this).removeClass('disabled');
			}
		});
		if (selectFirstValid && (combo.find("option:selected").hasClass("disabled"))) {
            combo.find("option").each(function(){
				var val = $(this).val();
				if (isNumberList) {
					val = +val;
				}
				var index = $.inArray(val, validValues);
				if (index == -1) {
					$(this).removeAttr('selected');
				} else {
					if (index == 0)
                    {
						$(this).attr('selected', 'selected');
                        //$(combo).prop("selectedIndex", $(this).index()+1);
                        $(combo).val(val);
					} else {
						$(this).removeAttr('selected');
					}
				}
			});
		}
	} else {
		combo.find("option").each(function(){
			$(this).addClass('disabled');
		});
	}
	//updateComboDisabled(combo);
}

function updateSingleSelectOptions(key, combo, combinations) {
	var values = combinations[key];
	layoutOptions(combo, values, true);
}

function selectDefaultOptions(key, combo, indexCombo, otherCombo, indexOther, combinations)
{
	var comb = combinations[key];

	if (typeof comb !== "undefined" && comb.length > 0) {
		var comboDefaultValue = comb[0][indexCombo];
		var otherComboDefaultValue = comb[0][indexOther];

		combo.find("option").each(function()
    {
			var val = $(this).val();
			if (comboDefaultValue == val) {
				$(this).attr("selected", "selected");
			} else {
				$(this).removeAttr("selected");
			}
		});
		updateComboDisabled(combo);
		otherCombo.find("option").each(function() {
			var val = $(this).val();
			if (otherComboDefaultValue == val) {
				$(this).attr("selected", "selected");
			} else {
				$(this).removeAttr("selected");
			}
		});
		updateComboDisabled(otherCombo);
	}
}

function updateDoubleSelectOptions(key, trigger, indexTrigger, otherCombo, indexOther, combinations) {
  var selectedTriggerValue = $(trigger, "option:selected").val();
  var comb = combinations[key];

	var t = new Array();
	var o = new Array();

	for (var c=0; c<comb.length; c++)
    {
        var combc = comb[c];
		if (($.inArray(combc[indexOther], o) == -1) && (combc[indexTrigger] == selectedTriggerValue)) {
			o.push(combc[indexOther]);
		}

        if((typeof combc[indexTrigger] == undefined) || (combc[indexTrigger]==null))
            continue;

		if ($.inArray(comb[c][indexTrigger], t) == -1) {
			t.push(comb[c][indexTrigger]);
		}
	}

	layoutOptions(otherCombo, o, true);
	layoutOptions(trigger, t, false);
}


function updateComboDisabled(combo) {
	var opt = $(combo).find("option:selected");
	if (! opt.length) {
		opt = $(combo).find("option:first");
	}
	if (opt.hasClass('disabled')) {
		combo.addClass('disabled');
	} else {
		combo.removeClass('disabled');
	}
}

var currentURL=$(location).attr('href');
var beginInd = currentURL.indexOf('Tools')+6;
var restURL = currentURL.substring(beginInd, currentURL.length);
var endInd = restURL.indexOf('/');
var toolCat = restURL.substring(0,endInd);

function getRequiredSeqType() {
	var returnStr=$("#isSAM").val();//Is single, Align or Multi sequence
	var v_stype = document.getElementsByName("stype")[0];
	var e_stype = $("#context").val(); // for emboss protein or DNA/RNA
	//console.log ("v_stype = "+v_stype + ", e_stype = "+e_stype);
	var v_hiddenStype = $("#hiddenStype").val(); // required Sequence type code	
	
	if ("a" == returnStr || "p" == returnStr ) { // Aligned (a/b sequence requires tools like emboss 
		if ( "nucleotide" == $("#context").val() ) {
			returnStr+="d";
		} else {returnStr+="p";}
		//console.log("###Align : "+returnStr);
	} else if ("x" == returnStr ) { // SingleSequenceAlign with Protein & DNA like Genewise 
		returnStr="sx"; 
	} else if ("f" == returnStr ) { // Exceptions

		if ( typeof v_stype == 'undefined') { //infernal_cmscan, mapmi, emboss_cpgplot, newspgreport, isochore
			returnStr = v_hiddenStype;			
		} else { //fastm
			if ( v_stype.value == "dna" ) {
				returnStr ="ed";
			} else if ( v_stype.value == "rna" ) {
				returnStr ="er";
			} else if ( v_stype.value == "protein" ) {
				returnStr ="ep";
			} else {
				returnStr = v_hiddenStype;
			}
		} 
		
	} else { // Others like SSS, MSA, etc
		if ( typeof v_stype == 'undefined') {
			returnStr+="p";
			//console.log("Status : undefined");
		} else if ( v_stype.value == "dna" ) {
			returnStr+="d";
			//console.log("Status : DNA ");
		} else if ( v_stype.value == "rna" ) {
			returnStr+="r";
			//console.log("Status : RNA");
		} else {
			returnStr+="p";
			//console.log("Status : Protein ");
		}
	}
	//console.log ("return is " + "s"+returnStr);
	return "s"+returnStr;
}

function getSequenceSampleUrl() {
	var msa = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Multiple+Sequence+Alignment+Tool+Input+Examples";
	var psa = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Pairwise+Sequence+Alignment+Tool+Input+Examples";
	var pfa = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Protein+Functional+Analysis+Input+Examples";
	var rna = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/RNA+Analysis+Input+Examples";
	var sfc = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Sequence+Format+Conversion+%28SFC%29+Input+Examples";
	var so = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Sequence+Operations+%28SO%29+Input+Examples";
	var sss = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Sequence+Similarity+Search+%28SSS%29+Tool+Input+Examples";
	var st = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Sequence+Translation+%28ST%29+Input+examples";
	var phylogeny = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Phylogeny+Input+Examples";
	var emboss = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Pairwise+Sequence+Alignment+Tool+Input+Examples";
	var seqstats = "https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Sequence+Statistics+%28seqstats%29+Input+Examples";
	
	return eval(toolCat);	
}

var sequenceSingleProtein = ">sp|P35858|ALS_HUMAN Insulin-like growth factor-binding protein complex acid labile subunit OS=Homo sapiens GN=IGFALS PE=1 SV=1 \n";
	sequenceSingleProtein+= "MALRKGGLALALLLLSWVALGPRSLEGADPGTPGEAEGPACPAACVCSYDDDADELSVFC";
	sequenceSingleProtein+= "SSRNLTRLPDGVPGGTQALWLDGNNLSSVPPAAFQNLSSLGFLNLQGGQLGSLEPQALLG";
	sequenceSingleProtein+= "LENLCHLHLERNQLRSLALGTFAHTPALASLGLSNNRLSRLEDGLFEGLGSLWDLNLGWN";
	sequenceSingleProtein+= "SLAVLPDAAFRGLGSLRELVLAGNRLAYLQPALFSGLAELRELDLSRNALRAIKANVFVQ";
	sequenceSingleProtein+= "LPRLQKLYLDRNLIAAVAPGAFLGLKALRWLDLSHNRVAGLLEDTFPGLLGLRVLRLSHN";
	sequenceSingleProtein+= "AIASLRPRTFKDLHFLEELQLGHNRIRQLAERSFEGLGQLEVLTLDHNQLQEVKAGAFLG";
	sequenceSingleProtein+= "LTNVAVMNLSGNCLRNLPEQVFRGLGKLHSLHLEGSCLGRIRPHTFTGLSGLRRLFLKDN";
	sequenceSingleProtein+= "GLVGIEEQSLWGLAELLELDLTSNQLTHLPHRLFQGLGKLEYLLLSRNRLAELPADALGP";
	sequenceSingleProtein+= "LQRAFWLDVSHNRLEALPNSLLAPLGRLRYLSLRNNSLRTFTPQPPGLERLWLEGNPWDC";
	sequenceSingleProtein+= "GCPLKALRDFALQNPSAVPRFVQAICEGDDCQPPAYTYNNITCASPPEVVGLDLRDLSEA";
	sequenceSingleProtein+= "HFAPC";
var ssp = sequenceSingleProtein;
	
var sequenceSingleDNA = ">ENA|HZ245980|HZ245980.1 JP 2015518816-A/6284: MODIFIED POLYNUCLEOTIDES FOR THE PRODUCTION OF ONCOLOGY-RELATED PROTEINS AND PEPTIDES. \n" +
		"ATGCCCCCCTACACCGTGGTGTACTTCCCCGTGAGAGGCAGATGCGCCGCCCTGAGAATG" +
		"CTGCTGGCCGACCAGGGCCAGAGCTGGAAGGAGGAGGTGGTGACCGTGGAGACCTGGCAG" +
		"GAGGGCAGCCTGAAGGCCAGCTGCCTGTACGGCCAGCTGCCCAAGTTCCAGGACGGCGAC" +
		"CTGACCCTGTACCAGAGCAACACCATCCTGAGACACCTGGGCAGAACCCTGGGCCTGTAC" +
		"GGCAAGGACCAGCAGGAGGCCGCCCTGGTGGACATGGTGAACGACGGCGTGGAGGACCTG" +
		"AGATGCAAGTACATCAGCCTGATCTACACCAACTACGAGGCCGGCAAGGACGACTACGTG" +
		"AAGGCCCTGCCCGGCCAGCTGAAGCCCTTCGAGACCCTGCTGAGCCAGAACCAGGGCGGC" +
		"AAGACCTTCATCGTGGGCGACCAGATCAGCTTCGCCGACTACAACCTGCTGGACCTGCTG" +
		"CTGATCCACGAGGTGCTGGCCCCCGGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTAC" +
		"GTGGGCAGACTGAGCGCCAGACCCAAGCTGAAGGCCTTCCTGGCCAGCCCCGAGTACGTG" +
		"AACCTGCCCATCAACGGCAACGGCAAGCAGTAG ";
var ssd = sequenceSingleDNA;

var ssr = ">test1 \n" +
		"CCUCAGAAGAAAGAUGCCCCCUGCUCUGGCUGGUCAAACGG";

var sequenceProteinA = ">sp|P69905|HBA_HUMAN Hemoglobin subunit alpha OS=Homo sapiens GN=HBA1 PE=1 SV=2 \n" +
		"MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHG \n" +
		"KKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTP \n" +
		"AVHASLDKFLASVSTVLTSKYR  \n" ;
var sequenceProteinB = ">sp|P01942|HBA_MOUSE Hemoglobin subunit alpha OS=Mus musculus GN=Hba PE=1 SV=2 \n" +
		"MVLSGEDKSNIKAAWGKIGGHGAEYGAEALERMFASFPTTKTYFPHFDVSHGSAQVKGHG \n" +
		"KKVADALASAAGHLDDLPGALSALSDLHAHKLRVDPVNFKLLSHCLLVTLASHHPADFTP \n" +
		"AVHASLDKFLASVSTVLTSKYR \n";

var sequenceProteinC = ">sp|P13786|HBAZ_CAPHI Hemoglobin subunit zeta OS=Capra hircus GN=HBZ1 PE=3 SV=2 \n" +
		"MSLTRTERTIILSLWSKISTQADVIGTETLERLFSCYPQAKTYFPHFDLHSGSAQLRAHG \n" +
		"SKVVAAVGDAVKSIDNVTSALSKLSELHAYVLRVDPVNFKFLSHCLLVTLASHFPADFTA \n" +
		"DAHAAWDKFLSIVSGVLTEKYR \n";

var smp = sequenceProteinA + sequenceProteinB + sequenceProteinC;

var sequenceDNAA =">test1 \n" +
		"ATGAGTCTCTCTGATAAGGACAAGGCTGCTGTGAAAGCCCTATGG \n";
var sequenceDNAB =">test2 \n" +
		"CTGTCTCCTGCCGACAAGACCAACGTCAAGGCCGCCTGGGGTAAG \n";
var sequenceDNAC =">test3 \n"+
		"ACAAAAGCAACATCAAGGCTGCCTGGGGGAAGATTGGTGGCCATG \n";

var smd = sequenceDNAA + sequenceDNAB + sequenceDNAC;

var sequenceRNAA =">test1 \n" +
		"CCUCAGAAGA AAGAUGCCCC CUGCUCUGGC UGGUCAAACG G \n";
var sequenceRNAB =">test2 \n" +
		"CCUCAGAAGA AAGAUGCCCG CUGCUCUGGC UGGUCAAACG G \n";
var sequenceRNAC =">test3 \n"+
		"CCUCAGAAGAAAGAUGCCCUCUGCUCUGGCUGGUCAAACGG \n";

var smr = sequenceRNAA + sequenceRNAB + sequenceRNAC;

var sequenceAlignProtein = "CLUSTAL O(1.2.3) multiple sequence alignment\n" +
		"UniProt/Swiss-Prot|P26898|IL2RA_SHEEP      MEPSLLMWRFFVFIVVPGCVTEACHDDPPSLRNA----------MFKVLRYE----VGTM\n" +
		"UniProt/Swiss-Prot|P01590|IL2RA_MOUSE      MEPRLLMLGFLSLTIVPSCRAELCLYDPPEVPNA----------TFKALSYK----NGTI\n" +
		"UniProt/Swiss-Prot|P41690|IL2RA_FELCA      MEPSLLLWGILTFVVVHGHVTELCDENPPDIQHA----------TFKALTYK----TGTM\n" +
		"UniProt/Swiss-Prot|P01589|IL2RA_HUMAN      MDSYLLMWGLLTFIMVPGCQAELCDDDPPEIPHA----------TFKAMAYK----EGTM\n" +
		"UniProt/Swiss-Prot|Q5MNY4|IL2RA_MACMU      MDPYLLMWGLLTFITVPGCQAELCDDDPPKITHA----------TFKAVAYK----EGTM\n" +
		"UniProt/Swiss-Prot|Q95118|IL2RG_BOVIN      MLKPPLPLRSLLFLQLPLLGVGLNPKFLTPSGNEDIGGKPGTGGDFFLTSTPAGTLDVST\n" +
		"UniProt/Swiss-Prot|P40321|IL2RG_CANFA      MLKPPLPLRSLLFLQLSLLGVGLNSTVPMPNGNEDIT------PDFFLTATPSETLSVSS\n" +
		"UniProt/Swiss-Prot|P26896|IL2RB_RAT        MATVDLSWRLPLYILLLLLATT--------------------------------WVSAAV\n" +
		"UniProt/Swiss-Prot|Q8BZM1|GLMN_MOUSE       ------------------------------------------------------------\n" +
		"UniProt/Swiss-Prot|P36835|IL2_CAPHI        ------------------------------------------------------------\n" +
		"UniProt/Swiss-Prot|Q7JFM4|IL2_AOTVO        ------------------------------------------------------------\n" +
		"UniProt/Swiss-Prot|Q29416|IL2_CANFA        ------------------------------------------------------------\n" +
		" \n" +
		"UniProt/Swiss-Prot|P26898|IL2RA_SHEEP      INCDCKAGFRRVS---AVMRCVGDSSHSAWNNRCFCNSTSPAKNPV--------------\n" +
		"UniProt/Swiss-Prot|P01590|IL2RA_MOUSE      LNCECKRGFRRLKE-LVYMRCLGN----SWSSNCQCTSNSHDKS-R--------------\n" +
		"UniProt/Swiss-Prot|P41690|IL2RA_FELCA      LNCECKKGFRRISNGSAFMLCAGNSSHSSWENQCRCISTSPRAT-D--------------\n" +
		"UniProt/Swiss-Prot|P01589|IL2RA_HUMAN      LNCECKRGFRRIKSGSLYMLCTGNSSHSSWDNQCQCTSSATRNT-T--------------\n" +
		"UniProt/Swiss-Prot|Q5MNY4|IL2RA_MACMU      LNCECKRGFRRIKSGSPYMLCTGNSSHSSWDNQCQCTSSAARNT-T--------------\n" +
		"UniProt/Swiss-Prot|Q95118|IL2RG_BOVIN      LPLPKVQC---FVFNVEYMNCTWNSSSEPQPNNLTLHYGYRNFNGDDKLQECGHYLFS--\n" +
		"UniProt/Swiss-Prot|P40321|IL2RG_CANFA      LPLPEVQC---FVFNVEYMNCTWNSSSEPRPTNLTLHYWYKNSN-DDKVQECGHYLFS--\n" +
		"UniProt/Swiss-Prot|P26896|IL2RB_RAT        NDCSHLKC---FYNSRANVSCMWSPEEALNVTSCHIHAK-SDMRHWNKTCELTPVRQASW\n" +
		"UniProt/Swiss-Prot|Q8BZM1|GLMN_MOUSE       ---------------------MAVEELQSIIKRCQILEE-HDFKEEDF----GLFQLAGQ\n" +
		"UniProt/Swiss-Prot|P36835|IL2_CAPHI        ------------------------------------------------------------\n" +
		"UniProt/Swiss-Prot|Q7JFM4|IL2_AOTVO        ------------------------------------------------------------\n" +
		"UniProt/Swiss-Prot|Q29416|IL2_CANFA        ------------------------------------------------------------";

var sap = sequenceAlignProtein;

var sequenceAlignDNA = "CLUSTAL O(1.2.4) multiple sequence alignment\n" +
		"" +
		"ENA|BAA20512|BAA20512.1      ---------ATGAGTCTCTCTGATAAGGACAAGGCTGCTGTGAAAGCCCTATGGGCTAAG\n" +
		"ENA|CAA28435|CAA28435.1      ----ATGTCTCTGACCAGGACTGAGAGGACC--------------ATCATCCTGTCCCTG\n" +
		"ENA|CAA23748|CAA23748.1      ATGGTGCTGTCTCCTGCCGACAAGACCAACG----------------TC--AAGGCCGCC\n" +
		"ENA|CAA24095|CAA24095.1      ATGGTGCTCTCTGGGGAAGACAAAAGCAACA----------------TC--AAGGCTGCC\n" +
		"                                                         **                       * *\n" +
		"\n" +
		"ENA|BAA20512|BAA20512.1      ATCAGCCCCAAAGCCGATGATATCGGCGC---------TGAAGCTCTCGGCAGAATGCTG\n" +
		"ENA|CAA28435|CAA28435.1      TGGAGCAAGATCTCCACACAGGCAGACGTCATTGGCACCGAGACCCTGGAGAGGCTCTTC\n" +
		"ENA|CAA23748|CAA23748.1      TGGGGTAAGGTCGGCGCGCACGCTGGCGAGTATGGTGCGGAGGCCCTGGAGAGGATGTTC\n" +
		"ENA|CAA24095|CAA24095.1      TGGGGGAAGATTGGTGGCCATGGTGCTGAATATGGAGCTGAAGCCCTGGAAAGGATGTTT\n" +
		"                                 *              *    *  *           **  * ** *  **  *  *\n" +
		"\n" +
		"ENA|BAA20512|BAA20512.1      ACCGTCTACCCTCAGACCAAGACCTACTTCGCTCACTGGGATGACCTGAGCCCTGGGTCC\n" +
		"ENA|CAA28435|CAA28435.1      TCCTGCTACCCGCAGGCCAAGACCTACTTCCCGCACTTCG---ACCTGCACTCGGGCTCC\n" +
		"ENA|CAA23748|CAA23748.1      CTGTCCTTCCCCACCACCAAGACCTACTTCCCGCACTTCG---ACCTGAGCCACGGCTCT\n" +
		"ENA|CAA24095|CAA24095.1      GCTAGCTTCCCCACCACCAAGACCTACTTTCCTCACTTTG---ATGTAAGCCACGGCTCT\n" +
		"                                  ** ***     *************  * ****  *   *  *   *   ** **\n" +
		"\n" +
		"ENA|BAA20512|BAA20512.1      GGTCCTGTGAAGAAGCATGGCAAGGTTATCATGGGTGCAGTGGCCGATGCCGTTTCAAAA\n" +
		"ENA|CAA28435|CAA28435.1      GCGCAGCTGCGCGCGCACGGCTCCAAGGTGGTGGCCGCCGTGGGCGACGCGGTCAAGAGC\n" +
		"ENA|CAA23748|CAA23748.1      GCCCAAGTTAAGGGCCACGGCAAGAAGGTGGCCGACGCGCTGACCAACGCCGTGGCGCAC\n" +
		"ENA|CAA24095|CAA24095.1      GCCCAGGTCAAGGGTCACGGCAAGAAGGTCGCCGATGCGCTGGCCAGTGCTGCAGGCCAC\n" +
		"                             *  *   *       ** ***       *    *  **  **  *   ** *\n" +
		" \n" +
		"ENA|BAA20512|BAA20512.1      ATAGACGACCTTGTGGGAGGTCTGGCCTCCCTGAGCGAACTTCATGCTTCCAAGCTGCGT\n" +
		"ENA|CAA28435|CAA28435.1      ATCGACAACGTGACGAGCGCGCTGTCCAAGCTGAGCGAGCTGCACGCCTACGTGCTGCGC\n" +
		"ENA|CAA23748|CAA23748.1      GTGGACGACATGCCCAACGCGCTGTCCGCCCTGAGCGACCTGCACGCGCACAAGCTTCGG\n" +
		"ENA|CAA24095|CAA24095.1      CTCGATGACCTGCCCGGTGCCTTGTCTGCTCTGAGCGACCTGCATGCCCACAAGCTGCGT\n" +
		"                              * **  ** *       *   ** *    ******** ** ** **   *  *** **\n" +
		" \n" +
		"ENA|BAA20512|BAA20512.1      GTTGACCCGGCCAACTTCAAGATCCTCGCACACAATGTCATCGTGGTCATCGGCATGCTC\n" +
		"ENA|CAA28435|CAA28435.1      GTGGACCCGGTCAACTTCAAGTTCCTGTCCCACTGCCTGCTGGTCACGTTGGCCTCGCAC\n" +
		"ENA|CAA23748|CAA23748.1      GTGGACCCGGTCAACTTCAAGCTCCTAAGCCACTGCCTGCTGGTGACCCTGGCCGCCCAC\n" +
		"ENA|CAA24095|CAA24095.1      GTGGATCCCGTCAACTTCAAGCTCCTGAGCCACTGCCTGCTGGTGACCTTGGCTAGCCAC\n" +
		"                             ** ** ** * ********** ****    ***    *  * **     * *     * *\n" +
		" \n" +
		"ENA|BAA20512|BAA20512.1      TTCCCTGGAGACTTCCCCCCAGAGGTTCACATGTCAGTTGACAAGTTTTTCCAGAACTTG\n" +
		"ENA|CAA28435|CAA28435.1      TTCCCCGCCGACTTCACGGCCGACGCGCACGCCGCCTGGGACAAGTTCCTGTCCATCGTG\n" +
		"ENA|CAA23748|CAA23748.1      CTCCCCGCCGAGTTCACCCCTGCGGTGCACGCTTCCCTGGACAAGTTCCTGGCTTCTGTG\n" +
		"ENA|CAA24095|CAA24095.1      CACCCTGCCGATTTCACCCCCGCGGTACATGCCTCTCTGGACAAATTCCTTGCCTCTGTG\n" +
		"                               *** *  ** *** *  * *  *  **     *    ***** **  *        **\n" +
		" \n" +
		"ENA|BAA20512|BAA20512.1      GCTCTGGCTCTCTCTGAGAAGTACCGCTAA\n" +
		"ENA|CAA28435|CAA28435.1      TCCGGCGTCCTGACGGAGAAGTACCGCTGA\n" +
		"ENA|CAA23748|CAA23748.1      AGCACCGTGCTGACCTCCAAATACCGTTAA\n" +
		"ENA|CAA24095|CAA24095.1      AGCACCGTGCTGACCTCCAAGTACCGTTAA\n" +
		"                                   *  **  *    ** ***** * *";

var sad = sequenceAlignDNA;

var sep = ">P00001 \n" +
		"MPPYTVVY, \n" +
		"VETWQEGSLK, \n" +
		"YGQLPKFQDGD, \n" +
		"VEDLRCKYI, \n" +
		"GCLDAFPLLSAY, \n"+
		"GCLDAFPLLSAY, \n"+
		"VGRLSARPKLKAFL ";

var sed = ">P00001 \n" +
		"ATGCCCCCCTACACCGTGGTGTAC, \n" +
		"GTGGAGACCTGGCAGGAGGGCAGCCTGAAG, \n" +
		"TACGGCCAGCTGCCCAAGTTCCAGGACGGCGAC, \n" +
		"GTGGAGGACCTGAGGTGCAAGTACATC, \n" +
		"GACTACAACCTGCTGGACCTGCTGCTGATCCACGAGGTGCTGGCCCCC, \n" +
		"GGCTGCCTGGACGCCTTCCCCCTGCTGAGCGCCTAC, \n" +
		"GTGGGCAGGCTGAGCGCCAGGCCCAAGCTGAAGGCCTTCCTG";

var ser = ">P00001 \n" +
		"CCUCAGAAGA, \n" +
		"AAGAUGCCCC, \n" +
		"CUGCUCUGGC, \n" +
		"UGGUCAAACG";
