/**
 * Created by prince on 2015/2/10.
 */

$(function() {

    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%' // optional
    });


    $('.goto-settlement').on('click', function(){
        $('#to_be_continued').modal({
            relatedTarget: this,
            onConfirm: function() {
                location.href = WapSiteUrl
            }
        })
    });
});