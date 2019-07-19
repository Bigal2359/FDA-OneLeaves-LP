/* jshint browser: true, devel: true */
/* global fdaool, gtag */
(function(window, undefined){
	'use strict';

	var bodyTag = document.getElementsByTagName('BODY')[0],
		modalBkgd = document.querySelectorAll('.modal-bkgd')[0],
		scrollTrackingData = {
		    '10' : '10%',
		    '20' : '20%',
		    '30' : '30%',
		    '40' : '40%',
		    '50' : '50%',
		    '60' : '60%',
		    '70' : '70%',
		    '80' : '80%',
		    '90' : '90%',
		    '100' : '100%'
		},
		scrollTrackingFlags = {
		    '10flag' : false,
		    '20flag' : false,
		    '30flag' : false,
		    '40flag' : false,
		    '50flag' : false,
		    '60flag' : false,
		    '70flag' : false,
		    '80flag' : false,
		    '90flag' : false,
		    '100flag' : false
		},
		isComingSoon = function() {
	        if(bodyTag.classList.contains('coming-soon')) {
	          return true;
	        } else {
	          return false;
	        }
        };
  

	window.fdaool = {

		tagging : {

			floodLightTag : function(tag) {
				gtag('event', 'conversion', {
				    'allow_custom_scripts': true,
				    'send_to': tag
				});
			},

			analyticsEventTag : function(evtAct, evtCat, evtLbl) {
				gtag('event', evtAct, {
					'event_category' : evtCat,
					'event_label' : evtLbl
				});
			},

			conversionEventTag : function(tag) {
				gtag('event', 'conversion', {
					'send_to': tag,
				    'event_callback': window.location
				});
			},

			clickTagHandler : function(c, ctaBtn) {

		        ctaBtn[c].addEventListener('click', function(event){
		            event.preventDefault();
		        	var hrefValue = this.getAttribute('href');
					
					if(this.classList.contains('xbox')) {
				        // console.log('XBOX');
				        fdaool.tagging.floodLightTag('DC-4345482/fdafo0/fda_o00+standard');
				        if(this.classList.contains('download')) {
				        	fdaool.tagging.analyticsEventTag('click', 'download', 'xboxone');
				        } else {
				        	fdaool.tagging.analyticsEventTag('click', 'available', 'xboxone');
				        }
						fdaool.tagging.conversionEventTag('AW-770921199/baE0CNiwrpMBEO-lze8C');
			        } else if(this.classList.contains('windows')) {
				        // console.log('WINDOWS');
				        fdaool.tagging.floodLightTag('DC-4345482/fdafo0/fda_o000+standard');
				        if(this.classList.contains('download')) {
				        	fdaool.tagging.analyticsEventTag('click', 'download', 'windows10');
				        } else {
				        	fdaool.tagging.analyticsEventTag('click', 'available', 'windows10');
				        }
						fdaool.tagging.conversionEventTag('AW-770921199/LK3vCJXBrpMBEO-lze8C');
			        }
					
					window.open(hrefValue, '_self');
		        });
	  		},

	  		init : function() {
	  			var ctaBtn = document.getElementsByClassName('cta-btn'),
	  				c;

	  			if(!isComingSoon()) {
	  				for (c = 0; c < ctaBtn.length; c++) {
					    this.clickTagHandler(c, ctaBtn);
					}
	  			}
	  		}
		},

	  	popUpModalHandler : {

	  		modalCloseHandler : function(i, modalClose) {

	  			modalClose[i].addEventListener('click', function(){
		            modalClose[i].parentElement.parentElement.className =
					modalClose[i].parentElement.parentElement.className.replace(' active', '');
			        modalBkgd.className = modalBkgd.className.replace(' active', '');
			        setTimeout(function(){
			        	modalClose[i].parentElement.parentElement.style.display = 'none';
				    	bodyTag.className = bodyTag.className.replace('modal-active', '');
				        window.scrollTo(0, document.body.scrollHeight);
				    }, 500);
		        });
	  		},

	  		modalOpenHandler : function(m, modalOpen) {

	  			modalOpen[m].addEventListener('click', function(){
	  				var modalID = this.id.substring(4);

	  				document.getElementById(modalID).style.display = 'block';
				    setTimeout(function(){ 
				    	document.getElementById(modalID).className += ' active';
				    	modalBkgd.className += ' active';
					    bodyTag.className += 'modal-active';
					    window.scrollTo(0, 0);

					    if (modalID === 'about') { 
					    	modalID = 'aboutus';
					    }

					    fdaool.tagging.analyticsEventTag('click', 'footer', modalID);
				    }, 200);
		        });
	  		},

	  		init : function() {
	  			var modalOpen = document.querySelectorAll('.modal-btn'),
	  				modalClose = document.querySelectorAll('.modal-close-btn'),
	  				i,
					m;
			    
			    for (m = 0; m < modalOpen.length; m++) {
			    	this.modalOpenHandler(m, modalOpen);
			    }
			    
			    for (i = 0; i < modalClose.length; i++) {
			    	this.modalCloseHandler(i, modalClose);
			    }
	  		}
	  	},

	  	scrollListenerHandler : {

	  		getDocHeight : function() {
	  			var D = document;
			    return Math.max(
			        D.body.scrollHeight, D.documentElement.scrollHeight,
			        D.body.offsetHeight, D.documentElement.offsetHeight,
			        D.body.clientHeight, D.documentElement.clientHeight
			    );
	  		},

	  		amountscrolled : function() {
	  			var winheight = window.innerHeight || 
					  			(document.documentElement || 
				  				document.body).clientHeight,
	  				docheight = this.getDocHeight(),
	  				scrollTop = window.pageYOffset ||
	  							(document.documentElement || 
	  								document.body.parentNode || 
	  								document.body).scrollTop,
	  				trackLength = docheight - winheight,
	  				pctScrolled = Math.floor(scrollTop/trackLength * 100),
	  				pctRounded = Math.floor((pctScrolled+1)/10)*10;

				// console.log(pctScrolled);

				// console.log('Scrolled passed ' + Math.floor((pctScrolled+1)/10)*10);

		        for (var i in scrollTrackingData) {
				    if(scrollTrackingData.hasOwnProperty(i)){

				        if(pctRounded >= i && 
							!scrollTrackingFlags[i + 'flag']){
				            
				            // console.log(scrollTrackingData[i]);
				            fdaool.tagging.analyticsEventTag('down', 'scroll', i + '%');

				            scrollTrackingFlags[i + 'flag'] = true;
				        }
				    }
				}

	  		},

	  		fadeInScrollIndicator : function(headerScroll) {

	  			if ((document.body.getBoundingClientRect()).top === 0) {
					headerScroll[0].className += ' active';
				}
	  		},

	  		fadeOutScrollIndicator : function(headerScroll) {

				if ((document.body.getBoundingClientRect()).top < 0) {
					headerScroll[0].className = 
					headerScroll[0].className.replace('active', '');
				}
	  		},

	  		init : function() {
	  			var scrollPos = 0,
		  			headerScroll = document.getElementsByClassName('header-scroll');

	  			if(!isComingSoon()) {
	  				this.fadeInScrollIndicator(headerScroll);
	  			}

	  			window.addEventListener('scroll', function(){

	  				if(!isComingSoon()) {
		  				fdaool.scrollListenerHandler.fadeOutScrollIndicator(headerScroll);
		  			}

					if ((document.body.getBoundingClientRect()).top < scrollPos) {
						fdaool.scrollListenerHandler.amountscrolled();
					}
					// saves the new position for iteration.
					scrollPos = (document.body.getBoundingClientRect()).top;
				}, false);
	  		}
	  	},

	    init: function(){
	    	this.tagging.init();
			this.popUpModalHandler.init();
			this.scrollListenerHandler.init();
	    }
	};
})(this);

window.fdaool.init();
