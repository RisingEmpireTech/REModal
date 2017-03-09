/**************************************************************************************** 
 * 
 *  Copyright (C) Rising Empire Technologies, Inc - All Rights Reserved
 *  Unauthorized use, modification or distribution of this work is strictly prohibited.
 *  Written by:
 *  Blake Buck <blake@risingempire.tech>, March 2017
 *
 ****************************************************************************************/

/* global $*/ // This is for cloud9 editor

var Modal = {
    modalContent: null,
    modaltHeight: 0,
    modalWidth: 0,
    modalOverlay: null,
    options: {
        callback: function(callbackObj){},
        callbackObj: null,
        closeSpeed: 500,
        destroyOnClose: false,
        openSpeed: 700,
        prefix: "REModal-"
    },
    centerContent: function(){
        var viewportHeight = $(window).height();
        var viewportWidth = $(window).width();
        
        console.log(Modal.modalContent.height());
        
        Modal.modalHeight = Math.max(Modal.modalContent.height(), Modal.modalHeight);
        Modal.modalWidth = Math.max(Modal.modalContent.width(), Modal.modalWidth);
        
        var left = Modal.modalWidth >= viewportWidth ? 0 : (viewportWidth - Modal.modalWidth) / 2;
        var top = Modal.modalHeight >= viewportHeight ? 0 : (viewportHeight - Modal.modalHeight) / 2;

        Modal.modalContent.css("left", left);
        Modal.modalContent.css("top", top);
        Modal.modalContent.css("max-height", viewportHeight);
        Modal.modalContent.css("max-width", viewportWidth);
        
        Modal.modalOverlay.height($(window).height());
    },
    close: function(){
        Modal.modalContent.slideUp(Modal.options.closeSpeed);
        Modal.modalOverlay.slideUp(Modal.options.closeSpeed);
        
        if (Modal.options.destroyOnClose){
            Modal.destroy();
        }
        
        Modal.options.callback(Modal.options.callbackObj);
    },
    create: function(htmlContent, options){
        $.extend(Modal.options, options);
        
        var contentDivId = Modal.options.prefix + "Content";
        var overlayDivId = Modal.options.prefix + "Overlay";
        
        if ($("#" + overlayDivId).length <= 0){
            $('<div>').attr({ 
                id: contentDivId,
                class: "REModal-Content"
            }).prependTo('body');
            $('<div>').attr({ 
                id: overlayDivId,
                class: "REModal-Overlay"
            }).prependTo('body');
        }
        
        Modal.modalContent = $("#" + contentDivId);
        Modal.modalOverlay = $("#" + overlayDivId);
    
        Modal.modalContent.html(htmlContent);

        Modal.modalOverlay.click(Modal.hide);
        
        Modal.centerContent();
        $(window).resize(Modal.centerContent);
    },
    destroy: function(){
        Modal.modalContent.remove();
        Modal.modalOverlay.remove();
    },
    hide: function(){
        // Alias for close
        Modal.close();
    },
    open: function(){
        Modal.modalOverlay.slideDown(Modal.options.openSpeed);
        Modal.modalContent.slideDown(Modal.options.openSpeed);
    },
    show: function(){
        // Alias for open
        Modal.open();
    }
};
