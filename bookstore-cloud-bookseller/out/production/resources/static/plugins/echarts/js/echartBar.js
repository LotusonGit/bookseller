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

var generalDteFormat = "yyyy/MM/dd";

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
    //var myChart = echarts.init($("#"+divId));
    var myChart = echarts.init(document.getElementById(divId));

    $.ajax({
        cache: true,
        type: "POST",
        url: url,
        data: parms,
        async: true,
        error: function (request) {
            closeWaitingLoadingDialog();
            $.ligerDialog.warn("Connection error!");
        },
        success: function (data) {
            closeWaitingLoadingDialog();
            if (data == null) {
                return myChart;
            }
            data = jQuery.parseJSON(data);
            data = data._data;
            var option = {
                title: {
                    text: title
                    //x: 'center'
                },
                //color: ['#63B2ED', '#76DA91', '#F9CB7E', '#F9948A', '#7CD5CD', '#9192AE'],
                color: ['#63B2ED'],
                tooltip: {
//						trigger: 'item',
//						formatter: "{b} <br/> {c} ({d}%)"
                    trigger: 'axis'
                },
                legend: {
//						orient: 'horizontal',
//						x: 'center',
//						y: 'bottom',
                    x: 'right',
                    y: 'center',
                    //data: data.legend
                    data: ['金额']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
//							magicType: {
//								show: true,
//							},
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'value',
                    boundaryGap: [0, 0.01]
                }],
                yAxis: [{
                    type: 'category',
                    axisLabel: {
                        interval: 0,
                        formatter: function (value) {
                            debugger
                            var ret = ""; //拼接加\n返回的类目项  
                            var maxLength = 6; //每项显示文字个数  
                            var valLength = value.length; //X轴类目项的文字个数  
                            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                            if (rowN > 1) //如果类目项的文字大于3,  
                            {
                                for (var i = 0; i < rowN; i++) {
                                    var temp = ""; //每次截取的字符串  
                                    var start = i * maxLength; //开始截取的位置  
                                    var end = start + maxLength; //结束截取的位置  
                                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                                    temp = value.substring(start, end) + "\n";
                                    ret += temp; //凭借最终的字符串  
                                }
                                return ret;
                            } else {
                                return value;
                            }
                        }
                    },
                    data: data.legend
                }],
                series: [{
                    name: '金额',
                    type: type,
                    data: data.series
                }]
            }

            myChart.setOption(option);
            return myChart;
        }
    });

}

