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
var context;

if (this.$ != null)
{

  dwr_init();//make sure dwr javascript files were loaded

  $(document).ready(function() {
  	// Load databaseBox
	makeDatabaseBox('ul#database');
	
  	var programCombo = $("select[name='program']");
    var context = $("input[name='context']").val();
  	var inputTypeCombo = $("select[name='stype']");
  	var matrixCombo = $("select[name='matrix']");
  	var matchCombo = $("select[name='match_scores']");
  	var gapOpenCombo = $("select[name='gapopen']");
    var gapExtendCombo = $("select[name='gapext']");
    var translTableCombo = $("select[name='transltable']");


  	handleCombination("ncbiblast", "programInputContextCombinations", function(combinations) {
      	inputTypeCombo.change(function() {
      		updateDoubleSelectOptions(context, inputTypeCombo, 1, programCombo, 0, combinations);
      		updateTranslTableOptionsByProgram($(programCombo, "option:selected").val());
      		updateCompStatsOptionsByProgram($(programCombo, "option:selected").val());
      	}).trigger('change');
      	programCombo.change(function() {
      		updateDoubleSelectOptions(context, programCombo, 0, inputTypeCombo, 1, combinations);
      		updateTranslTableOptionsByProgram($(programCombo, "option:selected").val());
      		updateCompStatsOptionsByProgram($(programCombo, "option:selected").val());
      	});
  	});

	handleCombination("ncbiblast", "programTranslationTableCombinations", function(combinations) {
  		programCombo.change(function() {
			updateSingleSelectOptions(programCombo.val(), translTableCombo, combinations);
		}).trigger('change');
		programCombo.change(function() {
			updateSingleSelectOptions(programCombo.val(), translTableCombo, combinations);
		});
		translTableCombo.change(function() {
			updateComboDisabled($(this));
		});
  	});

	$('#task').change(function() {
  		var value = $('option:selected', this).val();
  		if (value == 'megablast') {
  			selectListOption($("select[name='gapopen']"), 0);
  			selectListOption($("select[name='gapext']"), 0);
			$('#wordsize').val("28");
  		} else if (matchCombo.length > 0 && value == "blastn") {
  			handleCombination("ncbiblast", "substitutions_scores", function(combinations) {
  				matchCombo.change(function() {
  		      		selectDefaultOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      		updateDoubleSelectOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	}).trigger("change");
  				gapOpenCombo.change(function() {
  		      		updateDoubleSelectOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	});
  				gapExtendCombo.change(function() {
  		      		updateDoubleSelectOptions(matchCombo.val(), gapExtendCombo, 1, gapOpenCombo, 0, combinations);
  		      	});
  		  	});
			$('#wordsize').val("11");
  		}
	}).change();
	
	$('#program').change(function() {
  		var value = $('option:selected', this).val();
  		updateScoreMatrixOptionsByProgram(value);
  		updateTranslTableOptionsByProgram(value);
  		updateCompStatsOptionsByProgram(value);
  		
  		if (matrixCombo.length > 0 && value != "blastn" ) {
  			handleCombination("ncbiblast", "matrixCombinations", function(combinations) {
				$('#matrix').val("BLOSUM62");
  				matrixCombo.change(function() {
  		      		selectDefaultOptions(matrixCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      		updateDoubleSelectOptions(matrixCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	}).trigger("change");
  				gapOpenCombo.change(function() {
  		      		updateDoubleSelectOptions(matrixCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	});
  				gapExtendCombo.change(function() {
  		      		updateDoubleSelectOptions(matrixCombo.val(), gapExtendCombo, 1, gapOpenCombo, 0, combinations);
  		      	});
  		  	});
  		} 
  		if (matchCombo.length > 0 && value == "blastn") {
  			handleCombination("ncbiblast", "substitutions_scores", function(combinations) {
				$('#matrix').val("NONE");
  				matchCombo.change(function() {
  		      		selectDefaultOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      		updateDoubleSelectOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	}).trigger("change");
  				gapOpenCombo.change(function() {
  		      		updateDoubleSelectOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	});
  				gapExtendCombo.change(function() {
  		      		updateDoubleSelectOptions(matchCombo.val(), gapExtendCombo, 1, gapOpenCombo, 0, combinations);
  		      	});
  		  	});
  		}
  		
  	}).change();
	
	$('#stype').change(function() {
  		var value = $('option:selected', this).val();
  		updateScoreMatrixOptionsByStype(value);
  		
  		if (matrixCombo.length > 0 && value == "protein" && $('option:selected', '#program').val() == 'blastn' ) {
  			handleCombination("ncbiblast", "matrixCombinations", function(combinations) {
  				matrixCombo.change(function() {
  		      		selectDefaultOptions(matrixCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      		updateDoubleSelectOptions(matrixCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	}).trigger("change");
  				gapOpenCombo.change(function() {
  		      		updateDoubleSelectOptions(matrixCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	});
  				gapExtendCombo.change(function() {
  		      		updateDoubleSelectOptions(matrixCombo.val(), gapExtendCombo, 1, gapOpenCombo, 0, combinations);
  		      	});
  		  	});
  		} 
  		if (matchCombo.length > 0 && value == "dna" && $('option:selected', '#program').val() == 'tblastn') {
  			handleCombination("ncbiblast", "substitutions_scores", function(combinations) {
  				matchCombo.change(function() {
  		      		selectDefaultOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      		updateDoubleSelectOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	}).trigger("change");
  				gapOpenCombo.change(function() {
  		      		updateDoubleSelectOptions(matchCombo.val(), gapOpenCombo, 0, gapExtendCombo, 1, combinations);
  		      	});
  				gapExtendCombo.change(function() {
  		      		updateDoubleSelectOptions(matchCombo.val(), gapExtendCombo, 1, gapOpenCombo, 0, combinations);
  		      	});
  		  	});
  		}
  		
  	}).change();
	
  });
}


function updateScoreMatrixOptionsByProgram(value) {
	if (value == 'blastn') {
		$('#match_scores').parents('li:first').show();
		$('#matrix').parents('li:first').hide();
	} else  {
		$('#matrix').parents('li:first').show();
		$('#match_scores').parents('li:first').hide();
	} 
}

function updateTranslTableOptionsByProgram(value) {
	if (value == 'blastx' || value == 'tblastx') {
		$('#transltable').parents('li:first').show();
	} else  {
		$('#transltable').parents('li:first').hide();
	} 
}

function updateCompStatsOptionsByProgram(value) {
	if (value == 'blastp' || value == 'blastx' || value == 'tblastn') {
		$('#compstats').parents('li:first').show();
	} else  {
		$('#compstats').parents('li:first').hide();
	} 
}

function updateScoreMatrixOptionsByStype(value) {
	if (value == 'dna' && $('option:selected', '#program').val() == 'tblastn') {
		$('#match_scores').parents('li:first').show();
		$('#matrix').parents('li:first').hide();
	} else if (value == 'protein' &&  $('option:selected', '#program').val() == 'blastn' ) {
		$('#matrix').parents('li:first').show();
		$('#match_scores').parents('li:first').hide();
	} 
}
