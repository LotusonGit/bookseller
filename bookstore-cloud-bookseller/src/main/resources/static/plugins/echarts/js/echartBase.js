/**
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * @version: 1.0
 * @Program Name : chartBase.js
 * @Description :
 * @Creation Date : 2018-02-01
 * @Creator :  Alean
 * ******************************MODIFICATION  HISTORY***********************************************
 *  Modifier    :
 *  Modify Date    :
 *  CR/Internal CR/SIR/Internal SIR No.:
 *  Description    :
 */


/**
 *
 * @param {String} divId
 * @param {String} url
 * @param {Array} parms
 * @param {String} title
 * @param {String} type 'Pie',
 * @return {echarts} new echartsInstance
 */
function echartsInit(divId, url, parms, title, type) {
    var myChart = echarts.init($("#" + divId)[0]);
    //var myChart = echarts.init(document.getElementById(divId));

    $.ajax({
        cache: true,
        type: "POST",
        url: url,
        data: parms,
        async: true,
        error: function (request) {
            //closeWaitingLoadingDialog();
            //$.ligerDialog.warn("Connection error!");
            alert("Connection error!");
        },
        success: function (data) {
            //closeWaitingLoadingDialog();
            if (data == null) {
                return myChart;
            }
            data = jQuery.parseJSON(data);
            data = data._data;
            var option = {
                title: {
                    text: title,
                    x: 'center'
                },
                color: ['#63B2ED', '#76DA91', '#F9CB7E', '#F9948A', '#7CD5CD', '#9192AE'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} <br/> {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    y: 'bottom',
                    selectedMode: true,
                    //data: ['项目筛选', '初评立项', '投资审议', '投资执行', '投后管理', '投资退出']
                    data: data.legend
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true
                        },
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: false,
                            readOnly: false
                        },
                        magicType: {
                            show: true
                        },
                        restore: {
                            show: true
                        }
                    }
                },
                calculable: true,
                series: [{
                    name: '',
                    type: type,
                    radius: '50%',
                    center: ['50%', '45%'],
                    label: {
                        normal: {
                            formatter: "{b} : {c} ({d}%)"
                        }
                    },
                    data: data.series
                }]
            }

            myChart.setOption(option);
        }
    });
    return myChart;

}

