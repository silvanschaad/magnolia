$(window).resize(function(){});

$(window).load(function(){});

$(document).ready(function() {
//    hideEditButtons();
//    dragHotSpotMarkerInteraction();
//    metaNavigationInteraction();
//    siteSwitcherAdmin();
//    postToSocialMedia();
//    draggableInteraction();
});
var basepath = "";
function setBasePath(bp){
    basepath = bp;
}
function dragHotSpotMarkerInteraction(){
    if($('.hotspot-item').length>0){
        $('.hotspot-item').click(function(){
            var t = $(this);
            if(t.parent().parent().hasClass("editmode")){
                var uuid = $(this).attr("id");
                if(t.hasClass("dragging")){
                    t.removeClass("dragging");
                    var img = t.parent().find("img")
                    var lp = (t.position().left/img.width())*100;
                    var tp = (t.position().top/img.height())*100;
                    jQuery.ajax({
                        type: "GET",
                        url: basepath + '/custom/admin/persistdata.jsp',
                        data: {uuid:uuid, top:tp, left:lp }
                        ,success: function() { console.log("success");}
                        ,error: function() { console.log("error");}
                    });
                }else{
                    t.addClass("dragging");
                }
            }
        });
        $(document).bind('mousemove',function(e){
            var parentOffset = $(".hotspot-map").offset();
            var l = e.pageX - parentOffset.left - 20;
            var t = e.pageY - parentOffset.top - 20;
            $(".dragging").css("left",l).css("top",t);
        });
    }

}

function draggableInteraction(){
    var isDragging = false;
    jQuery(".hotspot-wrapper.editmode .hotspot-item").mousedown(function(){
        isDragging=true;
    }).mouseup(function(){
            var me = jQuery(this);
            var uuid = me.attr('id');
            var top = me.css("top");
            var left = me.css("left");
            isDragging=false;
            jQuery.ajax({
                type: "GET",
                url: basepath + '/custom/admin/persistdata.jsp',
                data: {uuid:uuid, pagePostitTop:top, pagePostitLeft:left }
                ,success: function() { console.log("success");}
                ,error: function() { console.log("error");}
            });
        });
    jQuery(".draggable").draggable({
        drag: function() { if(!isDragging) return false; }
    });
}


function hideEditButtons(){
    $(window).click(function(){
        $(".hideInRowEditMode").each(function(){
            var t = $(this);
            var p = $(this);
        });
    });
}

function metaNavigationInteraction(){
    $("body").click(function(){
        window.setTimeout(function(){
            $(".meta").each(function(){
                var t = $(this);
                if(t.find(".mgnlEditor:visible").not(".end").length>0){
                    t.addClass("editmode");
                }else{
                    t.removeClass("editmode");
                }
            });
            $(".hotspot-wrapper").each(function(){
                var t = $(this);
                if(t.parent().find(".mgnlEditor:visible").not(".end").length>0){
                    t.addClass("editmode");
                }else{
                    t.removeClass("editmode");
                }
            });
        },30);

    }).click();
}

function siteSwitcherAdmin(){
    $("#banderolen-settings-button").click(function(){
        $("#edit_banderolen_entries").fadeToggle(100);
    });
}

function postToSocialMedia(){
    var windows = $(".social-media-post-window");
    $("#post-twitter-button,#post-facebook-button").click(function(){
        var id = $(this).attr("id").replace("button","message");
        windows.each(function(){
            var tmpid = $(this).attr("id").replace("button","message");
            if(tmpid!=id){
                $(this).hide();
            }
        });
        $("#"+id).slideToggle(100);
    });
    windows.find(".close").click(function(){
        $(this).parent().parent().slideUp(100);
    });
    windows.find("form").submit(function(e){
        e.preventDefault();
        var url = $(this).attr("action");
        var fields = $(this).serializeArray();
        $.post(url, fields, function(data){
            windows.slideUp(100);
            alert($.trim(data));
        });
    });
}


jQuery.fn.selectText = function(){
    var doc = document
        , element = this[0]
        , range, selection
        ;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};

// Anchor text selection
$(function() {
    $('.editHint').click(function() {
        $(this).find('.anchor-name').selectText();
    });
});