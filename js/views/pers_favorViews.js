/**
 * Created by prince on 2015/2/10.
 */

window.onload = function(){
    var delCollect = document.getElementById('del_collect');
    delCollect.onclick = function(){
        var key = getKey('key');
        var selectInputList = document.getElementById('favor_list').children;
        for(var i=0; i< selectInputList.length; i++ ){

            if(selectInputList[i].getElementsByTagName('input')[0].checked){
                var t = selectInputList[i];
                var favorId = selectInputList[i].dataset.favor;
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    data: {key: key, fav_id: favorId},
                    url: ApiUrl + '/index.php?act=member_favorites&op=favorites_del',
                    success: function (data) {
                        console.log(data);
                        if (!data.datas.error && data.datas === '1') {
                            t.parentNode.removeChild(t);
                        } else {
                            alert(data.datas.error);
                        }
                    }
                });
            }

        }

    };
};

