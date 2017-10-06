jQuery(function($) {
	
	// Fix fixed bg's jump
	/MSIE [6-8]|Mac/i.test(navigator.userAgent)||$("header, article, footer").each(function(){if("fixed"==$(this).css("backgroundAttachment")){var i=$(this),a=/WebKit/i.test(navigator.userAgent)?9:8;i.addClass("froid-fixed-bg").data({bgX:i.css("backgroundPosition").slice(0,i.css("backgroundPosition").indexOf(" ")),bgY:i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),margin:a})}}),$(window).bind("SIModals.modalsOpen",function(){$(".froid-fixed-bg").each(function(){var i=$(this);i.css("backgroundPosition","calc("+i.data("bgX")+" - "+i.data("margin")+"px) "+i.data("bgY"))})}),$(window).bind("SIModals.modalsClose",function(){$(".froid-fixed-bg").each(function(){var i=$(this);i.css("backgroundPosition",i.data("bgX")+" "+i.data("bgY"))})});
	
	// SI False
	$('.si-false').click(function(){return false;});
	
	// Mobile full-width && disable animation
	if(is_mobile()) {
		
		// Fix mobile fixed bg's
		$("header, article, footer").each(function(){if ("fixed" == $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');});
		
		// Mobile stretch
		$('html, body').css('min-width', '1280px').addClass('mobile');
		$('html').css('width', window.innerWidth + 'px');
		
		// Remove animation
		$('.cre-animate').css({'transform': 'none', '-webkit-transform': 'none', '-moz-transform': 'none', '-ms-transform': 'none', '-o-transform': 'none', 'transition': 'none', '-webkit-transition': 'none', 'opacity' : 1}).removeClass('.cre-animate');
		
		// Remove video
		$('#video').remove();
		
	}else{
	
		$(window).load(function() {
			
			setTimeout(function(){$('#video').css({'visibility': 'visible', 'opacity' : 1});$('#video')[0].play();},100);
		
		});

	}
	
	if (is_OSX()) {
		$('html, body').addClass('osx');
	}
	
	// Init all plugins and scripts
	$.fn.SIInit = function() {
	
		// Modal photos
		$('a[data-rel]').each(function() {$(this).attr('rel', $(this).data('rel'));});
		$('a[rel^=fancybox]').not('.cloned a').fancybox({
			helpers : {
				thumbs : true,
				media : {}
			}
		});
		
		// Forms
		$('.send-form').SIForms({
			'validateFields': { 
				'client_name' 		: 'Укажите Ваше имя',
				'client_phone' 		: 'Укажите Ваш телефон',
				'client_mail' 		: 'Укажите Ваш e-mail'
			},
			'sendSuccess' : function(res) {
				
				
			document.location.href = 'http://xn-----7kcba4bcwwiww1f1b.xn--90ais/request.html';
				
				/*
				ga('send', 'event', res.gcode, res.gcode);
				*/
				
			}
			
		});
	
	};
	
	$.fn.SIInit();

	// All sound load
	$.ionSound({sounds: ["bip-1","bip-2","wuf-1","wuf-2","wuf-3","wuf-4"], path: template_url + "/sounds/", volume: 0.3});
	
	// Sounds
	$(document).on('mouseenter', '.button, .submit, .phone-line, .si-jump', function() {
		$.ionSound.play('bip-2');
	});
	SIModals.beforeOpen = function() {$.ionSound.play('wuf-4');}
	SIModals.beforeClose = function() {$.ionSound.play('wuf-3');}
	SIModals.settings.resizeElements = '#global-wrapper, #top';

	// Jump links
	$('.si-jump').SIJump();
	
	// Page messages
	SIPageMessages.init();
	
	// Actions
		
		// Slider
		$('.actions').owlCarousel({loop:true,items:1,margin:160,nav:true,dots:true,
			onChange : function(){
				$.ionSound.play('wuf-1');
			}
		});
		
	// Projects
		
		// Plans
		$('.open-plans').click(function() {
			
			$(this).next().find('a').first().click();
			
			return false;
			
		});
		
		// Extra projects
		$('.show-extra-projects .num').text($('.extra-projects .project-item').size());
		$('.show-extra-projects').click(function() {
			$(this).parent().slideUp(500);
			$('.extra-projects').slideDown(500);
			return false;
		});
		
	// Gallery
		
		// Slider
		$('.gallery').owlCarousel({loop:true,items:1,margin:10,nav:true,dots:true,
			onChange : function(){
				$.ionSound.play('wuf-1');
			}
		});
		
		
	// Nav
	if ($('#top').size() > 0) {
		
		var nav_height = $('#top').outerHeight();

		$(window).on('load scroll resize', function() {

			var current_scroll = $(document).scrollTop();
		
			if (current_scroll > 0) {
				$('#top').addClass('fixed');
			}else{
				$('#top').removeClass('fixed');
			}
		
		});

		// add class
		$(window).on('load scroll resize', function() {
			
			var current_section;
			
			$('article, section, header, footer').each(function() {
				
				var section_offset = $(this).offset().top - nav_height*2 - 20;
				if ($(document).scrollTop() >= section_offset && $(document).scrollTop() < $(this).height() + section_offset) {
					current_section = ($(this).attr('id')) 
					? '#' + $(this).attr('id') 
					: $(this)[0].tagName.toLowerCase();
				}
				
			});
		
			$('#top li a').each(function() {
				
				$(this).removeClass('active');
				
				if ($(this).attr('href') == current_section){
					$(this).addClass('active');
				}
				
			});

		});
		
	}
	
	// Modals
	SIModals.init();
		
		// Init modals
		SIModals.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra' : 'extra'});
			SIModals.attachModal('.open-phone2-modal', '.phone2-modal', {'.send-extra' : 'extra'});
			SIModals.attachModal('.open-vopros-modal', '.vopros-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-app-modal', '.app-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-actions-modal', '.actions-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-prais-modal', '.prais-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-places-modal', '.places-modal', {'.send-extra' : 'extra'});
		SIModals.attachModal('.open-cena-modal', '.cena-modal', {'.send-extra' : 'extra'});


		// Modal controls
		SIModals.attachClose('.si-close');
		
});