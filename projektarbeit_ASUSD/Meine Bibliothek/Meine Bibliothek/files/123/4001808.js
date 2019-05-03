(function($) {
	var mainContent = $("#maincontent");
	var sidebar = $("#sidebar_tabular");
	var col_css = $('#faceted_search .facet_cont:visible').length > 0 ? 'seven_col'
			: 'twelve_col';

	function refreshSViewer() {
		try {
			/*
			if (typeof SeqView !== 'undefined'
					&& typeof SeqView.App !== 'undefined'
					&& typeof SeqView.App.findAppByIndex === 'function') { */
				var svApp = SeqView.App.findAppByIndex(0);
				svApp.reloadAllViews();
			/*}*/
		} catch (e) {
			console.log('Error: ' + e);
		}

	}

	$("#sidecontent_1_pullout").click(function() {
		mainContent.toggleClass("ten_col").toggleClass(col_css);
		sidebar.toggle();
		$("#sidecontent_1_pullout").toggle();
		refreshSViewer();
	});

	$("#sidecontent_2_pullout").click(function(e) {
		mainContent.toggleClass("ten_col").toggleClass(col_css);
		sidebar.toggle();
		$("#sidecontent_1_pullout").toggle();
		e.preventDefault();
		refreshSViewer();
	});

})(jQuery);
;
jQuery(function () {
    
    (function ($) {
        
        var GenomicRegion = {
            
            init: function () {
                this.bindEvents();
            },
            
            bindEvents: function () {
                this.bindGenomicRegionSectionTogglerEvent();
                this.refreshNCBIGridWhenTogglerIsOpen();
            },
            
            // display:none can cause sviewer to not loaded properly
            // so refresh it when it is not loaded
            bindGenomicRegionSectionTogglerEvent: function () {
                
                var $genomicRegionTG = $('#genomic-regions-transcripts-products').find('a.jig-ncbitoggler');
                
                $genomicRegionTG.on('ncbitoggleropen', function (evt) {
                    
                    var $this = $(this);
                    
                    if (typeof $this.attr('data-already-load-sv') === 'undefined' &&
                    $this.is('.ui-ncbitoggler-open')) {
                        
                        var accession = '';
                        if ($('#accessionList :selected').length) {
                            accession = $('#accessionList :selected').val();
                        } else {
                            accession = $('#single-gen-accession').attr('data-accession');                            
                        }
                        
                        refreshSViewer(accession);
                        
                        $this.attr('data-already-load-sv', 'true');
                        console.log('refresh sv');
                    }
                });
            },
            
            refreshNCBIGridWhenTogglerIsOpen: function () {
                var $togglers = $('.rprt-section .rprt-section-header').find('a.jig-ncbitoggler');
                
                if ($togglers.length) {
                    
                    $togglers.on('ncbitoggleropen', function (evt) {
                        var $rprtSection = $(this).parents('div.rprt-section');
                        var $grids = $rprtSection.find ('table.jig-ncbigrid');
                        
                        if ($grids.length && typeof $grids.data('initialized') !== true) {
                            $grids.trigger("ncbigridupdated");
                            $grids.data('initialized', true);
                        } 
                        
                        if ($rprtSection.hasClass('gene-gene-expression') && $rprtSection.data('initialized') !== true){
                            $rprtSection.data('initialized', true);
                            var $ge = $('#gene-expression-app');
                            if ($ge.length){
                                geneExpression.detailPage.init();                                
                                $ge.find('#project-selector').off('change');
                            }
                        }
                        
                        /* 
                        var $serverGrids = $('._jig-ncbiservergrid');
                        if ($serverGrids.length && typeof $serverGrids.data('initialized') !== true) {
                            $serverGrids.removeClass('_jig-ncbiservergrid').addClass('jig-ncbiservergrid');   
                            $serverGrids.ncbiservergrid();
                            $grids.data('initialized', true) ;
                        } 
                         * */

                    });
                }
            }
        };
        
        GenomicRegion.init();
        
        // GRT-2746
        if ($('#faceted_search').is(":hidden")) {
            $('body').addClass('gene-no-facet-sidebar');
        }
    })(jQuery);
});


function refreshSViewer (accession) {
    
    try {
        var svApp = SeqView.App.findAppByIndex(0);
        if (svApp) {
        
            console.log(accession);
            accession = accession.replace(/\./g, '_');            
            console.log(accession);
            
            var relString = jQuery('input#relString_' + accession).val().replace(/&amp;/g, '&');            
            console.log(relString);
            
            // update
            if (relString !== '') {
                svApp.reload(relString);
            }
        }
    }
    catch (e) {
        if (console && console.log) {
            console.log('Error: ' + e);
        }
    }
}
// end refresh sviewer
;
jQuery(function(){
    jQuery('#rss_createfeed').bind('click',createRssFeed);
    function createRssFeed (e){
        e.preventDefault();
        var oThis = jQuery(this);
	   	var args = {
            'QueryKey': oThis.data('qk'),
            'Db': oThis.data('db'),
            'RssFeedName': jQuery('#rss_name').val(),
            'RssFeedLimit': jQuery('#rss_results').val(),
            'HID': oThis.data('hid')
        };
        Portal.$send('CreateRssFeed',args);
    }  
});

;
(function($){

    $(function() {    

        var theSearchInput = $("#term");
        var originalTerm = $.trim(theSearchInput.val());
        var theForm = jQuery("form").has(theSearchInput);
        var dbNode = theForm.find("#database");
        var currDb = dbNode.val();
        var sbConfig = {};
        try{
            sbConfig = eval("({" + theSearchInput.data("sbconfig") + "})");
        }catch(e){}
        var defaultSubmit =  sbConfig.ds == "yes";
        var searched = false;
        var dbChanged = null; //since db.change is triggered as a work around for JSL-2067 
        var searchModified = false; //this is used to allow searching when something esle changed on the page with out the term changing
    
        if(!$.ncbi)
            $.extend($,{ncbi:{}});
        if(!$.ncbi.searchbar)
            $.extend($.ncbi,{searchbar:{}});
            
        $.extend($.ncbi.searchbar,
            (function(){
                //*****************private ******************/
               function doSearchPing() {
                   try{
                    var cVals = ncbi.sg.getInstance()._cachedVals;
                    var searchDetails = {}
                    searchDetails["jsEvent"] = "search";
                    var app = cVals["ncbi_app"];
                    var db = cVals["ncbi_db"];
                    var pd = cVals["ncbi_pdid"];
                    var pc = cVals["ncbi_pcid"];
                    var sel = dbNode[0];
                    var searchDB = sel.options[sel.selectedIndex].value;
                    var searchText = theSearchInput[0].value;
                    if( app ){ searchDetails["ncbi_app"] = app.value; }
                    if( db ){ searchDetails["ncbi_db"] = db.value; }
                    if( pd ){ searchDetails["ncbi_pdid"] = pd.value; }
                    if( pc ){ searchDetails["ncbi_pcid"] = pc.value; }
                    if( searchDB ){ searchDetails["searchdb"] = searchDB;}
                    if( searchText ){ searchDetails["searchtext"] = searchText;}
                    ncbi.sg.ping( searchDetails );
                   }catch(e){
                       console.log(e);
                   }
                }
                function getSearchUrl(term){
                    var url = "";
                    if (typeof(NCBISearchBar_customSearchUrl) == "function") 
                            url = NCBISearchBar_customSearchUrl();
                    if (!url) {
                        var searchURI = dbNode.find("option:selected").data("search_uri");
                        url = searchURI ?  searchURI.replace('$',term) : 
                             "/" + dbNode.val() + "/" + ( term !="" ? "?term=" + term : "");
                        }
                    return url;
                }
            
                return {
                    //*****************exposed attributes and functions ******************/
                    'theSearchInput':theSearchInput,
                    'theForm':theForm,
                    'dbNode':dbNode,
                    'searched':searched,
                    'setSearchModified':function() { searchModified = true; },
                    'setSearchUnmodified':function() { searchModified = false; },
                    'searchModified':function(){return searchModified;},
                    'doSearch':function(e){
                           e.stopPropagation();
                           e.preventDefault();
                           //checking for the searched flag is necessary because the autocompelete control fires on enter key, the form submit also fires on enter key
                           if(searched == false){
                               searched = true;
                               theForm.find('input[type="hidden"][name^="p$"]').attr('disabled', 'disabled');
                               //$("input[name]").not(jQuery(".search_form *")).attr('disabled', 'disabled');
                               if (defaultSubmit)
                                   $.ncbi.searchbar.doSearchPing();
                               else {
                                   var term = $.trim(theSearchInput.val());
                                   if (dbChanged || searchModified || term !== originalTerm){
                                       $.ncbi.searchbar.doSearchPing();
                                       var searchUrl = $.ncbi.searchbar.getSearchUrl(encodeURIComponent(term).replace(/%20/g,'+'));
                                       var doPost = (term.length  > 2000) ? true : false; 
                                       if (doPost){
                                           if (e.data.usepjs){
                                               Portal.$send('PostFrom',{"theForm":theForm,"term":term,"targetUrl":searchUrl.replace(/\?.*/,'')});
                                           }
                                           else{
                                               theForm.attr('action',searchUrl.replace(/\?.*/,''));
                                               theForm.attr('method','post');
                                           }
                                       }
                                       else {
                                           window.location = searchUrl;
                                       }
                                   }
                                   else{ //if (term !== originalTerm){
                                       searched = false;
                                   }
                               }
                           }
                    },
                    'onDbChange':function(e){
                         if (dbChanged === null)
                             dbChanged = false;
                         else
                             dbChanged = true;
                         var optionSel = $(e.target).find("option:selected");
                         var dict = optionSel.data("ac_dict");
                         if (dict){
                             //theSearchInput.ncbiautocomplete("option","isEnabled",true).ncbiautocomplete("option","dictionary",dict);
                             theSearchInput.ncbiautocomplete().ncbiautocomplete({
                                    isEnabled: true,
                                    dictionary: dict
                                });
                             theSearchInput.attr("title","Search " + optionSel.text() + ". Use up and down arrows to choose an item from the autocomplete.");
                         }
                         else{
                           theSearchInput.ncbiautocomplete().ncbiautocomplete("turnOff",true);
                           theSearchInput.attr("title", "Search " + optionSel.text());
                         }
                         if (defaultSubmit)
                            theForm.attr('action','/' + dbNode.val() + '/');  
                    },
                    'doSearchPing':function(){
                        doSearchPing();
                    },
                    'getSearchUrl':function(term){
                        return getSearchUrl(term);
                    }
                    
                };//end of return 
             })() //end of the self executing anon
        );//end of $.extend($.ncbi.searchbar
    
         function initSearchBar(usepjs){
            //enable the controls for the back button
            theForm.find('input[type="hidden"][name^="p$"]').removeAttr('disabled');
             if (usepjs)
                 portalSearchBar();
         }
         
        
    
        function portalSearchBar(){
            
            Portal.Portlet.NcbiSearchBar = Portal.Portlet.extend ({
                init:function(path,name,notifier){
                    this.base (path, name, notifier);
                },
                send:{
                    "Cmd":null,
                    "Term":null
                },
                "listen":{
                    "PostFrom":function(sMessage,oData,sSrc){
                        this.postForm(oData.theForm,oData.term,oData.targetUrl);
                    }
                },
                "postForm":function(theForm,term,targetUrl){
                       //console.log('targetUrl = ' + targetUrl);
                       theForm.attr('action',targetUrl);
                       theForm.attr('method','post');
                       this.send.Cmd({
                            'cmd' : 'Go'
                        });
                           this.send.Term({
                            'term' : term
                        });
                        Portal.requestSubmit();
                },
                'getPortletPath':function(){
                    return this.realpath + '.Entrez_SearchBar';
                }
            });
    
        }//portalSearchBar
        


         //portal javascript is required to make a POST when the rest of the app uses portal forms 
         var usepjs = sbConfig.pjs == "yes"; 
         //console.log('sbConfig',sbConfig);
         initSearchBar(usepjs);
         
         dbNode.on("change",$.ncbi.searchbar.onDbChange);
        
        theForm.on("submit",{'usepjs':usepjs},$.ncbi.searchbar.doSearch);
        theSearchInput.on("ncbiautocompleteenter ncbiautocompleteoptionclick", function(){theForm.submit();});
        //a work around for JSL-2067
        dbNode.trigger("change");
        //iOS 8.02 changed behavior on autofocus, should probably check other mobile devices too
        if (sbConfig.afs == "yes" && !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) ){ 
            window.setTimeout(function(){
                try{
                	var x = window.scrollX, y = window.scrollY; // EZ-8676
                	
                    var size= originalTerm.length;
                    if (size == 0 || /\s$/.test(originalTerm))
                        theSearchInput.focus()[0].setSelectionRange(size, size);
                    else
                        theSearchInput.focus().val(originalTerm + " ")[0].setSelectionRange(size+1, size+1);
                        
                    window.scrollTo(x, y);
                }
                catch(e){} //setSelectionRange not defined in IE8
            },1);
        }
        
        //set the query changed flag true after a few seconds, still prevents scripted clicking or stuck enter key
        window.setTimeout(function(){$.ncbi.searchbar.setSearchModified();},2000);
         
     });//End of DOM Ready

})(jQuery);

/*
a call back for the 'Turn off' link at the bottom of the auto complete list
*/
function NcbiSearchBarAutoComplCtrl(){
    jQuery("#term").ncbiautocomplete("turnOff",true);
    if (typeof(NcbiSearchBarSaveAutoCompState) == 'function')
        NcbiSearchBarSaveAutoCompState();
 }

 



;
jQuery(function () {
    Portal.Portlet.Entrez_SearchBar = Portal.Portlet.NcbiSearchBar.extend ({
        init:function(path,name,notifier){
            this.base (path, name, notifier);
            var oThis = this;
            jQuery("#database").on("change", function(){
                oThis.send.DbChanged({'db' : this.value});
            });
        },
        send:{
            "Cmd":null,
            "Term":null,
            "DbChanged":null
        },
        'listen':{
            "PostFrom":function(sMessage,oData,sSrc){
        	    this.postForm(oData.theForm,oData.term,oData.targetUrl);
        	    },
            "ChangeAutoCompleteState": function(sMessage, oData, sSrc) {
        	    this.ChangeAutoCompleteState(sMessage, oData, sSrc);
                },
            'CreateRssFeed':function(sMessage,oData,sSrc){
                this.createRssFeed(sMessage,oData,sSrc);
            },
            'AppendTerm': function(sMessage, oData, sSrc) {
    		    this.ProcessAppendTerm(sMessage, oData, sSrc);
    		},
    		// to allow any other portlet to clear term if needed  
    		'ClearSearchBarTerm': function(sMessage, oData, sSrc) {
    			jQuery("#term").val("");
    		},
    		// request current search bar term to be broadcast  
    		'SendSearchBarTerm': function(sMessage, oData, sSrc) {
    			this.send.Term({'term' : jQuery("#term").val()});
    		}
        },
        'createRssFeed':function(sMessage,oData,sSrc){
            
            var site = document.forms[0]['p$st'].value;
    	   	var portletPath = this.getPortletPath();
    	   	
            try{
                var resp = xmlHttpCall(site, portletPath, 'CreateRssFeed', oData, receiveRss, {}, this);
            }
            catch (err){
                alert ('Could not create RSS feed.');
            }
            function receiveRss(responseObject, userArgs) {
        	    try{
            	    //Handle timeouts 
            	    if(responseObject.status == 408){
            	        //display an error indicating a server timeout
            	        alert('RSS feed creation timed out.');
            	    }
            	    
            	    // deserialize the string with the JSON object 
            	    var response = '(' + responseObject.responseText + ')'; 
            	    var JSONobject = eval(response);
            	    // display link to feed
            	    jQuery('#rss_menu').html(JSONobject.Output,true);
            	    //jQuery('#rss_dropdown a.jig-ncbipopper').trigger('click');
            	    jQuery('#rss_dropdown a.jig-ncbipopper').ncbipopper('open');
            	    //document.getElementById('rss_menu').innerHTML = JSONobject.Output;
                }
                catch(e){
                    alert('RSS unavailable.');
                }
            }
                
        },
        'getPortletPath':function(){
            return this.realpath + '.Entrez_SearchBar';
        },
        "ChangeAutoCompleteState": function(sMessage, oData, sSrc){
            var site = document.forms[0]['p$st'].value;
            var resp = xmlHttpCall(site, this.getPortletPath(), "ChangeAutoCompleteState", {"ShowAutoComplete": 'false'}, function(){}, {}, this);
        },
        "ProcessAppendTerm" : function(sMessage, oData, sSrc){
            var theInput = jQuery("#term");
    	    var newTerm = theInput.val();
    	    if (newTerm != '' && oData.op != ''){
    	        newTerm = '(' + newTerm + ') ' + oData.op + ' ';
    	    }
    	    newTerm += oData.term;
    	    theInput.val(newTerm); 
    	    
    	    theInput.focus();
    	}
    }); //end of Portlet.extend
}); //end of jQuery ready

function NcbiSearchBarSaveAutoCompState(){
    Portal.$send('ChangeAutoCompleteState');
}


