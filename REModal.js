/* global Plastic, $, jQuery */

/***************************************************************************************** 
 * 
 *  Copyright (C) Rising Empire Technologies, Inc - All Rights Reserved
 *  Unauthorized use, modification or distribution of this work is strictly prohibited.
 * 
 *  Written by:
 *  Brendan Tackney <brendan@risingempire.tech>, March 2017
 *  Sheldon Pasciak <sheldon@risingempire.tech>, March 2017
 *  Blake Buck <blake@risingempire.tech>, March 2017
 *
 ****************************************************************************************/
function PlasticModal(){ var AllRightsReserved = ' Rising Empire Technologies, Inc. '}

Plastic.modal = {
    modalContent: null,
    modalHeight: 0,
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
    /**
     * Centers the content of the modal examining window height/width and model height/width
     * 
     */    
    centerContent: function(){
        var viewportHeight = $(window).height();
        var viewportWidth = $(window).width();       
        
        Plastic.modal.modalHeight = Math.max(Plastic.modal.modalContent.height(), Plastic.modal.modalHeight);
        Plastic.modal.modalWidth = Math.max(Plastic.modal.modalContent.width(), Plastic.modal.modalWidth);

        var left = Plastic.modal.modalWidth >= viewportWidth ? 0 : (viewportWidth - Plastic.modal.modalWidth) / 2;
        var top = Plastic.modal.modalHeight >= viewportHeight ? 0 : (viewportHeight - Plastic.modal.modalHeight) / 2;
        
        Plastic.modal.modalContent.css("left", left);
        Plastic.modal.modalContent.css("top", top);
        Plastic.modal.modalContent.css("max-height", viewportHeight);
        Plastic.modal.modalContent.css("max-width", viewportWidth);
        
        Plastic.modal.modalOverlay.height(viewportHeight);
    },
    close: function(){
        Plastic.modal.modalContent.slideUp(Plastic.modal.options.closeSpeed);
        Plastic.modal.modalOverlay.slideUp(Plastic.modal.options.closeSpeed);
        
        if (Plastic.modal.options.callback != null){            
            Plastic.modal.options.callback(Plastic.modal.options.callbackObj);
        }
        
        if (Plastic.modal.options.destroyOnClose){
            Plastic.modal.destroy();
        }
    },
    /**
          ```js
                  
            Modal.create(html, {destroyOnClose: true, height: '450px', width: '800px', callback: null});
            
            Modal.show();
          
          ``` 
     */     
    create: function(htmlContent, options, creationCallback){
        if (htmlContent === null && typeof options.contentURI !== "undefined"){
            if (typeof creationCallback === "undefined"){
                console.warn("You are creating an async modal, without a creationCallback.");
            }
            $.get(options.contentURI, function(html){
                htmlContent = html;
                create();
            });
        }
        else {
            create();
        }
        
        function create(){
            Plastic.modal.modalHeight = 0;
            Plastic.modal.modalWidth = 0;
            $.extend(Plastic.modal.options, options);
            
            var contentDivId = Plastic.modal.options.prefix + "Content";
            var overlayDivId = Plastic.modal.options.prefix + "Overlay";
            
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
            
            Plastic.modal.modalContent = $("#" + contentDivId);
            Plastic.modal.modalOverlay = $("#" + overlayDivId);
        
            Plastic.modal.setOptionalDimensions();
        
            Plastic.modal.modalContent.html(htmlContent);
    
            Plastic.modal.modalOverlay.click(Plastic.modal.hide);
            
            Plastic.modal.centerContent();
            
            $(window).resize(Plastic.modal.centerContent);
            
            if (typeof creationCallback !== "undefined"){
                creationCallback();    
            }
        }
    },
    destroy: function(){
        Plastic.modal.options.callback = function(callbackObj){};
        Plastic.modal.options.callbackObj = null;
        Plastic.modal.options.closeSpeed = 500;
        Plastic.modal.options.destroyOnClose = false;
        Plastic.modal.options.openSpeed = 700;
        Plastic.modal.options.prefix = "REModal-";
        Plastic.modal.modalContent.remove();
        Plastic.modal.modalOverlay.remove();
    },
    hide: function(){
        // Alias for close
        Plastic.modal.close();
    },
    open: function(){
        Plastic.modal.modalOverlay.slideDown(Plastic.modal.options.openSpeed);
        Plastic.modal.modalContent.slideDown(Plastic.modal.options.openSpeed);
    },
    resize: function(width, height){
        if (typeof Plastic.modal.options.height !== "undefined"){
            Plastic.modal.modalContent.css("height", Plastic.modal.options.height);
        }
        if (typeof Plastic.modal.options.width !== "undefined"){
            Plastic.modal.modalContent.css("width", Plastic.modal.options.width);
        }
        Plastic.modal.centerContent();
    },
    setOptionalDimensions: function(){
        if (typeof Plastic.modal.options.height !== "undefined"){
            Plastic.modal.modalContent.css("height", Plastic.modal.options.height);
        }
        if (typeof Plastic.modal.options.width !== "undefined"){
            Plastic.modal.modalContent.css("width", Plastic.modal.options.width);
        }
    },
    show: function(){
        // Alias for open
        Plastic.modal.open();
    }
}
Modal = Plastic.modal;
