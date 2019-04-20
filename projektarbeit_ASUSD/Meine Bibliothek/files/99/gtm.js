
// Copyright 2012 Google Inc. All rights reserved.
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){

var data = {
"resource": {
  "version":"161",
  "macros":[{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.contentInfo.author"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){arg=",["escape",["macro",0],8,16],";var a=0\u003Carg.length?arg.join(\";\"):null;return a})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.contentInfo.collection"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){function a(a,c){var b=a.map(function(a){return a[c]});return 0\u003Cb.length?b=b.join(\";\"):null}arr=",["escape",["macro",2],8,16],";arg=\"collectionName\";return a(arr,arg)})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal.section"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){function a(a,c){var b=a.map(function(a){return a[c]});return 0\u003Cb.length?b=b.join(\";\"):null}arr=",["escape",["macro",4],8,16],";arg=\"sectionName\";return a(arr,arg)})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.article.supplement"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){function a(a,c){var b=a.map(function(a){return a[c]});return 0\u003Cb.length?b=b.join(\";\"):null}arr=",["escape",["macro",6],8,16],";arg=\"supplementName\";return a(arr,arg)})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"session.authentication.authenticationID"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){arg=",["escape",["macro",8],8,16],";var a=0\u003Carg.length?arg.join(\"|\"):null;return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){function a(a,c){var b=a.map(function(a){return a[c]});return 0\u003Cb.length?b=b.join(\";\"):null}arr=",["escape",["macro",4],8,16],";arg=\"sectionId\";return a(arr,arg)})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"OnetrustActiveGroups"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"string\"===typeof ",["escape",["macro",11],8,16],"\u0026\u00260\u003C",["escape",["macro",11],8,16],".length?-1!==",["escape",["macro",11],8,16],".indexOf(\",3,\"):!1})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"string\"===typeof ",["escape",["macro",11],8,16],"\u0026\u00260\u003C",["escape",["macro",11],8,16],".length?-1!==",["escape",["macro",11],8,16],".indexOf(\",2,\"):!1})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"string\"===typeof ",["escape",["macro",11],8,16],"\u0026\u00260\u003C",["escape",["macro",11],8,16],".length?-1!==",["escape",["macro",11],8,16],".indexOf(\",4,\"):!1})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\"string\"===typeof ",["escape",["macro",11],8,16],"\u0026\u00260\u003C",["escape",["macro",11],8,16],".length?-1!==",["escape",["macro",11],8,16],".indexOf(\",1,\"):!1})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.attributes.environment"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal.siteKey"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",16],8,16],",b=",["escape",["macro",17],8,16],";if(a\u0026\u0026b)return a=\"staging\"===a||\"local\"===a?\"staging-\":\"\",a+b.replace(\/\\.\/g,\"-\")})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(c){document.addEventListener(c,function(a){a=a.target;do{if(a\u0026\u0026a.hasAttribute\u0026\u0026a.hasAttribute(\"data-track\")\u0026\u0026a.getAttribute(\"data-track\")===c){var b=a;break}a=a.parentNode}while(a\u0026\u0026\"BODY\"!==a.tagName);a=b\u0026\u0026b.hasAttribute(\"data-track-action\")?b.getAttribute(\"data-track-action\"):void 0;var d=b\u0026\u0026b.hasAttribute(\"data-track-category\")?b.getAttribute(\"data-track-category\"):void 0;b\u0026\u0026a\u0026\u0026d\u0026\u0026window.dataLayer.push({event:\"interactive-event\",eventAction:b.getAttribute(\"data-track-action\"),\neventCategory:b.getAttribute(\"data-track-category\"),eventLabel:b.getAttribute(\"data-track-label\")||void 0,eventValue:b.getAttribute(\"data-track-value\")||void 0})},!0)}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return document.querySelector('[data-track\\x3d\"article-alerts-event-for-marketing\"].is-active')?\"true\":\"false\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return window.location.href.substr(window.location.href.indexOf(\"mkt-key\\x3d\")+8)||null})();"]
    },{
      "function":"__e"
    },{
      "function":"__c",
      "vtp_value":"UA-54492316-9"
    },{
      "function":"__c",
      "vtp_value":"UA-54492316-8"
    },{
      "function":"__smm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",16],
      "vtp_map":["list",["map","key","live","value",["macro",23]],["map","key","staging","value",["macro",24]]]
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_fieldsToSet":["list",["map","fieldName","anonymizeIp","value","true"]],
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":false,
      "vtp_trackingId":["macro",25],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.article.doi"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.contentInfo.publishedAtDate"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal.title"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal.volume"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal.issue"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal.type"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.contentInfo.imprint"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.attributes.copyright.creativeCommonsType"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.attributes.deliveryPlatform"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.article.peerReviewType"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.category.pmc.primarySubject"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.category.contentType"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.attributes.copyright.openAccess"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.attributes.template"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.article.articleType"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.contentInfo.title"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal.journalID"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.category.publishingSegment"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"version"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.attributes.cms"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.contentInfo.publishedAt"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"page.category.pageType"
    },{
      "function":"__j",
      "vtp_name":"Krux.user"
    },{
      "function":"__j",
      "vtp_name":"Krux.segments"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"event-tracker"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"event-tracker-session"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"eventValue"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"eventCategory"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"eventAction"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"eventLabel"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal.gaCode"
    },{
      "function":"__u",
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=\"staging-genomebiology-biomedcentral-com local-genomebiology-biomedcentral-com malariajournal-biomedcentral-com parasitesandvectors-biomedcentral-com chiromt-biomedcentral-com frontiersinzoology-biomedcentral-com archpublichealth-biomedcentral-com cvirendovasc-springeropen-com ehjournal-biomedcentral-com ijhpr-biomedcentral-com particleandfibretoxicology-biomedcentral-com pilotfeasibilitystudies-biomedcentral-com ro-journal-biomedcentral-com systematicreviewsjournal-biomedcentral-com thejournalofheadacheandpain-biomedcentral-com trialsjournal-biomedcentral-com bpded-biomedcentral-com\".split(\" \");\nreturn-1!==a.indexOf(",["escape",["macro",18],8,16],")})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"page.attributes.template"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"user.profile.profileInfo.bpid"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"content.journal"
    },{
      "function":"__c",
      "vtp_value":["macro",57]
    },{
      "function":"__u",
      "vtp_component":"QUERY",
      "vtp_queryKey":"mkt-key",
      "vtp_enableMultiQueryKeys":false
    },{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false
    },{
      "function":"__e"
    }],
  "tags":[{
      "function":"__html",
      "priority":7,
      "once_per_load":true,
      "vtp_html":"\u003Cscript id=\"polyfill-matches\" type=\"text\/gtmscript\"\u003EElement.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=a.length;0\u003C=--b\u0026\u0026a.item(b)!==this;);return-1\u003Cb});\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":39
    },{
      "function":"__html",
      "priority":2,
      "once_per_load":true,
      "vtp_html":"\u003Cscript id=\"gpt-control\" data-gtmsrc=\"https:\/\/www.googletagservices.com\/tag\/js\/gpt.js\" type=\"text\/gtmscript\"\u003E\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":24
    },{
      "function":"__html",
      "priority":1,
      "teardown_tags":["list",["tag",17,0]],
      "once_per_load":true,
      "vtp_html":"\u003Cscript class=\"kxct\" data-id=\"KDqylSLE\" data-timing=\"async\" data-version=\"3.0\" id=\"krux-control-bmc\" type=\"text\/gtmscript\"\u003Ewindow.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);(function(){var a=document.createElement(\"script\");a.type=\"text\/javascript\";a.async=!0;a.src=(\"https:\"===location.protocol?\"https:\":\"http:\")+\"\/\/cdn.krxd.net\/controltag\/KDqylSLE.js\";var b=document.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":20
    },{
      "function":"__html",
      "priority":1,
      "teardown_tags":["list",["tag",14,0]],
      "once_per_load":true,
      "vtp_html":"\u003Cscript class=\"kxct\" data-id=\"sq9ku18rr\" data-timing=\"async\" data-version=\"3.0\" id=\"krux-control-so\" type=\"text\/gtmscript\"\u003Ewindow.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);(function(){var a=document.createElement(\"script\");a.type=\"text\/javascript\";a.async=!0;a.src=(\"https:\"===location.protocol?\"https:\":\"http:\")+\"\/\/cdn.krxd.net\/controltag\/sq9ku18rr.js\";var b=document.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":21
    },{
      "function":"__ua",
      "unlimited":true,
      "vtp_overrideGaSettings":true,
      "vtp_fieldsToSet":["list",["map","fieldName","allowLinker","value","true"]],
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",26],
      "vtp_dimension":["list",["map","index","20","dimension",["macro",27]],["map","index","22","dimension",["macro",28]],["map","index","23","dimension",["macro",29]],["map","index","5","dimension",["macro",30]],["map","index","6","dimension",["macro",31]],["map","index","8","dimension",["macro",32]],["map","index","9","dimension",["macro",33]],["map","index","10","dimension",["macro",34]],["map","index","12","dimension",["macro",35]],["map","index","13","dimension",["macro",36]],["map","index","7","dimension",["macro",5]],["map","index","21","dimension",["macro",1]],["map","index","16","dimension",["macro",37]],["map","index","17","dimension",["macro",38]],["map","index","18","dimension",["macro",3]],["map","index","14","dimension",["macro",39]],["map","index","11","dimension",["macro",40]],["map","index","19","dimension",["macro",6]],["map","index","25","dimension",["macro",41]],["map","index","26","dimension",["macro",42]],["map","index","15","dimension",["macro",43]],["map","index","24","dimension",["macro",44]],["map","index","27","dimension",["macro",45]],["map","index","28","dimension",["macro",46]],["map","index","29","dimension",["macro",10]],["map","index","30","dimension",["macro",47]],["map","index","31","dimension",["macro",9]],["map","index","32","dimension",["macro",48]],["map","index","33","dimension",["macro",20]],["map","index","34","dimension",["macro",49]],["map","index","35","dimension",["macro",50]],["map","index","36","dimension",["macro",21]],["map","index","37","dimension",["macro",51]],["map","index","38","dimension",["macro",52]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":18
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventValue":["macro",53],
      "vtp_fieldsToSet":["list",["map","fieldName","allowLinker","value","true"]],
      "vtp_eventCategory":["macro",54],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":["macro",55],
      "vtp_eventLabel":["macro",56],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":26
    },{
      "function":"__ua",
      "unlimited":true,
      "vtp_overrideGaSettings":true,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",26],
      "vtp_trackingId":["macro",57],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":43
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventValue":["macro",53],
      "vtp_eventCategory":["macro",54],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":["macro",55],
      "vtp_eventLabel":["macro",56],
      "vtp_trackingId":["macro",57],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":44
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Journal",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Article Alerts Signup",
      "vtp_eventLabel":"Signup",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":52
    },{
      "function":"__html",
      "once_per_load":true,
      "vtp_html":["template","\u003Cscript id=\"ga-data-track-event-listeners\" type=\"text\/gtmscript\"\u003Evar setupHandler=",["escape",["macro",19],8,16],";setupHandler(\"click\");setupHandler(\"submit\");\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":27
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript id=\"crossmark-script\" data-gtmsrc=\"https:\/\/crossmark-cdn.crossref.org\/widget\/v2.0\/widget.js\" type=\"text\/gtmscript\"\u003E\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":28
    },{
      "function":"__html",
      "once_per_load":true,
      "vtp_html":"\u003Cscript id=\"recommended-script\" type=\"text\/gtmscript\" data-gtmsrc=\"https:\/\/recommended.springernature.com\/latest\/entry-point.js\"\u003E\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":29
    },{
      "function":"__html",
      "once_per_load":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"https:\/\/platform.twitter.com\/widgets.js\" charset=\"utf-8\" id=\"twitter-script\"\u003E\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":30
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript id=\"disqus-script\" type=\"text\/gtmscript\"\u003Ewindow.disqus_config=function(){this.page.url=\"https:\/\/",["escape",["macro",17],7],"\/articles\/",["escape",["macro",27],7],"\";this.page.identifier=\"",["escape",["macro",27],7],"\"};(function(){var a=document,b=a.createElement(\"script\");b.src=\"\/\/",["escape",["macro",18],7],".disqus.com\/embed.js\";b.setAttribute(\"data-timestamp\",+new Date);(a.head||a.body).appendChild(b)})();\u003C\/script\u003E\n\u003Cnoscript\u003EPlease enable JavaScript to view the \u003Ca href=\"https:\/\/disqus.com\/?ref_noscript\"\u003Ecomments powered by Disqus.\u003C\/a\u003E\u003C\/noscript\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":36
    },{
      "function":"__html",
      "teardown_tags":["list",["tag",15,0]],
      "once_per_load":true,
      "vtp_html":"\u003Cscript class=\"kxint\" data-namespace=\"macmillan\" type=\"text\/gtmscript\" id=\"krux-interchange-so\"\u003Ewindow.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);(function(){function c(a){a=\"kxmacmillan_\"+a;try{var b=window.localStorage}catch(e){b=null}return b?b[a]||\"\":navigator.cookieEnabled?(b=document.cookie.match(a+\"\\x3d([^;]*)\"))\u0026\u0026unescape(b[1])||\"\":\"\"}Krux.user=c(\"user\");Krux.segments=c(\"segs\")?c(\"segs\").split(\",\"):[];var a=[];Krux.user\u0026\u0026a.push(\"kuid\\x3d\"+Krux.user);for(var d=0;d\u003CKrux.segments.length;d++)a.push(\"ksg\\x3d\"+Krux.segments[d]);Krux.dfppKeyValues=a.length?a.join(\";\")+\";\":\"\"})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":23
    },{
      "function":"__html",
      "teardown_tags":["list",["tag",16,0]],
      "once_per_load":true,
      "vtp_html":["template","\u003Cscript id=\"krux-consent\" type=\"text\/gtmscript\"\u003Evar allowed=",["escape",["macro",14],8,16],";allowed=!0===allowed?1:0;Krux(\"consent:set\",{dc:allowed,al:allowed,tg:allowed,cd:!1,sh:!1,re:!1},function(a,b){});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":33
    },{
      "function":"__html",
      "once_per_load":true,
      "vtp_html":["template","\u003Cscript id=\"gpt-retrieve-ads\" type=\"text\/gtmscript\"\u003Efunction splitKeys(a){var d=[],e=\"\",g=[],h=a.split(\";\");for(a=0;a\u003Ch.length;++a){void 0!==k\u0026\u0026(e=k);var b=h[a].split(\"\\x3d\");var k=b[0];k!==e\u0026\u0026(0\u003Ce.length\u0026\u00260\u003Cd.length\u0026\u0026g.push([e,d]),d=[]);if(2===b.length\u0026\u0026\"\"!==b[0]\u0026\u0026\"\"!==b[1]){var c=b[1].split(\",\");for(b=0;b\u003Cc.length;++b)d.push(c[b])}}0\u003Ck.length\u0026\u00260\u003Cd.length\u0026\u0026g.push([k,d]);return g}\nfunction splitSizes(a){var d=[];if(null!==a){var e=0\u003C=a.indexOf(\"|\")?a.split(\"|\"):a.split(\",\");for(a=0;a\u003Ce.length;++a){var g=e[a].split(\"x\");var h=parseInt(g[0],10);var b=parseInt(g[1],10);2===g.length\u0026\u0026!isNaN(h)\u0026\u0026!isNaN(b)\u0026\u00260\u003C=h\u0026\u00260\u003C=b\u0026\u0026d.push([h,b])}}return d}function debounce(a,d){var e=null,g=null;return function(){var h=this,b=Number(new Date),k=arguments;e\u0026\u0026b\u003Ce+d?(clearTimeout(g),g=setTimeout(function(){e=b;a.apply(h,k)},d)):(e=b,a.apply(h,k))}}\nfunction addScrollEvent(a){window.addEventListener?window.addEventListener(\"scroll\",a,!1):window.attachEvent(\"onscroll\",a)}function removeScrollEvent(a){window.removeEventListener?window.removeEventListener(\"scroll\",a,!1):window.detachEvent(\"scroll\",a)}function getAdContainers(){return document.querySelectorAll(\"div[data-gpt-unitpath]\")}function isLoggedIn(){return 0\u003C=document.cookie.indexOf(\"OSCAR_SESSION_COOKIE\")?\"logged\\x3dy;\":\"logged\\x3dn;\"}\n(function(a,d){function e(f){var a=\"test\";a=a.replace(\/[\\[\\]]\/g,\"\\\\$\\x26\");a=new RegExp(\"[?\\x26]\"+a+\"(\\x3d([^\\x26#]*)|\\x26|#|$)\");a=(a=a.exec(window.location.href))?a[2]?decodeURIComponent(a[2].replace(\/\\+\/g,\" \")):\"\":null;a=a\u0026\u0026\"ads\"===a?\"adtype\\x3dtest;\":\"\";f=f.getAttribute(\"data-gpt-targeting\");var c=document.querySelector(\"[data-ad-targeting-search-terms]\")?\"search\\x3d\"+document.querySelector(\"[data-ad-targeting-search-terms]\").innerText+\";\":!1;var d=isLoggedIn();a\u0026\u0026-1===f.indexOf(a)\u0026\u0026(f+=a);c\u0026\u0026\n(f+=c);return f+d+b}function g(a,c){for(var f=a.length,b=[];f--;)c(a[f],f)\u0026\u0026(b.push(a[f].slot),a.splice(f,1));b.length\u0026\u0026googletag.pubads().refresh(b);return a}function h(f){var c=Math.max(document.documentElement.clientHeight,a.innerHeight||0);return g(f,function(a){a=document.getElementById(a.divId);a=a.getBoundingClientRect();a=a.top-300;return c\u003Ea})}var b,k=getAdContainers(),c=[];d\u0026\u0026(b=d.dfppKeyValues?d.dfppKeyValues:\"\");a.googletag=a.googletag||{};a.googletag.cmd=a.googletag.cmd||[];for(var m=\n0;k[m];++m){var l=k[m];splitKeys(e(l));c.push({divId:l.getAttribute(\"id\"),adUnitPath:l.getAttribute(\"data-gpt-unitpath\"),sizeArray:splitSizes(l.getAttribute(\"data-gpt-sizes\")),targeting:splitKeys(e(l))})}googletag.cmd.push(function(){googletag.pubads().setRequestNonPersonalizedAds(",["escape",["macro",14],8,16],"?0:1);googletag.pubads().disableInitialLoad();googletag.enableServices()});googletag.cmd.push(function(){for(var a=0;c[a];++a)try{c[a].slot=googletag.defineSlot(c[a].adUnitPath,c[a].sizeArray,c[a].divId).addService(googletag.pubads());\nfor(var b=0,d=c[a].targeting.length;b\u003Cd;++b)2===c[a].targeting[b].length\u0026\u0026\"\"!==c[a].targeting[b][0]\u0026\u0026\"\"!==c[a].targeting[b][1]\u0026\u0026c[a].slot.setTargeting(c[a].targeting[b][0],c[a].targeting[b][1])}catch(p){console.log(\"failed to create slot for\",c[a])}});googletag.cmd.push(function(){for(var a=0;c[a];++a)googletag.display(c[a].divId)});googletag.cmd.push(function(){c=h(c)});var n=debounce(function(){googletag.cmd.push(function(){c=h(c);c.length||removeScrollEvent(n)})},250);addScrollEvent(n)})(window,\nwindow.Krux);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":25
    },{
      "function":"__html",
      "teardown_tags":["list",["tag",15,0]],
      "once_per_load":true,
      "vtp_html":"\u003Cscript class=\"kxint\" data-namespace=\"macmillan\" type=\"text\/gtmscript\" id=\"krux-interchange-bmc\"\u003Ewindow.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);(function(){function c(a){a=\"kxmacmillan_\"+a;try{var b=window.localStorage}catch(e){b=null}return b?b[a]||\"\":navigator.cookieEnabled?(b=document.cookie.match(a+\"\\x3d([^;]*)\"))\u0026\u0026unescape(b[1])||\"\":\"\"}Krux.user=c(\"user\");Krux.segments=c(\"segs\")?c(\"segs\").split(\",\"):[];var a=[];Krux.user\u0026\u0026a.push(\"kuid\\x3d\"+Krux.user);for(var d=0;d\u003CKrux.segments.length;d++)a.push(\"ksg\\x3d\"+Krux.segments[d]);Krux.dfppKeyValues=a.length?a.join(\";\")+\";\":\"\"})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":22
    }],
  "predicates":[{
      "function":"_eq",
      "arg0":["macro",13],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"gtm.dom"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"interactive-event"
    },{
      "function":"_eq",
      "arg0":["macro",20],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",22],
      "arg1":"gtm.load"
    },{
      "function":"_cn",
      "arg0":["macro",58],
      "arg1":"biomedcentral"
    },{
      "function":"_cn",
      "arg0":["macro",58],
      "arg1":"springeropen"
    },{
      "function":"_eq",
      "arg0":["macro",15],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",48],
      "arg1":"article"
    },{
      "function":"_eq",
      "arg0":["macro",12],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",14],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",48],
      "arg1":"journalHome"
    },{
      "function":"_eq",
      "arg0":["macro",59],
      "arg1":"true"
    }],
  "rules":[
    [["if",0,1],["add",4,6,9]],
    [["if",2],["add",5,7]],
    [["if",3,4],["add",8]],
    [["if",1,5],["add",2,1,0]],
    [["if",1,6],["add",3,1,0]],
    [["if",1,7],["add",10]],
    [["if",1,9],["add",11,13]],
    [["if",1,10],["add",12]],
    [["if",1],["unless",8],["block",10,13]],
    [["if",1],["unless",11],["block",12]],
    [["if",1],["unless",12],["block",13]]]
},
"runtime":[
[],[]
]


};
var aa,ca=this,da=/^[\w+/_-]+[=]{0,2}$/,ea=null;var fa=function(){},ha=function(a){return"function"==typeof a},ia=function(a){return"string"==typeof a},ja=function(a){return"number"==typeof a&&!isNaN(a)},ka=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},la=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},ma=function(a,b){if(a&&ka(a))for(var c=0;c<a.length;c++)if(a[c]&&b(a[c]))return a[c]},oa=function(a,b){if(!ja(a)||
!ja(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+a)},pa=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},qa=function(a){return Math.round(Number(a))||0},ra=function(a){return"false"==String(a).toLowerCase()?!1:!!a},sa=function(a){var b=[];if(ka(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},ta=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},ua=function(){return(new Date).getTime()},va=function(){this.prefix="gtm.";this.values=
{}};va.prototype.set=function(a,b){this.values[this.prefix+a]=b};va.prototype.get=function(a){return this.values[this.prefix+a]};va.prototype.contains=function(a){return void 0!==this.get(a)};
var wa=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},xa=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}},ya=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},za=function(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1},Aa=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c};/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var Ba=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Ca=function(a){if(null==a)return String(a);var b=Ba.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},Da=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},Ea=function(a){if(!a||"object"!=Ca(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!Da(a,"constructor")&&!Da(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||Da(a,b)},Fa=function(a,b){var c=b||("array"==Ca(a)?[]:{}),d;for(d in a)if(Da(a,d)){var e=a[d];"array"==Ca(e)?("array"!=Ca(c[d])&&(c[d]=[]),c[d]=Fa(e,c[d])):Ea(e)?(Ea(c[d])||(c[d]={}),c[d]=Fa(e,c[d])):c[d]=e}return c};var f=window,u=document,Ga=navigator,Ha=u.currentScript&&u.currentScript.src,Ia=function(a,b){var c=f[a];f[a]=void 0===c?b:c;return f[a]},Ja=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},Ka=function(a,b,c){var d=u.createElement("script");d.type="text/javascript";d.async=!0;d.src=a;Ja(d,b);c&&(d.onerror=c);var e;if(null===ea)b:{var g=ca.document,h=g.querySelector&&g.querySelector("script[nonce]");
if(h){var k=h.nonce||h.getAttribute("nonce");if(k&&da.test(k)){ea=k;break b}}ea=""}e=ea;e&&d.setAttribute("nonce",e);var l=u.getElementsByTagName("script")[0]||u.body||u.head;l.parentNode.insertBefore(d,l);return d},La=function(){if(Ha){var a=Ha.toLowerCase();if(0===a.indexOf("https://"))return 2;if(0===a.indexOf("http://"))return 3}return 1},Ma=function(a,b){var c=u.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=u.body&&u.body.lastChild||
u.body||u.head;d.parentNode.insertBefore(c,d);Ja(c,b);void 0!==a&&(c.src=a);return c},Na=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a;return d},Oa=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Pa=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},z=function(a){f.setTimeout(a,0)},Ra=function(a){var b=
u.getElementById(a);if(b&&Qa(b,"id")!=a)for(var c=1;c<document.all[a].length;c++)if(Qa(document.all[a][c],"id")==a)return document.all[a][c];return b},Qa=function(a,b){return a&&b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},Sa=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));return b},Ta=function(a){var b=u.createElement("div");b.innerHTML="A<div>"+a+"</div>";b=b.lastChild;for(var c=
[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},Ua=function(a,b,c){c=c||100;for(var d={},e=0;e<b.length;e++)d[b[e]]=!0;for(var g=a,h=0;g&&h<=c;h++){if(d[String(g.tagName).toLowerCase()])return g;g=g.parentElement}return null};var Va=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;var Xa=/:[0-9]+$/,Ya=function(a,b,c){for(var d=a.split("&"),e=0;e<d.length;e++){var g=d[e].split("=");if(decodeURIComponent(g[0]).replace(/\+/g," ")===b){var h=g.slice(1).join("=");return c?h:decodeURIComponent(h).replace(/\+/g," ")}}},ab=function(a,b,c,d,e){b&&(b=String(b).toLowerCase());if("protocol"===b||"port"===b)a.protocol=Za(a.protocol)||Za(f.location.protocol);"port"===b?a.port=String(Number(a.hostname?a.port:f.location.port)||("http"==a.protocol?80:"https"==a.protocol?443:"")):"host"===b&&
(a.hostname=(a.hostname||f.location.hostname).replace(Xa,"").toLowerCase());var g=b,h,k=Za(a.protocol);g&&(g=String(g).toLowerCase());switch(g){case "url_no_fragment":h=$a(a);break;case "protocol":h=k;break;case "host":h=a.hostname.replace(Xa,"").toLowerCase();if(c){var l=/^www\d*\./.exec(h);l&&l[0]&&(h=h.substr(l[0].length))}break;case "port":h=String(Number(a.port)||("http"==k?80:"https"==k?443:""));break;case "path":h="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var m=h.split("/");0<=
la(d||[],m[m.length-1])&&(m[m.length-1]="");h=m.join("/");break;case "query":h=a.search.replace("?","");e&&(h=Ya(h,e,void 0));break;case "extension":var n=a.pathname.split(".");h=1<n.length?n[n.length-1]:"";h=h.split("/")[0];break;case "fragment":h=a.hash.replace("#","");break;default:h=a&&a.href}return h},Za=function(a){return a?a.replace(":","").toLowerCase():""},$a=function(a){var b="";if(a&&a.href){var c=a.href.indexOf("#");b=0>c?a.href:a.href.substr(0,c)}return b},bb=function(a){var b=u.createElement("a");
a&&(b.href=a);var c=b.pathname;"/"!==c[0]&&(c="/"+c);var d=b.hostname.replace(Xa,"");return{href:b.href,protocol:b.protocol,host:b.host,hostname:d,pathname:c,search:b.search,hash:b.hash,port:b.port}};var cb=function(a,b,c){for(var d=[],e=String(b||document.cookie).split(";"),g=0;g<e.length;g++){var h=e[g].split("="),k=h[0].replace(/^\s*|\s*$/g,"");if(k&&k==a){var l=h.slice(1).join("=").replace(/^\s*|\s*$/g,"");l&&c&&(l=decodeURIComponent(l));d.push(l)}}return d},fb=function(a,b,c,d){var e=db(a,d);if(1===e.length)return e[0].id;if(0!==e.length){e=eb(e,function(g){return g.xb},b);if(1===e.length)return e[0].id;e=eb(e,function(g){return g.Sa},c);return e[0]?e[0].id:void 0}};
function gb(a,b,c){var d=document.cookie;document.cookie=a;var e=document.cookie;return d!=e||void 0!=c&&0<=cb(b,e).indexOf(c)}
var kb=function(a,b,c,d,e,g){d=d||"auto";var h={path:c||"/"};e&&(h.expires=e);"none"!==d&&(h.domain=d);var k;a:{var l=b,m;if(void 0==l)m=a+"=deleted; expires="+(new Date(0)).toUTCString();else{g&&(l=encodeURIComponent(l));var n=l;n&&1200<n.length&&(n=n.substring(0,1200));l=n;m=a+"="+l}var p=void 0,t=void 0,q;for(q in h)if(h.hasOwnProperty(q)){var r=h[q];if(null!=r)switch(q){case "secure":r&&(m+="; secure");break;case "domain":p=r;break;default:"path"==q&&(t=r),"expires"==q&&r instanceof Date&&(r=
r.toUTCString()),m+="; "+q+"="+r}}if("auto"===p){for(var v=ib(),y=0;y<v.length;++y){var x="none"!=v[y]?v[y]:void 0;if(!jb(x,t)&&gb(m+(x?"; domain="+x:""),a,l)){k=!0;break a}}k=!1}else p&&"none"!=p&&(m+="; domain="+p),k=!jb(p,t)&&gb(m,a,l)}return k};function eb(a,b,c){for(var d=[],e=[],g,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===g||l<g?(e=[k],g=l):l===g&&e.push(k)}return 0<d.length?d:e}
function db(a,b){for(var c=[],d=cb(a),e=0;e<d.length;e++){var g=d[e].split("."),h=g.shift();if(!b||-1!==b.indexOf(h)){var k=g.shift();k&&(k=k.split("-"),c.push({id:g.join("."),xb:1*k[0]||1,Sa:1*k[1]||1}))}}return c}
var lb=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,mb=/(^|\.)doubleclick\.net$/i,jb=function(a,b){return mb.test(document.location.hostname)||"/"===b&&lb.test(a)},ib=function(){var a=[],b=document.location.hostname.split(".");if(4===b.length){var c=b[b.length-1];if(parseInt(c,10).toString()===c)return["none"]}for(var d=b.length-2;0<=d;d--)a.push(b.slice(d).join("."));a.push("none");return a};
var nb=[],ob={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},qb=function(a){return ob[a]},rb=/[\x00\x22\x26\x27\x3c\x3e]/g;var vb=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,wb={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b",
"\f":"\\f","\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},xb=function(a){return wb[a]};nb[7]=function(a){return String(a).replace(vb,xb)};
nb[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(vb,xb)+"'"}};var Gb=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,Hb={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10",
"\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86",
"\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},Ib=function(a){return Hb[a]};nb[16]=function(a){return a};var Kb=[],Lb=[],Mb=[],Nb=[],Ob=[],Pb={},Qb,Rb,Sb,Tb=function(a,b){var c={};c["function"]="__"+a;for(var d in b)b.hasOwnProperty(d)&&(c["vtp_"+d]=b[d]);return c},Ub=function(a){var b=a["function"];if(!b)throw Error("Error: No function name given for function call.");var c=!!Pb[b],d={},e;for(e in a)a.hasOwnProperty(e)&&0===e.indexOf("vtp_")&&(d[c?e:e.substr(4)]=a[e]);return c?Pb[b](d):(void 0)(b,d)},Wb=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=Vb(a[e],b,c));return d},
Xb=function(a){var b=a["function"];if(!b)throw"Error: No function name given for function call.";var c=Pb[b];return c?c.priorityOverride||0:0},Vb=function(a,b,c){if(ka(a)){var d;switch(a[0]){case "function_id":return a[1];case "list":d=[];for(var e=1;e<a.length;e++)d.push(Vb(a[e],b,c));return d;case "macro":var g=a[1];if(c[g])return;var h=Kb[g];if(!h||b.oc(h))return;c[g]=!0;try{var k=Wb(h,b,c);k.vtp_gtmEventId=b.id;d=Ub(k);Sb&&(d=Sb.hf(d,k))}catch(y){b.Jd&&b.Jd(y,Number(g)),d=!1}c[g]=!1;return d;
case "map":d={};for(var l=1;l<a.length;l+=2)d[Vb(a[l],b,c)]=Vb(a[l+1],b,c);return d;case "template":d=[];for(var m=!1,n=1;n<a.length;n++){var p=Vb(a[n],b,c);Rb&&(m=m||p===Rb.nb);d.push(p)}return Rb&&m?Rb.lf(d):d.join("");case "escape":d=Vb(a[1],b,c);if(Rb&&ka(a[1])&&"macro"===a[1][0]&&Rb.Of(a))return Rb.Yf(d);d=String(d);for(var t=2;t<a.length;t++)nb[a[t]]&&(d=nb[a[t]](d));return d;case "tag":var q=a[1];if(!Nb[q])throw Error("Unable to resolve tag reference "+q+".");return d={wd:a[2],index:q};case "zb":var r=
{arg0:a[2],arg1:a[3],ignore_case:a[5]};r["function"]=a[1];var v=Yb(r,b,c);a[4]&&(v=!v);return v;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");}}return a},Yb=function(a,b,c){try{return Qb(Wb(a,b,c))}catch(d){JSON.stringify(a)}return null};var Zb=function(){var a=function(b){return{toString:function(){return b}}};return{Uc:a("convert_case_to"),Vc:a("convert_false_to"),Wc:a("convert_null_to"),Xc:a("convert_true_to"),Yc:a("convert_undefined_to"),qa:a("function"),ze:a("instance_name"),Ae:a("live_only"),Be:a("malware_disabled"),Cg:a("original_vendor_template_id"),Ce:a("once_per_event"),md:a("once_per_load"),nd:a("setup_tags"),De:a("tag_id"),od:a("teardown_tags")}}();var $b=null,cc=function(a){function b(p){for(var t=0;t<p.length;t++)d[p[t]]=!0}var c=[],d=[];$b=ac(a);for(var e=0;e<Lb.length;e++){var g=Lb[e],h=bc(g);if(h){for(var k=g.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(g.block||[])}else null===h&&b(g.block||[])}for(var m=[],n=0;n<Nb.length;n++)c[n]&&!d[n]&&(m[n]=!0);return m},bc=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=$b(b[c]);if(!d)return null===d?null:!1}for(var e=a.unless||[],g=0;g<e.length;g++){var h=$b(e[g]);if(null===h)return null;
if(h)return!1}return!0},ac=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=Yb(Mb[c],a));return b[c]}};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */
var rc={},sc=null,tc=Math.random();rc.m="GTM-TDGJHK";rc.rb="490";var uc="www.googletagmanager.com/gtm.js";var vc=uc,wc=null,xc=null,yc=null,zc="//www.googletagmanager.com/a?id="+rc.m+"&cv=161",Ac={},Bc={},Cc=function(){var a=sc.sequence||0;sc.sequence=a+1;return a};var E=function(a,b,c,d){return(2===Dc()||d||"http:"!=f.location.protocol?a:b)+c},Dc=function(){var a=La(),b;if(1===a)a:{var c=vc;c=c.toLowerCase();for(var d="https://"+c,e="http://"+c,g=1,h=u.getElementsByTagName("script"),k=0;k<h.length&&100>k;k++){var l=h[k].src;if(l){l=l.toLowerCase();if(0===l.indexOf(e)){b=3;break a}1===g&&0===l.indexOf(d)&&(g=2)}}b=g}else b=a;return b};var Ec=!1;var Ic={},Jc=function(a){Ic.GTM=Ic.GTM||[];Ic.GTM[a]=!0};
var Kc=function(){return"&tc="+Nb.filter(function(a){return a}).length},Tc=function(){Lc&&(f.clearTimeout(Lc),Lc=void 0);void 0===Mc||Nc[Mc]&&!Oc||(Pc[Mc]||Qc.Qf()||0>=Rc--?(Jc(1),Pc[Mc]=!0):(Qc.gg(),Na(Sc()),Nc[Mc]=!0,Oc=""))},Sc=function(){var a=Mc;if(void 0===a)return"";for(var b,c=[],d=Ic.GTM||[],e=0;e<d.length;e++)d[e]&&(c[Math.floor(e/6)]^=1<<e%6);for(var g=0;g<c.length;g++)c[g]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(c[g]||0);b=c.join("");return[Uc,Nc[a]?"":
"&es=1",Vc[a],b?"&u="+b:"",Kc(),Oc,"&z=0"].join("")},Wc=function(){return[zc,"&v=3&t=t","&pid="+oa(),"&rv="+rc.rb].join("")},Xc="0.005000">Math.random(),Uc=Wc(),Yc=function(){Uc=Wc()},Nc={},Oc="",Mc=void 0,Vc={},Pc={},Lc=void 0,Qc=function(a,b){var c=0,d=0;return{Qf:function(){if(c<a)return!1;ua()-d>=b&&(c=0);return c>=a},gg:function(){ua()-d>=b&&(c=0);c++;d=ua()}}}(2,1E3),Rc=1E3,Zc=function(a,b){if(Xc&&!Pc[a]&&Mc!==a){Tc();Mc=a;Oc="";var c;c=0===b.indexOf("gtm.")?encodeURIComponent(b):
"*";Vc[a]="&e="+c+"&eid="+a;Lc||(Lc=f.setTimeout(Tc,500))}},$c=function(a,b,c){if(Xc&&!Pc[a]&&b){a!==Mc&&(Tc(),Mc=a);var d=c+String(b[Zb.qa]||"").replace(/_/g,"");Oc=Oc?Oc+"."+d:"&tr="+d;Lc||(Lc=f.setTimeout(Tc,500));2022<=Sc().length&&Tc()}};var ad={},bd=new va,cd={},dd={},hd={name:"dataLayer",set:function(a,b){Fa(ed(a,b),cd);fd()},get:function(a){return gd(a,2)},reset:function(){bd=new va;cd={};fd()}},gd=function(a,b){if(2!=b){var c=bd.get(a);if(Xc){var d=id(a);c!==d&&Jc(5)}return c}return id(a)},id=function(a,b,c){var d=a.split("."),e=!1,g=void 0;return e?g:kd(d)},kd=function(a){for(var b=cd,c=0;c<a.length;c++){if(null===b)return!1;if(void 0===b)break;b=b[a[c]]}return b};
var nd=function(a,b){dd.hasOwnProperty(a)||(bd.set(a,b),Fa(ed(a,b),cd),fd())},ed=function(a,b){for(var c={},d=c,e=a.split("."),g=0;g<e.length-1;g++)d=d[e[g]]={};d[e[e.length-1]]=b;return c},fd=function(a){pa(dd,function(b,c){bd.set(b,c);Fa(ed(b,void 0),cd);Fa(ed(b,c),cd);a&&delete dd[b]})},od=function(a,b){ad[a]=ad[a]||{};var c=id(b);"array"===Ca(c)||"object"===Ca(c)?ad[a][b]=Fa(c):ad[a][b]=c},pd=function(a,b){if(ad[a])return ad[a][b]};var qd=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),rd={cl:["ecl"],customPixels:["nonGooglePixels"],ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},sd={cl:["ecl"],customPixels:["customScripts","html"],
ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]};
var ud=function(a){var b=gd("gtm.whitelist");b&&Jc(9);var c=b&&Aa(sa(b),rd),d=gd("gtm.blacklist");d||(d=gd("tagTypeBlacklist"))&&Jc(3);d?Jc(8):d=[];
td()&&(d=sa(d),d.push("nonGooglePixels","nonGoogleScripts"));0<=la(sa(d),"google")&&Jc(2);var e=d&&Aa(sa(d),sd),g={};return function(h){var k=h&&h[Zb.qa];if(!k||"string"!=typeof k)return!0;k=k.replace(/^_*/,"");if(void 0!==g[k])return g[k];var l=Bc[k]||[],m=a(k);if(b){var n;if(n=m)a:{if(0>la(c,k))if(l&&0<l.length)for(var p=0;p<l.length;p++){if(0>la(c,l[p])){Jc(11);
n=!1;break a}}else{n=!1;break a}n=!0}m=n}var t=!1;if(d){var q=0<=la(e,k);if(q)t=q;else{var r;b:{for(var v=l||[],y=new va,x=0;x<e.length;x++)y.set(e[x],!0);for(var w=0;w<v.length;w++)if(y.get(v[w])){r=!0;break b}r=!1}var C=r;C&&Jc(10);t=C}}return g[k]=!m||t}},td=function(){return qd.test(f.location&&f.location.hostname)};var vd={hf:function(a,b){b[Zb.Uc]&&"string"===typeof a&&(a=1==b[Zb.Uc]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty(Zb.Wc)&&null===a&&(a=b[Zb.Wc]);b.hasOwnProperty(Zb.Yc)&&void 0===a&&(a=b[Zb.Yc]);b.hasOwnProperty(Zb.Xc)&&!0===a&&(a=b[Zb.Xc]);b.hasOwnProperty(Zb.Vc)&&!1===a&&(a=b[Zb.Vc]);return a}};var wd={active:!0,isWhitelisted:function(){return!0}},xd=function(a){var b=sc.zones;!b&&a&&(b=sc.zones=a());return b};var yd=!1,zd=0,Ad=[];function Bd(a){if(!yd){var b=u.createEventObject,c="complete"==u.readyState,d="interactive"==u.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){yd=!0;for(var e=0;e<Ad.length;e++)z(Ad[e])}Ad.push=function(){for(var g=0;g<arguments.length;g++)z(arguments[g]);return 0}}}function Cd(){if(!yd&&140>zd){zd++;try{u.documentElement.doScroll("left"),Bd()}catch(a){f.setTimeout(Cd,50)}}}var Dd=function(a){yd?a():Ad.push(a)};var Ed=function(){function a(d){return!ja(d)||0>d?0:d}if(!sc._li&&f.performance&&f.performance.timing){var b=f.performance.timing.navigationStart,c=ja(hd.get("gtm.start"))?hd.get("gtm.start"):0;sc._li={cst:a(c-b),cbt:a(xc-b)}}};var Id=!1,Jd=function(){return f.GoogleAnalyticsObject&&f[f.GoogleAnalyticsObject]},Kd=!1;
var Ld=function(a){f.GoogleAnalyticsObject||(f.GoogleAnalyticsObject=a||"ga");var b=f.GoogleAnalyticsObject;if(f[b])f.hasOwnProperty(b)||Jc(12);else{var c=function(){c.q=c.q||[];c.q.push(arguments)};c.l=Number(new Date);f[b]=c}Ed();return f[b]},Md=function(a,b,c,d){b=String(b).replace(/\s+/g,"").split(",");var e=Jd();e(a+"require","linker");e(a+"linker:autoLink",b,c,d)};
var Od=function(){},Nd=function(){return f.GoogleAnalyticsObject||"ga"},Pd=!1;var Wd=function(a){};function Vd(a,b){a.containerId=rc.m;var c={type:"GENERIC",value:a};b.length&&(c.trace=b);return c};function Xd(a,b,c,d,e){var g=Nb[a],h=Yd(a,b,c,d,e);if(!h)return null;var k=Vb(g[Zb.nd],d,[]);if(k&&k.length){var l=k[0];h=Xd(l.index,b,{I:h,O:1===l.wd?c.terminate:h,terminate:c.terminate},d,e)}return h}
function Yd(a,b,c,d,e){function g(){if(h[Zb.Be])l();else{var x=Wb(h,d,[]),w=!1;x.vtp_gtmOnSuccess=function(){if(!w){w=!0;$c(d.id,Nb[a],"5");k()}};x.vtp_gtmOnFailure=function(){if(!w){w=!0;$c(d.id,Nb[a],"6");l()}};x.vtp_gtmTagId=h.tag_id;x.vtp_gtmEventId=d.id;$c(d.id,h,"1");try{Ub(x)}catch(C){Wd(C);$c(d.id,h,"7");w||(w=!0,l())}}}var h=Nb[a],k=c.I,l=c.O,m=c.terminate;if(d.oc(h))return null;var n=Vb(h[Zb.od],d,[]);if(n&&n.length){var p=n[0],t=Xd(p.index,b,{I:k,O:l,terminate:m},d,e);if(!t)return null;
k=t;l=2===p.wd?m:t}if(h[Zb.md]||h[Zb.Ce]){var q=h[Zb.md]?Ob:b,r=k,v=l;if(!q[a]){g=xa(g);var y=Zd(a,q,g);k=y.I;l=y.O}return function(){q[a](r,v)}}return g}function Zd(a,b,c){var d=[],e=[];b[a]=$d(d,e,c);return{I:function(){b[a]=ae;for(var g=0;g<d.length;g++)d[g]()},O:function(){b[a]=be;for(var g=0;g<e.length;g++)e[g]()}}}function $d(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function ae(a){a()}function be(a,b){b()};function ce(a){var b=0,c=0,d=!1;return{add:function(){c++;return xa(function(){b++;d&&b>=c&&a()})},Re:function(){d=!0;b>=c&&a()}}}
var fe=function(a){for(var b=ce(a.callback||fa),c=[],d=[],e=0;e<Nb.length;e++)if(a.Ra[e]){var g=Nb[e];var h=b.add();try{var k=Xd(e,c,{I:h,O:h,terminate:h},a,e);k?d.push({Xd:e,b:Xb(g),vf:k}):(de(e,a),h())}catch(m){h()}}b.Re();d.sort(ee);for(var l=0;l<d.length;l++)d[l].vf();return 0<d.length};
function ee(a,b){var c,d=b.b,e=a.b;c=d>e?1:d<e?-1:0;var g;if(0!==c)g=c;else{var h=a.Xd,k=b.Xd;g=h>k?1:h<k?-1:0}return g}function de(a,b){if(!Xc)return;var c=function(d){var e=b.oc(Nb[d])?"3":"4",g=Vb(Nb[d][Zb.nd],b,[]);g&&g.length&&c(g[0].index);$c(b.id,Nb[d],e);var h=Vb(Nb[d][Zb.od],b,[]);h&&h.length&&c(h[0].index)};c(a);}
var ge=!1,he=function(a,b,c,d){if("gtm.js"==b){if(ge)return!1;ge=!0}Zc(a,b);od(a,"event");od(a,"ecommerce");var e={id:a,name:b,callback:d,oc:ud(c),Ra:[],Jd:function(m){Jc(6);Wd(m)}};e.Ra=cc(e);var g=fe(e);"gtm.js"!==b&&"gtm.sync"!==b||Od();if(!g)return g;for(var h={__cl:!0,__ecl:!0,__ehl:!0,__evl:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,
__sdl:!0,__tl:!0,__ytl:!0},k=0;k<e.Ra.length;k++)if(e.Ra[k]){var l=Nb[k];if(l&&!h[l[Zb.qa]])return!0}return!1};var F={Nb:"event_callback",Pb:"event_timeout"};var je={};var ke=/[A-Z]+/,le=/\s/,me=function(a){if(ia(a)&&(a=ta(a),!le.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if(ke.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],da:d}}}}},oe=function(a){for(var b={},c=0;c<a.length;++c){var d=me(a[c]);d&&(b[d.id]=d)}ne(b);var e=[];pa(b,function(g,h){e.push(h)});return e};
function ne(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];"AW"===d.prefix&&d.da[1]&&b.push(d.containerId)}for(var e=0;e<b.length;++e)delete a[b[e]]};var qe=null,re={},se={},te,ue=function(a,b){var c={event:a};b&&(c.eventModel=Fa(b),b[F.Nb]&&(c.eventCallback=b[F.Nb]),b[F.Pb]&&(c.eventTimeout=b[F.Pb]));return c};
var ze={config:function(a){},event:function(a){var b=a[1];if(ia(b)&&!(3<a.length)){var c;if(2<
a.length){if(!Ea(a[2]))return;c=a[2]}var d=ue(b,c);return d}},js:function(a){if(2==a.length&&a[1].getTime)return{event:"gtm.js","gtm.start":a[1].getTime()}},policy:function(a){if(3===a.length){var b=a[1],c=a[2];je[b]||(je[b]=[]);je[b].push(c)}},set:function(a){var b;2==a.length&&Ea(a[1])?b=Fa(a[1]):3==a.length&&ia(a[1])&&(b={},b[a[1]]=a[2]);if(b)return b.eventModel=Fa(b),b.event="gtag.set",b._clear=!0,b}},Ae={policy:!0};var Be=function(){var a=!1;return a};var He=function(a){if(Ge(a))return a;this.vg=a};He.prototype.Bf=function(){return this.vg};var Ge=function(a){return!a||"object"!==Ca(a)||Ea(a)?!1:"getUntrustedUpdateValue"in a};He.prototype.getUntrustedUpdateValue=He.prototype.Bf;var Ie=!1,Je=[];function Ke(){if(!Ie){Ie=!0;for(var a=0;a<Je.length;a++)z(Je[a])}}var Le=function(a){Ie?z(a):Je.push(a)};var Me=[],Ne=!1;function Oe(a){var b=a.eventCallback,c=xa(function(){ha(b)&&z(function(){b(rc.m)})}),d=a.eventTimeout;d&&f.setTimeout(c,Number(d));return c}
var Pe=function(a){return f["dataLayer"].push(a)},Re=function(a){var b=a._clear;pa(a,function(g,h){"_clear"!==g&&(b&&nd(g,void 0),nd(g,h))});var c=a.event;if(!c)return!1;var d=a["gtm.uniqueEventId"];d||(d=Cc(),a["gtm.uniqueEventId"]=d,nd("gtm.uniqueEventId",d));yc=c;var e=Qe(a);yc=null;if(!wc){wc=a["gtm.start"];}return e};
function Qe(a){var b=a.event,c=a["gtm.uniqueEventId"],d,e=sc.zones;d=e?e.checkState(rc.m,c):wd;if(!d.active)return!1;var g=Oe(a);return he(c,b,d.isWhitelisted,g)?!0:!1}
var Se=function(){for(var a=!1;!Ne&&0<Me.length;){Ne=!0;delete cd.eventModel;fd();var b=Me.shift();if(null!=b){var c=Ge(b);if(c){var d=b;b=Ge(d)?d.getUntrustedUpdateValue():void 0;for(var e=["gtm.whitelist","gtm.blacklist","tagTypeBlacklist"],g=0;g<e.length;g++){var h=e[g],k=gd(h,1);if(ka(k)||Ea(k))k=Fa(k);dd[h]=k}}try{if(ha(b))try{b.call(hd)}catch(v){}else if(ka(b)){var l=b;if(ia(l[0])){var m=
l[0].split("."),n=m.pop(),p=l.slice(1),t=gd(m.join("."),2);if(void 0!==t&&null!==t)try{t[n].apply(t,p)}catch(v){}}}else{var q=b;if(q&&("[object Arguments]"==Object.prototype.toString.call(q)||Object.prototype.hasOwnProperty.call(q,"callee"))){a:{if(b.length&&ia(b[0])){var r=ze[b[0]];if(r&&(!c||!Ae[b[0]])){b=r(b);break a}}b=void 0}if(!b){Ne=!1;continue}}a=Re(b)||a}}finally{c&&fd(!0)}}Ne=!1}
return!a},Te=function(){var a=Se();try{var b=rc.m,c=f["dataLayer"].hide;if(c&&void 0!==c[b]&&c.end){c[b]=!1;var d=!0,e;for(e in c)if(c.hasOwnProperty(e)&&!0===c[e]){d=!1;break}d&&(c.end(),c.end=null)}}catch(g){}return a},Ue=function(){var a=Ia("dataLayer",[]),b=Ia("google_tag_manager",{});b=b["dataLayer"]=b["dataLayer"]||{};Dd(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});Le(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var c=a.push;a.push=function(){var d;
if(0<sc.SANDBOXED_JS_SEMAPHORE){d=[];for(var e=0;e<arguments.length;e++)d[e]=new He(arguments[e])}else d=[].slice.call(arguments,0);var g=c.apply(a,d);Me.push.apply(Me,d);if(300<this.length)for(Jc(4);300<this.length;)this.shift();var h="boolean"!==typeof g||g;return Se()&&h};Me.push.apply(Me,a.slice(0));z(Te)};var We=function(a){return Ve?u.querySelectorAll(a):null},Xe=function(a,b){if(!Ve)return null;if(Element.prototype.closest)try{return a.closest(b)}catch(e){return null}var c=Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector,d=a;if(!u.documentElement.contains(d))return null;do{try{if(c.call(d,b))return d}catch(e){break}d=d.parentElement||d.parentNode}while(null!==d&&1===d.nodeType);
return null},Ye=!1;if(u.querySelectorAll)try{var Ze=u.querySelectorAll(":root");Ze&&1==Ze.length&&Ze[0]==u.documentElement&&(Ye=!0)}catch(a){}var Ve=Ye;var $e;var wf={};wf.nb=new String("undefined");
var xf=function(a){this.resolve=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===wf.nb?b:a[d]);return c.join("")}};xf.prototype.toString=function(){return this.resolve("undefined")};xf.prototype.valueOf=xf.prototype.toString;wf.Ee=xf;wf.Zb={};wf.lf=function(a){return new xf(a)};var yf={};wf.hg=function(a,b){var c=Cc();yf[c]=[a,b];return c};wf.td=function(a){var b=a?0:1;return function(c){var d=yf[c];if(d&&"function"===typeof d[b])d[b]();yf[c]=void 0}};wf.Of=function(a){for(var b=!1,c=!1,
d=2;d<a.length;d++)b=b||8===a[d],c=c||16===a[d];return b&&c};wf.Yf=function(a){if(a===wf.nb)return a;var b=Cc();wf.Zb[b]=a;return'google_tag_manager["'+rc.m+'"].macro('+b+")"};wf.Sf=function(a,b,c){a instanceof wf.Ee&&(a=a.resolve(wf.hg(b,c)),b=fa);return{mc:a,I:b}};var zf=function(a,b,c){var d={event:b,"gtm.element":a,"gtm.elementClasses":a.className,"gtm.elementId":a["for"]||Qa(a,"id")||"","gtm.elementTarget":a.formTarget||a.target||""};c&&(d["gtm.triggers"]=c.join(","));d["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||a.href||a.src||a.code||a.codebase||"";return d},Af=function(a){sc.hasOwnProperty("autoEventsSettings")||(sc.autoEventsSettings={});var b=sc.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},
Bf=function(a,b,c){Af(a)[b]=c},Cf=function(a,b,c,d){var e=Af(a),g=wa(e,b,d);e[b]=c(g)},Df=function(a,b,c){var d=Af(a);return wa(d,b,c)};var Ef=function(){for(var a=Ga.userAgent+(u.cookie||"")+(u.referrer||""),b=a.length,c=f.history.length;0<c;)a+=c--^b++;var d=1,e,g,h;if(a)for(d=0,g=a.length-1;0<=g;g--)h=a.charCodeAt(g),d=(d<<6&268435455)+h+(h<<14),e=d&266338304,d=0!=e?d^e>>21:d;return[Math.round(2147483647*Math.random())^d&2147483647,Math.round(ua()/1E3)].join(".")},Hf=function(a,b,c,d){var e=Ff(b);return fb(a,e,Gf(c),d)},Ff=function(a){if(!a)return 1;a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length},Gf=function(a){if(!a||
"/"===a)return 1;"/"!==a[0]&&(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};function If(a,b){var c=""+Ff(a),d=Gf(b);1<d&&(c+="-"+d);return c};var Jf=["1"],Kf={},Of=function(a,b,c,d){var e=Lf(a);Kf[e]||Mf(e,b,c)||(Nf(e,Ef(),b,c,d),Mf(e,b,c))};function Nf(a,b,c,d,e){var g;g=["1",If(d,c),b].join(".");kb(a,g,c,d,0==e?void 0:new Date(ua()+1E3*(void 0==e?7776E3:e)))}function Mf(a,b,c){var d=Hf(a,b,c,Jf);d&&(Kf[a]=d);return d}function Lf(a){return(a||"_gcl")+"_au"};var Pf=function(){for(var a=[],b=u.cookie.split(";"),c=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,d=0;d<b.length;d++){var e=b[d].match(c);e&&a.push({Mc:e[1],value:e[2]})}var g={};if(!a||!a.length)return g;for(var h=0;h<a.length;h++){var k=a[h].value.split(".");"1"==k[0]&&3==k.length&&k[1]&&(g[a[h].Mc]||(g[a[h].Mc]=[]),g[a[h].Mc].push({timestamp:k[1],yf:k[2]}))}return g};function Qf(){for(var a=Rf,b={},c=0;c<a.length;++c)b[a[c]]=c;return b}function Sf(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";a+=a.toLowerCase()+"0123456789-_";return a+"."}
var Rf,Tf,Uf=function(a){Rf=Rf||Sf();Tf=Tf||Qf();for(var b=[],c=0;c<a.length;c+=3){var d=c+1<a.length,e=c+2<a.length,g=a.charCodeAt(c),h=d?a.charCodeAt(c+1):0,k=e?a.charCodeAt(c+2):0,l=g>>2,m=(g&3)<<4|h>>4,n=(h&15)<<2|k>>6,p=k&63;e||(p=64,d||(n=64));b.push(Rf[l],Rf[m],Rf[n],Rf[p])}return b.join("")},Vf=function(a){function b(l){for(;d<a.length;){var m=a.charAt(d++),n=Tf[m];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(m))throw Error("Unknown base64 encoding at char: "+m);}return l}Rf=Rf||Sf();Tf=Tf||
Qf();for(var c="",d=0;;){var e=b(-1),g=b(0),h=b(64),k=b(64);if(64===k&&-1===e)return c;c+=String.fromCharCode(e<<2|g>>4);64!=h&&(c+=String.fromCharCode(g<<4&240|h>>2),64!=k&&(c+=String.fromCharCode(h<<6&192|k)))}};var Wf;function Xf(a,b){if(!a||b===u.location.hostname)return!1;for(var c=0;c<a.length;c++)if(a[c]instanceof RegExp){if(a[c].test(b))return!0}else if(0<=b.indexOf(a[c]))return!0;return!1}var Yf=function(){var a=Ia("google_tag_data",{}),b=a.gl;b&&b.decorators||(b={decorators:[]},a.gl=b);return b};var Zf=/(.*?)\*(.*?)\*(.*)/,$f=/^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,ag=/^(?:www\.|m\.|amp\.)+/,bg=/([^?#]+)(\?[^#]*)?(#.*)?/,cg=/(.*?)(^|&)_gl=([^&]*)&?(.*)/,eg=function(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];void 0!==d&&d===d&&null!==d&&"[object Object]"!==d.toString()&&(b.push(c),b.push(Uf(String(d))))}var e=b.join("*");return["1",dg(e),e].join("*")},dg=function(a,b){var c=[window.navigator.userAgent,(new Date).getTimezoneOffset(),window.navigator.userLanguage||
window.navigator.language,Math.floor((new Date).getTime()/60/1E3)-(void 0===b?0:b),a].join("*"),d;if(!(d=Wf)){for(var e=Array(256),g=0;256>g;g++){for(var h=g,k=0;8>k;k++)h=h&1?h>>>1^3988292384:h>>>1;e[g]=h}d=e}Wf=d;for(var l=4294967295,m=0;m<c.length;m++)l=l>>>8^Wf[(l^c.charCodeAt(m))&255];return((l^-1)>>>0).toString(36)},gg=function(){return function(a){var b=bb(f.location.href),c=b.search.replace("?",""),d=Ya(c,"_gl",!0)||"";a.query=fg(d)||{};var e=ab(b,"fragment").match(cg);a.fragment=fg(e&&e[3]||
"")||{}}},fg=function(a){var b;b=void 0===b?3:b;try{if(a){var c;a:{for(var d=a,e=0;3>e;++e){var g=Zf.exec(d);if(g){c=g;break a}d=decodeURIComponent(d)}c=void 0}var h=c;if(h&&"1"===h[1]){var k=h[3],l;a:{for(var m=h[2],n=0;n<b;++n)if(m===dg(k,n)){l=!0;break a}l=!1}if(l){for(var p={},t=k?k.split("*"):[],q=0;q<t.length;q+=2)p[t[q]]=Vf(t[q+1]);return p}}}}catch(r){}};
function hg(a,b,c){function d(m){var n=m,p=cg.exec(n),t=n;if(p){var q=p[2],r=p[4];t=p[1];r&&(t=t+q+r)}m=t;var v=m.charAt(m.length-1);m&&"&"!==v&&(m+="&");return m+l}c=void 0===c?!1:c;var e=bg.exec(b);if(!e)return"";var g=e[1],h=e[2]||"",k=e[3]||"",l="_gl="+a;c?k="#"+d(k.substring(1)):h="?"+d(h.substring(1));return""+g+h+k}
function ig(a,b,c){for(var d={},e={},g=Yf().decorators,h=0;h<g.length;++h){var k=g[h];(!c||k.forms)&&Xf(k.domains,b)&&(k.fragment?ya(e,k.callback()):ya(d,k.callback()))}if(za(d)){var l=eg(d);if(c){if(a&&a.action){var m=(a.method||"").toLowerCase();if("get"===m){for(var n=a.childNodes||[],p=!1,t=0;t<n.length;t++){var q=n[t];if("_gl"===q.name){q.setAttribute("value",l);p=!0;break}}if(!p){var r=u.createElement("input");r.setAttribute("type","hidden");r.setAttribute("name","_gl");r.setAttribute("value",
l);a.appendChild(r)}}else if("post"===m){var v=hg(l,a.action);Va.test(v)&&(a.action=v)}}}else jg(l,a,!1)}if(!c&&za(e)){var y=eg(e);jg(y,a,!0)}}function jg(a,b,c){if(b.href){var d=hg(a,b.href,void 0===c?!1:c);Va.test(d)&&(b.href=d)}}
var kg=function(a){try{var b;a:{for(var c=a.target||a.srcElement||{},d=100;c&&0<d;){if(c.href&&c.nodeName.match(/^a(?:rea)?$/i)){b=c;break a}c=c.parentNode;d--}b=null}var e=b;if(e){var g=e.protocol;"http:"!==g&&"https:"!==g||ig(e,e.hostname,!1)}}catch(h){}},lg=function(a){try{var b=a.target||a.srcElement||{};if(b.action){var c=ab(bb(b.action),"host");ig(b,c,!0)}}catch(d){}},mg=function(a,b,c,d){var e=Yf();e.init||(Oa(u,"mousedown",kg),Oa(u,"keyup",kg),Oa(u,"submit",lg),e.init=!0);var g={callback:a,
domains:b,fragment:"fragment"===c,forms:!!d};Yf().decorators.push(g)},ng=function(){var a=u.location.hostname,b=$f.exec(u.referrer);if(!b)return!1;var c=b[2],d=b[1],e="";if(c){var g=c.split("/"),h=g[1];e="s"===h?decodeURIComponent(g[2]):decodeURIComponent(h)}else if(d){if(0===d.indexOf("xn--"))return!1;e=d.replace(/-/g,".").replace(/\.\./g,"-")}return a.replace(ag,"")===e.replace(ag,"")},og=function(a,b){return!1===a?!1:a||b||ng()};var pg=/^\w+$/,qg=/^[\w-]+$/,rg=/^~?[\w-]+$/,sg={aw:"_aw",dc:"_dc",gf:"_gf",ha:"_ha"};function tg(a){return a&&"string"==typeof a&&a.match(pg)?a:"_gcl"}var vg=function(){var a=bb(f.location.href),b=ab(a,"query",!1,void 0,"gclid"),c=ab(a,"query",!1,void 0,"gclsrc"),d=ab(a,"query",!1,void 0,"dclid");if(!b||!c){var e=a.hash.replace("#","");b=b||Ya(e,"gclid",void 0);c=c||Ya(e,"gclsrc",void 0)}return ug(b,c,d)};
function ug(a,b,c){var d={},e=function(g,h){d[h]||(d[h]=[]);d[h].push(g)};if(void 0!==a&&a.match(qg))switch(b){case void 0:e(a,"aw");break;case "aw.ds":e(a,"aw");e(a,"dc");break;case "ds":e(a,"dc");break;case "gf":e(a,"gf");break;case "ha":e(a,"ha")}c&&e(c,"dc");return d}
function wg(a,b,c){function d(p,t){var q=xg(p,e);q&&kb(q,t,h,g,l,!0)}b=b||{};var e=tg(b.prefix),g=b.domain||"auto",h=b.path||"/",k=void 0==b.Kd?7776E3:b.Kd;c=c||ua();var l=0==k?void 0:new Date(c+1E3*k),m=Math.round(c/1E3),n=function(p){return["GCL",m,p].join(".")};a.aw&&(!0===b.ah?d("aw",n("~"+a.aw[0])):d("aw",n(a.aw[0])));a.dc&&d("dc",n(a.dc[0]));a.gf&&d("gf",n(a.gf[0]));a.ha&&d("ha",n(a.ha[0]))}
var xg=function(a,b){var c=sg[a];if(void 0!==c)return b+c},yg=function(a){var b=a.split(".");return 3!==b.length||"GCL"!==b[0]?0:1E3*(Number(b[1])||0)};function zg(a){var b=a.split(".");if(3==b.length&&"GCL"==b[0]&&b[1])return b[2]}
var Ag=function(a,b,c,d,e){if(ka(b)){var g=tg(e);mg(function(){for(var h={},k=0;k<a.length;++k){var l=xg(a[k],g);if(l){var m=cb(l,u.cookie);m.length&&(h[l]=m.sort()[m.length-1])}}return h},b,c,d)}},Bg=function(a){return a.filter(function(b){return rg.test(b)})},Cg=function(a){for(var b=["aw","dc"],c=tg(a&&a.prefix),d={},e=0;e<b.length;e++)sg[b[e]]&&(d[b[e]]=sg[b[e]]);pa(d,function(g,h){var k=cb(c+h,u.cookie);if(k.length){var l=k[0],m=yg(l),n={};n[g]=[zg(l)];wg(n,a,m)}})};var Dg=/^\d+\.fls\.doubleclick\.net$/;function Eg(a){var b=bb(f.location.href),c=ab(b,"host",!1);if(c&&c.match(Dg)){var d=ab(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function Fg(a,b){if("aw"==a||"dc"==a){var c=Eg("gcl"+a);if(c)return c.split(".")}var d=tg(b);if("_gcl"==d){var e;e=vg()[a]||[];if(0<e.length)return e}var g=xg(a,d),h;if(g){var k=[];if(u.cookie){var l=cb(g,u.cookie);if(l&&0!=l.length){for(var m=0;m<l.length;m++){var n=zg(l[m]);n&&-1===la(k,n)&&k.push(n)}h=Bg(k)}else h=k}else h=k}else h=[];return h}
var Gg=function(){var a=Eg("gac");if(a)return decodeURIComponent(a);var b=Pf(),c=[];pa(b,function(d,e){for(var g=[],h=0;h<e.length;h++)g.push(e[h].yf);g=Bg(g);g.length&&c.push(d+":"+g.join(","))});return c.join(";")},Hg=function(a,b,c,d,e){Of(b,c,d,e);var g=Kf[Lf(b)],h=vg().dc||[],k=!1;if(g&&0<h.length){var l=sc.joined_au=sc.joined_au||{},m=b||"_gcl";if(!l[m])for(var n=0;n<h.length;n++){var p="https://adservice.google.com/ddm/regclk",t=p=p+"?gclid="+h[n]+"&auiddc="+g;Ga.sendBeacon&&Ga.sendBeacon(t)||Na(t);k=l[m]=
!0}}null==a&&(a=k);if(a&&g){var q=Lf(b),r=Kf[q];r&&Nf(q,r,c,d,e)}};var Ig;if(3===rc.rb.length)Ig="g";else{var Jg="G";Ig=Jg}
var Kg={"":"n",UA:"u",AW:"a",DC:"d",G:"e",GF:"f",HA:"h",GTM:Ig},Lg=function(a){var b=rc.m.split("-"),c=b[0].toUpperCase(),d=Kg[c]||"i",e=a&&"GTM"===c?b[1]:"",g;if(3===rc.rb.length){var h=void 0;g="2"+(h||"w")}else g="";return g+d+rc.rb+e};var Sg=!!f.MutationObserver,Tg=void 0,Ug=function(a){if(!Tg){var b=function(){var c=u.body;if(c)if(Sg)(new MutationObserver(function(){for(var e=0;e<Tg.length;e++)z(Tg[e])})).observe(c,{childList:!0,subtree:!0});else{var d=!1;Oa(c,"DOMNodeInserted",function(){d||(d=!0,z(function(){d=!1;for(var e=0;e<Tg.length;e++)z(Tg[e])}))})}};Tg=[];u.body?b():z(b)}Tg.push(a)};var lh=f.clearTimeout,mh=f.setTimeout,G=function(a,b,c){if(Be()){b&&z(b)}else return Ka(a,b,c)},nh=function(){return new Date},oh=function(){return f.location.href},ph=function(a){return ab(bb(a),"fragment")},qh=function(a){return $a(bb(a))},rh=function(a,b){return gd(a,b||2)},sh=function(a,b,c){b&&(a.eventCallback=b,c&&(a.eventTimeout=c));return Pe(a)},th=function(a,b){f[a]=b},L=function(a,b,c){b&&(void 0===f[a]||
c&&!f[a])&&(f[a]=b);return f[a]},uh=function(a,b,c){return cb(a,b,void 0===c?!0:!!c)},vh=function(a,b,c,d){var e={prefix:a,path:b,domain:c,Kd:d},g=vg();wg(g,e);Cg(e)},wh=function(a,b,c,d,e){var g=gg(),h=Yf();h.data||(h.data={query:{},fragment:{}},g(h.data));var k={},l=h.data;l&&(ya(k,l.query),ya(k,l.fragment));for(var m=tg(b),n=0;n<a.length;++n){var p=a[n];if(void 0!==sg[p]){var t=xg(p,m),q=k[t];if(q){var r=Math.min(yg(q),ua()),v;b:{for(var y=r,x=cb(t,u.cookie),
w=0;w<x.length;++w)if(yg(x[w])>y){v=!0;break b}v=!1}v||kb(t,q,c,d,0==e?void 0:new Date(r+1E3*(null==e?7776E3:e)),!0)}}}var C={prefix:b,path:c,domain:d};wg(ug(k.gclid,k.gclsrc),C);},xh=function(a,b,c,d,e){Ag(a,b,c,d,e);},yh=function(a,b){if(Be()){b&&z(b)}else Ma(a,b)},zh=function(a){return!!Df(a,
"init",!1)},Ah=function(a){Bf(a,"init",!0)},Bh=function(a,b,c){var d=(void 0===c?0:c)?"www.googletagmanager.com/gtag/js":vc;d+="?id="+encodeURIComponent(a)+"&l=dataLayer";b&&pa(b,function(e,g){g&&(d+="&"+e+"="+encodeURIComponent(g))});G(E("https://","http://",d))};
var Dh=wf.Sf;var Eh=new va;function Fh(a,b){function c(h){var k=bb(h),l=ab(k,"protocol"),m=ab(k,"host",!0),n=ab(k,"port"),p=ab(k,"path").toLowerCase().replace(/\/$/,"");if(void 0===l||"http"==l&&"80"==n||"https"==l&&"443"==n)l="web",n="default";return[l,m,n,p]}for(var d=c(String(a)),e=c(String(b)),g=0;g<d.length;g++)if(d[g]!==e[g])return!1;return!0}
function Gh(a){var b=a.arg0,c=a.arg1;if(a.any_of&&ka(c)){for(var d=0;d<c.length;d++)if(Gh({"function":a["function"],arg0:b,arg1:c[d]}))return!0;return!1}switch(a["function"]){case "_cn":return 0<=String(b).indexOf(String(c));case "_css":var e;a:{if(b){var g=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var h=0;h<g.length;h++)if(b[g[h]]){e=b[g[h]](c);break a}}catch(v){}}e=!1}return e;case "_ew":var k,l;k=String(b);l=String(c);var m=k.length-
l.length;return 0<=m&&k.indexOf(l,m)==m;case "_eq":return String(b)==String(c);case "_ge":return Number(b)>=Number(c);case "_gt":return Number(b)>Number(c);case "_lc":var n;n=String(b).split(",");return 0<=la(n,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var p;var t=a.ignore_case?"i":void 0;try{var q=String(c)+t,r=Eh.get(q);r||(r=new RegExp(c,t),Eh.set(q,r));p=r.test(b)}catch(v){p=!1}return p;case "_sw":return 0==String(b).indexOf(String(c));
case "_um":return Fh(b,c)}return!1};var Ih=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var Jh={},Kh=encodeURI,M=encodeURIComponent,Lh=Na;var Mh=function(a,b){if(!a)return!1;var c=ab(bb(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var g=c.length-e.length;0<g&&"."!=e.charAt(0)&&(g--,e="."+e);if(0<=g&&c.indexOf(e,g)==g)return!0}}return!1};
var Nh=function(a,b,c){for(var d={},e=!1,g=0;a&&g<a.length;g++)a[g]&&a[g].hasOwnProperty(b)&&a[g].hasOwnProperty(c)&&(d[a[g][b]]=a[g][c],e=!0);return e?d:null};Jh.Pf=function(){var a=!1;return a};var wi=function(a,b,c,d){this.n=a;this.t=b;this.p=c;this.d=d},xi=function(){this.c=1;this.e=[];this.p=null};function yi(a){var b=sc,c=b.gss=b.gss||{};return c[a]=c[a]||new xi}var zi=function(a,b){yi(a).p=b},Ai=function(a){var b=yi(a),c=b.p;if(c){var d=b.e,e=[];b.e=[];var g=function(h){for(var k=0;k<h.length;k++)try{var l=h[k];l.d?(l.d=!1,e.push(l)):c(l.n,l.t,l.p)}catch(m){}};g(d);g(e)}};var Ci=function(){var a=f.gaGlobal=f.gaGlobal||{};a.hid=a.hid||oa();return a.hid};var Ri=window,Si=document,Ti=function(a){var b=Ri._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===Ri["ga-disable-"+a])return!0;try{var c=Ri.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(g){}for(var d=cb("AMP_TOKEN",Si.cookie,!0),e=0;e<d.length;e++)if("$OPT_OUT"==d[e])return!0;return Si.getElementById("__gaOptOutExtension")?!0:!1};var $i=function(a,b,c){Zi(a);var d=Math.floor(ua()/1E3);yi(a).e.push(new wi(b,d,c,void 0));Ai(a)},aj=function(a,b,c){Zi(a);var d=Math.floor(ua()/1E3);yi(a).e.push(new wi(b,d,c,!0))},Zi=function(a){if(1===yi(a).c){yi(a).c=2;var b=encodeURIComponent(a);Ka(("http:"!=f.location.protocol?"https:":"http:")+("//www.googletagmanager.com/gtag/js?id="+b+"&l=dataLayer&cx=c"))}},cj=function(a,b){},bj=function(a,b){};var W={a:{}};
W.a.jsm=["customScripts"],function(){(function(a){W.__jsm=a;W.__jsm.g="jsm";W.__jsm.h=!0;W.__jsm.b=0})(function(a){if(void 0!==a.vtp_javascript){var b=a.vtp_javascript;try{var c=L("google_tag_manager");return c&&c.e&&c.e(b)}catch(d){}}})}();W.a.c=["google"],function(){(function(a){W.__c=a;W.__c.g="c";W.__c.h=!0;W.__c.b=0})(function(a){return a.vtp_value})}();

W.a.e=["google"],function(){(function(a){W.__e=a;W.__e.g="e";W.__e.h=!0;W.__e.b=0})(function(a){return String(pd(a.vtp_gtmEventId,"event"))})}();
W.a.j=["google"],function(){(function(a){W.__j=a;W.__j.g="j";W.__j.h=!0;W.__j.b=0})(function(a){for(var b=String(a.vtp_name).split("."),c=L(b.shift()),d=0;d<b.length;d++)c=c&&c[b[d]];return c})}();W.a.k=["google"],function(){(function(a){W.__k=a;W.__k.g="k";W.__k.h=!0;W.__k.b=0})(function(a){return uh(a.vtp_name,rh("gtm.cookie",1),!!a.vtp_decodeCookie)[0]})}();
W.a.u=["google"],function(){var a=function(b){return{toString:function(){return b}}};(function(b){W.__u=b;W.__u.g="u";W.__u.h=!0;W.__u.b=0})(function(b){var c;c=(c=b.vtp_customUrlSource?b.vtp_customUrlSource:rh("gtm.url",1))||oh();var d=b[a("vtp_component")];if(!d||"URL"==d)return qh(String(c));var e=bb(String(c)),g;if("QUERY"==d&&b[a("vtp_multiQueryKeys")])a:{var h=b[a("vtp_queryKey")],k;k=ka(h)?h:String(h||"").replace(/\s+/g,"").split(",");for(var l=0;l<k.length;l++){var m=ab(e,"QUERY",void 0,void 0,
k[l]);if(null!=m){g=m;break a}}g=void 0}else g=ab(e,d,"HOST"==d?b[a("vtp_stripWww")]:void 0,"PATH"==d?b[a("vtp_defaultPages")]:void 0,"QUERY"==d?b[a("vtp_queryKey")]:void 0);return g})}();W.a.v=["google"],function(){(function(a){W.__v=a;W.__v.g="v";W.__v.h=!0;W.__v.b=0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=rh(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1);return void 0!==c?c:a.vtp_defaultValue})}();

W.a.ua=["google"],function(){var a,b=function(c){var d={},e={},g={},h={},k={};if(c.vtp_gaSettings){var l=c.vtp_gaSettings;Fa(Nh(l.vtp_fieldsToSet,"fieldName","value"),e);Fa(Nh(l.vtp_contentGroup,"index","group"),g);Fa(Nh(l.vtp_dimension,"index","dimension"),h);Fa(Nh(l.vtp_metric,"index","metric"),k);c.vtp_gaSettings=null;l.vtp_fieldsToSet=void 0;l.vtp_contentGroup=void 0;l.vtp_dimension=void 0;l.vtp_metric=void 0;var m=Fa(l);c=Fa(c,m)}Fa(Nh(c.vtp_fieldsToSet,"fieldName","value"),e);Fa(Nh(c.vtp_contentGroup,
"index","group"),g);Fa(Nh(c.vtp_dimension,"index","dimension"),h);Fa(Nh(c.vtp_metric,"index","metric"),k);var n=Ld(c.vtp_functionName);if(ha(n)){var p="",t="";c.vtp_setTrackerName&&"string"==typeof c.vtp_trackerName?""!==c.vtp_trackerName&&(t=c.vtp_trackerName,p=t+"."):(t="gtm"+Cc(),p=t+".");var q={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,cookieUpdate:!0,legacyCookieDomain:!0,
legacyHistoryImport:!0,storage:!0,useAmpClientId:!0,storeGac:!0},r={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,cookieUpdate:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useAmpClientId:!0,useBeacon:!0,storeGac:!0,allowAdFeatures:!0},v=function(K){var P=[].slice.call(arguments,0);P[0]=p+P[0];n.apply(window,P)},y=function(K,P){return void 0===P?P:K(P)},x=function(K,P){if(P)for(var ba in P)P.hasOwnProperty(ba)&&v("set",K+ba,P[ba])},w=function(){},C=function(K,P,ba){var na=0;if(K)for(var X in K)if(K.hasOwnProperty(X)&&(ba&&q[X]||!ba&&void 0===q[X])){var Z=r[X]?ra(K[X]):K[X];"anonymizeIp"!=X||Z||(Z=void 0);P[X]=Z;na++}return na},
A={name:t};C(e,A,!0);n("create",c.vtp_trackingId||d.trackingId,A);v("set","&gtm",Lg(!0));c.vtp_enableRecaptcha&&v("require","recaptcha","recaptcha.js");(function(K,P){void 0!==c[P]&&v("set",K,c[P])})("nonInteraction","vtp_nonInteraction");x("contentGroup",g);x("dimension",h);x("metric",k);var D={};C(e,D,!1)&&v("set",D);var B;c.vtp_enableLinkId&&
v("require","linkid","linkid.js");v("set","hitCallback",function(){var K=e&&e.hitCallback;ha(K)&&K();c.vtp_gtmOnSuccess()});if("TRACK_EVENT"==c.vtp_trackType){c.vtp_enableEcommerce&&(v("require","ec","ec.js"),w());var H={hitType:"event",eventCategory:String(c.vtp_eventCategory||d.category),eventAction:String(c.vtp_eventAction||d.action),eventLabel:y(String,c.vtp_eventLabel||d.label),eventValue:y(qa,c.vtp_eventValue||d.value)};C(B,
H,!1);v("send",H);}else if("TRACK_SOCIAL"==c.vtp_trackType){}else if("TRACK_TRANSACTION"==c.vtp_trackType){}else if("TRACK_TIMING"==
c.vtp_trackType){}else if("DECORATE_LINK"==c.vtp_trackType){}else if("DECORATE_FORM"==c.vtp_trackType){}else if("TRACK_DATA"==c.vtp_trackType){}else{c.vtp_enableEcommerce&&(v("require","ec","ec.js"),w());if(c.vtp_doubleClick||"DISPLAY_FEATURES"==c.vtp_advertisingFeaturesType){var T=
"_dc_gtm_"+String(c.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");v("require","displayfeatures",void 0,{cookieName:T})}if("DISPLAY_FEATURES_WITH_REMARKETING_LISTS"==c.vtp_advertisingFeaturesType){var U="_dc_gtm_"+String(c.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");v("require","adfeatures",{cookieName:U})}B?v("send","pageview",B):v("send","pageview");}if(!a){var Y=c.vtp_useDebugVersion?"u/analytics_debug.js":"analytics.js";c.vtp_useInternalVersion&&!c.vtp_useDebugVersion&&(Y="internal/"+Y);a=!0;G(E("https:","http:","//www.google-analytics.com/"+Y,e&&e.forceSSL),function(){var K=Jd();K&&K.loaded||c.vtp_gtmOnFailure();},c.vtp_gtmOnFailure)}}else z(c.vtp_gtmOnFailure)};W.__ua=b;W.__ua.g="ua";W.__ua.h=!0;W.__ua.b=0}();



W.a.gas=["google"],function(){(function(a){W.__gas=a;W.__gas.g="gas";W.__gas.h=!0;W.__gas.b=0})(function(a){var b=Fa(a),c=b;c[Zb.qa]=null;c[Zb.ze]=null;var d=b=c;d.vtp_fieldsToSet=d.vtp_fieldsToSet||[];var e=d.vtp_cookieDomain;void 0!==e&&(d.vtp_fieldsToSet.push({fieldName:"cookieDomain",value:e}),delete d.vtp_cookieDomain);return b})}();


W.a.smm=["google"],function(){(function(a){W.__smm=a;W.__smm.g="smm";W.__smm.h=!0;W.__smm.b=0})(function(a){var b=a.vtp_input,c=Nh(a.vtp_map,"key","value")||{};return c.hasOwnProperty(b)?c[b]:a.vtp_defaultValue})}();




W.a.html=["customScripts"],function(){function a(d,e,g,h){return function(){try{if(0<e.length){var k=e.shift(),l=a(d,e,g,h);if("SCRIPT"==String(k.nodeName).toUpperCase()&&"text/gtmscript"==k.type){var m=u.createElement("script");m.async=!1;m.type="text/javascript";m.id=k.id;m.text=k.text||k.textContent||k.innerHTML||"";k.charset&&(m.charset=k.charset);var n=k.getAttribute("data-gtmsrc");n&&(m.src=n,Ja(m,l));d.insertBefore(m,null);n||l()}else if(k.innerHTML&&0<=k.innerHTML.toLowerCase().indexOf("<script")){for(var p=
[];k.firstChild;)p.push(k.removeChild(k.firstChild));d.insertBefore(k,null);a(k,p,l,h)()}else d.insertBefore(k,null),l()}else g()}catch(t){z(h)}}}var c=function(d){if(u.body){var e=
d.vtp_gtmOnFailure,g=Dh(d.vtp_html,d.vtp_gtmOnSuccess,e),h=g.mc,k=g.I;if(d.vtp_useIframe){}else d.vtp_supportDocumentWrite?b(h,k,e):a(u.body,Ta(h),k,e)()}else mh(function(){c(d)},
200)};W.__html=c;W.__html.g="html";W.__html.h=!0;W.__html.b=0}();



var dj={};dj.macro=function(a){if(wf.Zb.hasOwnProperty(a))return wf.Zb[a]},dj.onHtmlSuccess=wf.td(!0),dj.onHtmlFailure=wf.td(!1);dj.dataLayer=hd;dj.callback=function(a){Ac.hasOwnProperty(a)&&ha(Ac[a])&&Ac[a]();delete Ac[a]};dj.We=function(){sc[rc.m]=dj;Bc=W.a;Rb=Rb||wf;Sb=vd};
dj.Kf=function(){sc=f.google_tag_manager=f.google_tag_manager||{};if(sc[rc.m]){var a=sc.zones;a&&a.unregisterChild(rc.m)}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)Kb.push(c[d]);for(var e=b.tags||[],g=0;g<e.length;g++)Nb.push(e[g]);for(var h=b.predicates||[],k=0;k<h.length;k++)Mb.push(h[k]);for(var l=b.rules||[],m=0;m<l.length;m++){for(var n=l[m],p={},t=0;t<
n.length;t++)p[n[t][0]]=Array.prototype.slice.call(n[t],1);Lb.push(p)}Pb=W;Qb=Gh;dj.We();Ue();yd=!1;zd=0;if("interactive"==u.readyState&&!u.createEventObject||"complete"==u.readyState)Bd();else{Oa(u,"DOMContentLoaded",Bd);Oa(u,"readystatechange",Bd);if(u.createEventObject&&u.documentElement.doScroll){var q=!0;try{q=!f.frameElement}catch(x){}q&&Cd()}Oa(f,"load",Bd)}Ie=!1;"complete"===u.readyState?Ke():Oa(f,"load",Ke);a:{if(!Xc)break a;f.setInterval(Yc,864E5);}xc=(new Date).getTime();}};(0,dj.Kf)();

})()