;
jQuery(function () {
Portal.Portlet.Gene_SearchBar = Portal.Portlet.Entrez_SearchBar.extend ({
	init: function (path, name, notifier) {
		this.base (path, name, notifier);
	}
});
});
;
Portal.Portlet.Entrez_Facets = Portal.Portlet.extend ({
  
	init: function (path, name, notifier) 
	{ 
		this.base (path, name, notifier);
		var jFacetObj = jQuery(".facet_cont");
		if (jFacetObj[0]){
    		jFacetObj.find('.facet a').live('click',{'thisObj':this},this.filterClicked);
    		jFacetObj.find('.facet_more_apply').live('click',{'thisObj':this},this.facetMoreApplyClicked);
    		jFacetObj.find('.facet_tools a.jig-ncbipopper').bind('ncbipopperopen',{'thisObj':this},this.onMoreFilterGroups);
    		jFacetObj.find('#filter_groups_apply').bind('click',{'thisObj':this},this.filterGroupsApplyClicked);
    		jFacetObj.find('.btn_date_apply').live('click',{'thisObj':this},this.dateRangeApplyClicked);
    		jFacetObj.find('.btn_date_clear').live('click',{'thisObj':this},this.dateRangeClearClicked);
    		jFacetObj.find('.btn_range_apply').live('click',{'thisObj':this},this.rangeApplyClicked);
    		jFacetObj.find('.btn_range_clear').live('click',{'thisObj':this},this.rangeClearClicked);
    		jFacetObj.find('#facet_fields_apply').live('click',{'thisObj':this},this.facetFieldsApplyClicked);
    		
    		jFacetObj.find('.facet .more a').live('ncbipopperopen',{'thisObj':this},this.onMoreFiltersOpen);
    		jFacetObj.find('.facets_dialog').live('keypress',{'thisObj':this},this.facetDialogKeyPress);
    		jFacetObj.find('.input_date_ym').live('blur',this.autoFillDateInputs);
    		jQuery('#reset_from_message_res').live('click',{'thisObj':this},this.resetFromMessageRes);
    		
    		this.DefaultShownFacetGroups = jFacetObj.data('default_grps').split(',');
    		
    		jFacetObj.find("input[type=checkbox]").live("change",function(e){
    		   ncbi.sg.ping( this, e, "additionalFilters", { "action" : this.checked ? "checked" : "unchecked" } );
    		});
    		
    		jFacetObj.find(".of_sel_inp").live("ncbiautocompleteoptionclick", //ncbiautocompleteenter results in multiple events
    		    {'thisObj':this},this.openFieldSelected).live("keypress",{'thisObj':this},this.openFieldKeyPress);  
    		jFacetObj.find("ul.facet li.of_sel button.of_add").live("click",{'thisObj':this},this.openFieldAddClicked);
    		jFacetObj.find(".of_sel_inp").live("keyup ncbiautocompleteoptionclick input",{'thisObj':this},this.openFieldChanged);
    		
    		this.jFacetObj = jFacetObj;
    	}
		
		jQuery('#reset_from_message').on('click',{'thisObj':this},this.resetFromMessage);
		
	},
	'send':{
	    'Cmd':null,
	    'SendSearchBarTerm': null,
	    'SetTimelineFilter':null,
	    'QueryKey':null,
	    'LinkName':null,
	    'IdsFromResult':null
	},
	'listen':{
	    'FacetFilterSet':function(sMessage,oData,sSrc){
		    this.handleFacetFilterSet(oData.FacetsUrlFrag,oData.BMFacets);
		},
		'FacetFiltersCleared':function(sMessage,oData,sSrc){
		    this.handleFacetFiltersCleared();
		}
	},
	'DefaultShownFacetGroups':[],
	'jFacetObj':null,
	'filterClicked':function(e){
	    e.preventDefault();
	    var oThis = jQuery(this);
	    var facetUl = oThis.closest("ul.facet");
	    var filter_id = facetUl.data('filter_id'),value_id = oThis.data('value_id');
	    var check_on = ! oThis.parent().hasClass("selected");
	    if (value_id == 'reset'  )
	        Portal.$send('FacetFilterSet',{'FacetsUrlFrag': 'fcl=all'});
	    else if (value_id == 'fetch_more'  ){
	        if (!oThis.hasClass("jig-ncbipopper"))
	            e.data.thisObj.FetchMoreOptions(filter_id,oThis);
	    }
	    else if (value_id == 'fetch_more_exp')
	        e.data.thisObj.ShowAllFacetsToggle(e);
	    else if (filter_id == 'field_search' ){
	        if (!oThis.hasClass("jig-ncbipopper"))
	            e.data.thisObj.removeFieldSelection();
	    }
	    else if (oThis.parent().hasClass('of_sel'))
	        return;
	    else if (facetUl.data('of')=='yes' && oThis.parent().hasClass('of_fil_val')){
	        if (check_on)
	            e.data.thisObj.applyOpenField(oThis,filter_id);
	        else
	            e.data.thisObj.removeOpenField(oThis,filter_id);
	    }
	    else if (facetUl.data('of')=='yes' && !oThis.parent().hasClass('fil_val'))
	        e.data.thisObj.removeOpenField(oThis,filter_id);
	        
	    else if (facetUl.data('ss')=='yes')
	        e.data.thisObj.handleFilterSelection({'filterId':filter_id.toString(),'valueId':value_id.toString(),'checkOn':check_on,'replaceAll':true});
	    else if ((filter_id || value_id) && !oThis.hasClass("jig-ncbipopper") && !oThis.hasClass("facet_more_cancel") )
    	    e.data.thisObj.handleFilterSelection({'filterId':filter_id.toString(),'valueId':value_id.toString(),'checkOn':check_on,
    	        'dateSearch':facetUl.data('ds')=='yes','rangeSearch':facetUl.data('rs')=='yes'});
    	
        
	},
    'handleFilterSelection':function(opts){
	    var defOpts = {'filterId':undefined,'valueId':undefined,'checkOn':undefined,'replaceAll':undefined,'dateSearch':undefined,'rangeSearch':undefined};
	    opts = jQuery.extend(defOpts,opts);
	    
	    //when replaceAll is true, all values in that filter group are replaced, used for single select groups
	    //valueId == ''  means clear that group 
	    //var currFilterString = window.location.search.match(/filters=([^&]*)/);
	    var currFilterString = this.getValue('FacetsUrlFrag').match(/filters=([^&]*)/);
	    //var currFilterVals = currFilterString && currFilterString[1] ? currFilterString[1].split(';') : [];
	    var currFilterVals = currFilterString ? currFilterString[1].split(';') : [];
	    var possibleVals = [];
	    var facetGrpUl = this.jFacetObj.find('ul[data-filter_id = "' + opts.filterId + '"]');
	    facetGrpUl.find('li.fil_val a').each(function(){
	        var possIdVal = jQuery(this).data('value_id');
	        if (possIdVal)
	            possibleVals.push(possIdVal.toString());
	        });
	    currFilterVals = this.customFilterRead(currFilterVals,possibleVals,opts.filterId,opts.dateSearch,opts.rangeSearch);
	    
	    function removeValues(valuesArr) {
	        jQuery(valuesArr).each(function(ind,val){
	            var indexInCurr = jQuery.inArray(val,currFilterVals);
	            if (indexInCurr != -1)
	                 currFilterVals.splice(indexInCurr,1);
	        });
	    }
	    function addValues(valuesArr) {
	        jQuery(valuesArr).each(function(ind,val){
	             var indexInCurr = jQuery.inArray(val,currFilterVals);
	             if (indexInCurr == -1)
	                 currFilterVals.push(val);
	        });
	    }
	    
	    if (opts.replaceAll == true && opts.checkOn){ //single select
	        removeValues(possibleVals);
	        addValues(opts.valueId.split(';'));
	    }
	    else if (opts.valueId == ''){
	        removeValues(possibleVals);
	    }
	    else if (opts.checkOn){
	        addValues(opts.valueId.split(';'));
	    }
	    else if (!opts.checkOn){
	        removeValues(opts.valueId.split(';'));
	    }
	    var bmFacets = '';
	    if (facetGrpUl.data('bm') == 'yes' && !(opts.checkOn != true && facetGrpUl.find('li.selected').size() == 1) ){
	        bmFacets = 'bmf=' + facetGrpUl.data('filter_id') + ':' +
	            jQuery.makeArray(facetGrpUl.find('li.fil_val a').map(function(){return (jQuery(this).data('value_id'))})).join(';');
	    }
	    
	    Portal.$send('FacetFilterSet',{'FacetsUrlFrag':this.getNewUrlFrag(currFilterVals.join(';')),'BMFacets':bmFacets});
        
	},	
	'customFilterRead':function(currFilterVals,possibleVals,filterId,datesearch,rangesearch){
	    //if there is db specific filter reading override this
	    if(datesearch == true){ 
	        var rg = new RegExp(filterId + '_' + '\\d{4}\/\\d{2}\/\\d{2}_\\d{4}\/\\d{2}\/\\d{2}');
	        //for (var ind in currFilterVals){
	        for(var ind=0; ind<currFilterVals.length; ind++){
	            if (rg.exec(currFilterVals[ind]) ||
	                jQuery.inArray(currFilterVals[ind],possibleVals) != -1 ){
	                currFilterVals.splice(ind,1);
	            }
	        }
	    }
	    else if (rangesearch == true){
	        var rg = new RegExp(filterId + '_[^_]+_[^_]+');
	        for(var ind=0; ind<currFilterVals.length; ind++){
	            if (rg.exec(currFilterVals[ind]) ||
	                jQuery.inArray(currFilterVals[ind],possibleVals) != -1 ){
	                currFilterVals.splice(ind,1);
	            }
	        }
	    }
	    return currFilterVals;
	},
	'getNewUrl':function(filters,fcl,allowEmptyTerm){
	    var currUrl = window.location.pathname + window.location.search ;
        currUrl = this.replaceUrlParam(currUrl, 'filters', filters);  
        currUrl = this.replaceUrlParam(currUrl,'fcl', fcl); 
        currUrl = this.replaceUrlParam(currUrl,'querykey','');
        currUrl = this.replaceUrlParam(currUrl,'cmd','');
        currUrl = this.addTermToUrl(currUrl,allowEmptyTerm);
        //currUrl = this.appendUrlHash(currUrl);
        return currUrl;
	},
	'addTermToUrl':function(currUrl,allowEmptyTerm){
/*	    if (!currUrl.match(/term=*\/)){
	        //currUrl = this.replaceUrlParam(currUrl,'term',this.jFacetObj.data('term'));
	    } */
	    var term = jQuery.trim(jQuery("#search_term").val());
	    if (allowEmptyTerm != true)
	        term = term == '' ? 'all[sb]' : term;
	    currUrl = this.replaceUrlParam(currUrl,'term',term);
	    return currUrl;
	},
	'replaceUrlParam':function(currUrl,paramName,paramVal,allowEmpty){
	    paramVal = paramVal ? paramVal : '';
        if (paramVal != '' || allowEmpty)
            if (currUrl.indexOf(paramName + '=') == -1)
                currUrl = currUrl + (currUrl.indexOf('?') != -1 ? '&' : '?') + paramName + '=' + paramVal;
            else
                currUrl = currUrl.replace(new RegExp(paramName + '=[^&]*'), paramName + '=' + paramVal);
         else
             if (currUrl.match(new RegExp('&' + paramName + '=[^&]*')))
                 currUrl = currUrl.replace(new RegExp('&' + paramName + '=[^&]*'),'');
             else if (currUrl.match(new RegExp(paramName + '=[^&]*&')))
                 currUrl = currUrl.replace(new RegExp(paramName + '=[^&]*&'),'');
             else
                 currUrl = currUrl.replace(new RegExp(paramName + '=[^&]*'),'');
         return currUrl;
	},
	'getNewUrlFrag':function(filters,fcl){
	    var currUrl = this.getValue('FacetsUrlFrag');
        currUrl = this.replaceParamFrag(currUrl, 'filters', filters);
        currUrl = this.replaceUrlParam(currUrl,'fcl', fcl); 
        return currUrl;
	},
	'replaceParamFrag':function(currUrl,paramName,paramVal){//TO-DO ... poorly named, refactor
          //currUrl = currUrl.replace(new RegExp(paramName + '=[^;]*'), paramName + '=' + paramVal);
          currUrl = 'filters=' + paramVal;
          return currUrl;
	},
	'replaceUrlParamFrag':function(origFrag,paramName,paramVal,delim){ 
	    delim = delim || ';';
	    if (paramVal != '')
            if (origFrag.indexOf(paramName + '=') == -1)
                return  origFrag == '' ? paramName + '=' + paramVal : origFrag + delim + paramName + '=' + paramVal ;
            else
                return origFrag.replace(new RegExp(paramName + '=.[^' + delim + ']*'), paramName + '=' + paramVal);
         else
             if (origFrag.match(new RegExp(delim + paramName + '=.[^' + delim + ']*')))
                 return origFrag.replace(new RegExp(delim + paramName + '=.[^' + delim + ']*'),'');
             else if (origFrag.match(new RegExp(paramName + '=.[^' + delim + ']*' + delim)))
                 return origFrag.replace(new RegExp(paramName + '=.[^' + delim + ']*' + delim),'');
             else 
                 return origFrag.replace(new RegExp(paramName + '=.[^' + delim + ']*'),'');
        
	},
	'appendUrlHash':function(urlStr){
	    var hash = window.location.hash;
        if (hash != '')
            urlStr = urlStr + "#" + hash;
        return urlStr;
	},
	'FetchMoreOptions':function(filter_id,moreNode){
	    //if the moreNode param is not null, coming from a 'more' under a category, otherwise it is adding a whole group from 'choose filters'
	    var args = {"MoreFacetsGroupId":filter_id,"MoreFacetsNewGroup":(moreNode?"":"true"),"Db":this.jFacetObj.data('db'),"Term":jQuery("#term").val()};
        var site = document.forms[0]['p$st'].value;
        // ajax call
        xmlHttpCall(site, this.getPortletPath(), "GetMoreFilters", args, this.receiveMoreFilters, {"moreNode":moreNode}, this);
	},
	'receiveMoreFilters':function(responseObject, userArgs){
        try {
            // Handle timeouts
            if (responseObject.status == 408) {
                //this.showMessage("Server currently unavailable. Please check connection and try again.","error");
                 console.warn("Server currently unavailable. Please check connection and try again.");
                return;
            }
            var resp = '(' + responseObject.responseText + ')';
            var JSONobj = eval(resp);
            var allFilters = JSONobj.all_filters;
            if (userArgs.moreNode)
                this.addMoreFiltersDialog(allFilters,userArgs.moreNode);
            else
                this.addMoreFilterGroup(allFilters);
            //TO-DO: be more specific about this scan
            jQuery.ui.jig.scan();
            
        } catch (e) {
            //this.showMessage("Server error: " + e, "error");
            console.warn("Server error: " + e);
        }
	},
	'addMoreFiltersDialog':function(allFilters,targetNode){
	    targetNode.addClass("jig-ncbipopper");
	    var popper = jQuery(targetNode.attr('href'));
	    var filterId = targetNode.closest("ul.facet").data('filter_id');
	    var selFilters = this.jFacetObj.find('ul[data-filter_id = "' + filterId + '"] li a');
	    allFilters = jQuery(allFilters);
	    selFilters.each(function(){
	        allFilters.find('li input[id = "' + jQuery(this).data('value_id') + '"]').attr('checked','checked');
	        });   
	    popper.append(allFilters);
	    jQuery.ui.jig.scan(targetNode,['ncbipopper']);
	    targetNode.ncbipopper('open');
	},
	'getPortletPath': function(){
        return this.realname;
    },
    'facetMoreApplyClicked':function(e){
        e.preventDefault();
        var self = jQuery(e.target);
        if (self.find('span').text() == 'Add'){
            e.data.thisObj.addOpenFieldValue(self.closest('ul.facet'));
            return;            
        }
        var facetGroup = self.closest('ul.facet');
        var groupId = facetGroup.data('filter_id');
        var selFilters = jQuery('#' + groupId + '_more').find('li input').filter('input:checked');
        var filtersInFacet = facetGroup.find('li.fil_val a');
        var ofFiltersInFacet = facetGroup.find('li.of_fil_val a');
        var addedFacets = [], removedFacets = [], newFacets = [];
        var isOpenField = facetGroup.find('.filter_grp').is('.of_grp');
        //alert(isOpenField);
        selFilters.each(function () {
            var oThis = jQuery(this);
            var filterId = oThis.data('value_id');
            var filterName = oThis.next().text();
            addedFacets.push(filterId);
            var parentValueId = oThis.parent().data('value_id');
            if( oThis.parent().data('value_id') == "of_val" && ofFiltersInFacet.filter(function(ind,el){return el.text == filterName;} ).size() == 0){
                jQuery('<li class="of_fil_val"><a data-qval="' + filterName + '" data-value_id="' + filterName + '" href="#">' + filterName + '</a></li>').insertBefore(facetGroup.find("li.more"));
            }
            else if (oThis.parent().data('value_id') != "of_val" && filtersInFacet.filter('a[data-value_id = "' + filterId + '"]').size() === 0){
                newFacets.push(filterId);
                //find the place to insert
                var insertBeforeNode;
                facetGroup.find('li.fil_val').each(function(){
                    if (jQuery(this).find('a').text() > filterName){
                        insertBeforeNode = jQuery(this);
                        return false;
                    }
                });
                if (!insertBeforeNode)
                    insertBeforeNode = facetGroup.find("li.more")
                    
                jQuery('<li class="fil_val"><a data-value_id="' + filterId + '" href="#">' + filterName + '</a></li>').insertBefore(insertBeforeNode);
            }
        });
        filtersInFacet.add(ofFiltersInFacet).each(function(){
            var oThis = jQuery(this);
            var filterId = oThis.data('value_id');
            if (selFilters.filter('input[data-value_id="' + filterId + '"]').size() === 0){
                removedFacets.push(filterId);
                facetGroup.find('li.fil_val').add(facetGroup.find('li.of_fil_val')).has('a[data-value_id="' + filterId + '"]').remove();
            }
        });
        
        ncbi.sg.ping( e.target, e, "additionalFiltersApply", {"allChecked" : addedFacets, "newChecked" : newFacets , "newUnchecked": removedFacets} );
        
        facetGroup.find('li a[data-value_id="fetch_more"]').ncbipopper('close');
        
        function arrayToXml(arr){
            var xmlStr = '<Facets><FacetGroup '  + ' id = "' + groupId + '" >';
            for(var ind=arr.length -1; ind >=0 ; ind--)
                xmlStr = xmlStr + '<Facet>' + arr[ind] + '</Facet>';
            xmlStr = xmlStr + '</FacetGroup></Facets>';
            return xmlStr;
        }
        var args = {"UserSelectedFacetsNew":arrayToXml(addedFacets),"UserDeSelectedFacetsNew":arrayToXml(removedFacets)};
        
        
        var site = document.forms[0]['p$st'].value;
        // ajax call
        xmlHttpCall(site, e.data.thisObj.getPortletPath(), "UpdateUserAddedFacets", args, function(){}, null, this);       
    },
    'onMoreFilterGroups':function(e){
        jQuery('#filter_groups_apply').data('attachedTo',e.target.id);
        
        var loadedFgIds = [],activeFgIds = [];
        e.data.thisObj.jFacetObj.find('.facet .filter_grp a.clear').each(function(){
            var filterGrp = jQuery(this).closest('ul.facet');
            var filterId = 'fg_' + filterGrp.data('filter_id');
            loadedFgIds.push(filterId);
            if (filterGrp.find('li.selected')[0])
                activeFgIds.push(filterId);
        });
        var fgChecks = jQuery('#more_filter_groups input');
        fgChecks.each(function(){
            var oThis = jQuery(this);
            var currId = oThis.attr('id');
            oThis.attr('checked',jQuery.inArray(currId,loadedFgIds) != -1);
            oThis.attr('disabled',oThis.data('always_show') == 'yes' || jQuery.inArray(currId,activeFgIds) != -1)
        });
    },
    'filterGroupsApplyClicked':function(e){
        e.preventDefault();
        var loadedFgIds = [], fgIdsAdd = [],fgIdsRemove = [],selFgIds = [],fgUserSelIds=[];
        var defaultShownFacetGroups = e.data.thisObj.DefaultShownFacetGroups;
        e.data.thisObj.jFacetObj.find('.facet .filter_grp a.clear').each(function(){
            loadedFgIds.push('fg_' + jQuery(this).closest('ul.facet').data('filter_id'));
        });
        e.data.thisObj.jFacetObj.find('#more_filter_groups input').filter('input:checked').each(function(){
            selFgIds.push(jQuery(this).attr('id'));
        });
        var last = selFgIds.length;
        for (var ind =0; ind <last; ind++  ){
            if(jQuery.inArray(selFgIds[ind],loadedFgIds) == -1)
                fgIdsAdd.push(selFgIds[ind].substring(3));
            if(jQuery.inArray(selFgIds[ind],defaultShownFacetGroups) == -1)
                fgUserSelIds.push(selFgIds[ind].substring(3));
        }
        last = loadedFgIds.length;
        for (var ind =0; ind <last; ind++  )
            if (jQuery.inArray(loadedFgIds[ind],selFgIds) == -1)
                fgIdsRemove.push(loadedFgIds[ind].substring(3));
        
        e.data.thisObj.updateFiltersShown(fgIdsAdd,fgIdsRemove,fgUserSelIds);
        jQuery('#' + jQuery(this).data('attachedTo')).ncbipopper('close');
    },
    'updateFiltersShown':function(fgIdsAdd,fgIdsRemove,fgUserSelIds){
        var last = fgIdsRemove.length;
        for (var ind =0; ind <last; ind++  )
            this.jFacetObj.find('ul.facet[data-filter_id = ' + fgIdsRemove[ind] + ']').remove();
        last = fgIdsAdd.length -1;
        for (var ind = last; ind >= 0; ind--  )
            this.FetchMoreOptions(fgIdsAdd[ind],null);
        //update the selection on the session variables
        this.updateUserSelectionAttrs(fgUserSelIds,fgIdsRemove);
    },
    'updateUserSelectionAttrs':function(fgUserSelIds,fgIdsRemove){
        
        function arrayToXml(arr,rootTag,tag){
            var xmlStr = '<' + rootTag + '>';
            var last = arr.length;
            for(var i=0; i<last; i++)
                xmlStr = xmlStr + '<' + tag + '>' + arr[i] + '</' + tag + '>';
            xmlStr = xmlStr + '</' + rootTag + '>';
            return xmlStr;
        }
        var rootTag = 'FacetGroups',tag='FacetGroup';
        var args = {"UserSelectedFacetGroups":arrayToXml(fgUserSelIds,rootTag,tag),"UserDeSelectedFacetGroups":arrayToXml(fgIdsRemove,rootTag,tag)};
        var site = document.forms[0]['p$st'].value;
        // ajax call
        xmlHttpCall(site, this.getPortletPath(), "UpdateUserSelectedFacetGroups", args, function(){} , {}, this);
        
    },
    'addMoreFilterGroup':function(allFilters){
	    allFilters = jQuery(allFilters);
	    
	    //console.log('addMoreFilterGroup');
	    
/*	    if(!allFilters.find("ul>li")[0]){
	        alert("That wouldn't return any results");
	        return;
	    }*/
	    
	    //find the position and insert
	    var nFilterId = allFilters.data("filter_id");
	    //console.log('curr filter id ', nFilterId);
	    var nFilerLi = jQuery('#more_filter_groups input').filter(function(i,j){return jQuery(j).attr("id") == "fg_" + nFilterId;}).parent();
	    //console.log('curr li in more dialog',nFilerLi);
	    var selFacet = nFilerLi.nextAll("li").filter(function(i,j){return jQuery(j).find("input").is(':checked')})[0];
	    //var selFacet = nFilerLi.nextAll("li").filter(function(i,j){console.log('find next sel',jQuery(j),jQuery(j).find("input").is(':checked'),jQuery(j).find("input[checked]"),jQuery(j).find("input[checked]")[0]); return jQuery(j).find("input").is(':checked')})[0];
	    //console.log('sel facet after',selFacet);
	    var facetUl;
	    if (selFacet){
	        selFacet = jQuery(selFacet);
	        var facetId = selFacet.find("input").attr("id").substring(3);
	        facetUl = jQuery("ul.facet").filter(function(i,j){return jQuery(j).data("filter_id") == facetId})
	        console.log('sel facet after ul',facetUl);
	        
	    }
	    if (facetUl && facetUl[0])
	        facetUl.before(allFilters);
	    else{
	        var resetLink = jQuery('ul.facet_reset').has('li a[data-value_id="reset"]');
	        resetLink.before(allFilters);
	    }
	    
	    var moreLink = allFilters.find("li.more");
	    if (moreLink[0]){
	        moreLink.find("a").addClass("jig-ncbipopper");
	        jQuery.ui.jig.scan(moreLink,['ncbipopper'])
	    }
	    if (allFilters.find("#facet_fileds_popup")[0])
	        jQuery.ui.jig.scan(allFilters,['ncbipopper']);
	    
	    

    },
    'rangeApplyClicked':function(e){
        e.preventDefault();
        var elem = jQuery(e.target);
        var outerDiv = elem.closest('[id^=facet_range_div]');
        var valSt = outerDiv.find('[id^=facet_range_st]').val();
        var valEnd = outerDiv.find('[id^=facet_range_end]').val();
        var filterId = outerDiv.closest('ul.facet').data('filter_id');
        
        function validate(){
            var valid = true;
            try{
                var validationRE = outerDiv.data('vre') || '[^\s]+';
                var rg = new RegExp(validationRE);
                valid = valid && Boolean(rg.exec(valSt)) && Boolean(rg.exec(valEnd));
                
                //now check for value function
                var valueFun = outerDiv.data('vf');
                if (valueFun && valid){
                    valueFunEval = eval('(' + valueFun + ')');
                    if(typeof valueFunEval == 'function')
                        valid =  valueFunEval(valEnd) > valueFunEval(valSt); 
                    else{
                        var stValue = valueFun.replace('$',valSt);
                        stValue=eval('(' + stValue + ')');
                        var endValue = valueFun.replace('$',valEnd);
                        endValue = eval('(' + endValue + ')');
                        valid = endValue >= stValue;
                    }
                }
            }
            catch(e){
                alert('Check your validation regular expressions and functions in the source xml. Your user should never see this!');
                console.error(e);
                return false;
            }
            
            return valid;
        }
        
        var tryAgain = !(e.data.thisObj.validateRange(outerDiv) && validate()); 
        if (tryAgain){
	        alert('please enter a valid range');
	        return;
	    }
	    rangeValue = filterId + '_' + valSt + '_' + valEnd;
	    e.data.thisObj.handleFilterSelection({'filterId':filterId,'valueId':rangeValue,'checkOn':true,'rangeSearch':true}); 
	    outerDiv.data('attached-to').ncbipopper('close');
    },
    //this function is a callback. If you want to have extra validation of range values - override
    'validateRange':function(outerDiv){
        return true;
    },
    'dateRangeApplyClicked':function(e){
        e.preventDefault();
        var dateRange = '',dateRangeVals = [],tryAgain = false;
        
        //if (fieldSize == 4){
        var fieldSize = 4;
        //var year1 = jQuery('#facet_date_st_year');
        var outerDiv = jQuery(e.target).closest("[id^=facet_date_range_div]");
        var year1 = outerDiv.find('[id^=facet_date_st_year]');
        //var year2 = jQuery('#facet_date_end_year');
        var year2 = outerDiv.find('[id^=facet_date_end_year]');
        var year1Val = year1.ncbiplaceholder().ncbiplaceholder('value');
        var year2Val = year2.ncbiplaceholder().ncbiplaceholder('value');
        var year1Okay = year1Val.match(new RegExp('^\\d{' + fieldSize + '}$'));
        var year2Okay = year2Val.match(new RegExp('^\\d{' + fieldSize + '}$'));
        var oneYearThere = false;
        if (year1Val == '' && year2Okay){
            year1.val('0001');
            oneYearThere = true;
        }
        else if (year2Val == '' && year1Okay){
            year2.val('3000');
            oneYearThere = true;
        }
        if ( !oneYearThere  &&  !(year1Okay && year2Okay) )
            tryAgain = true;

        if (!tryAgain){
           //jQuery('#facet_date_range_div input').each(function(){
           outerDiv.find('input').each(function(){
                var oThis = jQuery(this);
                var val = oThis.ncbiplaceholder().ncbiplaceholder('value'); //.val();
                var fieldSize = oThis.attr('size');
                if(this.id.match('month')){
                    if (!val.match(new RegExp('^\\d{0,' + fieldSize + '}$')) )
                        tryAgain = true;
                    else if (val == '' )
                        val = this.id.match("end") ? '12' : '01' ;
                    else if (val.length == 1) 
                        val = '0' + val;
                    else if (Number(val) > 12)
                        tryAgain = true;
                }
                else if(this.id.match('day')){
                    if (!val.match(new RegExp('^\\d{0,' + fieldSize + '}$')) )
                        tryAgain = true;
                    else if (val == '' )
                        val = this.id.match("end") ? '31' : '01' ;
                    else if (val.length == 1) 
                        val = '0' + val;
                    else if (Number(val) > 31)
                        tryAgain = true;
                }
                dateRangeVals.push(val);
            });
        }
	    if (tryAgain){
	        alert('please enter a valid date range');
	        return;
	    }
	    var filterId = outerDiv.closest('ul.facet').data('filter_id');
	    dateRange = filterId + '_' + dateRangeVals[0] + '/' + dateRangeVals[1] + '/' + dateRangeVals[2] + '_' + dateRangeVals[3] + '/' + dateRangeVals[4] + '/' + dateRangeVals[5];
	    e.data.thisObj.handleFilterSelection({'filterId':filterId,'valueId':dateRange,'checkOn':true,'dateSearch':true});
	    outerDiv.data('attached-to').ncbipopper('close');
	},
	'facetFieldsApplyClicked':function(e){
	    e.preventDefault();
	    var val = jQuery('#facet_fileds_select').val();
	    //var currFilterString = window.location.search.match(/filters=([^&]*)/);
	    var currFilterString = e.data.thisObj.getCurrentFilterString();
	    if (currFilterString.match(/fld_.+/)){
	        currFilterString = currFilterString.replace(/fld_.[^;]+/,val);       
	    }
	    else
	        currFilterString = (currFilterString != '') ? currFilterString + ';' + val : val; 
	    Portal.$send('FacetFilterSet',{'FacetsUrlFrag':e.data.thisObj.getNewUrlFrag(currFilterString)});
	},
	'removeFieldSelection':function(){
	    //var currUrl = window.location.pathname + window.location.search ;
	    var currUrl = this.getValue('FacetsUrlFrag');
         if (currUrl.match(/;fld_.[^;]+/))
             currUrl = currUrl.replace(/;fld_.[^;]+/,'');
         else if (currUrl.match(/fld_.[^;]+;/))
             currUrl = currUrl.replace(/fld_.[^;]+;/,'');
         else if (currUrl.match(/fld_.[^;]+/))
             currUrl = currUrl.replace(/fld_.[^;]+/,''); 
         currUrl = this.getNewUrlFrag(currUrl);
         Portal.$send('FacetFilterSet',{'FacetsUrlFrag':currUrl});
         //window.location = currUrl;
	},
	'onMoreFiltersOpen':function(e){
	    var targetNode = jQuery(this);
	    var popper = jQuery(targetNode.attr('href'));
	    var filterId = targetNode.closest("ul.facet").data('filter_id');
	    var facetUl = e.data.thisObj.jFacetObj.find('ul[data-filter_id = "' + filterId + '"]');
	    var selFilters = facetUl.find('li.fil_val a');
	    selFilters = selFilters.add(facetUl.find('li.of_fil_val a'));
	    selFilters.each(function(){
	        var self = jQuery(this);
	        popper.find('li input[data-value_id = "' + jQuery(this).data('value_id') + '"]').attr('checked','checked');
	        }); 
	    var activeFilters = selFilters.filter(function(){return jQuery(this).parent().hasClass("selected");});
	    activeFilters.each(function(){
	        popper.find('li input[data-value_id = "' + jQuery(this).data('value_id') + '"]').attr('disabled','true');
	    });
	},
	'facetDialogKeyPress':function(e){
	    e = e || utils.fixEvent (window.event);
	    if ((e.keyCode || e.which) == 13){
	        e.preventDefault();
	        jQuery(this).find('button.primary-action').trigger('click');
	    }
	},
	'autoFillDateInputs':function(e){
	    var oThis = jQuery(this);
	    var outerDiv = oThis.closest('[id^=facet_date_range_div]');
	    function updateVal(jSel,value){
	        jSel.each(function(){ var oThis = jQuery(this); if (oThis.val() == '') oThis.val(value);});
	    }
	    if (oThis.val().match(new RegExp('^\\d{' + oThis.attr('size') +'}$'))){
	        var currId = oThis.attr('id');
	        if( currId.match(/^facet_date_st_year/))
	            updateVal(outerDiv.find('[id^=facet_date_st_month], [id^=facet_date_st_day]'),'01');
	        else if (currId.match(/^facet_date_st_month/))
	            updateVal(outerDiv.find('[id^=facet_date_st_day]'),'01');    
	        else if (currId.match(/^facet_date_end_year/)){
	            updateVal(outerDiv.find('[id^=facet_date_end_month]'),'12');
	            updateVal(outerDiv.find('[id^=facet_date_end_day]'),'31');
	        }
	        else if (currId.match(/^facet_date_end_month/))
	            updateVal(outerDiv.find('[id^=facet_date_end_day]'),'31'); 
	    }
	},
	'dateRangeClearClicked':function(e){
	    e.preventDefault();
	    var self = jQuery(e.target);
	    if (self.closest('ul').has('li.daterange').find('li.selected')[0])
	        e.data.thisObj.handleFilterSelection({'filterId':self.closest('ul.facet').data('filter_id'),'valueId':'','checkOn':true,'dateSearch':true});
	    else
	        self.closest('.facets_dialog').find('input').val('');
	},
	'rangeClearClicked':function(e){
	    e.preventDefault();
	    e.data.thisObj.handleFilterSelection({'filterId':jQuery(e.target).closest('ul.facet').data('filter_id'),'valueId':'','checkOn':true,'rangeSearch':true});
	},
	'resetFromMessage':function(e){
	    e.preventDefault();
	    Portal.$send('FacetFiltersCleared',{});
	},
	'resetFromMessageRes':function(e){
	    e.preventDefault();
	    Portal.$send('FacetFilterSet',{'FacetsUrlFrag': 'fcl=all'});
	},
	'getFacetSearchData':function(){
	    var sd = {};
	    try{
	        sd = eval('({' + this.jFacetObj.data('sd') + '})');
	    }catch(e){}
	    return sd;
	},
	'handleFacetFilterSet':function(facetsUrlFrag,bMFacets){
	    var sd = this.getFacetSearchData();
	    this.setValue('FacetsUrlFrag',facetsUrlFrag);
	    this.setValue('FacetSubmitted','true');
	    this.setValue('BMFacets',bMFacets);
	    this.send.SetTimelineFilter({'TimelineYear':''});
	    if(sd.extra){
	        this.handleExtraSD(sd.extra);
	    }
	    else if (sd.op == 'search'){
	        this.send.SendSearchBarTerm();
	        this.send.Cmd({'cmd':'search'});    
	    }
	    else if (sd.op == 'link' && sd.linkname && (sd.qk || sd.idsfromresult) ){
	        this.send.LinkName({'linkname':sd.linkname});
	        this.send.QueryKey({'qk':sd.qk});
	        this.send.IdsFromResult({'IdsFromResult':sd.idsfromresult});
	        this.send.Cmd({'cmd':'Link'});    
	    }
	    else{
	        this.send.Cmd({'cmd':'HistorySearch'});
	        this.send.QueryKey({'qk':sd.qk});
	    }

	    Portal.requestSubmit();
	},
	'handleExtraSD':function(extraSD){
	    alert('Please implement the function handleExtraSD');    
	},
	'handleFacetFiltersCleared':function(){
	    this.send.Cmd({'cmd': 'removefacets'});
		Portal.requestSubmit();
	},
	'openFieldSelected':function(e){
	    e.preventDefault();
        e.data.thisObj.addOpenFieldValue(jQuery(e.target).closest('ul.facet'));
	},
	'openFieldAddClicked':function(e){
	    e.preventDefault();
	    e.data.thisObj.addOpenFieldValue(jQuery(e.target).closest('ul.facet'));
	},
	'openFieldKeyPress':function(e){
	    //e.data.thisObj.openFieldChanged(e);
	    e = e || utils.fixEvent (window.event);
	    if ((e.keyCode || e.which) == 13){
	        e.preventDefault();
	        e.data.thisObj.addOpenFieldValue(jQuery(e.target).closest('ul.facet'));
	    }
	},
	'openFieldChanged':function(e){
	    var self = jQuery(this);
	    var applyBtn = self.closest('.facets_dialog').find('.facet_more_apply');
	    if(self.val() == ''){
	        applyBtn.find('span').text('Show');
	    }
	    else{
	        applyBtn.find('span').text('Add');
	    }
	},
	'checkSelOnlyOpenField':function(input,showAlert){
	      showAlert = showAlert || 'yes';
	      var isInDict = false;
	      var inputText = input.val().toLowerCase();
	      if(input.data('so') == 'yes'){
	          var jigOpts = input.data('jigconfig').match(/dictionary:'(\w+)'.*/);
	          var dict = jigOpts ? jigOpts[1] : null;
	          jigOpts = input.data('jigconfig').match(/localData:(')?([^,]*)(')?/);
	          var localDict = jigOpts ? jigOpts[2] : null;
	          if (dict){
	              var ajaxCall = jQuery.ajax({
	                  url:'/portal/utils/autocomp.fcgi?dict=' + dict + '&q=' + inputText,
	                  async:false,
	                  dataType:'json'
	              }).always(function(data){
	                  isInDict = eval(data.responseText);
	                  //the handling function with local scope only
	                  function NSuggest_CreateData(q,matches,count){
	                      var rg = new RegExp('^' + inputText + '(@.*)?$','i');
	                      return jQuery.grep(matches,function(e,i){
	                          return rg.exec(e);
	                          }).length > 0;
	                  }
	              });
        	      if (!isInDict && showAlert == 'yes')
	                  alert('Please select one of the valid values');
	              return isInDict;
	           }
	           else if (localDict){
	               var localDictSplitted = localDict.split('.');
	               var localDictVar = null;
	               for(var i=0; i<localDictSplitted.length; i++){
	                   if (localDictVar == null)
	                       localDictVar = window[localDictSplitted[i]];
	                    else
	                        localDictVar = localDictVar[localDictSplitted[i]];
	               }
	               var rg = new RegExp('^' + inputText + '$', 'i');
	               jQuery.each(localDictVar,function(ind,val){
	                   if (val.match(rg))
	                       isInDict = true;
	               });
                 if (!isInDict && showAlert == 'yes')
	                  alert('Please select one of the valid values');
	              return isInDict;
	           }
	           else
	               return true;
	       }
	       else
	           return true;
	},
	'addOpenFieldValue':function(facetUl){
	    var inputBox = facetUl.find(".of_sel_inp");
	    var newVal = inputBox.val();
	    if(newVal){
            if(!this.checkSelOnlyOpenField(inputBox)){
	            return;
	        }
	        var listUl = facetUl.find('.facets_dialog ul.facet_more');
	        if (listUl.find('li').has('input[data-value_id="' + newVal +'"]').size() == 0 ){ 
                inputBox.val('');
    	        var elId = 'ofv_' + newVal;
    	        listUl.append('<li data-value_id="of_val"><input type="checkbox" id="'+ elId +'" checked="checked" data-value_id="' + newVal + '" ><label for="'+elId+'">' + newVal +'</label></li>');
    	        inputBox.focus();
	        }
	        else{
	            alert('Already added');
	            inputBox.focus();
	        }
	    }
	    else{
	        facetUl.find('.facet_more_apply').trigger('click');
	    }
	},
	'getCurrentFilterString':function(){
	    var currFilterString = this.getValue('FacetsUrlFrag').match(/filters=([^&]*)/);
	    return currFilterString ? currFilterString[1] : ''; 
	},
	'applyOpenField':function(elem,filterId){
        var currFilterString = this.getCurrentFilterString();
        var paramVal = '';
        var newVal = elem.data('value_id');
        var dupl = false;
        var facetUl = elem.closest('ul.facet');
        facetUl.find('li.selected').not(".fil_val").each(function(){
            var currVal = jQuery(this).find('a').data('qval');
            if (newVal.match(new RegExp('^' + currVal + '$','i')))
                dupl = true;
            paramVal = paramVal + ( paramVal == '' ? '' : ':' ) + currVal ;
        });
        if (dupl)
            return;
        paramVal = paramVal == '' ? newVal : paramVal + ':' + newVal;
        currFilterString = this.replaceUrlParamFrag(currFilterString,'of_' + filterId,paramVal,';');
    	    
        
        var bmFacets = '';
        var facetUl = elem.closest('ul.facet');
        if (facetUl.data('bm') == 'yes'){
            bmFacets = 'bmf=' + facetUl.data('filter_id') + ':' +
                jQuery.makeArray(facetUl.find('li a').map(function(){return (jQuery(this).data('value_id'))})).join(';');
        }
        	    
        Portal.$send('FacetFilterSet',{'FacetsUrlFrag':this.getNewUrlFrag(currFilterString),'BMFacets':bmFacets});
	},
	'removeOpenField':function(elem,filterId){
	    var currFilterString = this.getCurrentFilterString();
	    var valueId = elem.data('value_id');

            
        var toReplace = currFilterString.match(new RegExp('of_' + filterId + '=(.[^;]*)'));
        toReplace = toReplace ? toReplace[1] : '';
        var replaceWith = '';
        if (valueId != ''){
            var toRemove = elem.data('qval');
            replaceWith = toReplace;
            var rg;
            rg = new RegExp(':' + toRemove);
            if(rg.exec(replaceWith))
                replaceWith = replaceWith.replace(rg,'');
            else{
                rg = new RegExp(toRemove + ':');
                if (rg.exec(replaceWith))
                    replaceWith = replaceWith.replace(rg,'');
                else{
                    replaceWith = replaceWith.replace(new RegExp(toRemove),'');
                }
            }
            
            
        }
        currFilterString = this.replaceUrlParamFrag(currFilterString,'of_' + filterId,replaceWith,';')
        this.setValue('FacetsUrlFrag',"filters=" + currFilterString);
        this.handleFilterSelection({'filterId':filterId,'valueId':valueId,'checkOn':true});
	},
	'ShowAllFacetsToggle':function(e){
	    var elem = jQuery(e.target);
	    if (elem.hasClass('fetch_more_exp')){
	        elem.removeClass('fetch_more_exp');
	        elem.addClass('fetch_more_exp_less');
	        if (isNaN(parseInt(elem.data("sz"),10)))
	            elem.data("sz",elem.parent().parent().find("li.fil_val:visible").size());
	        var moreFacets = elem.next('ul').find('li');
	        moreFacets.insertBefore(elem.parent());
	    }
	    else{
	        elem.removeClass('fetch_more_exp_less');
	        elem.addClass('fetch_more_exp');
	        var sz = parseInt(elem.data("sz"),10);
	        moreFacets = elem.parent().parent().find("li.fil_val").filter(function(i){return i >= sz;});
	        elem.next().append(moreFacets);
	    }
	}
}
);
;
(function ($) {
    
    $(function () {
        
        Portal.Portlet.Gene_Facets = Portal.Portlet.Entrez_Facets.extend({
        
            'init': function (path, name, notifier) {                
                this.base(path, name, notifier);
                var oThis = this;
                
                this._last = 0;
                
                $dcmsOrgList = $('#dcms-org-list');
                
                this.$chrContainer = $('#facet_of_divchromosomal-region');
                
                if ($dcmsOrgList.length) {
                    this.orgFilterTextbox = document.getElementById('of_chromosomal-region');
                    this.$orgFilterTextbox = $('#of_chromosomal-region');
                    
                    this.list = document.getElementById('dcms-org-list');
                    this.$list = $dcmsOrgList;
                    this.dcms = true;
                } else {
                    this.orgFilterTextbox = document.getElementById('organism-filter');
                    this.$orgFilterTextbox = $('#organism-filter');
                    
                    this.list = document.getElementById('of_chromosomal-region');
                    this.$list = $('#of_chromosomal-region');
                }
                
                this.initChromosomeLocations();
                this.bindChromosomeFilterTextBox();                
                window.GeneFacets = this;
                
                jQuery('.gs-show-only-current').on('click', function(e){
                    var strQuery = 'current-only';
                    var currFilterString = GeneFacets.getValue('FacetsUrlFrag').match(/filters=(.[^&]*)/);
                    currFilterString = currFilterString ? currFilterString[1]: '';
                    currFilterString = currFilterString.replace(/replaced|discontinued/gi, '');
                    
                    if ( currFilterString !== "") {
                        var a = currFilterString.split(';');
                        var b = strQuery.split(';');
                        for (var i=0; i<b.length; i++){     
                            if (a.indexOf(b[i]) === -1) {
                                a.push(b[i]);
                            }
                        }
                        currFilterString = a.join(';');
                    } else {
                        currFilterString = strQuery;                        
                    }
                    Portal.$send('FacetFilterSet',{'FacetsUrlFrag':GeneFacets.getNewUrlFrag(currFilterString),'BMFacets':{}});
                    return false;
                });
                jQuery('.gs-see-all').on('click', function(e){
                    var strQuery = 'current-only;replaced;discontinued';
                    var currFilterString = GeneFacets.getValue('FacetsUrlFrag').match(/filters=(.[^&]*)/);
                    currFilterString = currFilterString ? currFilterString[1]: '';
                    
                    if ( currFilterString !== "") {
                        var a = currFilterString.split(';');
                        var b = strQuery.split(';');
                        for (var i=0; i<b.length; i++){
                            if (a.indexOf(b[i]) === -1) {
                                a.push(b[i]);
                            }
                        }
                        currFilterString = a.join(';');
                    } else {
                        currFilterString = strQuery;                        
                    }
                    Portal.$send('FacetFilterSet',{'FacetsUrlFrag':GeneFacets.getNewUrlFrag(currFilterString),'BMFacets':{}});
                    return false;
                });                
          
            },
            
            'initChromosomeLocations': function() {
                var oThis = this,
                    $chrContainer = oThis.$chrContainer,
                    $orgList = oThis.$list,
                    $orgFilterTextbox = oThis.$orgFilterTextbox;
                 
                $orgList.on({
                    'click': function(evt) {
                        oThis.$orgFilterTextbox.val( oThis.$list.find('option:selected').attr('id') );
                    }
                });
                
                
                // select the text when user clicks the textbox, so he/she can clear the old value
                $orgFilterTextbox.on('click', function(evt){
                    $orgFilterTextbox.select();
                });
                
                
                // when the popper opens, if there is no selected item,
                // then select the first one
                var $chrPopperAnchor = $('#facet_ofchromosomal-region');
                
                $chrPopperAnchor.on("ncbipopperopencomplete", function (e, ui) {
                    console.info('ncbipopperopencomplete');
                    if ($orgList.length && ($orgList.find('option').length === 0 || $orgList.find('option').length <= 2)) {
                        ncbi.sg.ping({jsevent: "click", 'chromosome_location_dcsm_filter': 'load_taxons'});
                    
                        // ajax request to get org list
                        var $chrLocationFacet = jQuery('#chr-location-facet-wrapper');
                        $orgList.find('option').remove();
                        $orgList.append('<option id="org-list-loading">Loading...</option>');
                        
                        var args = {
                            'AjaxGroupByBlobId': $chrLocationFacet.attr('data-bid'),
                            'AjaxHistoryId': $chrLocationFacet.attr('data-hid'),
                            'AjaxQueryKey': $chrLocationFacet.attr('data-qky')
                        };
                        
                        xmlHttpCall(document.forms[0][ 'p$st'].value, GeneFacets.path, "AjaxGetOrganismList", args, GeneFacets.AjaxGetOrganismListReceive , {}, oThis);
                    }
                    else if ($orgList.length && ! $orgList.find('option:selected').length) {
                        $orgList.find('option:first').attr('selected', 'selected');
                        $orgList.trigger('change');
                    }
                });
                
                if ( oThis.dcms !== true ) {
                    oThis.initChromosomeLocations_nonDCMS();
                } else  {
                    oThis.initChromosomeLocation_DCMS();   
                }
                
            },
            AjaxGetOrganismListReceive: function(responseObject, userArgs) {
                var resp = eval("(" + responseObject.responseText + ")");
                console.info(resp);
                var $options;
                
                jQuery('#org-list-loading').remove();
                
                if ( resp.OrganismList !== '') {
                    $options = jQuery(resp.OrganismList).find('option');
                }
                
                if ($options.length) {
                    jQuery('#of_chromosomal-region').append($options);
                }
            },
            
            
            // ==========================================================================
            // bindChromosomeLocationsEvents            
            'bindChromosomeFilterTextBox': function () {
                var oThis = this;                
                oThis.$orgFilterTextbox.on({
                    'keypress': function (e) {
                        if (e.keyCode == 13) {
                            return false;
                        }
                    },
                    'keyup': function (e) {
                        
                        if ( GeneFacets.timerObj ) {
                            // clearTimeout(GeneFacets.timerObj);
                        }
                        
                        oThis.checkOrgKey(oThis, oThis.list);
                    }
                });
            },
            
            // ==========================================================================
            // bind events for Chomosome location facet            
            // - change event for organism select list
            // - change events for chromosome select list
            'initChromosomeLocations_nonDCMS' : function() {
                var oThis = this, 
                    $chrContainer = $("#facet_of_divchromosomal-region"),
                    chrLocationFacet = {},
                    $orgList = $('#of_chromosomal-region'),
                    $orgFilter = $('.organism-filter');
                
                chrLocationFacet.$chrContainer = $chrContainer;                
                this.chrLocationFacet = chrLocationFacet;


                // organism list change                 
                $chrContainer.on('change', 'select.chr-region-tax-list', {GeneFacets: this}, this.organismListChange);
                
                // chromosome select list
                var $chrName = $('#chr-name');                
                if ($chrName.length) {
                    $chrName.on('change', this.chromosomeListChange);
                }                
                
                // override the apply button 
                var $applyButton = $chrContainer.find('button.apply-chr');                
                if ($applyButton.length) {
                    $applyButton.off();
                    $applyButton.on('click', {GeneFacets: this}, this.applyChromosomeLocatonFacet);                    
                }
                    
            },
            
                        
            'initChromosomeLocation_DCMS': function() {
                var $chrContainer = $("#facet_of_divchromosomal-region"),
                    $dcmsOrgList = $('#dcms-org-list'),
                    $orgFilter = $('.organism-filter');                    
                               
                // dcms organism list 
                $dcmsOrgList.on({
                    'change': function(evt){
                        $orgFilter.val($dcmsOrgList.find('option:selected').attr('id'));
                    }
                });                
                
                
                //apply button dcms
                var $applyButton = $chrContainer.find('button.apply-chr');
                var $applyButtonDCMS = $chrContainer.find('button.of_add_dcms');
                
                
                if ($applyButtonDCMS.length) {
                    var prevBoundClickEvt = $applyButtonDCMS.prop('onClick');
                    $applyButtonDCMS.off();
                    $applyButtonDCMS.on('click', {GeneFacets: this}, this.applyOrganismFacetDCMS);
                }                 
            },
            
            'applyOrganismFacetDCMS': function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                ncbi.sg.ping({jsevent: "click", 'chromosome_location_dcsm_filter': 'applied'});
                
                if ($dcmsOrgList.find('option:selected').length > 0) {
                    var $orgList = $('#of_chromosomal-region');
                    var strQuery = '';
                    var currFilterString = GeneFacets.getValue('FacetsUrlFrag').match(/filters=(.[^&]*)/);
                    currFilterString = currFilterString ? currFilterString[1]: '';

                    //strQuery = '"' + $('#dcms-org-list option:selected').text() + '"[Organism]';
                    strQuery =  $('#dcms-org-list option:selected').text();
                    // if currFilterString exists and has not been chosen before
                    // then append the newly selected facet string to the existing one
                    if (currFilterString != '') {                                
                        strQuery = 'of_chromosomal-region=' + strQuery;
                        currFilterString += ';' + strQuery
                    } else {
                        currFilterString = GeneFacets.replaceUrlParamFrag(currFilterString, $orgList.attr('id'), strQuery, ';')
                    }
                    
                    console.info(currFilterString);
                    //of_chromosomal-region=                
                    Portal.$send('FacetFilterSet',{'FacetsUrlFrag':GeneFacets.getNewUrlFrag(currFilterString),'BMFacets':{}});
                    
        
                }                
            },
            
            // ==========================================================================
            // applyChromosomeLocatonFacet
            // build a facet string like below and fire the event <FacetFilterSet>
            // (NC_011943[nucl_accn] AND 000000000001[CHRPOS] : 000000016502[CHRPOS])            
            'applyChromosomeLocatonFacet': function (evt) {
                
                evt.preventDefault();
                evt.stopPropagation();
                ncbi.sg.ping({jsevent: "click", 'chromosome_location_filter': 'applied'});
                
                var $chrFrom = $('#chr-from'),
                    $chrTo = $('#chr-to'),
                    $chrName = $('#chr-name'),
                    GeneFacets = evt.data.GeneFacets,
                    strQuery = '{{ACCESSION}} {{FROM}}-{{TO}}',
                    $orgList = $('#of_chromosomal-region'),
                    $chrLocationInfo = $('#chr-location-info-ctrl');
                
                
                // validation
                // if the organism list is empty, just hide the box
                // if !chrName || !from || !to, then show error message
                if ($chrName.val() === '' || $chrFrom.val().match(/\d+/) === null || $chrTo.val().match(/\d+/) === null) {
                    var $msg = $('<p id="chr-error-info" class="error"><span style="padding-left:10px;">The value for <b>From</b> or <b>To</b> must be a number</span></p>');
                    return;
                }                
                
                //strQuery = 'of_chromosomal-region='  + strQuery.replace('{{ACCESSION}}', $chrName.val().split('|')[0]);
                var chrName = $chrName.val();
                console.info(chrName);
                strQuery = strQuery.replace('{{ACCESSION}}', chrName.split('|')[0]);
                strQuery = strQuery.replace('{{FROM}}', $chrFrom.val());
                strQuery = strQuery.replace('{{TO}}', $chrTo.val());                
                
                var currFilterString = GeneFacets.getValue('FacetsUrlFrag').match(/filters=(.[^&]*)/);
                currFilterString = currFilterString ? currFilterString[1]: '';
                
                console.info(currFilterString);
                
                // if currFilterString exists and has not been chosen before
                // then append the newly selected facet string to the existing one
                if (currFilterString != '') {
                    
                    // return *false* or just close the popper, if the newly selected facet has already been selected before
                    // inArray('NC_001573 1-1', ["NC_001573 1-17553", "NC_001573 1-17552"])
                    
                    strQuery = 'of_chromosomal-region=' + strQuery;
                    
                    if ($.inArray(strQuery, currFilterString.replace(/.*=/, '').toString().split(':')) != -1) {
                        var $popper = $('#facet_ofchromosomal-region');
                        $popper.ncbipopper('isOpen') === true ? $popper.ncbipopper('close'): '';
                        return false;
                    }
                    
                    currFilterString += ';' + strQuery
                } else {
                    currFilterString = GeneFacets.replaceUrlParamFrag(currFilterString, $orgList.attr('id'), strQuery, ';')
                }

                //of_chromosomal-region=                
                Portal.$send('FacetFilterSet',{'FacetsUrlFrag':GeneFacets.getNewUrlFrag(currFilterString),'BMFacets':{}});
            },
            
            // ==========================================================================
            // for non-dcsm mode only: load chromosome information
            'organismListChange': function (evt) {
            
                var GeneFacets = evt.data.GeneFacets;
                
                // do not send the ajax request immediately, wait for 1000ms first
                try {
                    clearTimeout(GeneFacets.timerAjaxRequest);
                } catch (e) {
                    
                }
                
                GeneFacets.timerAjaxRequest = setTimeout(function () {
                        GeneFacets.loadingChromosomeInfo();
                       GeneFacets.getChromosomes(GeneFacets);
                }, 1000);                
            },
            
            'loadingChromosomeInfo': function () {
                
                $container = jQuery('#chr-location-info-ctrl');
                
                $container.addClass('chr-loading').find('.chr-field').attr('disabled', 'disabled');
                
                $('#chr-name').empty();
                $('#chr-from').val();
                $('#chr-to').val();
            },
            
            // ==========================================================================
            // getChromosomes():
            // get the chroms for non-DCMS query by tax id
            'getChromosomes': function (GeneFacets) {
                
                var taxaInfo = GeneFacets.getTaxInfo();
                
                var args = {"taxid": taxaInfo.taxid},
                    site = document.forms[0][ 'p$st'].value,                
                    obj = {"org": taxaInfo.name};
                
                //TODO: should cache the results (should store an hash object {org_id/name: [location,.....]}) rather than doing ajax call every time.      
                try {
                    var resp = xmlHttpCall(site, GeneFacets.path, "GetChrom4TaxId", args, GeneFacets.receive, obj, GeneFacets);
                }
                catch (err) {
                    console.info(err);
                }
            },
            
            'getTaxInfo': function () {
                var obj = {},
                    $cont = jQuery('#chr-region-tax-list'),
                    $selectedOption = $cont.find('select.chr-region-tax-list option:selected');
                
                if ($selectedOption.length) {                    
                    obj = {
                        name: $selectedOption.text(),
                        taxid: $selectedOption.attr('value')
                    }
                }                
                console.info(obj);
                return obj;
            },
            
            'receive': function (responseObject, userArgs) {
                
                console.info('request received');
                
                try {
                    
                    //resp is a JSON where the result is in theChromosomes
                    var resp = eval("(" + responseObject.responseText + ")");
                    
                    // theChromosomes is a string containing an JSON array
                    var chromosomes = eval("(" + (resp.theChromosomes || "[]") + ")");
                    
                    /* [["NC_002355|MT|15643", "MT"]] */
                    // console.info(chromosomes);
                    var $ = jQuery.noConflict(),
                    $chrSelect = $('#chr-name');
                    $chrSelect.empty();
                    
                    // fill the chromosome name list
                    $.each(chromosomes, function (index, value) {
                        if (value[1] !== '' && value[0] !== '') {
                            // console.log('value0 = ' + value[0], ', value1=' + value[1]);
                            $chrSelect.append($('<option></option>').attr('value', value[0]).text(value[1]));
                        }
                    });
                    
                    // enabled all .chr-field when there are chromosome
                    if ($chrSelect.find('option').length) {                       
                        // enable the chromosome select first, or the trigger event wont work
                        $chrSelect.removeAttr('disabled');
                        $chrSelect.trigger('change');
                    }
                    
                    // this is a fix for the usability bug:
                    // if a user select an item in the list by clicking the list, there is no need to give a focus back to the textbox
                    // but if the list is changed because the user is typing in the organism filtering textbox to filter the list
                    // then the focus needs to give back to the textbox after the ajax call.
                    var focusToTextbox = this.$orgFilterTextbox.data('focusttotextbox');
                    if ( typeof focusToTextbox !== 'undefined' && focusToTextbox === 'true' ) {
                        this.$orgFilterTextbox.focus();
                        this.$orgFilterTextbox.removeData('focusttotextbox');
                    } 
                }
                catch (err) {
                    console.info(err);
                }
            },
            
            'chromosomeListChange': function (evt) {
                var $chrSelect = $(this),
                $chrFrom = $('#chr-from'),
                $chrTo = $('#chr-to'),
                $cont = $('#chr-location-info-ctrl'),
                $orgList = $('#of_chromosomal-region');
                
                // fill the location: from-to
                var selectedChr = $chrSelect.val();
                
                if (selectedChr !== '') {
                    
                    selectedChr = selectedChr.split('|');
                    
                    if (selectedChr.length == 3) {
                        
                        $chrFrom.val('1');
                        $chrTo.val(selectedChr[2]);
                        
                        // enabled all .chr-field
                        $cont.removeClass('chr-loading').removeAttr('data-disabled').find('.chr-field').removeAttr('disabled');
                        $orgList.focus();
                    }
                }
            },
            
            // ==========================================================================
            // utility functions used only for GeneFacets 
            'pad': function (str, len, pad, dir) {
                
                var STR_PAD_LEFT = 1, STR_PAD_RIGHT = 2, STR_PAD_BOTH = 3, len, pad, dir;
                
                if (typeof (len) == "undefined") {
                    len = 0;
                }
                if (typeof (pad) == "undefined") {
                    pad = ' ';
                }
                if (typeof (dir) == "undefined") {
                    dir = STR_PAD_RIGHT;
                }
                
                if (len + 1 >= str.length) {
                    switch (dir) {
                        case STR_PAD_LEFT:
                        str = Array(len + 1 - str.length).join(pad) + str;
                        break;
                        case STR_PAD_BOTH:
                        var right = Math.ceil((padlen = len - str.length) / 2);
                        var left = padlen - right;
                        str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                        break;
                        default:
                        str = str + Array(len + 1 - str.length).join(pad);
                        break;
                    }
                    // switch
                }
                return str;
            },
            
            /* from the old limit page */
            'firstLetterBinSrch': function (letter, list) {
                
                var form = document.forms[0];
                var field = form.orgTerm;
                
                var start = 0;
                var stop = list.options.length;
                var offset = 0;
                var index = - 1;
                var str = list.options[start].text.toLowerCase();
                
                while (start <= stop) {
                    var tmp = start + stop;
                    offset = parseInt(tmp / 2);
                    
                    str = list.options[(start + offset)].text.toLowerCase();
                    if (letter == str.charAt(0)) {
                        index = (start + offset);
                        break;
                    } else if (letter < str.charAt(0)) {-- stop;
                    } else if (letter > str.charAt(0)) {++ start;
                    }
                }
                return index;
            },
            
            'checkOrgKey': function (oThis, list) {
                
                if (! list) { return; }
                
                console.info("checkOrgKey");
                
                var list = oThis.list;
                var field = oThis.orgFilterTextbox;
                var str = field.value.toLowerCase();
                
                if (str == "") {
                    oThis.select(list, 0);
                    oThis._last = 0;
                    return;
                }
                
                if (str.length == 1) {
                    var let = str.charAt(0);
                    
                    var i = oThis.firstLetterBinSrch(let, list);
                    if (i != - 1) {
                        while (i != 0 && (list.options[i].text.toLowerCase().charAt(0)) == let) {
                            if (i > 0) {-- i;
                            }
                        }
                        if (i > 0) this._last =++ i;
                        
                        oThis.select(list, i);
                        
                        return;
                    } else {
                        console.info("not match");
                    }
                }
                
                // always better to search from the beginning of the list
                for (var i = 0; i < list.options.length;++ i) {
                    if (list.options[i].text.toLowerCase().indexOf(str) == 0) {
                        oThis.select(list, i);
                        return;
                    }
                }
            },
            
            'select': function (list, i) {
                if (list.selectedIndex != i) {
                    list.selectedIndex = i;
                    
                    console.info(GeneFacets.dcms);
                    
                    if (GeneFacets.dcms !== true) {
                        GeneFacets.fillChromosomeList();
                    }
                }
            },
            
            // Schedule a trigger the select.change
            'fillChromosomeList': function () {
                try {
                    clearTimeout(GeneFacets.timerObj);
                } catch (e) {
                }
                
                GeneFacets.timerObj = setTimeout(function () {
                    GeneFacets.$list.trigger('change');
                    GeneFacets.$orgFilterTextbox.focus();
                    GeneFacets.$orgFilterTextbox.data('focusttotextbox', 'true');                      
                },
                1000);
            },
            
            'onMoreFilterGroups':function(e){     
                jQuery('#filter_groups_apply').data('attachedTo',e.target.id);
                
                var loadedFgIds = [],activeFgIds = [];
                e.data.thisObj.jFacetObj.find('.facet .filter_grp a.clear').each(function(){
                    var filterGrp = jQuery(this).closest('ul.facet');
                    var filterId = 'fg_' + filterGrp.data('filter_id');
                    loadedFgIds.push(filterId);
                    if (filterGrp.find('li.selected')[0])
                        activeFgIds.push(filterId);
                });
                var fgChecks = jQuery('#more_filter_groups input');
                var $chrLocationWrapper = jQuery('#chr-location-facet-wrapper');
                
                fgChecks.each(function(){
                    var oThis = jQuery(this);
                    var currId = oThis.attr('id');
                    
                    if (currId ==='fg_chromosomal-region' && $chrLocationWrapper.hasClass('disabled')) {                    
                        oThis.removeAttr('checked');                        
                    } else {
                        oThis.attr('checked',jQuery.inArray(currId,loadedFgIds) != -1);
                    }
                    oThis.attr('disabled',oThis.data('always_show') == 'yes' || jQuery.inArray(currId,activeFgIds) != -1);
                   
                });
            },

            //no override yet
            'filterGroupsApplyClicked':function(e){
  
                e.preventDefault();
                var loadedFgIds = [], fgIdsAdd = [],fgIdsRemove = [],selFgIds = [],fgUserSelIds=[];
                var defaultShownFacetGroups = e.data.thisObj.DefaultShownFacetGroups;
                e.data.thisObj.jFacetObj.find('.facet .filter_grp a.clear').each(function(){
                    loadedFgIds.push('fg_' + jQuery(this).closest('ul.facet').data('filter_id'));
                });
                e.data.thisObj.jFacetObj.find('#more_filter_groups input').filter('input:checked').each(function(){
                    selFgIds.push(jQuery(this).attr('id'));
                });
                var last = selFgIds.length;
                for (var ind =0; ind <last; ind++  ){
                    if(jQuery.inArray(selFgIds[ind],loadedFgIds) == -1)
                        fgIdsAdd.push(selFgIds[ind].substring(3));
                    if(jQuery.inArray(selFgIds[ind],defaultShownFacetGroups) == -1)
                        fgUserSelIds.push(selFgIds[ind].substring(3));
                }
                last = loadedFgIds.length;
                for (var ind =0; ind <last; ind++  )
                    if (jQuery.inArray(loadedFgIds[ind],selFgIds) == -1)
                        fgIdsRemove.push(loadedFgIds[ind].substring(3));

                if (jQuery.inArray('fg_chromosomal-region', selFgIds) > -1) {
                    jQuery('#chr-location-facet-wrapper').removeClass('disabled').addClass('enabled').css('display', 'block');
                } else {
                    jQuery('#chr-location-facet-wrapper').removeClass('enabled').addClass('disabled').css('display', 'none');
                }

                e.data.thisObj.updateFiltersShown(fgIdsAdd,fgIdsRemove,fgUserSelIds);
                jQuery('#' + jQuery(this).data('attachedTo')).ncbipopper('close');
                
  
            },
        'filterClicked':function(e){
        	    e.preventDefault();
        	    var oThis = jQuery(this);
        	    var facetUl = oThis.closest("ul.facet");
        	    var filter_id = facetUl.data('filter_id'),value_id = oThis.data('value_id');
        	    var check_on = ! oThis.parent().hasClass("selected");
        	    
                //currentFilterString = "current-only;of_chromosomal-region=NC_005967 1-491328,NC_005967 100-200";
                //filter_id = "chromosomal-region";
                //value_id = "NC_005967 1-491328";
                
        	    if (filter_id == 'chromosomal-region' && value_id != 'fetch_more'){
        	        ncbi.sg.ping({jsevent: "click", 'chromosome_location_filter': 'removed'});
        	        var currFilterString = GeneFacets.getCurrentFilterString();      	        
                    if (filter_id == 'chromosomal-region') {
                        var arrfilterString=[];
                        var a=currFilterString.split(';');
                    
                        for (var i=0; i<a.length; i++) {	  
                            var label = a[i].split('=')[0];
                            var values = a[i].split('=')[1];
                            var arr_values = values !== undefined ? values.split(':') : [];
                            
                        if (label == 'of_' + filter_id) {
                            var pos = jQuery.inArray(value_id, arr_values);
                            if (pos > -1) {
                                arr_values.splice(pos, 1)
                            }
                            if ( arr_values.length ){
                                arrfilterString.push(label + '=' + arr_values.join(','));    
                            }
                                
                        } 
                        else {
                            arrfilterString.push(a[i]);
                        }
                      }
                    console.info(arrfilterString);
                    Portal.$send('FacetFilterSet',{'FacetsUrlFrag':GeneFacets.getNewUrlFrag(arrfilterString.join(';')),'BMFacets':{}});
                    return false;
                    }        	        
                       
        	    }
        	    else if (value_id == 'reset'  )
        	        Portal.$send('FacetFilterSet',{'FacetsUrlFrag': 'fcl=all'});
        	    else if (value_id == 'fetch_more'  ){
        	        if (!oThis.hasClass("jig-ncbipopper"))
        	            e.data.thisObj.FetchMoreOptions(filter_id,oThis);
        	    }
        	    else if (value_id == 'fetch_more_exp')
        	        e.data.thisObj.ShowAllFacetsToggle(e);
        	    else if (filter_id == 'field_search' ){
        	        if (!oThis.hasClass("jig-ncbipopper"))
        	            e.data.thisObj.removeFieldSelection();
        	    }
        	    else if (oThis.parent().hasClass('of_sel'))
        	        return;
        	    else if (facetUl.data('of')=='yes' && oThis.parent().hasClass('of_fil_val')){
        	        if (check_on)
        	            e.data.thisObj.applyOpenField(oThis,filter_id);
        	        else
        	            e.data.thisObj.removeOpenField(oThis,filter_id);
        	    }
        	    else if (facetUl.data('of')=='yes' && !oThis.parent().hasClass('fil_val'))
        	        e.data.thisObj.removeOpenField(oThis,filter_id);
        	        
        	    else if (facetUl.data('ss')=='yes')
        	        e.data.thisObj.handleFilterSelection({'filterId':filter_id.toString(),'valueId':value_id.toString(),'checkOn':check_on,'replaceAll':true});
        	    else if ((filter_id || value_id) && !oThis.hasClass("jig-ncbipopper") && !oThis.hasClass("facet_more_cancel") )
            	    e.data.thisObj.handleFilterSelection({'filterId':filter_id.toString(),'valueId':value_id.toString(),'checkOn':check_on,
            	        'dateSearch':facetUl.data('ds')=='yes','rangeSearch':facetUl.data('rs')=='yes'});
            	
                
        	}            
            ,
            'removeOpenField':function(elem,filterId){
        	    var currFilterString = this.getCurrentFilterString();
        	    var valueId = elem.data('value_id');
        
                    
                var toReplace = currFilterString.match(new RegExp('of_' + filterId + '=(.[^;]*)'));
                toReplace = toReplace ? toReplace[1] : '';
                var replaceWith = '';
                if (valueId != ''){
                    var toRemove = elem.data('qval');
                    replaceWith = toReplace;
                    var rg;
                    rg = new RegExp(':' + toRemove);
                    if(rg.exec(replaceWith))
                        replaceWith = replaceWith.replace(rg,'');
                    else{
                        rg = new RegExp(toRemove + ':');
                        if (rg.exec(replaceWith))
                            replaceWith = replaceWith.replace(rg,'');
                        else{
                            replaceWith = replaceWith.replace(new RegExp(toRemove),'');
                        }
                    }
                    
                    
                }
                currFilterString = this.replaceUrlParamFrag(currFilterString,'of_' + filterId,replaceWith,';')
                this.setValue('FacetsUrlFrag',"filters=" + currFilterString);
                this.handleFilterSelection({'filterId':filterId,'valueId':valueId,'checkOn':true});
	        },
	        
            'updateFiltersShown':function(fgIdsAdd,fgIdsRemove,fgUserSelIds){
                var last = fgIdsRemove.length;
                for (var ind =0; ind <last; ind++  ){
                    if (fgIdsRemove[ind] !== 'chromosomal-region') {
                        this.jFacetObj.find('ul.facet[data-filter_id = ' + fgIdsRemove[ind] + ']').remove();    
                    }
                }
                    
                last = fgIdsAdd.length -1;
                for (var ind = last; ind >= 0; ind--  )
                    this.FetchMoreOptions(fgIdsAdd[ind],null);
                //update the selection on the session variables
                this.updateUserSelectionAttrs(fgUserSelIds,fgIdsRemove);
            }	        
        
        });
    });
})(jQuery);


