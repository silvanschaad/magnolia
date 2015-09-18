$(window).resize(function() {});
$(window).load(function(){});
$(document).ready(function() {
    previewInteraction();
});
function previewInteraction(){
    window.setTimeout(appendESCInteraction,200);
    function appendESCInteraction(){
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { $('#switchoff_preview').click(); }
        });
    }
    $('#switchoff_preview').removeAttr('target').click(function(e){
        e.preventDefault();
        var h = $(this).attr('href');
        location.href = h;
    });
}