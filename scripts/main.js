$(".preloader").css("display", "none");
$('#title-card-p').fadeIn(3000);
$("body").css("overflow-y", "scroll");
$('#resume-download-btn').click(function() {
    console.log('hel');
    $('#resume-download-btn').addClass('btn-dark');
    $('#resume-download-btn').removeClass('btn-outline-dark');
    $("#download-success").css("display", "inline-block");
    $("#download-success").delay("slow").css("display", "none");
});