jQuery.expr[ ':'].Contains = function (a, i, m) {
    //return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    return jQuery(a).text().indexOf(m[3]) >= 0;
};
;
Portal.Portlet.Entrez_DisplayBar = Portal.Portlet.extend({

	init: function(path, name, notifier) {
		console.info("Created DisplayBar");
		this.base(path, name, notifier);
		
		// for back button compatibility reset values when page loads
		if (this.getInput("Presentation")){
		    this.setValue("Presentation", this.getValue("LastPresentation"));
		    Portal.Portlet.Entrez_DisplayBar.Presentation = this.getValue("LastPresentation");
		}
		if (this.getInput("Format")){
		    this.setValue("Format", this.getValue("LastFormat"));
		    Portal.Portlet.Entrez_DisplayBar.Format = this.getValue("LastFormat");
		}
		if (this.getInput("PageSize")){
		    this.setValue("PageSize", this.getValue("LastPageSize"));
		    Portal.Portlet.Entrez_DisplayBar.PageSize = this.getValue("LastPageSize");
		}
		if (this.getInput("Sort")){
		    this.setValue("Sort", this.getValue("LastSort"));
		    Portal.Portlet.Entrez_DisplayBar.Sort = this.getValue("LastSort");
		}
		this.ResetDisplaySelections();
		this.ResetSendToSelection();
		
    	jQuery( 
            function(){
        
                var animationTime = jQuery("#sendto2").ncbipopper("option","openAnimationTime");
                var currentCnt = 0;
                var expTimer;
        
                function testPosition(){
                    jQuery(window).trigger("ncbipopperdocumentresize");
                    currentCnt+=10;
                    if (currentCnt<animationTime) {
                        expTimer = window.setTimeout(testPosition,10);
                    }
                }
        
                jQuery("#send_to_menu2 input").on("change click", 
                    function(){
                        currentCnt = 0;
                        if(expTimer) window.clearTimeout(expTimer);
                        testPosition();
                    } 
                );
        
            }
        );
		        
	},
	
	
	send: {
		'Cmd': null, 
		'PageSizeChanged': null,
		'ResetSendTo': null,
		'ResetCurrPage': null
	},
	
	
	
	listen: {
		
		/* browser events */
			
		"sPresentation<click>": function(e, target, name){
		    this.PresentationClick(e, target, name); 
		},
		
		"sPresentation2<click>": function(e, target, name){
		    this.PresentationClick(e, target, name); 
		},
		
		"sPageSize<click>": function(e, target, name){	
		    this.PageSizeClick(e, target, name);
		},
		
		"sPageSize2<click>": function(e, target, name){	
		    this.PageSizeClick(e, target, name);
		},
		
		"sSort<click>": function(e, target, name){
		    this.SortClick(e, target, name);
		},
		
		"sSort2<click>": function(e, target, name){
		    this.SortClick(e, target, name);
		},
		
		"SetDisplay<click>": function(e, target, name){
			this.DisplayChange(e, target, name); 
		},
		
		"SendTo<click>": function(e, target, name){
			var sendto = target.value;
            var idx = target.getAttribute('sid') > 10? "2" : "";
			this.SendToClick(sendto, idx, e, target, name); 
		},
		
		"SendToSubmit<click>": function(e, target, name){
		    e.preventDefault();
		    var cmd = target.getAttribute('cmd').toLowerCase();
		    var idx = target.getAttribute('sid') > 10? "2" : "";
			this.SendToSubmitted(cmd, idx, e, target, name); 
		},
		
		/* messages from message bus*/
		
		'ResetSendTo' : function(sMessage, oData, sSrc) {
		    this.ResetSendToSelection();
		}
	
	}, // end listen
	
	
	
	/* functions */
	
	'PresentationClick': function(e, target, name){
		Portal.Portlet.Entrez_DisplayBar.Presentation = target.value;
		Portal.Portlet.Entrez_DisplayBar.Format = target.getAttribute('format');
		this.DisplayChange();
	},
	
	'PageSizeClick': function(e, target, name){ 
		Portal.Portlet.Entrez_DisplayBar.PageSize = target.value;
		this.DisplayChange();
	},
	
	'SortClick': function(e, target, name){
		Portal.Portlet.Entrez_DisplayBar.Sort = target.value;
		this.DisplayChange();
	},
	
	'DisplayChange': function(e, target, name){
	    var submit = false;
	    var extractdb = window.location.pathname.match(/\/([A-Za-z]+)\/?/); 
	    var db = (extractdb[1] && extractdb[1] != '') ? extractdb[1] : "";
	    
	    if (db != '' && getEntrezSelectedItemCount() == 1){
	        //get id, attach db and report, and link	        
	        var URL = '/' + db + '/' + getEntrezSelectedItemList() + '?report=' + Portal.Portlet.Entrez_DisplayBar.Presentation
	        + (Portal.Portlet.Entrez_DisplayBar.Format.toLowerCase() == 'text' ? '&format=text' : '');
	        window.location = URL;
	    }
	    else if (db != '' && getEntrezResultCount() == 1 && window.location.href != ""){   
	        //remove report= from URL and insert new report= into URL
	        if ((window.location.pathname != '' && window.location.pathname.match(/\/[A-Za-z]+\/\w*\d+\w*/))
	            || window.location.href.match(/\/[A-Za-z]+\/??.*term=[^&\s]+/)
	        ){
	            var URL = window.location.href.replace(/&?report=\w+/, "").replace(/\?&/, "?");
	            var hashtagindex = URL.indexOf("#");
	            if (hashtagindex >= 0){
	                URL = URL.substring(0, hashtagindex);
	            }
	            URL += (URL.match(/\?/) ? (URL.match(/\?[^\s]+/) ? "&" : "") : "?") 
	                + "report=" + Portal.Portlet.Entrez_DisplayBar.Presentation
	                + (Portal.Portlet.Entrez_DisplayBar.Format.toLowerCase() == 'text' ? '&format=text' : '');
	            window.location = URL;    
	        }
	        else {
	            submit = true;
	        }
	    }
	    else{
            submit = true;
        }
        
        if (submit){
            this.send.Cmd({'cmd': 'displaychanged'});
            
    	    this.SetPresentationChange(e, target, name);
    	    this.SetPageSizeChange(e, target, name);
    	    this.SetSortChange(e, target, name);
    	    
    	    Portal.requestSubmit();
	    }
	},
	
	'SetPresentationChange': function(e, target, name){
        this.setValue("Presentation", Portal.Portlet.Entrez_DisplayBar.Presentation);
	    this.setValue("Format", Portal.Portlet.Entrez_DisplayBar.Format);
	},
	
	'SetPageSizeChange': function(e, target, name){
	    this.setValue("PageSize", Portal.Portlet.Entrez_DisplayBar.PageSize);
		if (this.getValue("PageSize") != this.getValue("LastPageSize")){
    		//send PageSizeChanged
    		this.send.PageSizeChanged({
    			'size': this.getValue("PageSize"),
                'oldsize': this.getValue("LastPageSize")
    		});	
		}
	},
		
	'SetSortChange': function(e, target, name){
	    if (this.getInput("Sort")){
	        this.setValue("Sort", Portal.Portlet.Entrez_DisplayBar.Sort);
            if (this.getValue("Sort") != this.getValue("LastSort")){
                // ask to reset CurrPage 
    		    this.send.ResetCurrPage();
    		}
    		
    		// set sort in cookie   		
    		var extractdb = window.location.pathname.match(/\/([A-Za-z]+)\/?/); 
    	    var db = (extractdb[1] && extractdb[1] != '') ? extractdb[1] : "";
    	    
    		this.SetSortCookie(Portal.Portlet.Entrez_DisplayBar.Sort, db);
        }    	
	},
		
	'SendToClick': function(sendto, idx, e, target, name) {
		if(sendto.toLowerCase() == 'file'){
			this.SendToFile(sendto, idx);
		}
		else if(sendto.toLowerCase() == 'addtocollections'){
			this.SendToCollections(sendto, idx);
		}
		else if(sendto.toLowerCase() == 'addtoclipboard'){
		    this.SendToClipboard(sendto, idx);
		}
	},
	
	'SendToSubmitted': function(cmd, idx, e, target, name){
	    if (cmd == 'file'){
	         this.SendToFileSubmitted(cmd, idx, target);
	    }
	    else if (cmd == 'addtocollections'){
	    	this.SendToCollectionsSubmitted(cmd, idx, target);
	    }
	    this.send.Cmd({'cmd': cmd});
	    Portal.requestSubmit();
	},
	
	'ResetSendToSelection': function(){
	    var SendToInputs = this.getInputs("SendTo");
	    for (var j = 0; j < SendToInputs.length; j++){
		    if (SendToInputs[j].checked){
		        SendToInputs[j].checked = false;
			}
		}
	},
	
	'SendToFile': function(name, idx){
	    // generate content
	    var count = this.getItemCount();
		var content = 'Download ' + count + ' items.';
		this.addSendToHintContent(name, idx, content);
	},
	
	'SendToCollections': function(name, idx){
	    // generate content
        var count = this.getItemCount();
        var content= 'Add ';
        var optionNode = document.getElementById("coll_start_option" + idx);
        if (count > Portal.Portlet.Entrez_DisplayBar.CollectionsUpperLimit){
            content += Portal.Portlet.Entrez_DisplayBar.CollectionsUpperLimitText;
            if (optionNode){
            	optionNode.className = '';
            }
        }
        else{
            content += count;
            if (optionNode){
            	optionNode.className = 'hidden';
            }
        }
        content += " items.";
        this.addSendToHintContent(name, idx, content);	
	},
	
	'SendToClipboard': function(name, idx){
	    // generate content
	    var count = this.getItemCount();
        var content= 'Add ';
        if (count > Portal.Portlet.Entrez_DisplayBar.ClipboardLimit){
            content += "the first " + Portal.Portlet.Entrez_DisplayBar.ClipboardLimit;
        }
        else{
            content += count;
        }
        content += " items.";
        this.addSendToHintContent(name, idx, content);
	},
	
	'getItemCount': function(){
	    // ask for selected items count from DbConnector
	    var selectedItemCount = getEntrezSelectedItemCount();
	    if (selectedItemCount > 0){
	        return selectedItemCount;
	    }
	    else{
	        // ask for result count from Entrez_ResultsController
	        return getEntrezResultCount();
	    }
	},
	
	'addSendToHintContent': function(name, idx, content){
	    var hintNode = document.getElementById("submenu_" + name + "_hint" + idx);
	    if (hintNode){
	        hintNode.innerHTML = content;
	        hintNode.className = 'hint';
	    }
	},
	
	'AddSendToSubmitEvent': function(){
	    // add event for SendTo submit button click. 
	    // This call is needed if the position of the submit button node has changed in relation to its parent node. 
        this.addEvent("SendToSubmit", "click", function(e, target, name) {
            var cmd = target.getAttribute('cmd');
            this.SendToSubmitted(cmd, e, target, name); 
        }, false);
    },
    
    'SendToFileSubmitted': function(cmd, idx, target){
         if (this.getInput("FFormat" + idx)){
             this.setValue("FileFormat", this.getValue("FFormat" + idx));
         }
         if (this.getInput("FSort" + idx)){
             this.setValue("FileSort", this.getValue("FSort" + idx));
         }
    },
    
    'SendToCollectionsSubmitted': function(cmd, idx, target){
         if (document.getElementById("coll_start" + idx)){
             document.getElementById("coll_startindex").value = document.getElementById("coll_start" + idx).value;
         }
    },
    
    'ResetDisplaySelections': function(){
        if (this.getInput("Presentation")){
            var selection = this.getValue("Presentation").toLowerCase() + this.getValue("Format").toLowerCase();
            if (document.getElementById(selection)){
                document.getElementById(selection).checked = true;
            }
            // bottom display bar
            if (document.getElementById(selection + "2")){
                document.getElementById(selection + "2").checked = true;
            }
            
        }
        if (this.getInput("PageSize")){
            var selection = 'ps' + this.getValue("PageSize");
            if (document.getElementById(selection)){
                document.getElementById(selection).checked = true;
            }
            // bottom display bar
            if (document.getElementById(selection + "2")){
                document.getElementById(selection + "2").checked = true;
            }
        }
        if (this.getInput("Sort")){
            var selection = this.getValue("Sort") || 'none'; 
            if (document.getElementById(selection)){
                document.getElementById(selection).checked = true;
            }
            // bottom display bar
            if (document.getElementById(selection + "2")){
                document.getElementById(selection + "2").checked = true;
            }
        }
    },
    
    'SetSortCookie': function(sort, db){
	    if (db != ''){
            var d = new Date();
            d.setTime(d.getTime() + (365*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            
            var newCookie = db + ":" + sort;
            var oldCookie = this.getCookie('entrezSort');
            if (oldCookie != ''){
                if (oldCookie.indexOf(db) != -1){
                    var oldSortVal = oldCookie.substring(oldCookie.indexOf(db));
                    if (oldSortVal.indexOf('&') != -1){
                        oldSortVal = oldSortVal.substring(0, oldSortVal.indexOf('&'));
                    }
                    newCookie = oldCookie.replace(oldSortVal, newCookie);
                }
                else{
                    newCookie = newCookie + "&" + oldCookie;
                }
            } 
            newCookie = "entrezSort=" + newCookie + ";domain=.ncbi.nlm.nih.gov;path=/;" + expires;
            document.cookie = newCookie;
            
		}
    },
    
    // from http://www.w3schools.com/js/js_cookies.asp
    'getCookie': function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        console.info("cookie count: " + ca.length);
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    } 
	
},
{
    Presentation: '',
    Format: '',
    PageSize: '',
    Sort: '',
    CollectionsUpperLimit: 1000,
	CollectionsUpperLimitText: '1,000',
	ClipboardLimit: 500
});


;
Portal.Portlet.Gene_DisplayBar = Portal.Portlet.Entrez_DisplayBar.extend({
	
	init: function (path, name, notifier) {
		this .base(path, name, notifier);
	},
	
	'PresentationClick': function(e, target, name){
		Portal.Portlet.Entrez_DisplayBar.Presentation = target.value;
		Portal.Portlet.Entrez_DisplayBar.Format = target.getAttribute('format');
        
        /*
        var $seeDiscontinuedLink = jQuery('.gs-see-all');
        var $seeOnlyCurrentLink = jQuery('.gs-show-only-current');
        
        if ($seeDiscontinuedLink.length) {
            window.GeneFacets.setValue('filters=current-only;replaced;discontinued');
        }
        */
        
		this.DisplayChange();
	}
});
;
jQuery(function($j) {
      var formState = {
          overrideBackends: false,
          backends: {}
      };
      
      // Name of the cookie
      var cookieName;
      
      // Mostly just for debugging, store the cookie string value here
      // rather than in the sub-function scope
      var cookieStr;
      
      // An object representation of the cookie.  This is converted from the
      // XML cookie value on init.  The form controls will manipulate this,
      // and when the user clicks "Go", this will be converted back into
      // XML.
      var cookieObj;

      ///////////////////////////////////////////////////////////////////////////////
      function cbChanged(event) {
          //console.info("Event caught: " + event);
          var target = $j(event.target);
          var id = target.attr("id");
          var value = target.attr("value");
          var checked = target.attr("checked");
          /*console.info("target id: '" + id + 
                       "', value: '" + value + 
                       "', checked: '" + checked + "'");*/
          
          
          if (id == "besetsel-cb") {
              if (checked) {
                  $j("#besetsel-sel").removeAttr("disabled");
                  besetSelFormToObj();
              }
              else {
                  $j("#besetsel-sel").attr("disabled", 1);
                  delete cookieObj.besetName;
              }
          }
          else if (id == "besetsel-sel") {
              besetSelFormToObj();
          }
          else {
              var m;
              if (m = id.match(/besetsel-be-(.*?)-cb/)) {
                  var backend = m[1];
                  //console.info(">>>backend checkbox:  " + backend);
                  if (checked) {
                      $j("#besetsel-be-" + backend + "-text").removeAttr("disabled");
                      beUrlFormToObj(backend);
                  }
                  else {
                      $j("#besetsel-be-" + backend + "-text").attr("disabled", 1);
                      delete cookieObj.backendUrls[backend];
                  }
              }
              else if (m = id.match(/besetsel-be-(.*?)-text/)) {
                  backend = m[1];
                  //console.info(">>>backend text:  " + backend);
                  beUrlFormToObj(backend);
              }
          }
          
          // PMC-11784 and PMC-11785.
          // This fixes a nasty IE bug.  It causes a slight flash when the user
          // clicks a checkbox, but it works.
          if (jQuery.browser.msie){
              target.hide();
              window.setTimeout( function(){ target.show();}, 0 );
          }
          
      }

      ///////////////////////////////////////////////////////////////////////////////
      // besetSelFormToObj()
      // This is called by a couple of event handlers and decodes the
      // currently selected BESet (in the drop-down form) and sets the
      // cookieObj.besetName accordingly.

      function besetSelFormToObj()
      {
          cookieObj.besetName = $j("#besetsel-sel").val();
      }

      ///////////////////////////////////////////////////////////////////////////////
      // beUrlFormToObj(backend)
      // This is similar, and takes care of reading the text value from the
      // form and stuffing it into the object

      function beUrlFormToObj(backend) {
          var value = $j("#besetsel-be-" + backend + "-text").attr("value");
          if (value) cookieObj.backendUrls[backend] = value;
      }

      ///////////////////////////////////////////////////////////////////////////////
      function init() {
          if ($j("#besetsel-form").length < 1)
          {
              return;
          }
          
          cookieName = $j("#besetsel-form").attr("cookieName");
          cookieObj = cookieXmlToJson(cookieName);
          initFormState();

          // Set event handers
          $j("#besetsel-form .besetsel-control").change(function(event) {
              cbChanged(event);
          });
          $j("#besetsel-go-button").click(function(event) {
              goButton(event);
          });
          $j("#besetsel-reset-button").click(function(event) {
              resetButton(event);
          });
          
          // This "pullout" might be empty, in the case of the BESet being
          // selected by path segment instead of cookie.  In that case, the
          // tab acts as a watermark, just to identify the BESet, and we
          // don't want to allow it to be "pulled out".  So we'll set the
          // width to 0 in that case.
          var w = $j("#besetsel-go-button").length > 0 ? "400px" : "0px";

          // Put it into the sidecontent pullout
          $j("#besetsel-form").sidecontent({
              /*classmodifier: "besetsel",*/
              attachto: "rightside",
              width: w,
              opacity: "0.8",
              pulloutpadding: "5",
              textdirection: "vertical",
              clickawayclose: 0,
              titlenoupper: 1
          });
          
          var pulloutColor = $j("#besetsel-form").attr("pulloutColor");
          //alert("color is " + pulloutColor);
          $j("#besetsel-form").data("pullout").css("background-color", pulloutColor || '#663854');
          
          if ($j("#besetsel-go-button").size() > 0) {
              $j("#besetsel-form").data("pullout").css({
                  "border-top": "ridge gray 5px",
                  "border-bottom": "ridge gray 5px",
                  "border-left": "ridge gray 5px"
              });
          }
      }

      ///////////////////////////////////////////////////////////////////////////////
      // goButton(event)
      // Handle the user-click of the "Go!" button.
      
      function goButton(event) {
          // Convert the object into XML
          var cookieXml = "<Backends><BESet" + ( cookieObj.besetName ? (" name='" + cookieObj.besetName + "'>") : ">" );
          for (var backend in cookieObj.backendUrls) {
              //console.info("+++ backend " + backend);
              cookieXml += 
                "<Backend name='" + backend + "'>" + xmlEscape(cookieObj.backendUrls[backend]) + "</Backend>";
          }
          cookieXml += "</BESet></Backends>";
          //console.info(cookieXml);
          
          // Set the cookie
          document.cookie = cookieName + "=" + encodeURIComponent(cookieXml) +
                            "; max-age=604800" +
                            "; path=/" +
                            "; domain=nih.gov";
          // Reload the page
          window.location.reload();
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      // resetButton(event)
      // Handle the user-click of the "Reset" button.
      // Does the same thing as "Go!", but sets the cookie to the empty string.

      function resetButton(event) {
          // Clear the cookie
          document.cookie = cookieName + "=" + 
                            "; max-age=604800" +
                            "; path=/" +
                            "; domain=nih.gov";
          // Reload the page
          window.location.reload();
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      function xmlEscape(str) {
          str = str.replace(/\&/g, '&amp;')
                   .replace(/\</g, '&lt;')
                   .replace(/\>/g, '&gt;')
                   .replace(/\"/g, '&quot;')
                   .replace(/\'/g, '&apos;');
          return str;
      }

      ///////////////////////////////////////////////////////////////////////////////
      // This function reads the cookie value and initializes the form state
      // Don't assume anything about the form state -- redo everything.
      function initFormState() {

          var besetName = cookieObj.besetName;

          if (!besetName) {
              $j("#besetsel-cb").removeAttr("checked");
              $j("#besetsel-sel").attr("disabled", 1);
          }
          else {
              var selBESet = $j("#besetsel-opt-" + besetName);
              if (selBESet.length != 0) {
                  $j("#besetsel-cb").attr("checked", 1);
                  $j("#besetsel-sel").removeAttr("disabled");
                  selBESet.attr("selected", 1);
              }
              else {
                  $j("#besetsel-cb").removeAttr("checked");
                  $j("#besetsel-sel").attr("disabled", 1);
              }
          }
          
          // Foreach backend in the form
          $j(".besetsel-be-cb").each(function(i) {
              var id = $j(this).attr("id");
              var beName = id.match(/besetsel-be-(.*?)-cb/)[1];
              //console.info("### backend, id is '" + id + "', beName is '" + beName + "'");
              if (!beName) return;
              
              // See if there's a corresponding element in the cookie
              if (!cookieObj.backendUrls ||
                  !cookieObj.backendUrls[beName]) {
                  //console.info("Didn't find " + beName);
                  $j("#besetsel-be-" + beName + "-cb").removeAttr("checked");
                  $j("#besetsel-be-" + beName + "-text").attr("disabled", 1);
              }
              else {
                  //console.info("Found " + beName);
                  $j("#besetsel-be-" + beName + "-cb").attr("checked", 1);
                  var textbox = $j("#besetsel-be-" + beName + "-text");
                  textbox.removeAttr("disabled");
                  textbox.attr("value", cookieObj.backendUrls[beName]);
              }
          });
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      // This gets the value of the <snapshot>_beset cookie, which is in XML, and turns it
      // from this:
      //   <BESet name='test'>
      //     <BackendUrl backend='tagserver' url='bingo'/>
      //     ...
      //   </BESet>
      // Into this (note that everything is optional):
      //   { besetName: 'test',
      //     backendUrls: {
      //         tagserver: 'bingo', ... }
      //   }
      // If there is no cookie set or parsing fails, this returns {}.
      
      function cookieXmlToJson(cookieName) {
          var cookieObj = {
              backendUrls: {}
          };

          cookieStr = getCookie(cookieName);
          //console.info("cookie value is '" + cookieStr + "'");

          // Parse XML
          try {
              var cookieXml = $j(cookieStr);
          }
          catch(err) {
              return cookieObj;
          }
          
          var besetElem = cookieXml.find('BESet');
          if (besetElem.length == 0) {
              // No valid cookie value found.
              return cookieObj;
          }
          
          var besetName = besetElem.attr("name");
          if (besetName) {
              cookieObj.besetName = besetName; 
          }
          
          var backends = besetElem.find("backend");
          if (backends.length != 0) {
              backends.each(function (i) {
                  var e = $j(backends[i]);
                  cookieObj.backendUrls[e.attr("name")] = e.text();
                  //console.info("Setting " + e.attr("backend") + ": " + e.attr("url"));
              })
          }
          
          return cookieObj;
      }

      ///////////////////////////////////////////////////////////////////////////////
      function getCookie(name) {
          var allCookies = document.cookie;
          //console.info("allCookies = " + allCookies);
          var pos = allCookies.indexOf(name + "=");
          if (pos != -1) {
              var start = pos + (name + "=").length;
              var end = allCookies.indexOf(";", start);
              if (end == -1) end = allCookies.length;
              return decodeURIComponent(allCookies.substring(start, end)); 
          }
          return "";
      }
        
    init();
    
});



;
(function($)
{
    // http-all-ok - no https problems here
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Side-Content/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.2
	
	var classModifier = "";
	var sliderCount = 0;
	var sliderWidth = "400px";
	
	var attachTo = "rightside";
	
	var totalPullOutHeight = 0;
	
	function CloseSliders (thisId) {
		// Reset previous sliders
		for (var i = 0; i < sliderCount; i++) {
			var sliderId = classModifier + "_" + i;
			var pulloutId = sliderId + "_pullout";
			
			// Only reset it if it is shown
			if ($("#" + sliderId).width() > 0) {

				if (sliderId == thisId) {
					// They have clicked on the open slider, so we'll just close it
					showSlider = false;
				}

				// Close the slider
				$("#" + sliderId).animate({
					width: "0px"
				}, 100);
				
				// Reset the pullout
				if (attachTo == "leftside") {
					$("#" + pulloutId).animate({
						left: "0px"
					}, 100);
				} else {
					$("#" + pulloutId).animate({
						right: "0px"
					}, 100);
				}
			}
		}
	}
	
	function ToggleSlider () {
		var rel = $(this).attr("rel");

		var thisId = classModifier + "_" + rel;
		var thisPulloutId = thisId + "_pullout";
		var showSlider = true;
		
		if ($("#" + thisId).width() > 0) {
			showSlider = false;
		}

        CloseSliders(thisId);
		
		if (showSlider) {
			// Open this slider
			$("#" + thisId).animate({
				width: sliderWidth
			}, 250);
			
			// Move the pullout
			if (attachTo == "leftside") {
				$("#" + thisPulloutId).animate({
					left: sliderWidth
				}, 250);
			} else {
				$("#" + thisPulloutId).animate({
					right: sliderWidth
				}, 250);
			}
		}
		
		return false;
	};

	$.fn.sidecontent = function (settings) {
	
		var config = {
			classmodifier: "sidecontent",
			attachto: "rightside",
			width: "300px",
			opacity: "0.8",
			pulloutpadding: "5",
			textdirection: "vertical",
			clickawayclose: false
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		return this.each(function () {
		
			$This = $(this);
			
			// Hide the content to avoid flickering
			$This.css({ opacity: 0 });
			
			classModifier = config.classmodifier;
			sliderWidth = config.width;
			attachTo = config.attachto;
			
			var sliderId = classModifier + "_" + sliderCount;
			var sliderTitle = config.title;
			
			// Get the title for the pullout
			sliderTitle = $This.attr("title");
			
			// Start the totalPullOutHeight with the configured padding
			if (totalPullOutHeight == 0) {
				totalPullOutHeight += parseInt(config.pulloutpadding);
			}

			if (config.textdirection == "vertical") {
				var newTitle = "";
				var character = "";
				for (var i = 0; i < sliderTitle.length; i++) {
					character = sliderTitle.charAt(i).toUpperCase();
					if (character == " ") {
						character = "&nbsp;";
					}
					newTitle = newTitle + "<span>" + character + "</span>";
				}
				sliderTitle = newTitle;
			}
			
			// Wrap the content in a slider and add a pullout			
			$This.wrap('<div class="' + classModifier + '" id="' + sliderId + '"></div>').wrap('<div style="width: ' + sliderWidth + '"></div>');
            var pullout = $('<div class="' + classModifier + 'pullout" id="' + sliderId + '_pullout" rel="' + sliderCount + '">' + sliderTitle + '</div>').insertBefore($("#" + sliderId));
            
            // Store reference to the tab element in parent 
            $This.data('pullout', pullout);
			
			if (config.textdirection == "vertical") {
				$("#" + sliderId + "_pullout span").css({
					display: "block",
					textAlign: "center"
				});
			}
			
			// Hide the slider
			$("#" + sliderId).css({
				position: "absolute",
				overflow: "hidden",
				top: "0",
				width: "0px",
				zIndex: "1",
				opacity: config.opacity
			});
			
			// For left-side attachment
			if (attachTo == "leftside") {
				$("#" + sliderId).css({
					left: "0px"
				});
			} else {
				$("#" + sliderId).css({
					right: "0px"
				});
			}
			
			// Set up the pullout
			$("#" + sliderId + "_pullout").css({
				position: "absolute",
				top: totalPullOutHeight + "px",
				zIndex: "1000",
				cursor: "pointer",
				opacity: config.opacity
			})
			
			$("#" + sliderId + "_pullout").live("click", ToggleSlider);
			
			var pulloutWidth = $("#" + sliderId + "_pullout").width();
			
			// For left-side attachment
			if (attachTo == "leftside") {
				$("#" + sliderId + "_pullout").css({
					left: "0px",
					width: pulloutWidth + "px"
				});
			} else {
				$("#" + sliderId + "_pullout").css({
					right: "0px",
					width: pulloutWidth + "px"
				});
			}
			
			totalPullOutHeight += parseInt($("#" + sliderId + "_pullout").height());
			totalPullOutHeight += parseInt(config.pulloutpadding);
			
			var suggestedSliderHeight = totalPullOutHeight + 30;
			if (suggestedSliderHeight > $("#" + sliderId).height()) {
				$("#" + sliderId).css({
					height: suggestedSliderHeight + "px"
				});
			}
			
			if (config.clickawayclose) {
				$("body").click( function () {
					CloseSliders("");
				});
			}
			
			// Put the content back now it is in position
			$This.css({ opacity: 1 });
			
			sliderCount++;
		});
		
		return this;
	};
})(jQuery);
;
Portal.Portlet.KISSensor = Portal.Portlet.extend({
	init: function(path, name, notifier) {
	    var oThis = this;
		oThis.base(path, name, notifier);
		
		Portal.Portlet.KISSensor.kis_start_time = new Date();
		
        jQuery(document).ready(function (event) {
            (function ($) {
                console.info('============================');
                console.info('Portal.Portlet.KISSensor');
                console.info('============================');
                
                var $kisSensor = $('#kis-sensor'), 
                    exp = $kisSensor.length && $kisSensor.attr('data-experiment'), 
                    term = $kisSensor.length && $kisSensor.attr('data-term');
                
                if ($kisSensor.length && typeof exp !== 'undefined' && typeof term !== 'undefined') {
                    try {
                        var siteName = document.forms[0][ 'p$st'].value,
                            portletPath = oThis.path,
                            actionName = "KISSensorAjaxAction", 
                            callback = oThis.responder,
                            userArgs = {},
                            args = {'ShowExperiment': exp, 'term': term};
                            
                            // fix portlet path for nuccore and protein
                            if (portletPath == 'EntrezSystem2.PEntrez.Nuccore.Sequence_ResultsPanel.KISSensor') {
                                portletPath = 'EntrezSystem2.PEntrez.Nuccore.Sequence.Sequence_ResultsPanel.KISSensor';
                            }
                            else if (portletPath === 'EntrezSystem2.PEntrez.Protein.Sequence_ResultsPanel.KISSensor'){
                                portletPath = 'EntrezSystem2.PEntrez.Protein.Sequence.Sequence_ResultsPanel.KISSensor';
                            }
                            
                        var resp = xmlHttpCall(siteName, portletPath, actionName, args, callback, userArgs, oThis);
                    }
                    catch (err) {
                        console.info(err);
                    }   
                    // remove itself from the DOM
                    // $kisSensor.remove();
                }
                
            })(jQuery);
        });        
	},
	'responder': function(responseObject, userArgs) {
	    var oThis = Portal.Portlet.KISSensor;
	    var kis_stop_time = new Date();
	    
        console.info('============================');	    
	    ncbi.sg.ping({jsevent: "kis_load_time_for_portal", 'kis_load_time_for_portal': kis_stop_time - oThis.kis_start_time});
	    console.log('kis_load_time_for_portal: ' + (kis_stop_time - oThis.kis_start_time));
        console.info('============================');
        
        try {
            //Handle timeouts
            if (responseObject.status == 408) {
                //display an error indicating a server timeout
            }
            // deserialize the string with the JSON object
            var response = '(' + responseObject.responseText + ')';
            var jsonObject = eval(response);
            console.info(jsonObject);
        }
        catch (err) {
            //display an error
             console.info(err);
        }
        ncbi.sg.pinger
	}
});
   

;
Portal.Portlet.Gene_KISSensor = Portal.Portlet.KISSensor.extend({
	init: function(path, name, notifier) {
	    var oThis = this;
		oThis.base(path, name, notifier);
	}
});
   

;
(function( $ ){ // pass in $ to self exec anon fn

    // on page ready    
    
        $( 'div.portlet' ).each( function() {

            // get the elements we will need
            var $this = $( this );
            var anchor = $this.find( 'a.portlet_shutter' );
            var portBody = $this.find( 'div.portlet_content' );

            // we need an id on the body, make one if it doesn't exist already
            // then set toggles attr on anchor to point to body
            var id = portBody.attr('id') || $.ui.jig._generateId( 'portlet_content' );
            portBody.attr('id', id );
            anchor.attr('toggles', id );

            // initialize jig toggler with proper configs, then remove some classes that interfere with 
            // presentation
            var togglerOpen = anchor.hasClass('shutter_closed')? false : true; 
            anchor.ncbitoggler({
                isIcon: false,
                initOpen: togglerOpen 
            }).
                removeClass('ui-ncbitoggler-no-icon').
                removeClass('ui-widget');

            // get rid of ncbitoggler css props that interfere with portlet styling, this is hack
            // we should change how this works for next jig release
            anchor.css('position', 'absolute').
                css('padding', 0 );

            $this.find( 'div.ui-helper-reset' ).
                removeClass('ui-helper-reset');

            portBody.removeClass('ui-widget').
                css('margin', 0);

            // trigger an event with the id of the node when closed
            anchor.bind( 'ncbitogglerclose', function() {
                anchor.addClass('shutter_closed');
            });

            anchor.bind('ncbitoggleropen', function() {
                anchor.removeClass('shutter_closed');
            });

        });  // end each loop and end on page ready
})( jQuery );
/*
jQuery(document).bind('ncbitogglerclose ncbitoggleropen', function( event ) {
           var $ = jQuery;
           var eventType = event.type;
           var t = $(event.target);
           
          alert('event happened ' + t.attr('id'));
   
           if ( t.hasClass('portlet_shutter') || false ) { // if it's a portlet
               // get the toggle state
               var sectionClosed = (eventType === 'ncbitogglerclosed')? 'true' : 'false';
               alert ('now call xml-http');

            }
        });
*/

Portal.Portlet.NCBIPageSection = Portal.Portlet.extend ({
	init: function (path, name, notifier){
		this.base (path, name, notifier);
		
		this.AddListeners();
	},
    
	"AddListeners": function(){
        var oThis = this;
        
		jQuery(document).bind('ncbitogglerclose ncbitoggleropen', function( event ) {
            var $ = jQuery;
            var eventType = event.type;
            var t = $(event.target);
            
            // proceed only if this is a page section portlet {
            if ( t.hasClass('portlet_shutter')){
                var myid = '';
                if (oThis.getInput("Shutter")){
                    myid = oThis.getInput("Shutter").getAttribute('id');
                }
    
                // if the event was triggered on this portlet instance
                if (t.attr('id') && t.attr('id') == myid){
                    // get the toggle state
                    var sectionClosed = (eventType === 'ncbitogglerclose')? 'true' : 'false';
                    // react to the toggle event
                    oThis.ToggleSection(oThis.getInput("Shutter"), sectionClosed);
                }
            } // if portlet            
        });
	},
	
	"ToggleSection": function(target, sectionClosed){
	   // if remember toggle state, save the selection and log it
	   if (target.getAttribute('remembercollapsed') == 'true'){
	       this.UpdateCollapsedState(target, sectionClosed);
	   }else {
	       this.LogCollapsedState(target, sectionClosed);
	   }
	},
	
	"UpdateCollapsedState": function(target, sectionClosed){
	    var site = document.forms[0]['p$st'].value;
	    var args = { "PageSectionCollapsed": sectionClosed, "PageSectionName": target.getAttribute('pgsec_name')};
	    // Issue asynchronous call to XHR service
        var resp = xmlHttpCall(site, this.getPortletPath(), "UpdateCollapsedState", args, this.receiveCollapse, {}, this);  
	},
	
	"LogCollapsedState": function(target, sectionClosed){
	    var site = document.forms[0]['p$st'].value;
	    // Issue asynchronous call to XHR service
        var resp = xmlHttpCall(site, this.getPortletPath(), "LogCollapsedState", {"PageSectionCollapsed": sectionClosed}, this.receiveCollapse, {}, this);  
	},
	
	'getPortletPath': function(){
        return this.realname;
    }, 
    
    receiveCollapse: function(responseObject, userArgs) {
    }
	
});
		 
;
Portal.Portlet.SensorPageSection = Portal.Portlet.NCBIPageSection.extend ({
	init: function (path, name, notifier){
		this.base (path, name, notifier);
	}
});

(function( $ ){ // pass in $ to self exec anon fn

    // on page ready
    $( function() {
    
        $( 'div.sensor' ).each( function() {

            // get the elements we will need
            var $this = $( this );
            var anchor = $this.find( 'a.portlet_shutter' );
            var portBody = $this.find( 'div.sensor_content' );

            // we need an id on the body, make one if it doesn't exist already
            // then set toggles attr on anchor to point to body
            var id = portBody.attr('id') || $.ui.jig._generateId( 'sensor_content' );
            portBody.attr('id', id );
            anchor.attr('toggles', id );

            // initialize jig toggler with proper configs, then remove some classes that interfere with 
            // presentation
            var togglerOpen = anchor.hasClass('shutter_closed')? false : true; 
            anchor.ncbitoggler({
                isIcon: false,
                initOpen: togglerOpen 
            }).
                removeClass('ui-ncbitoggler-no-icon').
                removeClass('ui-widget');

            // get rid of ncbitoggler css props that interfere with portlet styling, this is hack
            // we should change how this works for next jig release
            anchor.css('position', 'absolute').
                css('padding', 0 );

            $this.find( 'div.ui-helper-reset' ).
                removeClass('ui-helper-reset');

            portBody.removeClass('ui-widget').
                css('margin', 0);

            // trigger an event with the id of the node when closed
            anchor.bind( 'ncbitogglerclose', function() {
                anchor.addClass('shutter_closed');
            });

            anchor.bind('ncbitoggleropen', function() {
                anchor.removeClass('shutter_closed');
            });

        });  // end each loop          
    });// end on page ready
})( jQuery );
;
Portal.Portlet.GeneSensor = Portal.Portlet.SensorPageSection.extend({
    init: function (path, name, notifier) {
        var oThis = this;
		console.info("Created GeneSensor");
		this.base(path, name, notifier);
		
		/*To add linkpos to species links*/
		jQuery(".speciesline .specieslink").each(function(index){
		    var ref = jQuery(this).attr('ref');
		    ref= ref+"&linkpos="+(index+1);
		    jQuery(this).attr('ref', ref);
		});
    },
    
    send: { 
        'Cmd': null, 
        //'DbChanged': null,
        'LinkName': null,
        //'PresentationChange': null,
        'LastQueryKey': null       
    }, 
    
    listen: {       
        'GeneLink<click>':function (e, target, name) {
            //this.send.DbChanged({'db' : 'gene'});
            this.send.Cmd({'cmd' : 'link'});
            this.send.LinkName({'linkname' : 'gene_pubmed_rif'});
            this.send.LastQueryKey({'qk': target.getAttribute('value')});           
            Portal.requestSubmit(); 
        }        
    }
});
;
Portal.Portlet.Entrez_ResultsController = Portal.Portlet.extend({

	init: function(path, name, notifier) {
		console.info("Created Entrez_ResultsController");
		this.base(path, name, notifier);
	},	
		
	send: {
	    'Cmd': null
	},
		
	listen: {
	
	    /* page events */
	    
	    "RemoveFromClipboard<click>": function(e, target, name){
            this.RemoveFromClipboardClick(e, target, name);
	    },
	    
		/* messages */
		
		'Cmd': function(sMessage, oData, sSrc){
		    this.ReceivedCmd(sMessage, oData, sSrc);
		},
		
		'SelectedItemCountChanged' : function(sMessage, oData, sSrc){
		    this.ItemSelectionChangedMsg(sMessage, oData, sSrc);
		},
		
		// currently sent by searchbox pubmed in journals 
		'RunLastQuery' : function(sMessage, oData, sSrc){
			if (this.getInput("RunLastQuery")){
				this.setValue ("RunLastQuery", 'true');
			}
		}
		
	},//listen
	
	'RemoveFromClipboardClick': function(e, target, name){
	    if(confirm("Are you sure you want to delete these items from the Clipboard?")){
	        this.send.Cmd({'cmd': 'deletefromclipboard'});
		    Portal.requestSubmit();  
    	}
	},
	
	// fix to not show remove selected items message when Remove from clipboard was clicked directly on one item
	'ReceivedCmd': function(sMessage, oData, sSrc){
	    if (oData.cmd == 'deletefromclipboard'){
	        Portal.Portlet.Entrez_ResultsController.RemoveOneClip = true;
	    }
	},
	
	'ItemSelectionChangedMsg': function(sMessage, oData, sSrc){
	    // do not show any messages if one item from clipbaord was removed with direct click.
	    if (Portal.Portlet.Entrez_ResultsController.RemoveOneClip){
	        Portal.Portlet.Entrez_ResultsController.RemoveOneClip = false;
	    }
	    else{
    		this.SelectedItemsMsg(oData.count);
    	    this.ClipRemoveMsg(oData.count);
    	}
	},
	
	'SelectedItemsMsg': function(count){
	    SelMsgNode = document.getElementById('result_sel');
	    if (SelMsgNode){
	        if (count > 0){
	            SelMsgNode.className = 'result_sel';
 	            SelMsgNode.innerHTML = "Selected: " + count;
 	        }
 	        else {
 	            SelMsgNode.className = 'none';
 	            SelMsgNode.innerHTML = "";
 	        }
	    }
	},
	
	'ClipRemoveMsg': function(count){
	    ClipRemNode = document.getElementById('rem_clips');
 	    if (ClipRemNode){
 	        if (count > 0){
 	            ClipRemNode.innerHTML = "Remove selected items";
 	        }
 	        else {
 	            ClipRemNode.innerHTML = "Remove all items";
 	        }
 	    }
	},
	
	'ResultCount': function(){
	    var totalCount = parseInt(this.getValue("ResultCount"));
	    totalCount = totalCount > 0 ? totalCount : 0;
	    return totalCount;
	}

},
{
    RemoveOneClip: false
});

function getEntrezResultCount() {
    var totalCount = document.getElementById("resultcount") ? parseInt(document.getElementById("resultcount").value) : 0;
	totalCount = totalCount > 0 ? totalCount : 0;
	return totalCount;
}

;
Portal.Portlet.Gene_ResultsController = Portal.Portlet.Entrez_ResultsController.extend({
	init: function(path, name, notifier) {
		this.base(path, name, notifier);
	}
});
   

;
Portal.Portlet.Entrez_Pager = Portal.Portlet.extend ({

    init: function (path, name, notifier) {		
		this.base (path, name, notifier);
    },
   
   
    send: {
        'Cmd': null
    },
   
   
    listen: {
		// page events
		"Page<click>" : function(e, target, name){
			this.send.Cmd({'cmd': 'PageChanged'});
			this.setValue("CurrPage", target.getAttribute('page'));
			Portal.requestSubmit();
		},
		
		"cPage<keypress>" : function(e, target, name){
		    // get page event
		    var event = e || utils.fixEvent (window.event);
		    // if page event was trying to submit 
		    if ((event.keyCode || event.which) == 13) {
		        this.NewPage(event, target);
		    } 			
		},
		
		// messages

		// when pagesize is changed, pager adjusts page number to keep displaying the start 
		// the start item of the initial page
		'PageSizeChanged' : function(sMessage, oData, sSrc) {
			if (this.getInput("CurrPage")){
				var start = (oData.oldsize * (this.getValue("CurrPage") - 1)) + 1;
				var newPage = parseInt((start - 1)/oData.size) + 1;
				this.setValue("CurrPage", newPage);
			}
		},
		
		'ResetCurrPage' : function(sMessage, oData, sSrc) {
			if (this.getInput("CurrPage")){
				this.setValue("CurrPage", '1');
			}
		}

    },
    
    'NewPage': function (event, target){
        // stop event propagation
        event.returnValue = false;
        if (event.stopPropagation != undefined)
            event.stopPropagation ();   
        if (event.preventDefault != undefined)
            event.preventDefault ();    
        
        // get new page info
        newPage = target.value.replace(/,/, ''); // remove comma in page number;
        var npage = parseInt(newPage); 
        var lpage = parseInt(target.getAttribute('last'));
        var cpage = this.getValue("CurrPage");
        
        // check validity of new page
        if (!isNaN(lpage) && newPage != cpage){
             // if the page number entered is not a number or it is a negative number
            if (isNaN(npage) || npage <= 0) { 
                alert("This is not a valid page number: " + newPage); 
                target.value = cpage; 
            } 
            // if the entered value was changed during conversion due to forgiving extras
            else if (npage.toString() != newPage) { 
                alert("This is not a valid page number: " + newPage); 
                target.value = cpage; 
            } 
            // if the entered page is larger than the last page
            else if (npage > lpage) {
                alert("This number is outside the page range: " + newPage); 
                target.value = cpage; 
            }
            else {
                // update the page if entered page number was valid
                this.send.Cmd({'cmd': 'PageChanged'});
                this.setValue("CurrPage", newPage);
                Portal.requestSubmit();  
            } 
        }// end if max is not invalid
           
        return false;
    }
    
});

;
Portal.Portlet.Entrez_LimitsTab = Portal.Portlet.extend ({
  
	init: function (path, name, notifier) 
	{ 
		this.base (path, name, notifier);
		
		var limApplyBtn = jQuery("button[name$=ApplyLimits]");
		if(limApplyBtn[0]){
    		jQuery(document.forms[0]).off("submit").on("submit",function(e){
    		    e.preventDefault();
    		    limApplyBtn.trigger("click")
    		});
		}
	},

    /* If you have to OVERRIDE the send and listen sections, please make sure to include the code in 
    those sections here before your code. Same for init if you need to override it. All other functions
    will be carried over by Portal.Portlet.My_LimitsTab = Portal.Portlet.Entrez_LimitsTab.extend .
    */
    
	send: {
		"Cmd": null,
		"SendSearchBarTerm": null
	},
	
	listen: {
	
	    /* actions from the Limits activated message area */
		
		"ChangeLimits<click>": function(e, target, name) {
		    e.preventDefault();
	        e.stopPropagation();
		    this.ProcessChange (e, target, name);
		},
		
		"RemoveLimits<click>": function(e, target, name) {
		    e.preventDefault();
	        e.stopPropagation();
		    this.ProcessRemove (e, target, name);
		},
		
		"Term": function(sMessage, oData, sSrc) {
		    this.ProcessTerm (sMessage, oData, sSrc);
		},
		
		/* actions from the LimitsPage */
		
		"ClearAllLimits<click>": function(e, target, name){
		    e.preventDefault();
	        e.stopPropagation();
		    this.ProcessClearAll(e, target, name);
		},
		
		"ApplyLimits<click>": function(e, target, name){
		    e.preventDefault();
	        e.stopPropagation();
		    this.ProcessApply(e, target, name);
		},
		
		"CancelLimits<click>": function(e, target, name){
		    e.preventDefault();
	        e.stopPropagation();
		    this.ProcessCancel(e, target, name);
		}
		
	}, //end listen
	
	/* actions from the Limits activated message area */
	
	"ProcessChange" : function(e, target, name){
		Portal.Portlet.Entrez_LimitsTab.WaitingForSearchTerm = true;	
		Portal.Portlet.Entrez_LimitsTab.Link = target.href;
		this.send.SendSearchBarTerm();
	},
	
	"ProcessRemove" : function(e, target, name){
		this.send.Cmd({'cmd': 'removelimits'});
		Portal.requestSubmit();
	},
	
	"ProcessTerm": function(sMessage, oData, sSrc) {
        if (Portal.Portlet.Entrez_LimitsTab.WaitingForSearchTerm) { // make sure ProcessChange was clicked
            Portal.Portlet.Entrez_LimitsTab.WaitingForSearchTerm = false; 

		    if (oData.term){
		        Portal.Portlet.Entrez_LimitsTab.Link += "?term=" + escape(oData.term);
	        }
		    window.location = Portal.Portlet.Entrez_LimitsTab.Link;        
        }       
    },
   
    /* actions from the LimitsPage */
    
    "ProcessCancel" : function(e, target, name){
		history.back();
    },
    
	"ProcessApply" : function(e, target, name){
	    this.send.SendSearchBarTerm();
	    this.send.Cmd({'cmd': 'search'});
		Portal.requestSubmit();
	},
	
	// Implementation will have to change depending on database. All Limit options will have to be cleared.
	"ProcessClearAll" : function(e, target, name){
		this.ClearTagTerms();
	},
	
	"ClearTagTerms": function(){
	    this.getInput("LimitsField").options[0].selected = true;
	},
	
	// Provide implementation for this function if you need to collect some data before the form is submitted.
	// This is necessary if you cannot directly depend on getting form element values from this
	// page into portlet attributes in your Limits portlet after submit
	"beforesubmit": function(){
	    return false;
	}

},

{
    'WaitingForSearchTerm': false,
    'Link': ''
});


// Clear all checkboxes inside target node
function setAll(nodeName, value) {
   if (!document.getElementById) return false;
   var node= document.getElementById(nodeName);

   if (node) {
      var cbs = node.getElementsByTagName("INPUT");
      for (var i = 0; i < cbs.length; i++) {
         var cb = cbs[i];
         if (cb.getAttribute("TYPE").toUpperCase() == "CHECKBOX") {
            cb.checked = value;
         } else {
             cb.value = ""; 
		 }
      }
   }
   return false;
}

;
Portal.Portlet.Entrez_Messages = Portal.Portlet.extend({

	init: function(path, name, notifier) {
		this.base(path, name, notifier);
		
		this.setMsgAreaClassName();
	},
	
	listen: {
	   /* messages from message bus*/
		
		'AddUserMessage' : function(sMessage, oData, sSrc) {
		    // create new message node
		    var msgnode = document.createElement('li');
		    if (oData.type != ''){
		        msgnode.className = oData.type + ' icon'; 
		    }
		    if (oData.name != ''){
		        msgnode.id = oData.name; 
		    }
		    msgnode.innerHTML = "<span class='icon'>" + oData.msg + "</span>";
		    
		    // add new node as first message in message block (not ads that look like messages)
		    var parent = document.getElementById('msgportlet');
		    if (parent){
    		    var oldnode = document.getElementById(oData.name);
    		    if (oldnode){
    		        parent.removeChild(oldnode);
    		    }
    		    var firstchild = parent.firstChild;
    	        if (firstchild){
                    parent.insertBefore(msgnode, firstchild);
                }
                else{
                    parent.appendChild(msgnode);
                }
                this.setMsgAreaClassName('true');
            }
            //if there was no ul, create one, then insert the li
            else {
                var msgarea = document.getElementById('messagearea');
                if (msgarea){
                    var msgportlet = document.createElement('ul');
                    msgportlet.className = 'messages';
                    msgportlet.id = 'msgportlet';
                    msgportlet.appendChild(msgnode);
                    if (msgarea.firstChild){
                         msgarea.insertBefore(msgportlet, msgarea.firstChild);
                    }
                    else{
                        msgarea.appendChild(msgportlet);
                    }
                    this.setMsgAreaClassName('true');
                }
            }
		},
		
		'RemoveUserMessage' : function(sMessage, oData, sSrc) {
		    var msgnode = document.getElementById(oData.name);
		    if (msgnode){
		        var parent = document.getElementById('msgportlet'); 
		        if (parent){
    		        parent.removeChild(msgnode);
    		        this.setMsgAreaClassName();
    		        // if the parent ul has no children then remove the parent
    		        if (parent.firstChild){}
    		        else {
    		            if (document.getElementById('messagearea')) {
    		                document.getElementById('messagearea').removeChild(parent);
    		            }
    		        }
    		    }
		    }
		}
	}, // end listen
	
	'setMsgAreaClassName' : function(hasMsg){
        var msgarea = document.getElementById('messagearea');
	    if (msgarea){
	        var msgclass = "empty";
	        
    	    // if a message was added, hasMsg is set to true at call time to avoid checks. 
    	    // by default, hasMsg is false.
    	    if (hasMsg == 'true'){
    	        msgclass = "messagearea";
    	    }
    	    else if (msgarea.getElementsByTagName('li').length > 0){
                msgclass = "messagearea"; 
        	}
        	
            msgarea.className = msgclass;
        }
	} // end setMsgAreaClassName
});
		
		
;
Portal.Portlet.Entrez_RVBasicReport = Portal.Portlet.extend({
	
	init: function(path, name, notifier) {
		console.info("Created report portlet");
		this.base(path, name, notifier);
	},
	
	send: {
		'ItemSelectionChanged': null,
		'ClearIdList': null,
		'Cmd': null
	},
	
	listen: {
		"uid<click>" : function(e, target, name){
		    this.UidClick(e, target, name);
		},
		
		"RemoveClip<click>" : function(e, target, name){
		    this.ClipRemoveClick(e, target, name);              
		}
	},
	
	'UidClick': function(e, target, name){	
		this.send.ItemSelectionChanged( { 'id': target.value,
		                                  'selected': target.checked });
	},
	
	'ClipRemoveClick': function(e, target, name){
	    this.send.ClearIdList();
		this.send.Cmd({'cmd': 'deletefromclipboard'});
		this.send.ItemSelectionChanged( { 'id': target.getAttribute('uid'),
		                                  'selected': true });
		Portal.requestSubmit();
	}
});
   

;
/*
 * every thing will be done at server side
(function($){

	// iterate over each td.col-omim, if any of them is not empty
	// then make the entire column visible
	$('table.gene-tabular-rprt').ready(function(){
		$tblDocsum = $('table.gene-tabular-rprt');		
		if ( $tblDocsum.length ) {
			var $td = $tblDocsum.find('td.col-omim');
			
			$td.each (function(idx, el){

				if ( $(el).text() !== '' ) {
					$td.show();
					$tblDocsum.find('th.col-omim').show();
					
					return false;
				} 				
			});
			

		}
	});	
})(jQuery);*/

Portal.Portlet.Gene_TabularDocsum = Portal.Portlet.Entrez_RVBasicReport.extend({
	init: function(path, name, notifier) {
		this.base(path, name, notifier);
	}
});

/*
	<!--https://jira.ncbi.nlm.nih.gov/browse/GRT-2328?#comment-2645689-->
	<!--If no human results, do not provide the MIM column-->
*/


;
if (typeof (jQuery) != 'undefined') {
    (function ($) {
        $(function () {            
            var min = Math.ceil(1);
            var max = Math.floor(100000);
            var randomNum = Math.floor(Math.random() * (max - min)) + min;
            var surveyUrl = "/projects/Gene/portal/surveys/seqdbui-survey.js?rando=" + randomNum.toString();
            $.getScript(surveyUrl, function () {
                try {
                    ncbi.seqDbUISurvey.init();    
                } catch (err) {
                    console.info(err);
                }
                
            }).fail(function (jqxhr, settings, exception) {
                console.info('Cannot load survey script', jqxhr);
            });;
        });
    })(jQuery);
};
;

Portal.Portlet.Entrez_Filters = Portal.Portlet.extend({
	
	init: function(path, name, notifier) {
		console.info("Created FilterTab");
		this.base(path, name, notifier);
	},
	
	send: {
		'Cmd': null,
		'AppendTerm': null,
		'ClearIdList': null,
		'SendSearchBarTerm' : null,
		'SetTimelineFilter':null
	},
	
	listen: {
			//browser events
		"Filter<click>" : function(e, target, name){
		     this.ProcessFilterClick(e, target, name);
		},
		
		"Pin<click>" : function(e, target, name){
             this.ProcessPinClick(e, target, name);
		},

			// messages
		// back button fix
		'Cmd' : function(sMessage, oData, sSrc){
		     this.CheckCmd(sMessage, oData, sSrc);
		}

	},
	
	"ProcessPinClick" : function(e, target, name){
	    // append filter to search bar term
		newTerm = '\"' + target.getAttribute('filter') + '\"[Filter]';
		this.send.AppendTerm({'op' : 'AND', 'term': newTerm});
		/*
		//for back button compatibility, clear any selected ids.
		this.send.ClearIdList();
		// ask search bar to send the current term, after append. Then send search cmd and request page submit.
		this.send.SendSearchBarTerm();
		this.send.Cmd({'cmd': 'search'});
		Portal.requestSubmit();
		*/
	},
	
	"ProcessFilterClick" : function(e, target, name){
	    this.send.Cmd({'cmd': 'FilterChanged'});
	    this.send.SetTimelineFilter({'TimelineYear':''});
		this.setValue("CurrFilter", target.getAttribute('filter'));
		Portal.requestSubmit();
	},
	
	"CheckCmd" : function(sMessage, oData, sSrc){
	    if (oData.cmd != 'FilterChanged'){
			if(this.getValue("CurrFilter") != this.getValue("LastFilter")){
				this.setValue("CurrFilter", this.getValue('LastFilter'));
				console.info("CurrFilter changed to: " + this.getValue('CurrFilter'));
			}
		}
	}
	
});
   


;
//==============================================================================
/*
    oNotifier.setListener(this, "data-is-ready", function(x, oData)
    
    oNotifier.Notify(this, "error", "tree structure is invalid")
    oNotifier.Notify(this, "build-title", oObj);
    utils.addEvent(oA, "click", function(e) {
        if: oNotifier.Notify(this, "get-data", oObj);
        oNotifier.Notify(this, "click", oObj);
    }
*/
function Tree(oPh, oNotifier, bNoActiveLeaves) {
    var oThis = this;
    
    var iCount = Tree.Count++;
    function getId(iId) {
        return sClass + "_" + iCount + "_" + iId;
    }
    
    oNotifier.setListener(this, "data-is-ready", function(x, oData) {
        for (var i = 0; i < oData.length; i++) {
            var oD = oData[i];
            var sParentId = getId(oD.p);
            var oParent = document.getElementById(sParentId);
            if (!oParent) {
                oNotifier.Notify(this, "error", "tree structure is invalid");
                return true;
            }
            var bIsLeaf = oD.c == 0;
            var bDrawCtrls = !bIsLeaf || !bNoActiveLeaves;
            
            var oLi = document.createElement("li");
            /*
            <li class="leaf, last, closed">
                create title
                <div class="last, closed">
                    <b>
                        <a>
                            <span 1>-</span 1>
                        </a>
                    </b>
                    <span 2>1.1 leaf</span 2>
                </div>
            </li>
            
            */
            var oDiv, oSpan1, oSpan2, oB, oA;
            oDiv = document.createElement("div");
            oB = document.createElement("b");
            
            oLi.appendChild(oDiv);
            oDiv.appendChild(oB);
            
            
            if (bDrawCtrls) {
                oSpan1 = document.createElement("span");
                oA = document.createElement("a");
                oA.appendChild(oSpan1);
                oB.appendChild(oA);
            } else {
                oB.innerHTML = "&nbsp;"
            }
            oSpan2 = document.createElement("span");
            oDiv.appendChild(oSpan2);
            
            
            if (bIsLeaf) {
                oLi.className = "leaf";
                if (bDrawCtrls) oSpan1.innerHTML = "-";
            } else {
                // element is branch, create placeholder for internal elements
                var oUl = document.createElement("ul");
                oUl.id = getId(oD.n);
                oLi.appendChild(oUl);
                utils.addClass(oLi, "closed");
                oSpan1.innerHTML = "+";
            }
            
            // check if this node is last in its hierarhy
            var bNoLast = false;
            for (var j = i + 1; j < oData.length; j++) {
                bNoLast =  bNoLast || oD.p == oData[j].p
            }
            if (!bNoLast) {
                utils.addClass(oLi, "last");
                utils.addClass(oDiv, "last");
            }
            var oObj = {
                oTitlePh:oSpan2,
                oDataPh:oDiv,
                iIndex:i,
                oData:oData,
                bIsLeaf:bIsLeaf,
                bIsLast:!bNoLast
            };
            
            
            // request for title and data building
            oNotifier.Notify(this, "build-title", oObj);
            
            if (bDrawCtrls){
            oA.oObj = oObj;
            utils.addEvent(oA, "click", function(e) {
                var oObj = this.oObj;
                var oLi = utils.getParent(this);
                oLi = utils.getParent(oLi);
                var oUl = utils.getNextSibling(oLi, "UL");
                if (oUl && !utils.getFirstChild(oUl)) {
                    // empty branch has been clicked. need send request for the data
 //                   console.info("add data for ", oObj.oData[oObj.iIndex].n);
                    oNotifier.Notify(this, "get-data", oObj);
                }
                oLi = utils.getParent(oLi);
                if (!oObj.bIsLeaf) {
                    if (utils.hasClass(oLi, "closed")) {
                        utils.removeClass(oLi, "closed");
                    } else {
                        utils.addClass(oLi, "closed");
                    }
                }
                oNotifier.Notify(this, "click", oObj);
            });
            }
            
            oParent.appendChild(oLi);
            var oLiParent = utils.getParent(oParent);
            if (oLiParent && oLiParent.tagName == "LI") {
                utils.removeClass(oLiParent, "closed");
            }
        }
    });
    
    
    var sClass = "tree";
    // clean placeholder
    oPh.innerHTML = "";
    // create root element
    var oUl = document.createElement("ul");
    oUl.className = sClass;
    oUl.id = getId(0);
//    console.info(oUl.id)
    oPh.appendChild(oUl);
    
}

Tree.Count = 0;


;
//Extending from base Portlet
Portal.Portlet.Taxport = Portal.Portlet.NCBIPageSection.extend ({
    init: function (path, name, notifier){
        this.base (path, name, notifier);
        console.info("Created Taxonomy Portlet");
    }
});

//==============================================================================
function TaxportApp(oPh) {
    var oThis = this;
    var oNotifier = new Notifier;
    this.oParams = {};
    var oTreeApp, oListShortApp, oListLongApp;
    var sTrackCommon = "log$=taxport&display_present=yes&db=";
    
// Listeners started    
// -----------------------------------------------------------------------------    
    oNotifier.setListener(this, "error", function(xx, sError) {
        utils.removeChildren(oPh);
        jQuery(".taxportlet").hide();
//        oPh.className = "error";
//        oPh.innerHTML = sError;
        return true;    // do not call next listener.
    });
    
// -----------------------------------------------------------------------------    
    oNotifier.setListener(this, "taxonomy_subset-apply_filter", function(oObj, oD) {
        var s = "(" + sSearchTerm + ")" + oD.s;
//        console.info(oD.s, oD.a);
        var sAction;
        switch (oD.a) {
        case "1":
            sAction = "allother";
            break;
        case "2":
            sAction = "more";
            break;
        default:
            sAction = "send";
        }
        oNotifier.Notify(oThis, "trace", sTrackCommon + "&action=" + sAction + "&term=" + encodeURIComponent(s));
        
        setTimeout(function() {
            Portal.$send('ForceSubmit', {cmd: "Go", term: s, db: oThis.oParams.db});
        }, 5000);
    });
// -----------------------------------------------------------------------------    
    oNotifier.setListener(this, "show-hide", function(xx, yy) {
        if (oTreePh.style.display != "none") {
            oTreePh.style.display = "none";
            utils.addClass(oTreeShowHidePh, "closed");
            if ("list" != oThis.oParams.def_view)
                oNotifier.Notify(oThis, "trace", sTrack + "close_tree");
        } else {
            oTreePh.style.display = "block";
            utils.removeClass(oTreeShowHidePh, "closed");
            if ("list" != oThis.oParams.def_view)
                oNotifier.Notify(oThis, "trace", sTrack + "open_tree");
        }
        
        if (oListPh.style.display != "none") {
            oListPh.style.display = "none";
            utils.addClass(oListShowHidePh, "closed");
            if ("list" == oThis.oParams.def_view)
                oNotifier.Notify(oThis, "trace", sTrack + "&action=close_list");
        } else {
            oListPh.style.display = "block";
            utils.removeClass(oListShowHidePh, "closed");
            if ("list" == oThis.oParams.def_view)
                oNotifier.Notify(oThis, "trace", sTrack + "open_list");
        }
    });
    
// -----------------------------------------------------------------------------    
    oNotifier.setListener(this, "list-tree", function(xx, yy) {
        if ("list" == oThis.oParams.def_view) {
            oListAppPh.style.display = "block";
            oListPh.style.display = "block";
            oTreeAppPh.style.display = "none";
            utils.removeClass(oListShowHidePh, "closed");
            if (oThis.oParams.def_list != oThis.oParams.max_list) {
                oNotifier.Notify(oThis, "list-size", 0);
            } else {
                oNotifier.Notify(oThis, "list-size", 1);
            }
        } else {
            oTreeAppPh.style.display = "block";
            oTreePh.style.display = "block";
            oListAppPh.style.display = "none";
            utils.removeClass(oTreeShowHidePh, "closed");
            if (!oTreeApp) {
                oTreePh.innerHTML = "";
                oTreeApp = new TaxSubsetTreeApp(oTreePh, oNotifier, oThis.oParams);
            }
            oNotifier.Notify(oThis, "trace", sTrack + "tree");
        }
        oView.value = oThis.oParams.def_view;
    });
    
// -----------------------------------------------------------------------------    
    oNotifier.setListener(this, "list-size", function(xx, iSizeIndex) {
        switch (iSizeIndex) {
        case 1: // long list
            oTreePhShort.style.display = "none";
            oTreePhLong.style.display = "block";
            oListSize.value = oThis.oParams.def_list = oThis.oParams.max_list;
            if (!oListLongApp) {
                oListLongApp = new TaxSubsetListApp(oTreePhLong, oNotifier, oThis.oParams);
            }
            oNotifier.Notify(oThis, "trace", sTrack + "longlist");
            break;
        case -1:   // list size < min_size
            oListShortCtrl.style.display = "none";
            oListLongCtrl.style.display = "none";
            oListSize.value = oThis.oParams.min_list;
            oNotifier.Notify(oThis, "trace", sTrack + "shortestlist");
            break;
        default:    // short list
            oTreePhShort.style.display = "block";
            oTreePhLong.style.display = "none";
            oListSize.value = oThis.oParams.def_list = oThis.oParams.min_list;
            if (!oListShortApp) {
                oListShortApp = new TaxSubsetListApp(oTreePhShort, oNotifier, oThis.oParams);
            }
            oNotifier.Notify(oThis, "trace", sTrack + "shortlist");
        }
    });
// -----------------------------------------------------------------------------    
// Listeners ended
    // get data from hidden inputs
    var oView = utils.getFirstChild(oPh);
    var oListSize = utils.getNextSibling(oView);
    // get parameters
    var oParamsPh = utils.getNextSibling(oListSize);
    var sParams = oParamsPh.innerHTML;
//    console.info(sParams)
    if (sParams == "") {
        oNotifier.Notify(oThis, "error", "parameters line is not set");
    }
    var a = sParams.split("|");
    for (var i in a) {
        try {    // workaround for working with extended array objects
            var b = a[i].split("=");
            this.oParams[b[0]] = b[1];
            var x = parseInt(b[1]);
            if (this.oParams[b[0]] == x ) this.oParams[b[0]] = x;    // convert '<number>' to  <number>
        } catch (e) {
            ;;
        }
    }
    
        // get search term
//    var sSearchTerm = document.getElementById("term").value;
    var sSearchTerm = decodeURIComponent(this.oParams["term"]);
    if (sSearchTerm == "") sSearchTerm = "#" + this.oParams["query"];
    
    sTrackCommon += encodeURIComponent(this.oParams.db);
    
    // set default view ("list" or "tree")
    if ("list" == oView.value || "tree" == oView.value) {
        this.oParams.def_view = oView.value;
    } else if ("list" == this.oParams.def_view || "tree" == this.oParams.def_view) {
        oView.value = this.oParams.def_view;
    } else {
        oView.value = this.oParams.def_view = "list";
    }
    
    
//    console.info("this.oParams.def_view=", this.oParams.def_view);
    
    // get placeholders for tree and list
    var oTreeAppPh = utils.getNextSibling(oParamsPh);
    var oListAppPh = utils.getNextSibling(oTreeAppPh);
    
    // get elements for "show/hide" image placeholder
    var oTreeShowHidePh = utils.getFirstChild(oTreeAppPh);
    var oListShowHidePh = utils.getFirstChild(oListAppPh);
    
    // get control element for tree placeholder
    var oTreeTitleCtrl = utils.getNextSibling(oTreeShowHidePh, "A");
    var oTreeSwitchCtrl = utils.getNextSibling(oTreeTitleCtrl, "A");
//    console.info(oTreeTitleCtrl, oTreeSwitchCtrl);
    
    // get control element for list placeholder
    var oListTitleCtrl = utils.getNextSibling(oListShowHidePh, "A");
    var oListSwitchCtrl = utils.getNextSibling(oListTitleCtrl, "A");
//    console.info(oListTitleCtrl, oListSwitchCtrl);
    
    // set event handlers for show/hide placeholders
    /*utils.addEvent(oTreeTitleCtrl, "click", function() {
        oNotifier.Notify(oThis, "show-hide");
    });
    utils.addEvent(oListTitleCtrl, "click", function() {
        oNotifier.Notify(oThis, "show-hide");
    });  */
    /*var oEm = utils.getPreviousSibling(oTreeTitleCtrl);
    utils.addEvent(oEm, "click", function() {
        oNotifier.Notify(oThis, "show-hide");
    });
    oEm = utils.getPreviousSibling(oListTitleCtrl);
    utils.addEvent(oEm, "click", function() {
        oNotifier.Notify(oThis, "show-hide");
    });*/
    
    
    // set event handlers for list-tree switchers
    utils.addEvent(oTreeSwitchCtrl, "click", function() {
        oThis.oParams.def_view = "list";
        oNotifier.Notify(oThis, "list-tree");
    });
    utils.addEvent(oListSwitchCtrl, "click", function() {
        oThis.oParams.def_view = "tree";
        oNotifier.Notify(oThis, "list-tree");
    });

    
    // get placeholders for tree and list data
    var oTreePh = utils.getNextSibling(oTreeSwitchCtrl, "div");
    var oListPh = utils.getNextSibling(oListSwitchCtrl, "dd");
    
    // get palceholder for short and long lists
    var oTreePhShort = utils.getFirstChild(oListPh);
    var oTreePhLong = utils.getNextSibling(oTreePhShort, "div");
    
    // get list size controls
    var oListShortCtrl = utils.getFirstChild(oTreePhShort);
    var oListLongCtrl = utils.getFirstChild(oTreePhLong);
    
    // set event handlers for list size controls
    utils.addEvent(oListShortCtrl, "click", function() {
        oNotifier.Notify(oThis, "list-size", 1); // switch to long list
    });
    
    utils.addEvent(oListLongCtrl, "click", function() {
        oNotifier.Notify(oThis, "list-size", 0); // switch to long list
    });
    
    
    // helper string for tracking
    var sTrack;
    if (this.oParams.trace_url != "") {
        new Tracker(oNotifier, this.oParams.trace_url);
//        alert(this.oParams.trace_url)
        sTrack = sTrackCommon + "&term=" + encodeURIComponent(sSearchTerm) + "&action=";
    }
    
    // show selected view
    oNotifier.Notify(oThis, "list-tree");
}


//==============================================================================
TaxportApp.BuildTerm = function(oObj) {
//    console.info("this.db=" + TaxportApp.db)
    var x = "p";
    if (TaxportApp.db == "sra") x = "";
    return "\"" + decodeURIComponent(oObj.d.name) + "\""  + "[" + x + "orgn:__txid" + oObj.n + "]";
}

//==============================================================================
TaxportApp.getFormatNumber = function(n) {
    return n
/*
    var s = "";
    var i = 0;
    while (n > 0) {
        i = parseInt(n / 1000);
        var j = n - i * 1000;
        if (n > 1000) {
            if (j < 10) {
                s = ",00" + j + s;
            } else if (j < 100) {
                s = ",0" + j + s;
            } else
                s = "," + j + s;
        } else {
            s = n + s;
        }
        n = i;
    }
    return s;
*/
}


// taxonomy_subset_init
//==============================================================================
utils.addEvent(window, "load", function() {
    var oPh = document.getElementById("taxonomy-subset-container");
    if (oPh) {
        TaxportApp.db = oPh.getAttribute("rel");
        new TaxportApp(oPh);
    }
});


//==============================================================================
function TaxSubsetListApp(oPh, oNotifier, oParams) {
    var oThis = this;
//    console.info("TaxSubsetListApp");
    this.oNotifier = oNotifier;
    var RemoteDataProvider_1 = RemoteDataProvider;
    // -----------------------------------------------------------------------------    
    RemoteDataProvider_1.prototype.onSuccess = function (obj) {
        var oData;
        var bError = false;
        try {
            eval("oData=" + obj.responseText);
        } catch (e) {
            bError = true;
        }

        if (bError) {
            oNotifier.Notify(oThis, "error", "Error in List builder: Cannot parse server's data");
            return;
        }

        if (oData[0].error && oData[0].error != "") {
            oNotifier.Notify(oThis, "error", oData[0].error);
            return;
        }
        
        for (var i = 0; i < oData.length; i++) {
            var oT = document.createElement("div");
            oThis.DrawTitle(oT, oData, i);
            oPh.insertBefore(oT, oCtrl);
        }
        
//        console.info(oParams.ismultiple, oParams.qty, oParams.min_list)
        
        // Hide list controls ("More..." and "Less..." if the the founded quantity is too little
        if (oParams.qty <= oParams.min_list) {
            oNotifier.Notify(oThis, "list-size", -1); // hide list ctrls
        }
    }
    
    
    var oCtrl = utils.getFirstChild(oPh);
    var oDataProvider = new RemoteDataProvider_1;
    oDataProvider.sUrl = oParams.url;
    var s = "query=" + oParams.blobid + "&l=" + oParams.def_list + "&mode=list";
    if (oParams.ismultiple == 'true') s += "&ismultiple=1";
    oDataProvider.Post(s);
    var oTableDiv = document.createElement("div");
    oTableDiv.className = "taxonomy-list";
}
//==============================================================================

TaxSubsetListApp.prototype.DrawTitle = function(oT, oData, iN) {
    var oThis = this;
    var oObj = oData[iN];

    var sTerm;
    var sCond = "";
    if (oObj.p == 0 && oObj.n == -1) {
        // "All other taxa" case
        sTerm = ""
        for (var i = iN - 1; i >=0; i--) {
            sTerm += " NOT " + TaxportApp.BuildTerm(oData[i]);
        }
    } else {
        sTerm = TaxportApp.BuildTerm(oObj);
        sCond = " AND ";
    } 

    var sEntries = TaxportApp.getFormatNumber(oObj.d.th);
    var sName = decodeURIComponent(oObj.d.name);
    var oSpan = document.createElement("span");
    var oA = document.createElement("a");
    oA.href = "#";
    oA.rel = sCond + sTerm;
    oA.innerHTML = sName + "&#160;<i>(" + sEntries + ")</i>";
    if (oObj.p == 0 && oObj.n == -1) {
        oA.setAttribute("type", "1");    // flag for "All other taxa"
        // "all other taxa"
        oA.title = sEntries + " entr" + (oObj.d.th > 1 ? "ies" : "y") 
            + " from "  + TaxportApp.getFormatNumber(oObj.d.cn) + " species";;
    } else {
        oA.title = (oObj.d.cname ? decodeURIComponent(oObj.d.cname) : "")
         + (oObj.d.bname ? " (" + decodeURIComponent(oObj.d.bname) + ")" : "");
    }
    oSpan.appendChild(oA);
    
    utils.addEvent(oA, "click", function(e) {
        utils.preventDefault(e);
        oThis.oNotifier.Notify(oThis, "taxonomy_subset-apply_filter", {s:this.rel, a:this.getAttribute("type")});
    });
    oT.appendChild(oSpan);
}

//==============================================================================
function TaxSubsetTreeApp(oPh, oNotifier, oParams) {
    var oDataProvider = new RemoteDataProvider(oParams.url);

    oDataProvider.onSuccess = function(oObj) {
        try {
            eval("var oData = " + oObj.responseText);
            oNotifier.Notify(this, "data-is-ready", oData);
        } catch (e) {
            oNotifier.Notify(this, "error", oObj.responseText);
        }
    }

    oDataProvider.onError = function(oObj) {
        oNotifier.Notify(this, "error", oObj.responseText);
    }

//    oNotifier.setListener(this, "error", function(x, s) {
//        oTreePh.innerHTML = "Error occured: " + s;
//    });


    oNotifier.setListener(this, "get-data", function(x, xRequest) {
    /*
        var sType = typeof xRequest;
        if (sType == "string") {
            oDataProvider.Post(xRequest);
        } else if (sType == "object") {
            var sRequest = xRequest.oData[xRequest.iIndex].n;
            oDataProvider.Post(sRequest);
        } else {
            oNotifier.Notify(this, "error", "Unknown type of request: " + sType);
        }
 */       
//         console.info(xRequest)
            var s = "query=" + oParams.blobid + "&l=" + oParams.def_tree;
            if (oParams.ismultiple == 'true') s += "&ismultiple=1";
            if (xRequest)
                oDataProvider.Post(s + "&taxid=" + xRequest.oData[xRequest.iIndex].n);
            else 
                oDataProvider.Post(s);

        
        
    });

    oNotifier.setListener(this, "build-title", function(x, oObj) {
        var oThis = this;        
        var oB = oObj.oTitlePh;
        var oData = oObj.oData;
        var iN = oObj.iIndex; 
        var oD = oData[iN];
        var sName = decodeURIComponent(oD.d.name);
        var oSpan = document.createElement("span");
        var oSpan1 = document.createElement("span");
        var oA = document.createElement("a");
         oA.href = "#";
        if (oD.n == -1) {
            // "more..." case
            // look backward till parent element will be riched
            var s1 = "";
            var s2 = "";
            for (var i = iN - 1; i >= 0; i--) {
                if (oData[i].n == oD.p) {
                    // parent element is riched
                    s1 = TaxportApp.BuildTerm(oData[i]);
                    break;
                } else {
//                    console.info(i, oData[i])
                    if (oData[i].n == -1) continue;    // skip "more..."
                    s2 += " NOT " + TaxportApp.BuildTerm(oData[i]);
                }    
            } 
            oA.rel = " AND " + s1 + s2;
            oA.setAttribute("type", "2");    // flag "more.."
        } else {
            oA.rel = " AND " + TaxportApp.BuildTerm(oD);
        }
        oA.innerHTML = sName;

        var sEntries = TaxportApp.getFormatNumber(oD.d.th);
        oSpan1.innerHTML = "&nbsp;<i>(" + sEntries + ")</i>";
        oSpan.title = sEntries + " entr" + (oD.d.th > 1 ? "ies" : "y") 
            + " from " 
            + (oD.d.cn > 1 ? TaxportApp.getFormatNumber(oD.d.cn) + " species" : decodeURIComponent(oD.d.orgn));
        oA.appendChild(oSpan1);
        oSpan.appendChild(oA);

        utils.addEvent(oA, "click", function(e) {
            utils.preventDefault(e);
            oNotifier.Notify(oThis, "taxonomy_subset-apply_filter", {s:this.rel, a:this.getAttribute("type")});
        });
        oB.className = "tree-title";
        oB.appendChild(oSpan);

        
    });

    new Tree(oPh, oNotifier, true);    // no active leaves

    oNotifier.Notify(this, "get-data");
}

//==============================================================================
function Tracker(oNotifier, sUrl) {
    var oDataProvider = new RemoteDataProvider(sUrl);
    oDataProvider.onSuccess = function() {};
    oDataProvider.onError = function() {};
    oDataProvider.onTimeout = function() {};

// Listeners started    
// -----------------------------------------------------------------------------    
    oNotifier.setListener(this, "trace", function(xx, s) {
        oDataProvider.Post(s);
    });
    

// -----------------------------------------------------------------------------    
// Listeners ended    

}

//==============================================================================
Tracker.Send = function(sUrl, sRequest) {
    var oDataProvider = new RemoteDataProvider(sUrl);
    oDataProvider.onSuccess = function() {};
    oDataProvider.onError = function() {};
    oDataProvider.onTimeout = function() {};
    oDataProvider.Post(sRequest);
};

;
Portal.Portlet.RelatedDataLinks = Portal.Portlet.NCBIPageSection.extend({
    init: function (path, name, notifier) {
        var link_descr;
        console.info("Created RelatedDataLinks Ad");
        this.base(path, name, notifier);
        this.initializeControls();
    },
      
    send: { 
        'SendSavedUidList': null
    }, 
    
    listen: {       
        'rdDatabase<change>' : function (e, target, name) {
            this.setSelectButton();
            this.makeXmlHttpCall();
        },
        
        'rdFind<click>':function (e, target, name) {
            e.preventDefault();
	        e.stopPropagation();
            this.SendLink(e, target, name); 
        },
        
        'rdLinkOption<change>':function (e, target, name) {
            this.SetDescription(e, target, name);
        },
        
        //message from DbConnector with selectedIds
        'newUidSelectionList': function(sMessage, oData, sSrc){
            Portal.Portlet.RelatedDataLinks.selectedIdList = oData.list;
        }
    },    
    
    'getPortletPath' : function(){
        return (this.realname + ".NCBIPageSection");
    },   
    
    'responder' : function (responseObject, userArgs) {
        var seldb = document.getElementById('rdDatabase').selectedIndex;
        if(seldb!=0){
            //use "try" so we can gracefully handle errors
            try {
                // Handle timeouts
                if (responseObject.status == 408) {
                    
                    //display an appropriate error message
                }
                
                //convert the string response into a JavaScript Object
                var resp = responseObject.responseText;
                
                console.debug('This is what was returned from the portlet');
                console.info(resp);
                //why don't you take a look at this in firebug?
                
                resp = '(' + resp + ')';
                json_obj = eval(resp);
                
                console.debug('This is the object that we created from the portlet response');
                console.info(json_obj);
                //now look at what it is.
                
                var link_name = json_obj.response;
                link_name = link_name.split(',');
                
                var link_disp_name = json_obj.response_disp;
                link_disp_name = link_disp_name.split(';');
                
                link_descr = json_obj.response_descr;
                link_descr = link_descr.split('||');
                if(link_descr[0]!=''){
                    document.getElementById('rdDescr').innerHTML = link_descr[0];
                    document.getElementById('rdDescr').style.display = "block";
                }
                
                var link_count = link_name.length;
                if(link_count>0){
                    for(var countr=0;countr<link_count;countr++){
                        if(countr==0)
                            document.getElementById('rdLinkOption').options[countr] = new Option(link_disp_name[countr], link_name[countr], true, false);
                        else
                            document.getElementById('rdLinkOption').options[countr] = new Option(link_disp_name[countr], link_name[countr], false, false);
                    }
                }
                
                if(link_count>1)
                    document.getElementById('rdOption').style.display = "block";
                
                jQuery("#rdFind").ncbibutton("enable");
                document.getElementById('rdDescr').style.display = "block";
                
                //Now we will update the display, and change the second input.
               /* this .setValue('output', json_obj.response);*/
                
                
                
                //now catch any errors that may have occured
            }
            catch (e) {
                //display an appropriate error.  Remember, user-friendly messages!
                alert("Please refresh the page and try again. (" + e + ")");
            }
        }
    }, 
    
    'SendLink': function(e, target, name){ 
        window.location = "/" + this.getValue("rdDatabase") + "?linkname=" +  this.getValue("rdLinkOption")
         + (Portal.Portlet.RelatedDataLinks.selectedIdList != '' ? 
            ("&from_uid=" + Portal.Portlet.RelatedDataLinks.selectedIdList) : 
            (jQuery('#rdqk') && jQuery('#rdqk').val() != '' ? "&querykey=" + jQuery('#rdqk').val() : ""));
        
    },
    
    'initializeControls':function(){
        document.getElementById('rdDatabase') .selectedIndex = 0;
        // Resetting Database select on page load/reload
        this.setSelectButton();
    },
    
    'setSelectButton':function(){
        document.getElementById('rdOption').style.display = "none";
        document.getElementById('rdDescr').style.display = "none";
        document.getElementById('rdFind').disabled = true;
        
        this.deleteOption("rdLinkOption");
    },
    
    /*
    FUNCTION NAME: deleteOption
    Delete all the current options from the required drop down menu
    */
    'deleteOption':function(selectbox){
        while(document.forms[0].elements[selectbox].childNodes.length>0) {
            document.forms[0].elements[selectbox].removeChild(document.forms[0].elements[selectbox].childNodes[0])
        }
    },
    
    'SetDescription':function(e, target, name){
        var selOpt = document.getElementById('rdLinkOption').selectedIndex;
        document.getElementById('rdDescr').innerHTML = link_descr[selOpt];
    },
    
    'makeXmlHttpCall':function(){
        var dbto = this.getValue("rdDatabase");
    
            var siteName = document.forms[0][ 'p$st' ].value;
            
            var portletPath = this .realname;
            
            var actionName = 'XMLHTTPhandler';
            
            var args = {
                'related_data_db' : dbto,
                'Db' : document.getElementById('DbName').value
            };
            
            var callback = this .responder;
            
            var userArgs = {
            };
            
            var oThis = this;
            
            try {
                var response = xmlHttpCall(siteName, portletPath, actionName, args, callback, userArgs, oThis);
            }
            catch (err) {
                alert('The following error has occured: ' + err);
            }
            
    }
},
{
	selectedIdList: ''
});
;
Portal.Portlet.Discovery_SearchDetails = Portal.Portlet.NCBIPageSection.extend ({
	init: function (path, name, notifier){
		this.base (path, name, notifier);		
	},
	
	listen: {	    
	    "SearchDetailsTerm<keypress>": function(e, target, name) {
			var event = e || utils.fixEvent (window.event);
			if ((event.keyCode || event.which) == 13) {
			    // Emulate button click
			    this.SearchDetailsTermPress(event, e, target, name);
			}
		},
	    
        "SearchDetailsQuery<click>":  function(e, target, name) {       
		     this.SearchDetailsQueryClick(e, target, name);
		}		
	},
	
	'getPortletPath' : function(){	    
        return (this.realname + ".NCBIPageSection");
    },   
	
	"SearchDetailsTermPress" : function(event,e, target, name){
    	event.returnValue = false;
    	if (event.stopPropagation != undefined)
              event.stopPropagation ();   
    	if (event.preventDefault != undefined)
              event.preventDefault ();
              
    	this.ProcessSearch (target,e);
    	return false;
	},
	
	"SearchDetailsQueryClick": function(e, target, name){
	    this.ProcessSearch (target,e);
	},
	
	"ProcessSearch": function(target,e){
	    e.preventDefault();
	    e.stopPropagation();
	    if (this.getValue('SearchDetailsTerm') != ''){
	        window.location = "/" + this.getInput('SearchDetailsTerm').getAttribute('db') + "?term=" 
    		 + escape(this.getValue('SearchDetailsTerm')) + "&cmd=DetailsSearch";
    	}
    	else{
    	    alert ('There is no term in the Query Translation box to search.');
    	}
	}
	
});
;
(function( $ ){ // pass in $ to self exec anon fn
    // on page ready
    $( function() {
        $('li.ralinkpopper').each( function(){
            var $this = $( this );
            var popper = $this;
            var popnode = $this.find('div.ralinkpop');
            var popid = popnode.attr('id') || $.ui.jig._generateId('ralinkpop');
            popnode.attr('id', popid);
            popper.ncbipopper({
                destSelector: "#" + popid,
                destPosition: 'top right', 
                triggerPosition: 'middle left', 
                hasArrow: true, 
                arrowDirection: 'right',
                isTriggerElementCloseClick: false,
                adjustFit: 'none',
                openAnimation: 'none',
                closeAnimation: 'none',
                delayTimeout : 130
            });
        }); // end each loop  
    });// end on page ready
})( jQuery );

Portal.Portlet.HistoryDisplay = Portal.Portlet.NCBIPageSection.extend({

	init: function(path, name, notifier) {
		console.info("Created History Ad...");
		this.base(path, name, notifier);    
	},
	
	send: {
      'Cmd': null      
    },   
    
    receive: function(responseObject, userArgs) {  
         var cmd = userArgs.cmd;
         var rootNode = document.getElementById('HTDisplay'); 
         var ul = document.getElementById('activity');
         var resp = responseObject.responseText;
             
         if (cmd == 'HTOn') { 
            rootNode.className = '';    // hide all msg and the turnOn link
            try {
            //alert(resp);
                // Handle timeouts
                if (responseObject.status == 408) { 
                    rootNode.className = 'HTOn'; // so that the following msg will show up
                    rootNode.innerHTML = "<p class='HTOn'>Your browsing activity is temporarily unavailable.</p>";
                    return;
                }
                   
                 // Looks like we got something...
                 resp = '(' + resp + ')';
                 var JSONobj = eval(resp);
                 
                 // Build new content (ul)
                 var newHTML = JSONobj.Activity;
                 var newContent = document.createElement('div');
                 newContent.innerHTML = newHTML;
                 var newUL = newContent.getElementsByTagName('ul')[0];
                 //alert(newHTML);
                 //alert(newContent.innerHTML);
                 //alert(newUL.innerHTML);
                 // Update content
                 rootNode.replaceChild(newUL, ul);
                 //XHR returns no activity (empty ul), e.g. activity cleared
                 if (newUL.className == 'hide')                     
                     rootNode.className = 'HTOn';  // show "Your browsing activity is empty." message
                 
            }         
            catch (e) {
                //alert('error');
                rootNode.className = 'HTOn'; // so that the following msg will show up
                rootNode.innerHTML = "<p class='HTOn'>Your browsing activity is temporarily unavailable.</p>";
           }
         }
         else if (cmd == 'HTOff') {                         
             if (ul != null) { 
                 ul.className='hide'; 
                 ul.innerHTML = ''; // clear activity
             }
             rootNode.className = 'HTOff';    // make "Activity recording is turned off." and the turnOn link show up             
         }
         else if (cmd == 'ClearHT') { 
             var goAhead = confirm('Are you sure you want to delete all your saved Recent Activity?');
             if (goAhead == true) { 
                 if ( rootNode.className == '') { //                 
                     rootNode.className = 'HTOn';  // show "Your browsing activity is empty." message                                  
                     if (ul != null) {
                         ul.className='hide'; 
                         ul.innerHTML = '';
                     }
                 }
             }
         } 
         
    },
    
	listen: {
	  'Cmd' : function(sMessage, oData, sSrc){
			console.info("Inside Cmd in HistoryDisplay: " + oData.cmd);
			this.setValue("Cmd", oData.cmd);
	  },	  
		
      "HistoryToggle<click>" : function(e, target, name){
         //alert(target.getAttribute("cmd"));
         this.send.Cmd({'cmd': target.getAttribute("cmd")});         
         console.info("Inside HistoryToggle in HistoryDisplay: " + target.getAttribute("cmd"));
         
         //var site = document.forms[0]['p$st'].value;
         var cmd =  target.getAttribute("cmd");     
               
         // Issue asynchronous call to XHR service, callback is to update the portlet output            
         this.doRemoteAction(target.getAttribute("cmd"));                      
      }, 
      
      "HistoryOn<click>" : function(e, target, name){
         this.send.Cmd({'cmd': target.getAttribute("cmd")});
         //$PN('Pubmed_ResultsSearchController').getInput('RecordingHistory').value = 'yes';		 
         console.info("Inside HistoryOn in HistoryDisplay: " + target.getAttribute("cmd"));
         this.doRemoteAction(target.getAttribute("cmd"));         
      },
      
      "ClearHistory<click>" : function(e, target, name){
         this.send.Cmd({'cmd': target.getAttribute("cmd")});
         this.doRemoteAction(target.getAttribute("cmd"));         
      }
    },
    
    'getPortletPath': function(){
        return this.realname + ".NCBIPageSection";
    }, 
    
    'doRemoteAction': function(command) {
         var site = document.forms[0]['p$st'].value;          
	     var resp = xmlHttpCall(site, this.realname, command, {}, this.receive, {'cmd': command}, this);
    }
});

;
Portal.Portlet.DbConnector = Portal.Portlet.extend({

	init: function(path, name, notifier) {
		var oThis = this;
		console.info("Created DbConnector");
		this.base(path, name, notifier);
		
		// reset Db value to original value on page load. Since LastDb is the same value as Db on page load and LastDb is not changed on
		// the client, this value can be used to reset Db. This is a fix for back button use.
		if (this.getValue("Db") != this.getValue("LastDb")){
		    this.setValue("Db", this.getValue("LastDb"));
		}
     
		// the SelectedIdList and id count from previous iteration (use a different attribute from IdsFromResult to prevent back button issues)
		Portal.Portlet.DbConnector.originalIdList = this.getValue("LastIdsFromResult");
		console.info("originalIdList " + Portal.Portlet.DbConnector.originalIdList);
		// if there is an IdList from last iteration set the count
		if (Portal.Portlet.DbConnector.originalIdList != ''){
			Portal.Portlet.DbConnector.originalCount = Portal.Portlet.DbConnector.originalIdList.split(/,/).length;
		}

		notifier.setListener(this, 'HistoryCmd', 
        	function(oListener, custom_data, sMessage, oNotifierObj) {
           		var sbTabCmd = $N(oThis.path + '.TabCmd');
           		sbTabCmd[0].value = custom_data.tab;
        	}
    		, null);
    
	},

	send: {
   		'SelectedItemCountChanged': null,
   		'newUidSelectionList': null,
   		'SavedSelectedItemCount': null,
   		'SavedUidList': null
	},

	listen: {
	
		//message from Display bar on Presentation change 
		'PresentationChange' : function(sMessage, oData, sSrc){
			
			// set link information only if it exists
			if (oData.dbfrom){
				console.info("Inside PresentationChange in DbConnector: " + oData.readablename);
				this.setValue("Db", oData.dbto);
				this.setValue("LinkSrcDb", oData.dbfrom);
				this.setValue("LinkName", oData.linkname);
				this.setValue("LinkReadableName", oData.readablename);
			}
			//document.forms[0].submit();
		},
		
		// various commands associated with clicking different form control elements
		'Cmd' : function(sMessage, oData, sSrc){
			console.info("Inside Cmd in DbConnector: " + oData.cmd);
			this.setValue("Cmd", oData.cmd);
			
			// back button fix, clear TabCmd
			if (oData.cmd == 'Go' || oData.cmd == 'PageChanged' || oData.cmd == 'FilterChanged' || 
			oData.cmd == 'DisplayChanged' || oData.cmd == 'HistorySearch' || oData.cmd == 'Text' || 
			oData.cmd == 'File' || oData.cmd == 'Printer' || oData.cmd == 'Order' || 
			oData.cmd == 'Add to Clipboard' || oData.cmd == 'Remove from Clipboard' || 
			oData.cmd.toLowerCase().match('details')){
				this.setValue("TabCmd", '');
				console.info("Inside Cmd in DbConnector, reset TabCmd: " + this.getValue('TabCmd'));
			}

		},
		
		
		// the term to be shown in the search bar, and used from searching
		'Term' : function(sMessage, oData, sSrc){
			console.info("Inside Term in DbConnector: " + oData.term);
			this.setValue("Term", oData.term);
		},
		
		
		// to indicate the Command Tab to be in
		'TabCmd' : function(sMessage, oData, sSrc){
			console.info("Inside TABCMD in DbConnector: " + oData.tab);
			this.setValue("TabCmd", oData.tab);
			console.info("DbConnector TabCmd: " + this.getValue("TabCmd"));
		},
		
		
		// message sent from SearchBar when db is changed while in a Command Tab
		'DbChanged' : function(sMessage, oData, sSrc){
			console.info("Inside DbChanged in DbConnector");
			this.setValue("Db", oData.db);
		},
		
		// Handles item select/deselect events
		// Argument is { 'id': item-id, 'selected': true or false }
		'ItemSelectionChanged' : function(sMessage, oData, oSrc) {
			var sSelection = this.getValue("IdsFromResult");
			var bAlreadySelected = (new RegExp("\\b" + oData.id + "\\b").exec(sSelection) != null);
	       	var count =0;
	       	
			if (oData.selected && !bAlreadySelected) {
				sSelection += ((sSelection > "") ? "," : "") + oData.id;
			   	this.setValue("IdsFromResult", sSelection);
			   	if (sSelection.length > 0){
			   		count = sSelection.split(',').length;
			   	}
			   	this.send.SelectedItemCountChanged({'count': count});
			   	this.send.newUidSelectionList({'list': sSelection});
			   	jQuery(document).trigger("itemsel",{'list': sSelection});
		   	} else if (!oData.selected && bAlreadySelected) {
				sSelection = sSelection.replace(new RegExp("^"+oData.id+"\\b,?|,?\\b"+oData.id+"\\b"), '');
		   	   	this.setValue("IdsFromResult", sSelection);
				console.info("Message ItemSelectionChanged - IdsFromResult after change:  " + this.getValue("IdsFromResult"));
			   	if (sSelection.length > 0){
			   		count = sSelection.split(',').length;
			   	}
				console.info("Message ItemSelectionChanged - IdsFromResult length:  " + count);   
				this.send.SelectedItemCountChanged({'count': count});
			   	this.send.newUidSelectionList({'list': sSelection});
			   	jQuery(document).trigger("itemsel",{'list': sSelection});
		   	}
		},
				
		// FIXME: This is the "old message" that is being phased out.
		// when result citations are selected, the list of selected ids are intercepted here,
		// and notification sent that selected item count has changed.
		'newSelection' : function(sMessage, oData, sSrc){
		
			// Check if we already have such IDs in the list
			var newList = new Array();
			var haveNow = new Array();
			if(Portal.Portlet.DbConnector.originalIdList){
				haveNow = Portal.Portlet.DbConnector.originalIdList.split(',');
				newList = haveNow;
			}
			
			var cameNew = new Array();
			if (oData.selectionList.length > 0) {
				cameNew = oData.selectionList;
			}
			
			if (cameNew.length > 0) {
				for(var ind=0;ind<cameNew.length;ind++) {
					var found = 0;
					for(var i=0;i<haveNow.length;i++) {
						if (cameNew[ind] == haveNow[i]) {
							found = 1;
							break;
						}
					}
						//Add this ID if it is not in the list
					if (found == 0) {
						newList.push(cameNew[ind]);
					}
				}
			}
			else {
				newList = haveNow;
			}

				// if there was an IdList from last iteration add new values to old
			var count = 0;
			if ((newList.length > 0) && (newList[0].length > 0)){
				count = newList.length;
			}
			
			console.info("id count = " + count);
			this.setValue("IdsFromResult", newList.join(","));
			
			this.send.SelectedItemCountChanged({'count': count});
			this.send.newUidSelectionList({'list': newList.join(",")});
			jQuery(document).trigger("itemsel",{'list': newList.join(",")});
		},


		// empty local idlist when list was being collected for other purposes.
		//used by Mesh and Journals (empty UidList should not be distributed, otherwise Journals breaks)
		// now used by all reports for remove from clipboard function.
		'ClearIdList' : function(sMessage, oData, sSrc){
			this.setValue("IdsFromResult", '');
			this.send.SelectedItemCountChanged({'count': '0'});
			this.send.newUidSelectionList({'list': ''});
			jQuery(document).trigger("itemsel",{'list': ""});
		}, 


		// back button fix: when search backend click go or hot enter on term field,
		//it also sends db. this db should be same as dbconnector's db
		'SearchBarSearch' : function(sMessage, oData, sSrc){
			if (this.getValue("Db") != oData.db){
				this.setValue("Db", oData.db);
			}
		},
		
		// back button fix: whrn links is selected from DisplayBar,
		//ResultsSearchController sends the LastQueryKey from the results on the page
		// (should not be needed by Entrez 3 code)
		'LastQueryKey' : function(sMessage, oData, sSrc){
			if (this.getInput("LastQueryKey")){
				this.setValue("LastQueryKey", oData.qk);
			}
		},
		
		'QueryKey' : function(sMessage, oData, sSrc){
			if (this.getInput("QueryKey")){
				this.setValue("QueryKey", oData.qk);
			}
		},
		
		
		//ResultsSearchController asks for the initial item count in case of send to file 
		'needSavedSelectedItemCount' : function(sMessage, oData, sSrc){
			var count = 0;
			if(this.getInput("IdsFromResult")){
				if (this.getValue("IdsFromResult").length > 0){
					count = this.getValue("IdsFromResult").split(',').length;
				}
				console.info("sending SavedSelectedItemCount from IdsFromResult: " + count);
			}
			else{
				count = Portal.Portlet.DbConnector.originalCount;
				console.info("sending SavedSelectedItemCount from OriginalCount: " + count);
			}
			this.send.SavedSelectedItemCount({'count': count});
		},
		
		// Force form submit, optionally passing db, term and cmd parameters
		'ForceSubmit': function (sMessage, oData, sSrc)
		{
		    if (oData.db)
    			this.setValue("Db", oData.db);
		    if (oData.cmd)
    			this.setValue("Cmd", oData.cmd);
		    if (oData.term)
    			this.setValue("Term", oData.term);
    		Portal.requestSubmit ();
		},
		
		'LinkName': function (sMessage, oData, sSrc){
		    this.setValue("LinkName", oData.linkname);
		},
		
		'IdsFromResult': function (sMessage, oData, sSrc){
		    this.setValue("IdsFromResult", oData.IdsFromResult);
		},
		
		'SendSavedUidList': function (sMessage, oData, sSrc){
		    this.send.SavedUidList({'idlist': this.getValue("IdsFromResult")});
		}
		
	}, //listen
	
	/* other portlet functions */
	
	// DisplayBar in new design wants selected item count
	'SelectedItemCount': function(){
	    var count = 0;
		if(this.getInput("IdsFromResult")){
			if (this.getValue("IdsFromResult") != ''){
				count = this.getValue("IdsFromResult").split(',').length;
			}
		}
		else{
			count = Portal.Portlet.DbConnector.originalCount;
		}
		return count;
	},
	
	'SelectedItemList': function(){
		if(this.getInput("IdsFromResult") && this.getValue("IdsFromResult") != ''){
			return this.getValue("IdsFromResult");
		}
		else{
			return Portal.Portlet.DbConnector.originalIdList;
		}
		
	},
	setValue: function(name, value){
	    if(name == 'Term')
	        value = jQuery.trim(value);
	    this.base(name,value);
	}
},
{
	originalIdList: '',
	originalCount: 0
});

function getEntrezSelectedItemCount() {
    return $PN('DbConnector').SelectedItemCount();
}

function getEntrezSelectedItemList() {
    return $PN('DbConnector').SelectedItemList();
}
