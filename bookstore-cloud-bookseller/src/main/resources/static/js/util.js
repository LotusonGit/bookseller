/**
 * ******************************MODIFICATION  HISTORY*****************************************
 * * @Modify Date    :2016-07-26
 * @Modifier :wangrongling
 * @CR/Internal CR/SIR/Internal SIR No.: SIR#722
 * @Description    :限制提前还款日期
 * ******************************MODIFICATION  HISTORY*****************************************
 * @Modify Date    :2016-08-17
 * @Modifier :liuxueshen
 * @CR/Internal CR/SIR/Internal SIR No.: SIR#729
 * @Description    :修改字段的转码方式，使“+”等特殊字符能够转码
 * ******************************MODIFICATION  HISTORY*****************************************
 * @Modify Date    :2016-08-29
 * @Modifier :liuyan
 * @CR/Internal CR/SIR/Internal SIR No.: SIR#547
 * @Description    ：允许利率格式为小数点后为0
 * ******************************MODIFICATION  HISTORY*****************************************
 * Modify Date    :2016-12-19
 * Modifier    :  miaoyucong
 * CR/Internal CR/SIR/Internal SIR No.: SIR#968
 * Description    : Add Check for “联行号”和“CNAPS号”

 *******************************MODIFICATION HISTORY*******************************************
 **/
//页面SO缓存
var soAry = new Array();
var soTreeAry = new Array();


//基本路径
var path = "..";
var pageLevel = "";
//
var oidAry = new Array();
//
var RPT_URL = "http://195.204.17.64:8004";
$(function () {
    $('#iconSearch').click(function () {
        $('#iconSearch').attr("disabled", "disabled");
        setTimeout("$('#iconSearch').attr('disabled','')", 500);
    });
    $('#iconReset').click(function () {
        $('#iconReset').attr("disabled", "disabled");
        setTimeout("$('#iconReset').attr('disabled','')", 500);
    });

});

$(document).keydown(function (e) {
    var doPrevent;
    var varkey = (e.keyCode || (e.which) || (e.charCode));
    if (varkey == 8) {
        var d = e.srcElement || e.target;
        //alert(d.tagName.toUpperCase());
        if (d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
            doPrevent = false;
        } else {
            doPrevent = true;
        }
    }
    else {
        doPrevent = false;
    }
    if (doPrevent) {
        e.preventDefault();
    }
    ///alert(111);
});

/**
 * 点击菜单方法
 * @param item
 * @author wanghuwei
 */

/**
 * 日期格式化

 * @param data
 * @param index
 * @param value
 * @param col
 * @add   wangruiqing 20130923
 * @returns
 */
DateFormat = (function () {
    var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
    var DEFAULT_PATTERN = 'yyyy-MM-dd';

    function padding(s, len) {
        var len = len - (s + '').length;
        for (var i = 0; i < len; i++) {
            s = '0' + s;
        }
        return s;
    };
    return ({
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y' :
                        return padding(date.getFullYear(), $0.length);
                    case 'M' :
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd' :
                        return padding(date.getDate(), $0.length);
                    case 'w' :
                        return date.getDay() + 1;
                    case 'h' :
                        return padding(date.getHours(), $0.length);
                    case 'm' :
                        return padding(date.getMinutes(), $0.length);
                    case 's' :
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs2.length == 1 && matchs2[0] == dateString && dateString.length == 8) {
                //dateString 是yyyyMMdd格式的数据

                dateString = dateString.substr(0, 4) + "-" + dateString.substr(4, 2) + "-" + dateString.substr(6, 2);
                matchs2 = dateString.match(/(\d)+/g);
            }
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _str = matchs2[i];
                    if (_str.substr(0, 1) == "0" && _str.length > 1) {
                        _str = _str.substr(1, _str.length - 1);
                    }
                    var _int = parseInt(_str);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y' :
                            _date.setFullYear(_int);
                            break;
                        case 'M' :
                            _date.setMonth(_int - 1);
                            break;
                        case 'd' :
                            _date.setDate(_int);
                            break;
                        case 'h' :
                            _date.setHours(_int);
                            break;
                        case 'm' :
                            _date.setMinutes(_int);
                            break;
                        case 's' :
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        }
    });
})();


/*function clickMenu(item){
	if(item.url){
		manger.setLeftCollapse (true);
		var url = path + item.url;
		var menuId = item.menuId;
		if(menuId.substring(0,4) == "RPT_"){
			//url = RPT_URL + item.url;
			url = path + "/report!create.do?createType=pubHop&" + item.url.substring(item.url.indexOf("?")+1);
		}
		url += url.indexOf("?") == -1 ? "?" : "&";
		url += "FUNCID=" + item.menuId;
		winTab.addTabItem({
			tabid: item.menuId,
			"url": url,
			text: item.text,
			showClose: true,
			height: $(".l-layout-center").height(),
			getServerSessionId : true,
			noSelectedTag: false
		});
	}
}
*/
/**
 * ligerGrid下拉解析方法，render参数专用方法
 * @param data
 * @param index
 * @param value
 * @param col
 * @author wanghuwei
 * @returns
 */
function peaseList(data, index, value, col, url) {
    if (col.editor.data != null) {
        for (var i = 0; i < col.editor.data.length; i++) {
            if (col.editor.data[i].value == value)
                return col.editor.data[i].text;
        }
    } else if (col.editor.soName != null) {
        var soUrl = url.substring(0, url.indexOf("!")) + "!getSo.do";
        getJSON(soUrl, {soName: col.editor.soName}, function (data) {
            soAry[col.editor.soName] = data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].value == value)
                    return data[i].text;
            }
        })
    }
}

/**
 * ligerGrid下拉解析方法，render参数专用方法
 * @param rowdata
 * @param rowindex
 * @param value
 * @param column
 * @returns {String}
 */
function peaseList(rowdata, rowindex, value, column) {
    var rValue = "";
    if (value == "") return rValue;
    if (((column.editor && column.editor.type == 'select') || (!column.editor && column.soName)) && rowdata[column.name + "_TEXT"] == undefined) {
        if (column.name != undefined) {
            var url = column.url.substring(0, column.url.indexOf("!"));
            if (column.editor && column.editor.soMethod != undefined) {
                url += "!" + column.editor.soMethod + ".do";
            } else {
                url += "!getSo.do";
            }
            var soName = column.soName || column.editor.soName;
            url += "?soName=" + soName;
            if ((column.editor && column.editor.nameField) || column.nameField)
                url += "&filterNameField=" + column.nameField || column.editor.nameField;
            if ((column.editor && column.editor.valueField) || column.valueField)
                url += "&filterValueField=" + column.valueField || column.editor.valueField;
            if (column.editor && column.editor.sibling) {
                url += "&" + column.editor.sibling + "=" + rowdata[column.editor.sibling];
            }
            if (soAry[soName] && column.editor && column.editor.soMethod == undefined) {
                var data = soAry[column.editor.soName];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].value == rowdata[column.name]) {
                        rValue = data[i].text;
                        rowdata[column.name + "_TEXT"] = rValue;
                        if (column.editor.codeFst != null && column.editor.codeFst == "Y") {
                            if (rValue.indexOf(" - ") < 0) {
                                rValue = value + " - " + rValue;
                            }
                        }
                        return rValue;
                    }
                }
            } else {
                //getJSONAsync(url, function(data){

                var soname = soName;
                var dat1 = new Date();
                var data = [];
                //alert(g.data);
                var allso = getAllso();
                for (var b = 0; b < allso.length; b++) {
                    var tempobj = allso[b];
                    if (tempobj.soname == soname) {
                        data = tempobj.sovalue;
                        break;
                    }
                }

                soAry[soName] = data;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].value == rowdata[column.name]) {
                        rValue = data[i].text;
                        rowdata[column.editor.name + "_TEXT"] = rValue;
                        if (column.editor.codeFst != null && column.editor.codeFst == "Y") {
                            if (rValue.indexOf(" - ") < 0) {
                                rValue = value + " - " + rValue;
                            }
                        }
                        return rValue;
                    }
                }
                //});
            }
        }
    } else {
        var data = soAry[column.editor.soName];
        if (data != null && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].value == rowdata[column.name]) {
                    rValue = data[i].text;
                }
            }
        }
        if (rValue == "") {
            rValue = rowdata[column.name + "_TEXT"] || rowdata[column.name];
        }
        if (column.editor.codeFst != null && column.editor.codeFst == "Y") {
            if (rValue.indexOf(" - ") < 0) {
                rValue = value + " - " + rValue;
            }
        }
        return rValue;
    }
    return rValue;
}

/**
 * 同步方法取得后台JSON数据
 * @param url 请求地址
 * @param parms 后传参数
 * @param func success时的回调方法
 * @param errorFunc error时的回调方法
 */
function getJSONAsync(url, parms, func, errorFunc) {
    url += url.indexOf("?") == -1 ? "?" : "&";
    url += "_usrSessionId=" + getUsrSessionId() + "&sessionId=" + getSessionId() + "&_isAjaxRequest=Y&_timestmp=" + new Date().getTime();
    if ($.isFunction(parms)) {
        errorFunc = func;
        func = parms;
    }
    $.ajax({
        url: url,
        data: parms,
        async: false,
        dataType: 'json',
        success: function (rMsg) {
            if (!rMsg._success) {
                if (rMsg._timeout) {
                    //Start SIR#1616 added by tofu 2017-10-18
                    $.ligerDialog.warn(rMsg._msg, function () {
                        //End SIR#1616 added by tofu 2017-10-18
                        if (pageLevel && pageLevel == 'root') {
                            document.location = "../index.jsp";
                        } else {
                            getRootPage().location = "index.jsp";
                        }
                        //Start SIR#1616 added by tofu 2017-10-18
                    });
                    //End SIR#1616 added by tofu 2017-10-18
                }
            } else {
                if (typeof(rMsg._data) == "string") {
                    func && func($.parseJSON(rMsg._data));
                } else {
                    func && func(rMsg._data);
                }
            }
        },
        error: errorFunc
    });
}

/**
 * 异步方式取得后台JSON数据
 * @param url
 * @param parms
 * @param func
 * @param errorFunc
 */
function getJSON(url, parms, func, errorFunc) {
    url += url.indexOf("?") == -1 ? "?" : "&";
    url += "_usrSessionId=" + getUsrSessionId() + "&sessionId=" + getSessionId() + "&_isAjaxRequest=Y&_timestmp=" + new Date().getTime();
    if ($.isFunction(parms)) {
        errorFunc = func;
        func = parms;
    }
    $.ajax({
        url: url,
        data: parms,
        dataType: 'json',
        success: function (rMsg) {
            if (rMsg == null) {
                func && func();
                return;
            }
            if (!rMsg._success) {
                if (rMsg._timeout) {
                    //Start SIR#1616 added by tofu 2017-10-18
                    $.ligerDialog.warn(rMsg._msg, function () {
                        //End SIR#1616 added by tofu 2017-10-18
                        if (pageLevel && pageLevel == 'root') {
                            document.location = "../index.jsp";
                        } else {
                            getRootPage().location = "index.jsp";
                        }
                        //Start SIR#1616 added by tofu 2017-10-18
                    });
                    //End SIR#1616 added by tofu 2017-10-18
                }
            } else {
                if (typeof(rMsg._data) == "string") {
                    func($.parseJSON(rMsg._data));
                } else {
                    func && func(rMsg._data);
                }
            }
        },
        error: errorFunc
    });
}

/**
 * 同步get方法取得后台数据
 * @param url
 * @param parms
 * @param func
 * @param errorFunc
 */
function getAsync(url, parms, func, errorFunc) {
    url += url.indexOf("?") == -1 ? "?" : "&";
    url += "_usrSessionId=" + getUsrSessionId() + "&sessionId=" + getSessionId() + "&_isAjaxRequest=Y&_timestmp=" + new Date().getTime();
    if ($.isFunction(parms)) {
        errorFunc = func;
        func = parms;
    }
    $.ajax({
        url: url,
        data: parms,
        dataType: 'json',
        async: false,
        success: function (rMsg) {
            if (rMsg == null) {
                func && func();
                return;
            }
            if (!rMsg._success) {
                //alert(rMsg._msg);
                if (rMsg._timeout) {
                    //Start SIR#1616 added by tofu 2017-10-18
                    $.ligerDialog.warn(rMsg._msg, function () {
                        //End SIR#1616 added by tofu 2017-10-18
                        if (pageLevel && pageLevel == 'root') {
                            document.location = "../index.jsp";
                        } else {
                            getRootPage().location = "index.jsp";
                        }
                        //Start SIR#1616 added by tofu 2017-10-18
                    });
                    //End SIR#1616 added by tofu 2017-10-18
                }
            } else {
                func && func(rMsg._data);
            }
        },
        error: errorFunc
    });
}

/**
 * 异步get方法取得后台数据
 * @param url
 * @param parms
 * @param func
 * @param errorFunc
 */
function get(url, parms, func, errorFunc) {
    //try{
    url += url.indexOf("?") == -1 ? "?" : "&";
    url += "_usrSessionId=" + getUsrSessionId() + "&sessionId=" + getSessionId() + "&_isAjaxRequest=Y&_timestmp=" + new Date().getTime();
    if ($.isFunction(parms)) {
        errorFunc = func;
        func = parms;
    }
    $.ajax({
        url: url,
        data: parms,
        dataType: 'json',
        success: function (rMsg) {
            if (rMsg == null) {
                func && func();
                return;
            }
            if (!rMsg._success) {
                if (rMsg._timeout) {
                    //Start SIR#1616 added by tofu 2017-10-18
                    $.ligerDialog.warn(rMsg._msg, function () {
                        //End SIR#1616 added by tofu 2017-10-18
                        if (pageLevel && pageLevel == 'root') {
                            document.location = "../index.jsp";
                        } else {
                            getRootPage().location = "index.jsp";
                        }
                        //Start SIR#1616 added by tofu 2017-10-18
                    });
                    //End SIR#1616 added by tofu 2017-10-18
                }
            } else {
                func && func(rMsg._data);
            }
        },
        error: errorFunc
    });
    //}catch( e){
    //	func && func("调用异常！");
    //}
}

/**
 * post方法取得后台数据
 * @param url
 * @param parms
 * @param func
 * @param errorFunc
 */
function post(url, parms, func, errorFunc) {
    //try{
    url += url.indexOf("?") == -1 ? "?" : "&";
    url += "_usrSessionId=" + getUsrSessionId() + "&sessionId=" + getSessionId() + "&_isAjaxRequest=Y&_timestmp=" + new Date().getTime();
    if ($.isFunction(parms)) {
        errorFunc = func;
        func = parms;
    }
    $.ajax({
        url: url,
        data: parms,
        type: "POST",
        dataType: 'json',
        success: function (rMsg) {
            if (rMsg == null) {
                func && func();
                return;
            }
            if (!rMsg._success) {
                if (rMsg._timeout) {
                    $.ligerDialog.warn(rMsg._msg, function () {
                        if (pageLevel && pageLevel == 'root') {
                            document.location = "../index.jsp";
                        } else {
                            getRootPage().location = "index.jsp";
                        }
                    });
                }
            } else {
                func && func(rMsg._data);
            }
        },
        error: errorFunc
    });

}

/**
 * 生成带参数的URL
 * @param strUrl
 * @param obj
 * @returns {String}
 */
function genRule(strUrl, obj) {
    var strRule = "";
    var array = obj.split(",");
    for (var i in array) {
        if ($("#" + array[i]).val() != "" && $("#" + array[i]).val() != undefined) {
            if (strRule != "") {
                strRule += "&";
            }
            strRule += array[i] + "=" + encodeURI($("#" + array[i]).val());
        }
    }
    return strUrl + "?" + strRule;
}

/**
 * 找到参数对应的层级页面

 * @author wanghuwei
 * @param pageLvl
 */
function getRootPage(pageLvl) {
    (pageLvl == null) && (pageLvl = "root");
    var vParent = opener ? opener : parent;
    while (vParent.pageLevel == null || vParent.pageLevel != pageLvl) {
        vParent = vParent.opener ? vParent.opener : vParent.parent;
    }
    return vParent;
}

/**
 * 取得sessionId
 * @author wanghuwei
 * @return
 */
function getSessionId() {
    if (self.pageLevel == "root") {
        return winTab.getSelectedTabItemAttr("sessionId");
    }
    else {
        return getRootPage().winTab.getSelectedTabItemAttr("sessionId");
    }

}

function getParam(paramName) {
    paramValue = "";
    isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

/**
 * 返回存储用户信息的sessionId
 * @returns
 */
function getUsrSessionId() {
    if (self.pageLevel == "root")
        return usrSessionId;
    else
        return getRootPage().usrSessionId;
}

/**
 * 切换loading打开/关闭状态

 * @returns
 */
function toggerLoading() {
    if (self.pageLevel == "root")
        $('.l-loading').toggle();
    else
        return getRootPage().$('.l-loading').toggle();
}

/**
 * 打开loading保护
 * @returns
 */
function showLoading() {
    if (self.pageLevel == "root")
        $('.l-loading').show();
    else
        return getRootPage().$('.l-loading').show();
}

/**
 * 关闭loading保护
 * @returns
 */
function hideLoading() {
    if (self.pageLevel == "root")
        $('.l-loading').hide();
    else
        return getRootPage().$('.l-loading').hide();
}

/**
 * 添加主页Tab
 * @param tabid
 * @param tabTxt
 * @param url
 * @param sessionId
 * @param noCloseTagAction
 * @param flTabId 父类tabid,用于定位父类-add by zpc 2012-04-05
 * @author wanghuwei
 */
function createMainTab(tabid, tabTxt, url, sessionId, noCloseTagAction, flTabId, PK) {
    if (PK == null) {
        tabid = tabid + new Date().getTime();
    } else {
        tabid = tabid + PK;
    }
    var p = {
        'tabid': tabid,
        'flTabId': flTabId,
        'url': url,
        'text': tabTxt,
        'sessionId': sessionId,
        heigt: '100%',
        'noCloseTagAction': noCloseTagAction,
        'noSelectedTag': false
    };
    if (sessionId == null) {
        p = {
            'tabid': tabid,
            'flTabId': flTabId,
            'url': url,
            'text': tabTxt,
            getServerSessionId: true,
            heigt: '100%',
            'noCloseTagAction': noCloseTagAction,
            'noSelectedTag': false
        }
    }
    getRootPage().winTab.addTabItem(p);
}

/**
 * 删除当前选定tab页

 * @author wanghuwei
 */
function closeCurrentMainTab() {
    getRootPage().winTab.removeTabItem(getRootPage().winTab.getSelectedTabItemID());
}

var urlParam = null;

/**
 * 得到url中的参数
 * @param attrName
 * @author wanghuwei
 * @returns
 */
function getUrlParam(attrName) {
    if (urlParam == null) {
        var up = location.search;
        var ps = up.split("&");
        urlParam = new Object();
        for (var i = 0; i < ps.length; i++) {
            var p = ps[i].split("=");
            eval("urlParam." + p[0] + " = " + p[1]);
        }
    }
    return eval("urlParam." + attrName);
}

/**
 * 后台取得doInfo在前台显示

 * @param url
 * @param param
 * @author wanghuwei
 */
function getDoInfo(url, param, doName) {
    if (url == null) return;
    if (typeof(url) == "object") {
        var data = url;
        if (data == null) return;
        $.each(data, function (key, value) {
            var e = doName == undefined ? $("#" + key) : $("#" + key + "[doName=" + doName + "]");
            if (key == "oid" && doName) oidAry[doName + "_oid"] = value;
            if (e != null) {
                $(e).attr("todb", "N");
                //add by kouzhaohui start 20120228 (e.attr("ltype") == "date")
                setElementValueByType(e, value);
//				if(e.attr("ltype") == "text" || e.attr("ltype") == "textarea" || e.attr("ltype") == "date"){
//					e.val(value);
//				}else if( e.attr("ltype") == "spinner"){
//					e.ligerGetSpinnerManager().setValue(value);
//				}else if(e.attr("ltype") == "select"){
//					e.ligerGetComboBoxManager()._setValue(value);
//				}
                $(e).attr("todb", "Y");
            }
        });
    } else {
        param.sessionId = getSessionId();
        getJSON(url, param, function (rData) {
            getDoInfo(rData, param, doName);
        });
    }
}

/**
 * 设置字段上enter到下一个字段方法

 * @author wanghuwei
 * @return
 */
function setElementEnterEvent() {
    var e = null;
    $('input[type=text][doName]').each(function () {
        var curr = this;
        if (e != null) {
            $(e).keyup(function () {
                if (event.keyCode == 13)
                    if (curr != null)
                        $(curr).focus();
            });
        }
        e = curr;
    })
}

var strFieldInfos;

/**
 * 根据后台取得的字段信息设置前台视图

 * @param url
 * @param cType
 * @param frmId
 * @param func
 * @author wanghuwei
 */
function loadFieldInfo(url, cType) {
    if (typeof(url) == 'object') {
        setElementEnterEvent();
        var data = url;
        if (data == null) return;
        var errorMsg = "";
        //add by KouZhaohui  20120319 (",textarea:text[doName]:not([init=N])")  
        $("input:text[doName]:not([init=N]), input:hidden[doName]:not([init=N]),textarea:text[doName]:not([init=N])").each(function () {
            var doName = this.doName;
            var fieldName = this.id;
            if (data[doName] == null || data[doName][fieldName] == null) {
                errorMsg += doName + "." + fieldName + "没有取得信息\n";
            } else {
                if (oidAry[doName + "_oid"] == null) {
                    if (data[doName])
                        if (data[doName]["oid"])
                            if (data[doName]["oid"].value)
                                oidAry[doName + "_oid"] = data[doName]["oid"].value;
                }
                var attr = data[doName][fieldName];
                var e = $(this);
                var label = $("<label style='float: left;'>" + attr.text + "&nbsp;&nbsp;</label>");
                //alert(e.attr('ltype')+"<======>"+attr.ltype);
                if ((e.attr('ltype') == undefined || e.attr('ltype') == null) && attr.ltype) {
                    e.attr('ltype', attr.ltype);
                    attr.ligerui && e.attr('ligerui', attr.ligerui);
                }
                //attr.ltype && (e.attr('ltype') == undefined) && e.attr('ltype', attr.ltype);
                var mustSign = "<span style='color:red;font-size:15px;'>*</span>";
                attr.isMust && e.attr('isMust', attr.isMust);
                attr.maxSize && e.attr("maxSize", attr.maxSize);
                attr.fieldType && e.attr("chkFieldType", attr.fieldType);
                if (attr.disabled) {
                    e.attr('disabled', attr.disabled);
                    if (attr.ltype != "select" && attr.ltype != "date") e.addClass("l-text-disabled");
                }
                attr.value && (e.attr("ltype") != "radio") && (e.attr("ltype") != "checkbox") && e.val(attr.value);
                if (attr.isMust) {
//					e.attr('style','background-color: #FFFFC6');
                    e.addClass("l-text-must");
                    if ("table" == cType) {
                        var obj = e.parent().prev();
                        if (e.parent().parent().parent().parent().attr("className") == "innerTable") {
                            obj = e.parent().parent().parent().parent().parent().prev();
                        }
                        if (obj && obj.html()) {
                            var tmphtml = obj.html();
                            //alert(tmphtml);
                            if (tmphtml.indexOf("*") < 0) {
                                tmphtml = tmphtml.replace("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;");
                                //alert(tmphtml);
                                obj.html(tmphtml);
                            }
                        }
                    } else {
                        e.before(mustSign);
                    }
                } else {
                    if ("table" == cType) {
                        var obj = e.parent().prev();
                        if (e.parent().parent().parent().parent().attr("className") == "innerTable") {
                            obj = e.parent().parent().parent().parent().parent().prev();
                        }
                        if (obj && obj.html()) {
                            var tmphtml = obj.html();
                            //alert(tmphtml);
                            if (tmphtml.indexOf("*") < 0) {
                                tmphtml = tmphtml.replace("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                                //alert(tmphtml);
                                obj.html(tmphtml);
                            }
                        }
                    } else {
                        e.before(mustSign);
                    }
                }
            }
        });
        //帮助显示页面绑定错误，不要删alert
        //如果页面在这里报错，说明页面程序有问题，不是这里的问题

        if (errorMsg != "") {
            //alert(errorMsg);
        }
    } else {
        if (url == null) return;
        getJSONAsync(url, function (fieldAttr) {
            //alert(111);
            loadFieldInfo(fieldAttr, cType);
            //alert(222);
        })
    }
}

/**
 * 根据后台取得的字段信息设置前台视图

 * @param url
 * @param cType
 * @param frmId
 * @param func
 * @author wanghuwei
 */

var fieldInfo;

function loadFieldColor(url, cType) {
    if (typeof(url) == 'object') {
        setElementEnterEvent();
        var data = url;
        fieldInfo = url;
        if (data == null) return;
        var errorMsg = "";
        //add by KouZhaohui  20120319 (",textarea:text[doName]:not([init=N])")  
        $("input:text[doName]:not([init=N]), input:hidden[doName]:not([init=N]),textarea:text[doName]:not([init=N])").each(function () {
            var doName = this.doName;
            var fieldName = this.id;
            if (data[doName] == null || data[doName][fieldName] == null) {
                errorMsg += doName + "." + fieldName + "没有取得信息\n";
            } else {
                if (oidAry[doName + "_oid"] == null) {
                    //if(data[doName])
                    //	if(data[doName]["oid"])
                    //		if(data[doName]["oid"].value)
                    //			oidAry[doName + "_oid"] = data[doName]["oid"].value;
                }
                var attr = data[doName][fieldName];
                var e = $(this);
                var label = $("<label style='float: left;'>" + attr.text + "&nbsp;&nbsp;</label>");
                //alert(e.attr('ltype')+"<======>"+attr.ltype);
                if ((e.attr('ltype') == undefined || e.attr('ltype') == null) && attr.ltype) {
                    e.attr('ltype', attr.ltype);
                    attr.ligerui && e.attr('ligerui', attr.ligerui);
                }
                //attr.ltype && (e.attr('ltype') == undefined) && e.attr('ltype', attr.ltype);
                var mustSign = $("<span style='color:red;font-size:15px;'>&nbsp;&nbsp;*&nbsp;&nbsp;</span>");
                attr.isMust && e.attr('isMust', attr.isMust);
                attr.maxSize && e.attr("maxSize", attr.maxSize);
                attr.fieldType && e.attr("chkFieldType", attr.fieldType);
                if (attr.disabled) {
                    e.attr('disabled', attr.disabled);
                    if (attr.ltype != "select" && attr.ltype != "date") e.addClass("l-text-disabled");
                }
                //attr.value && (e.attr("ltype") != "radio") && (e.attr("ltype") != "checkbox") && e.val(attr.value);
                if (attr.isMust) {
                    e.attr('style', 'background-color: #FFFFC6');
                    if ("table" == cType) {
                        var obj = e.parent().prev();
                        if (e.parent().parent().parent().parent().attr("className") == "innerTable") {
                            obj = e.parent().parent().parent().parent().parent().prev();
                        }
                        if (obj && obj.html()) {
                            var tmphtml = obj.html();
                            if (tmphtml.indexOf("&nbsp;&nbsp;*") < 0) {
                                obj.append(mustSign);
                            }
                        }
                    } else {
                        e.before(mustSign)
                    }
                }
            }
        });
        //帮助显示页面绑定错误，不要删alert
        //如果页面在这里报错，说明页面程序有问题，不是这里的问题

        if (errorMsg != "") {
            //alert(errorMsg);
        }
    } else {
        if (url == null) return;
        //alert(url);
        //alert(cType);
        getJSON(url, function (fieldAttr) {
            loadFieldColor(fieldAttr, cType);
        })
    }
}

/**
 * 绑定tab
 * @param tabId
 * @param url 到！为止
 */
function bindTable(tabId, url) {
    if (tabId == null || url == null) return;
    $("input[ltype=text],input[ltype=number],input[ltype=password]", $("#" + tabId)).each(function () {
        $(this).addClass("l-text");
        $(this).attr("lwidth") && $(this).css("width", $(this).attr("lwidth"));
    });
    $("input[ltype=select][soName], input[ltype=select][soData], select[ltype=select][soName]", $("#" + tabId)).each(function () {
        var soUrl = url;
        if ($(this).attr("soMethod")) soUrl += "!" + $(this).attr("soMethod") + ".do";
        else soUrl += "!getSo.do";
        var soParam = {initValue: $(this).val(), parms: {sessionId: getSessionId()}};
        $(this).attr("soName") && (soParam.url = soUrl) && (soParam.parms.soName = $(this).attr("soName"));
        $(this).attr("soData") && (eval("soParam.data = " + $(this).attr("soData")));
        $(this).attr("nameField") && (soParam.parms.filterNameField = $(this).attr("nameField"));
        $(this).attr("valueField") && (soParam.parms.filterValueField = $(this).attr("valueField"));
        $(this).attr("next") && (soParam.next = $(this).attr("next"));
        $(this).attr("sibling") && (soParam.sibling = $(this).attr("sibling"));
        $(this).attr("mult") && (soParam.mult == "Y");
        $(this).attr("lwidth") && (soParam.width = $(this).attr("lwidth"));
        $(this).ligerComboBox(soParam);
    });
    $("input[ltype=spinner]", $("#" + tabId)).ligerSpinner();
    $("input[ltype=date]", $("#" + tabId)).ligerDateEditor();
}

/**
 * 注册所选控件内除下拉外所有控件

 * @author wanghuwei
 */
var validateHander;

function bindForm(formId, url, changeValueFunc) {
    if (formId == null || url == null) return;
    $("input[ltype=text],input[ltype=number],input[ltype=number],input[ltype=password]", $("#" + formId)).each(function () {
        $(this).addClass("l-text");
        $(this).attr("lwidth") && $(this).css("width", $(this).attr("lwidth"));
        /* add by guoxiang 20140212  start */
        !$(this).attr("lwidth") && $(this).css("width", "128px");
        /* add by guoxiang 20140212  end */
    });
    var soUrl = url.substring(0, url.indexOf("!"));
    var changeUrl = url.substring(0, url.indexOf("!")) + "!changeValue.do";
    $("input[ltype=select][soName], input[ltype=select][soData], select[ltype=select][soName]", $("#" + formId)).each(function () {
        var soParam = {initValue: $(this).val(), parms: {sessionId: getSessionId()}};
        var u = soUrl;
        if ($(this).attr("soMethod")) u += "!" + $(this).attr("soMethod") + ".do";
        else u += "!getSo.do";
        $(this).attr("soName") && (soParam.url = u) && (soParam.parms.soName = $(this).attr("soName"));
        $(this).attr("soData") && (eval("soParam.data = " + $(this).attr("soData")));
        $(this).attr("nameField") && (soParam.parms.filterNameField = $(this).attr("nameField"));
        $(this).attr("valueField") && (soParam.parms.filterValueField = $(this).attr("valueField"));
        $(this).attr("next") && (soParam.next = $(this).attr("next"));
        $(this).attr("sibling") && (soParam.sibling = $(this).attr("sibling"));
        $(this).attr("mult") && (soParam.mult == "Y");
        $(this).attr("lwidth") && (soParam.width = $(this).attr("lwidth"));
        $(this).attr("audoWidth") && (soParam.audoWidth = $(this).attr("audoWidth"));
        $(this).attr("showAllMsg") && (soParam.showAllMsg = $(this).attr("showAllMsg"));
        $(this).attr("showcomb") && (soParam.showcomb = $(this).attr("showcomb"));

        $(this).ligerComboBox(soParam);
    });
    $("input[ltype=spinner]", $("#" + formId)).ligerSpinner();
    $("input[ltype=date]", $("#" + formId)).ligerDateEditor();
    //add by wanghaibo start 20120216
    if (url.indexOf("changeValue.do") == -1) return;
    //add by wanghaibo en 20120216

    (changeValueFunc == null) && (changeValueFunc = elementChangeValue);
    $("input[type=text]", $("#" + formId)).change(function () {
        $(this).attr("style", "none");
        $(this).removeClass("l-text-error");
    });
    $("input[ltype=text],input[ltype=number], input[ltype=hidden], input[ltype=password]", $("#" + formId)).change(function () {
        if ($(this)[0].uppercase) {
            var tempvalue = $(this).val();
            $(this).val((tempvalue + "").toUpperCase());
        }
        if (!$(this)[0].noAction) validateElement($(this), url, changeValueFunc)
    });
    $("input[ltype=select][soName], input[ltype=select][soData], select[ltype=select][soName]", $("#" + formId)).change(function () {
        if (!$(this)[0].noAction) validateElement($(this), url, changeValueFunc)
    });
    $("input[ltype=spinner]", $("#" + formId)).change(function () {
        if (!$(this)[0].noAction) validateElement($(this), url, changeValueFunc)
    });
    $("input[ltype=date]", $("#" + formId)).change(function () {
        if (!$(this)[0].noAction) validateElement($(this), url, changeValueFunc)
    });
//	$("input[ltype=radio]", $("#" + formId)).change(function(){if(!$(this)[0].noAction)validateElement($(this), url, changeValueFunc)});
    $('input[ltype=checkbox]', $("#" + formId)).change(function () {
        if (!$(this)[0].noAction) validateElement($(this), url, changeValueFunc)
    });
    $('textarea', $("#" + formId)).change(function () {
        if (!$(this)[0].noAction) validateElement($(this), url, changeValueFunc)
    });
}

/**
 *
 * @param formId
 * @param url
 */
function bindSelectTree(formId, url) {
    $("input[ltype=select][treeMethod]", $("#" + formId)).each(function () {
        var e = $(this);
        e.attr("readonly", true);
        e.ligerTextBox();
        if (e.val() != "") {
            var treeUrl = url + e.attr("treeMethod");
            getJSON(treeUrl, function (data) {
                var v = getValue4TreeData(data, e.val());
                e.val(v);
            });
            //soTreeAry
        }
        e.click(function () {
            var tmp = $("<ul></ul>");
            var treeUrl = e.attr("treeMethod");
            tmp.ligerTree({'url': treeUrl, checkbox: false});
            $.ligerDialog.open({
                target: tmp, height: 200, width: 300,
                buttons: [
                    {
                        text: '确定', onclick: function (item, dialog) {
                            var tree = $("ul", $(".l-dialog-content", $(dialog))).ligerGetTreeManager();
                            if (tree.getSelected() == null) {
                                alert("请选择数据");
                                return;
                            }
                            var node = tree.getSelected().data;
                            e.attr({'soValue': node.value, 'value': node.text});
                            elementChangeValue(e, changeUrl);
                            dialog.close();
                        }
                    },
                    {
                        text: '取消', onclick: function (item, dialog) {
                            dialog.close();
                        }
                    }
                ]
            });

        });
    });
}

/**
 * 控件的changeValue方法
 * @param t
 * @param url
 * @param changeValueFunc
 * @author wanghuwei
 */
function validateElement(t, url, changeValueFunc) {
//	var chkMsg = "";
//	var tipHanlder;
//	if(t.parent()[0].tagName.toUpperCase() != "TD")
//		tipHanlder = t.parent(); 
//	else
//		tipHanlder = t;
//	if(t[0].isMust == "Y"){
//		if((t[0].ltype == 'select' && t[0].hideValueField == "") || $.trim(t[0].value) == ""){
//			chkMsg = "必填字段";
//			tipHanlder.ligerTip({content: chkMsg});
//			return false;
//		}else{
//			tipHanlder.ligerHideTip();
//		}
//	}
//	if(t[0].chkFieldType){
//		var val = t.val();
//		var fieldType = t[0].chkFieldType;
//		if("integer" == fieldType){
//			if(!/^\d*[\d,]*\.{0,1}\d+$/.test(val)){
//				chkMsg = "数字类型不符合规范";
//				tipHanlder.ligerTip({content: chkMsg});
//				return false;
//			}else{
//				tipHanlder.ligerHideTip();
//			}
//		}else if("date" == fieldType){
//			if(val != "" && !/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/.test(val)){
//				chkMsg = "日期类型不符合规范";
//				tipHanlder.ligerTip({content: chkMsg});
//				return false;
//			}else{
//				tipHanlder.ligerHideTip();
//			}
//		}
//	}
//	if(t[0].maxSize){
//		var maxSize = t[0].maxSize;
//		var val = t.val();
//		if(t[0].ltype == 'select')
//			val = t[0].hideValueField;
//		//判断是否有中文，只要有中文统一按一个字两个字节，否则按1个算
//		if(escape(val).indexOf("%u") == -1){//这是没有中文
//			if(val.length > maxSize){
//				chkMsg = '长度不能大于' + maxSize;
//				tipHanlder.ligerTip({content: chkMsg});
//				return false;
//			}else{
//				tipHanlder.ligerHideTip();
//			}
//		}else{
//			var cnLength = val.length - escape(val).replace(/(%u[A-Za-z0-9]{4})/g, "").replace(/(%[A-Za-z0-9]{2})/g, "").length;
//			maxSize = maxSize - cnLength*2;
//			if(val.length > maxSize){
//				chkMsg = '长度不能大于' + maxSize;
//				tipHanlder.ligerTip({content: chkMsg});
//				return false;
//			}else{
//				tipHanlder.ligerHideTip();
//			}
//		}
//	}
    if (changeValueFunc != null) changeValueFunc(t, url);
}

function preChangeValue(fieldName, fieldValue) {
}

function preValidateSubmit() {
};

function postValidateSubmit() {
};

/**
 * 验证提交方法
 * @returns {Boolean}
 */
function validateSubmit() {
    var flag = true;
    preValidateSubmit && (flag = preValidateSubmit());
    if (!flag) return false;
    $("input[isMust=Y]").each(function () {
        if (flag)
            flag = validateElement($(this));
        else
            validateElement($(this));
    });
    $("input[maxSize]").each(function () {
        if (flag)
            flag = validateElement($(this));
        else
            validateElement($(this));
    });
    $("input[chkFieldType]").each(function () {
        if (flag)
            flag = validateElement($(this));
        else
            validateElement($(this));
    });
    if (!flag) return false;
    postValidateSubmit && (flag = postValidateSubmit());
    if (!flag) return false;
}

function preChangeValue(fieldName, fieldValue) {
};

function postChangeValue(fieldName, fieldValue) {
}

//提交同步标记
var submitSyncSign = true;

/**
 * 控件的changeValue方法
 * @param e
 * @param url
 * @author wanghuwei
 */
function elementChangeValue(e, url) {
    if (typeof(e) == "string") return;
    if ($(e).attr("todb") == "N") return;
    var fieldName = e.attr("id");
    var modelProp = e.attr("name");
    var _inx = modelProp.indexOf(".");
    if (_inx == -1) {
        alert("javascript:Field Name Error");
        return;
    }
    var modelName = modelProp.substring(0, _inx);
    //Start SIR#590,Added by wangrongling,2016/05/31
    //if(fieldName=="COA_CODE") return;
    //End SIR#590,Added by wangrongling,2016/05/31
    var fieldValue = e.val();
    var doName = e.attr("doName");
    eval("var oid = jQuery.trim(oidAry['" + doName + "_oid'])");
    //modify by miaoyucong 2013-04-1 -begin
    //if(/_AMT$/g.test(fieldName) || e.attr("ltype") == "spinner"){
    if (e.attr("ltype") == "spinner") {
        //modify by miaoyucong 2013-04-1 -end
        if (fieldValue != undefined) {
            fieldValue = fieldValue + "";
        }
        fieldValue = fieldValue.replace(/,*/g, '');
        if ((e.attr("ltype") == "spinner") && ($(e).ligerGetSpinnerManager().options.type == 'float')) {
            fieldValue = $(e).ligerGetSpinnerManager()._getVerifyValue(fieldValue);
        }
        if (($(e).ligerGetSpinnerManager().options.type == 'currency')) {
            if (($(e).ligerGetSpinnerManager().options.isMinus) == false) {
                if (fieldValue < 0) {
                    var tipHanlder;
                    if (e.parent()[0].tagName.toUpperCase() != "TD") {
                        tipHanlder = e.parent();
                    } else {
                        tipHanlder = e;
                    }
                    //modify by zpc 2013-06-17-错误时显示旧值-begin
                    //var sessionId = getSessionId();
                    var sessionId = "df633aae6b334";
                    var param = {
                        '_usrSessionId': getUsrSessionId(),
                        'sessionId': sessionId,
                        '_do': doName,
                        '_oid': oid,
                        '_fieldName': fieldName
                    };
                    var tmpStr = url.split("!");
                    var getValUrl = tmpStr[0] + "!getFieldValue.do";
                    getJSON(getValUrl, param, function (data) {
                        setElementValueByType(e, data._oldValue[0].fieldValue);
                    });
                    //modify by zpc 2013-06-17-错误时显示旧值-end
                    tipHanlder.ligerHideTip();
                    tipHanlder.ligerTip({content: "请输入正数！", delay: true});
                    return;
                }
            }
            fieldValue = folt45(fieldValue, 2);
        }
    }
    var fieldValueCn = "";
    if ("select" == e.attr("ltype")) {
        if ($(e).ligerGetComboBoxManager() == null) {
            fieldValue = $(e).attr("soValue");
            fieldValueCn = $(e).val();
        } else {
            fieldValue = $(e).ligerGetComboBoxManager().selectedValue;
            fieldValueCn = $(e).ligerGetComboBoxManager().selectedText;
        }
    } else if ("checkbox" == e.attr("ltype")) {
        fieldValue = fieldValueCn = "";
        if (e.attr("checked")) {
            fieldValue = fieldValueCn = "Y";
            if (e.attr("Y")) fieldValue = fieldValueCn = e.attr("Y");
        } else {
            fieldValue = fieldValueCn = "N";
            if (e.attr("N")) fieldValue = fieldValueCn = e.attr("N");
        }
    } else if ("date" == e.attr("ltype")) {
        if (fieldValue.length == 8) {//用于只输入日期回显正常格式

            var yy = fieldValue.substring(0, 4);
            var mm = fieldValue.substring(4, 6);
            var dd = fieldValue.substring(6, 8);
            fieldValue = yy + "-" + mm + "-" + dd;
            e.val(fieldValue);
        }
    }
    var pcValue = preChangeValue(fieldName, fieldValue);
    if (pcValue != undefined && typeof pcValue == "string") {
        fieldValue = pcValue;
    }
    var b = true;
    if (pcValue != undefined && typeof pcValue == "boolean") {
        if (pcValue == false) {
            b = false;
        }
    }
    if (b) {//如果前校验返回false则不执行之后的代码！
        try {
            fieldValue = $.trim(fieldValue);
            var checkFieldsName = "";
            $(e).attr("chkFields") && (checkFieldsName = $(e).attr("chkFields"));
            var sessionId = getSessionId();
            //alert("sessionId = "+sessionId);
            var param = {
                '_usrSessionId': getUsrSessionId(),
                'sessionId': sessionId,
                '_do': doName,
                '_oid': oid,
                '_tableName': modelName,
                '_fieldName': fieldName,
                //Start SIR#729,Modified by liuxueshen,20160817
                //'_fieldValue': encodeURI(fieldValue, "UTF-8"),
                '_fieldValue': encodeURIComponent(fieldValue, "UTF-8"),
                //End SIR#729,Modified by liuxueshen,20160817
                '_fieldValueCn': encodeURI(fieldValueCn, "UTF-8"),
                '_checkFieldsName': checkFieldsName
            };
            submitSyncSign = false;
            getJSON(url, param, function (data) {
                oidAry[doName + "_oid"] = data._oid;
                var tipHanlder;
                if (e.parent()[0].tagName.toUpperCase() != "TD") tipHanlder = e.parent()
                else tipHanlder = e;
                if (data._msg != "") {
                    //setElementValueByType(e, data._oldValue[0].fieldValue);
                    tipHanlder.ligerHideTip();
                    tipHanlder.ligerTip({content: data._msg, delay: true});
                } else {
                    tipHanlder.ligerHideTip();
                }
                if (data._othChange != undefined) {
                    $.each(data._othChange, function (i, item) {
                        setElementValueByType($("#" + item.fieldName + "[doName=" + item.doName + "]"), item.fieldValue);
                    });
                }
                postChangeValue(fieldName, fieldValue);
                submitSyncSign = true;
            });
        } catch (e) {
            alert(e.message);
        }
    }
}

/**
 * 根据控件类型赋值

 * @param e
 * @param value
 */
function setElementValueByType(e, value) {
    if (e.attr("ltype") == "select") {
        e.attr("todb", "N");
        e.ligerGetComboBoxManager().setValue(value);
        e.blur();
        e.attr("todb", "Y");
        e.focus();
    } else if (e.attr("ltype") == "spinner") {
        e.attr("todb", "N");
        e.ligerGetSpinnerManager().setValue(value);
        e.blur();
        e.attr("todb", "Y");
        e.focus();
    } else if (e.attr("ltype") == "checkbox") {//add by zpc 2012-05-11-复选框连动
        e.attr("todb", "N");
        if (value == "Y") {
            e.attr("checked", "true");
        } else {
            e.attr("checked", "");
        }
        e.blur();
        e.attr("todb", "Y");
        e.focus();
    } else {
        e.attr("todb", "N");
        e.val(value);
        e.blur();
        e.attr("todb", "Y");
        e.focus();
    }
}

/**
 * 所有元素只读

 * @author wanghuwei
 */
function readOnlyAllElement() {
    $('input[type=text][doName]').each(function () {
        $(this).attr("disabled", true);
    })
}

function preGridChangeValue(fieldName, fieldValue) {
}

function postGridChangeValue(fieldName, fieldValue, data) {
}

/**
 * changeValue事件grid专用
 * @author wanghuwei
 * @param param
 */
function changeValue4Grid(param) {
    if (param == null || param.cellObj == undefined) return;
    var doName = $(param.cellObj).attr('doName');
    var oid = param.record.oid;
    var fieldName = $(param.cellObj).attr('columnname') || $(param.cellObj).attr('id');
    var fieldValue = param.value;
    if (/_AMT$/g.test(fieldName) || $(param.cellObj).attr("ltype") == "spinner") {
        if (fieldValue != undefined) {
            fieldValue = fieldValue + "";
            fieldValue = fieldValue.replace(/,*/g, '');
        }
    }
    var fieldValueCn = fieldValue == $(param.cellObj).first().html() ? "" : $(param.cellObj).first().html();
    var checkFieldsName = "";
    var pcValue = preGridChangeValue(fieldName, fieldValue);
    if (pcValue != undefined && typeof pcValue == "string") {
        fieldValue = pcValue;
    }
    var b = true;
    if (pcValue != undefined && typeof pcValue == "boolean") {
        if (pcValue == false) {
            b = false;
        }
    }
    if (b) {//如果前校验返回false则不执行之后的代码！
        fieldValue = $.trim(fieldValue);
        $(param.cellObj).attr("chkFields") && (checkFieldsName = $(param.cellObj).attr("chkFields"));
        var sessionId = getSessionId();
        var p = {
            '_usrSessionId': getUsrSessionId(),
            'sessionId': sessionId,
            '_do': doName,
            '_oid': oid,
            '_fieldName': fieldName,
            '_fieldValue': encodeURI(fieldValue, "UTF-8"),
            '_fieldValueCn': encodeURI(fieldValueCn, "UTF-8"),
            '_checkFieldsName': checkFieldsName
        };
        getJSONAsync(param.url, p, function (data) {
            if (data._msg.toUpperCase() != "") {
                $.ligerDialog.error(data._msg);
            }
            if (data._othChange != undefined) {
                $.each(data._othChange, function (i, item) {
                    $("#" + item.fieldName + "[doName=" + item.doName + "]").val(item.fieldValue);
                })
            }
            postGridChangeValue(fieldName, fieldValue, data);
        })
    }
}

/**
 * 检查树形导航字段必填情况

 * @author wanghuwei
 * @param lNode
 * @param cNode
 * @param url
 * @param func
 */
function checkTreeRequiredData(lNode, cNode, url, func) {
    if (lNode.length > 0) {
        var param = {
            sessionId: getSessionId(),
            _do: lNode.attr("chkDo")
        };
        get(url, param, function (msg) {
            if (msg == "") {
                if ($(".l-checkbox", lNode).length > 0)
                    if ($(".l-checkbox", lNode).hasClass("l-checkbox-unchecked"))
                        $(".l-checkbox", lNode).removeClass("l-checkbox-unchecked").addClass("l-checkbox-checked");
            } else {
                if ($(".l-checkbox", lNode).length > 0)
                    if ($(".l-checkbox", lNode).hasClass("l-checkbox-checked"))
                        $(".l-checkbox", lNode).removeClass("l-checkbox-checked").addClass("l-checkbox-unchecked");
            }
            func && func(lNode);
        })
    }
}

/**
 * 从树形下拉中取得中文描述
 * @author wanghuwei
 * @param data
 * @param value
 * @returns {String}
 */
function getValue4TreeData(data, value) {
    var rValue = "";
    $.each(data, function (i, item) {
        if (item.value == value) {
            return rValue = item.text;
        }
        if (item.children) {
            var v = getValue4TreeData(item.children, value);
            if (v != "") {
                return rValue = v;
            }
        }
    });
    return rValue;
}

/**
 * grid加载完成时选中第一条事件, grid升级1.1.5之后异常了

 * @author wanghuwei
 * @param grid
 * @param data
 * @param g
 */
function gridAfterShowData(grid, data, g) {
    var row = $('.l-grid-row', g.gridbody);
    if (row.length == 1) {
        row.first().click();
    }
}

/**
 * 创建Tag, 这是一个从数据库取tag得方法

 * @author wanghuwei
 * @param tagBarId
 * @param tagBarParam
 * @param tagBarUrl
 * @param nodeUrlParam
 */
function createTagBar(tagBarId, tagBarParam, tagBarUrl, nodeUrlParam) {
    var tabs = $("#" + tagBarId).ligerTab(tagBarParam);
    getJSON(tagBarUrl, function (data) {
        var firstTagId = "";
        $.each(data, function (i, item) {
            if (i == 0)
                firstTagId = item.tabid;
            var p = {showClose: false};
            item.tabid && (p.tabid = item.tabid);
            item.text && (p.text = item.text);
            var url = item.url;
            if (url != null || url != undefined) {
                url += url.indexOf("?") == -1 ? "?" : "&";
                url += nodeUrlParam;
                p.url = url;
            }
            tabs.addTabItem(p);
        });
        tabs.clickTab(firstTagId);
    });
}

/**
 * 创建tag, 这是一个本地祛暑方法

 * @param tabHandler
 * @param data
 */
function createTagBar(tabHandler, data) {
    var firstTagId = "";
    $.each(data, function (i, item) {
        if (i == 0)
            firstTagId = item.tabid;
        var p = {showClose: false};
        item.tabid && (p.tabid = item.tabid);
        item.text && (p.text = item.text);
        var url = item.url;
        p.url = url;
        tabHandler.addTabItem(p);
    });
    tabHandler.clickTab(firstTagId, false);
}

/**
 *
 * @param doName
 * @param fieldName
 * @param fieldValue
 * @param fieldValueCn
 * @param oid
 * @param checkFieldsName
 */
function changeValue(url, doName, fieldName, fieldValue, fieldValueCn, oid, checkFieldsName) {
    var param = {
        '_usrSessionId': getUsrSessionId(),
        'sessionId': getSessionId(),
        '_do': doName,
        '_oid': oid,
        '_fieldName': fieldName,
        '_fieldValue': encodeURI(fieldValue, "UTF-8"),
        '_fieldValueCn': encodeURI(fieldValueCn, "UTF-8"),
        '_checkFieldsName': checkFieldsName
    };
    getJSON(url, param, function (data) {
        oidAry[doName + "_oid"] = data._oid;
        if (data._othChange != undefined) {
            $.each(data._othChange, function (i, item) {
                $("#" + item.fieldName + "[doName=" + item.doName + "]").attr("todb", "N");
                $("#" + item.fieldName + "[doName=" + item.doName + "]").val(item.fieldValue);
                $("#" + item.fieldName + "[doName=" + item.doName + "]").attr("todb", "Y");
            })
        }
    })
}

/***
 * 设置元素不可用

 * @param fieldNames id[doName=doName]
 */
function setDisabled(fieldNames) {
    if (fieldNames == null) {
        $("input:text[doName]").each(function () {
            if ($(this).attr("ltype") == "select") {
                //------------------------------------------当置灰后如果下拉框打开则自动收回

                var g = $(this).ligerGetComboBoxManager();
                var p = $(this).ligerGetComboBoxManager().options;
                if (g.selectBox != null && g.selectBox.is(":visible")) {
                    g.selectBox.hide();
                }
                //------------------------------------------当置灰后如果下拉框打开则自动收回

                $(this).ligerGetComboBoxManager()._setDisabled(true);
            } else if ($(this).attr("ltype") == "date") {
                $(this).ligerGetDateEditorManager().setDisabled();
            } else {
                $(this).attr("disabled", true);
                $(this).addClass("l-text-disabled");
            }
        });
        $("input:checkbox[doName]").attr("disabled", true);
        $("input:radio[doName]").attr("disabled", true);
    } else {
        if (typeof(fieldNames) == "object") {
            fieldNames.each(function () {
                var e = $(this);
                if (e.attr("ltype") == "select") {
                    //------------------------------------------当置灰后如果下拉框打开则自动收回

                    var g = e.ligerGetComboBoxManager();
                    var p = e.ligerGetComboBoxManager().options;
                    if (g.selectBox != null && g.selectBox.is(":visible")) {
                        g.selectBox.hide();
                    }
                    //------------------------------------------当置灰后如果下拉框打开则自动收回

                    e.ligerGetComboBoxManager()._setDisabled(true);
                } else if (e.attr("ltype") == "date") {
                    e.ligerGetDateEditorManager().setDisabled();
                } else {
                    e.attr("disabled", true);
                    e.addClass("l-text-disabled");
                }
            });
        } else {
            var aryNames = fieldNames.split(",");
            for (var i = 0; i < aryNames.length; i++) {
                var id = aryNames[i];
                var e = $("#" + id);
                if (e.length > 0) {
                    if (e.attr("ltype") == "select") {
                        //------------------------------------------当置灰后如果下拉框打开则自动收回

                        var g = e.ligerGetComboBoxManager();
                        var p = e.ligerGetComboBoxManager().options;
                        if (g.selectBox != null && g.selectBox.is(":visible")) {
                            g.selectBox.hide();
                        }
                        //------------------------------------------当置灰后如果下拉框打开则自动收回

                        e.ligerGetComboBoxManager()._setDisabled(true);
                    } else if (e.attr("ltype") == "date") {
                        e.ligerGetDateEditorManager().setDisabled();
                    } else {
                        e.attr("disabled", true);
                        e.addClass("l-text-disabled");
                    }
                }
            }
        }
    }
}

/**
 * 设置元素可用
 * @param fieldNames
 */
function setEnabled(fieldNames) {
    if (fieldNames == null) {
        $("input:text[doName]").each(function () {
            if ($(this).attr("ltype") == "select") {
                $(this).ligerGetComboBoxManager()._setDisabled(false);
            } else if ($(this).attr("ltype") == "date") {
                $(this).ligerGetDateEditorManager().setEnabled();
            } else {
                $(this).attr("disabled", false);
                $(this).removeClass("l-text-disabled");
            }
        });
        $("input:checkbox[doName]").attr("disabled", false);
        $("input:radio[doName]").attr("disabled", false);
    } else {
        if (typeof(fieldNames) == "object") {
            fieldNames.each(function () {
                var e = $(this);
                if (e.attr("ltype") == "select") {
                    e.ligerGetComboBoxManager()._setDisabled(false);
                } else if (e.attr("ltype") == "date") {
                    e.ligerGetDateEditorManager().setEnabled();
                } else {
                    e.attr("disabled", false);
                    e.removeClass("l-text-disabled");
                }
            });
        } else {
            var aryNames = fieldNames.split(",");
            for (var i = 0; i < aryNames.length; i++) {
                var id = aryNames[i];
                var e = $("#" + id)
                if (e.length > 0) {
                    if (e.attr("ltype") == "select") {
                        e.ligerGetComboBoxManager()._setDisabled(false);
                    } else if (e.attr("ltype") == "date") {
                        e.ligerGetDateEditorManager().setEnabled();
                    } else {
                        e.attr("disabled", false);
                        e.removeClass("l-text-disabled");
                    }
                }
            }
        }
    }
}

/**
 * 弹出窗口方法
 * @param option 和$.ligerDialog.open的参数一样

 * @returns 窗口句柄
 */
function opwnWindow(option) {
    if (option.url) {
        return $.ligerDialog.open(option);
    }
}

/**
 * 设置iframeURL
 * @param iframeId
 * @param url
 */
function setIframeUrl(iframeId, url) {
    if (url != null) {
        url += url.indexOf("?") == -1 ? "?" : "&";
        url += "_usrSessionId=" + getUsrSessionId() + "&sessionId=" + getSessionId() + "&_timestmp=" + new Date().getTime();
        $("#" + iframeId).attr('src', url);
    }
}

/**
 * 提交保存前的执行的虚方法，如果有提交前要执行的，在页面自己实现

 */
function preSubmitSave() {
};

/**
 * 提交保存后的执行的虚方法，如果有提交后要执行的，在页面自己实现

 */
function postSubmitSave() {
};

/**
 * 统一提交保存方法
 */
function submitSave() {
    //如果ajax提交未返回，不执行方法

    if (!submitSyncSign) return;
    //提交前执行的方法
    preSubmitSave();
    //提交后执行的方法
    postSubmitSave();
}


/**
 * 这个方法是设置通用页面加载格式/控制
 * innerTable样式的不管

 * td含有align属性的不管
 */
var idate = ldate = ndate = new Date();
var timeStmpMsg = ""
$(function () {
    var label = $("<span style='color:red;font-size:15px;'>&nbsp;&nbsp;&nbsp;</span>");
    var mustSign = $("<span style='color:red;font-size:15px;'>&nbsp;&nbsp;*</span>");
    //<span style='color:red;font-size:15px;'>&nbsp;&nbsp;*</span>
    //这里是设置统一格式的地方，统一格式回检测本身的align属性，如自定义了，就不赋统一样式了

    $('.partTable tr:not(.innerTable tr)').each(function () {
        $('td:not(.innerTable td):even', this).each(function () {
            $(this).attr({"noWrap": "true"});
            !$(this).attr('align') && $(this).attr("align", "right");

            var tmphtml = $(this).html();
            //alert(tmphtml.toLowerCase().indexOf("<span style='color:red;font-size:15px;'>&nbsp;&nbsp;*</span>"));
            if (tmphtml.toLowerCase().indexOf("<div") < 0 && tmphtml.toLowerCase().indexOf("<input") < 0) {
                if (tmphtml.toLowerCase().indexOf("*") < 0 && tmphtml.indexOf("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") < 0) {
                    $(this).append("<span style='color:red;font-size:15px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>");
                } else {
                    tmphtml = tmphtml.replace("&nbsp;&nbsp;*", "&nbsp;&nbsp;*&nbsp;&nbsp;");
                    $(this).html(tmphtml);
                }
            }
        });
    });
    $("input:text:visible[disabled=false]:first").focus();
});

//Added by wanghaibo 20120407 start
/**
 *点击Tab时预处理
 */
function preClickTab(obj) {
    return true;
}

//Added by wanghaibo 20120407 end


//验证身份证号是否合规-------------------add by HermanKing 
function isChinaIDCard(StrNo) {//参数：证件号码，返回值：teue/false
    StrNo = StrNo.toString();
    if (StrNo.length == 15) {
        if (!isValidDate2("19" + StrNo.substr(6, 2), StrNo.substr(8, 2), StrNo.substr(10, 2))) {
            return false;
        }
    } else if (StrNo.length == 18) {
        if (!isValidDate2(StrNo.substr(6, 4), StrNo.substr(10, 2), StrNo.substr(12, 2))) {
            return false;
        }
    } else {
        $.ligerDialog.warn("输入的身份证号码必须为15位或者18位！");
        return false;
    }

    if (StrNo.length == 18) {
        var a, b, c
        if (!isNumber2(StrNo.substr(0, 17))) {
            $.ligerDialog.warn("身份证号码错误,前17位不能含有英文字母！");
            return false;
        }
        a = parseInt(StrNo.substr(0, 1)) * 7 + parseInt(StrNo.substr(1, 1)) * 9 + parseInt(StrNo.substr(2, 1)) * 10;
        a = a + parseInt(StrNo.substr(3, 1)) * 5 + parseInt(StrNo.substr(4, 1)) * 8 + parseInt(StrNo.substr(5, 1)) * 4;
        a = a + parseInt(StrNo.substr(6, 1)) * 2 + parseInt(StrNo.substr(7, 1)) * 1 + parseInt(StrNo.substr(8, 1)) * 6;
        a = a + parseInt(StrNo.substr(9, 1)) * 3 + parseInt(StrNo.substr(10, 1)) * 7 + parseInt(StrNo.substr(11, 1)) * 9;
        a = a + parseInt(StrNo.substr(12, 1)) * 10 + parseInt(StrNo.substr(13, 1)) * 5 + parseInt(StrNo.substr(14, 1)) * 8;
        a = a + parseInt(StrNo.substr(15, 1)) * 4 + parseInt(StrNo.substr(16, 1)) * 2;
        b = a % 11;
        if (b == 2) {//最后一位为校验位

            c = StrNo.substr(17, 1).toUpperCase();//转为大写X
        } else {
            c = parseInt(StrNo.substr(17, 1));
        }
        switch (b) {
            case 0:
                if (c != 1) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:1");
                    return false;
                }
                break;
            case 1:
                if (c != 0) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:0");
                    return false;
                }
                break;
            case 2:
                if (c != "X") {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:X");
                    return false;
                }
                break;
            case 3:
                if (c != 9) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:9");
                    return false;
                }
                break;
            case 4:
                if (c != 8) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:8");
                    return false;
                }
                break;
            case 5:
                if (c != 7) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:7");
                    return false;
                }
                break;
            case 6:
                if (c != 6) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:6");
                    return false;
                }
                break;
            case 7:
                if (c != 5) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:5");
                    return false;
                }
                break;
            case 8:
                if (c != 4) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:4");
                    return false;
                }
                break;
            case 9:
                if (c != 3) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:3");
                    return false;
                }
                break;
            case 10:
                if (c != 2) {
                    $.ligerDialog.warn("身份证号码校验位错:最后一位应该为:2");
                    return false;
                }
        }
    } else {//15位身份证号

        if (!isNumber2(StrNo)) {
            $.ligerDialog.warn("身份证号码错误,前15位不能含有英文字母！");
            return false;
        }
    }
    return true;
}

function isValidDate2(year, month, day) {
    month = parseInt(month, 10);
    day = parseInt(day, 10);

    if (month < 1 || month > 12) {
        $.ligerDialog.warn("身份证生日错误！");
        return false;
    }
    if (day < 1 || day > 31) {
        $.ligerDialog.warn("身份证生日错误！");
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && (day == 31)) {
        $.ligerDialog.warn("身份证生日错误！");
        return false;
    }
    if (month == 2) {
        var leap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !leap)) {
            $.ligerDialog.warn("身份证生日错误！");
            return false;
        }
    }
    return true;
}

function isNumber2(s) {
    if (s == null || s == "")
        return false;
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c < '0' || c > '9') {
            if (c != '.' && c != ',' && c != '-' && c != 'b' && c != 'm' && c != 'M' && c != 'B')
                return false;
        }
    }
    return true;
}

function toNumber(s) {
    var ret = "0";
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c != ',') {
            ret = ret + "" + c;
        }
    }
    return ret;
}

//验证日期是否合法-------------------add by HermanKing 
function IsValidDate(DateStr) {
    var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;
    if (sDate == '') return true;
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
    var s = sDate.replace(/[\d]{4,4}[\-/]{1}[\d]{1,2}[\-/]{1}[\d]{1,2}/g, '');
    if (s == '') { //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
        var t = new Date(sDate.replace(/\-/g, '/'));
        var ar = sDate.split(/[-/:]/);
        if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
            //$.ligerDialog.warn('错误的日期格式！');
            return false;
        }
    } else {
        //$.ligerDialog.warn('错误的日期格式！');
        return false;
    }
    return true;
}

//验证日期是否合法-------------------add by HermanKing 
function changeDate(obj) {
    var fval = $("#" + obj.id).val();
    if (fval.length == 8) {
        var yy = fval.substring(0, 4);
        var mm = fval.substring(4, 6);
        var dd = fval.substring(6, 8);
        fval = yy + "-" + mm + "-" + dd;
        $("#" + obj.id).val(fval);
    }
    if (!IsValidDate(fval)) {
        $("#" + obj.id).val("");
    }
}

//报表查询界面专用日期验证方法------ add by HermanKing
function validate_date(dt) {
    if (dt.length != 8) {
        alert("请正确输入日期如：20120221");
        return false;
    } else {
        var yy = dt.substring(0, 4);
        var mm = dt.substring(4, 6);
        var dd = dt.substring(6, 8);
        var dtime = /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/;
        var ndate = yy + '-' + mm + '-' + dd;
        if (!dtime.test(ndate)) {
            alert("请正确输入日期如：20120221");
            return false;
        }
    }
    return true;
}

//金额格式转换 ------ add by HermanKing
function MoneyToCurrency(str) {
    var strValue = str;
    var iValue = str;
    if (str.indexOf(",") > 0) {
        var re2 = /,/g;
        strValue = strValue.replace(re2, "");
        iValue = strValue;
    }
    if (isNaN(strValue)) {
        return "";
    }
    if (iValue >= 1000 || iValue <= -1000) {
        var iStart = strValue.indexOf(".");
        if (iStart < 0)
            iStart = strValue.length;

        iStart -= 3;
        while (iStart >= 1) {
            if (strValue.substring(0, iStart) != "-") {
                strValue = strValue.substring(0, iStart) + "," + strValue.substring(iStart, strValue.length);
            }
            iStart -= 3;
        }
    }
    if (strValue.length > 0 && strValue.indexOf(".") < 0) {
        strValue = strValue + ".00";
    }
    //Start SIR#1254,Added by Jax 2017-10-16
    if (strValue.length > 0 && (strValue.length - strValue.indexOf(".")) == 2) {
        strValue = strValue + "0";
    }
    //End SIR#1254,Added by Jax 2017-10-16
    if (strValue.length > 0 && strValue.indexOf("+") == 0) {
        strValue = strValue.substring(1);
    }
    if (strValue.length > 0 && strValue.indexOf(".") == 0) {
        strValue = "0" + strValue;
    }
    return strValue;
}

//-------------------------------------禁用无焦点退格键add by HermanKing
document.onkeydown = check;

function check(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) {
        code = e.keyCode;
    } else if (e.which) {
        code = e.which;
    }

    if (((event.keyCode == 8) &&//BackSpace
        ((event.srcElement.type != "text" &&
            event.srcElement.type != "textarea" &&
            event.srcElement.type != "password") ||
            event.srcElement.readOnly == true)) ||
        ((event.ctrlKey) && ((event.keyCode == 78) || (event.keyCode == 82)))//CtrlN,CtrlR 
    ) {//F5 ||(event.keyCode == 116)
        event.keyCode = 0;
        event.returnValue = false;
    }
    return true;
}

//-------------------------------------四舍五入add by HermanKing
function folt45(a, b) {
    var retval = 0;
    var rt = "";
    if (a < 0) {
        rt = "-";
        a = (a * -1);
    }
    a = a + "";
    if (a.indexOf(".") > 0) {
        var t1 = a.substring(0, a.indexOf("."));
        var t2 = a.substring(a.indexOf(".") + 1);
        if (t2.length > b) {
            var t21 = t2.substring(0, b);
            var t22 = t2.substring(b, b + 1);
            if (t22 > 4) {
                t21 = (t21 * 1 + 1) + "";
                if (t21.length < b) {
                    var j = t21.length;
                    for (var i = 0; i < (b - j); i++) {
                        t21 = "0" + t21;
                    }
                }
            }
            if (t21.length > b) {
                t1 = t1 * 1 + 1;
                var tmp1 = "";
                for (var i = 0; i < b; i++) {
                    tmp1 = tmp1 + "0";
                }
                t21 = tmp1;
            }
            retval = t1 + "." + t21;
        } else if (t2.length < b) {
            var j = t2.length;
            for (var i = j; i < b; i++) {
                t2 = t2 + "0";
            }
            retval = t1 + "." + t2;
        } else {
            retval = a;
        }
    } else {
        var tmp1 = "";
        for (var i = 0; i < b; i++) {
            tmp1 = tmp1 + "0";
        }
        retval = a + "." + tmp1;
    }
    retval = rt + retval;
    return retval;
}

//----------------------------金额格式化

/*
function MoneyToCurrency(val){
	var strValue = val;
	var iValue = val;
	if (iValue >= 1000 || iValue <= -1000) {
		var iStart = strValue.indexOf(".");
		if (iStart < 0)
			iStart = strValue.length;

		iStart -= 3;
		while (iStart >= 1) {
			strValue = strValue.substring(0,iStart) + "," + strValue.substring(iStart,strValue.length);
			iStart -= 3;
		}		
	}
	return strValue;
}
*/

//判断字符两端是否存在空格，左边有空格返回-1右边有空格返回1没有空格返回0
function checkSP(str) {
    var retval = 0;
    if (str != null && str != "") {
        var tmp1 = str.substring(0, 1);
        var tmp2 = str.substring(str.length - 1, str.length);
        if (tmp1 == " ") {
            retval = -1;
        } else if (tmp2 == " ") {
            retval = 1;
        }
    }
    return retval;
}

//截取两边的空格

function subSP(str) {
    var tmp = "";
    if (checkSP(str) != 0) {
        if (checkSP(str) == -1) {
            tmp = str.substring(1, str.length);
        }
        if (checkSP(str) == 1) {
            tmp = str.substring(0, str.length - 1);
        }
        if (checkSP(tmp) != 0) {
            tmp = subSP(tmp);
        }
    } else {
        tmp = str;
    }
    return tmp;
}

/**计算两日期间隔天数

 * add by zpc
 * 2012-06-25
 * */
function DifferenceQuantityDate(a, b) {
    var d1 = new Date((a.substring(0, 4) * 1), (a.substring(5, 7) * 1) - 1, (a.substring(8, 10) * 1));
    var d2 = new Date((b.substring(0, 4) * 1), (b.substring(5, 7) * 1) - 1, (b.substring(8, 10) * 1));
    return ((d2 - d1) / (24 * 3600000));
}

/**判断对象是否为空
 * add by zpc
 * 2012-06-25
 * */
function notNull(obj) {
    if (obj != "" && obj != undefined) {
        return true;
    } else {
        return false;
    }
}

/**清除页面上的值

 * add by Kang Chen
 * 2013-10-14
 * */
function clearVal() {
    $('select>option:first').attr('selected', true);   //clear select
    //$('input[name][id][type="text"]').attr('disabled',false).val("");   //clear input
    $('input[type="text"]').val("");   //clear input //zzp 
    $('input[type="hidden"]').val(""); //zzp
    $('span[id]').text("");   //clear span
}

function disabledVal() {
    $('select').attr('disabled', true);   //clear select
    $('input[name][type="text"]').attr('disabled', true);   //clear input
    $('span[id]').attr('disabled', true);   //clear span
}

/**关闭Tab后需释放交易
 * add by Kang Chen
 * 2013-10-14
 * */
function releaseDealOnly(path, tabid) {
    //alert(tabid);
    var dealOid = $('#tabIfrm_' + tabid).contents().find('input[id="DEAL_OID"]').val();
    var dealStat = $('#tabIfrm_' + tabid).contents().find('input[id="DEAL_STAT"]').val();
    if (dealOid != undefined && dealStat != undefined && dealOid != null && dealStat != null) {
        if (tabid.indexOf("LD") > 0) {
            var url = path + '/ldCommon!releaseDealOnly.do?DEAL_OID=' + dealOid + '&DEAL_STAT=' + dealStat
                + '&FUNC_ID=FLD0002&REQUEST_ID=FLD0002req08&SERVLET=LD9001C01Servlet&seconds=' + new Date().getSeconds();
            $.get(url);
        }
        if (tabid.indexOf("IS") > 0) {
            var url = path + '/isCommon!releaseDealOnly.do?DEAL_OID=' + dealOid + '&DEAL_STAT=' + dealStat
                + '&FUNC_ID=FIS0002&REQUEST_ID=IS0003req08&SERVLET=Is9001C01Servlet&seconds=' + new Date().getSeconds();
            $.get(url);
        }
        if (tabid.indexOf("FX") > 0) {
            var url = path + '/fxCommon!releaseDealResponse.do?DEAL_OID=' + dealOid + '&DEAL_STAT=' + dealStat
                + '&FUNC_ID=FFX0003&REQUEST_ID=FFX0003req07&SERVLET=Fx9001C01Servlet&seconds=' + new Date().getSeconds();
            $.get(url);
        }
        /* 		if(tabid.indexOf("FI")>0){
 		    var dealNo=$('#tabIfrm_'+tabid).contents().find('input[id="DEAL_NO"]').val();
	    	var url = path+'/Mmi!releaseDealResponse.do?DEAL_NO='+dealNo+'&DEAL_STAT='+dealStat
			+'&FUNC_ID=FFI0003&REQUEST_ID=MM0005W02req04&SERVLET=Mm9001C01Servlet&seconds='+new Date().getSeconds();
	    	$.get(url); 
 		}*/
    }
}

function jsonToString(json) {
    var str = JSON2.stringify(json);
    str = str.substring(1, str.length - 1);
    return str;
}

//json数据中没有逗号可以用逗号分开
function jsonToArray(json) {
    var str = JSON2.stringify(json);
    str = str.substring(1, str.length - 1);
    return str.split(",");
}

//禁止输入，设置背景为灰色
function disabledPage() {
    var arr = $("td>input");
    for (var i = 0; i < arr.length; i++) {
        if ($(arr[i]).attr('readonly') == false) {
            $(arr[i]).attr('disabled', true);
            $(arr[i]).css('background-color', '#E4E9EB');
            $(arr[i]).addClass('textBackground');
        }
    }
    var arrDate = $("input[ltype='date']");
    for (var i = 0; i < arrDate.length; i++) {
        $(arrDate[i]).ligerDateEditor().setDisabled();
        $(arrDate[i]).attr("disabled", true);
    }
    var selectArr = $("td>select");
    for (var i = 0; i < selectArr.length; i++) {
        $(selectArr[i]).attr('disabled', true);
    }
    var selectArr2 = $("input[ltype='select2']");
    for (var i = 0; i < selectArr2.length; i++) {
        $(selectArr2[i]).ligerGetComboBoxManager().setDisabled()
        $(selectArr2[i]).attr("disabled", true);
    }
    var textAreaArr = $("td>textarea");
    for (var i = 0; i < textAreaArr.length; i++) {
        $(textAreaArr[i]).attr('disabled', true);
    }

    $(".l-trigger").attr("disabled", true);
    $(".l-trigger-icon").attr("disabled", true);
}

//通过table id禁止输入，设置背景为灰色
function disabledPageByTid(tid) {
    var arr = $("#" + tid + " td>input");
    for (var i = 0; i < arr.length; i++) {
        if ($(arr[i]).attr('readonly') == false) {
            $(arr[i]).attr('disabled', true);
            $(arr[i]).addClass('textBackground');
            $(arr[i]).css('background-color', '#E4E9EB');
        }
    }
    var arrDate = $("#" + tid + " input[ltype='date']");
    for (var i = 0; i < arrDate.length; i++) {
        $(arrDate[i]).ligerDateEditor().setDisabled();
        $(arrDate[i]).attr("disabled", true);
    }
    var selectArr = $("#" + tid + " td>select");
    for (var i = 0; i < selectArr.length; i++) {
        $(selectArr[i]).attr('disabled', true);
    }

    var selectArr2 = $("#" + tid + " input[ltype='select2']");
    for (var i = 0; i < selectArr2.length; i++) {
        $(selectArr2[i]).ligerGetComboBoxManager().setDisabled()
        $(selectArr2[i]).attr("disabled", true);
    }

    var textAreaArr = $("#" + tid + " td>textarea");
    for (var i = 0; i < textAreaArr.length; i++) {
        $(textAreaArr[i]).attr('disabled', true);
    }
    $("#" + tid + " .l-trigger").attr("disabled", true);
    $("#" + tid + " .l-trigger-icon").attr("disabled", true);
}

//开启禁输项
function enabledPage() {
    var arr = $("td>input");
    for (var i = 0; i < arr.length; i++) {
        $(arr[i]).attr('disabled', false);
        if ($(arr[i]).attr('readonly') == false) {
            if ($(arr[i]).attr('type') == "button") {
                $(arr[i]).addClass('l-button');
            } else {
                $(arr[i]).removeClass('textBackground');
                $(arr[i]).css('background-color', '');
            }
        }
    }
    var arrDate = $("input[ltype='date']");
    for (var i = 0; i < arrDate.length; i++) {
        $(arrDate[i]).ligerDateEditor().setEnabled();
        $(arrDate[i]).attr("disabled", false);
    }
    var selectArr = $("td>select");
    for (var i = 0; i < selectArr.length; i++) {
        $(selectArr[i]).attr('disabled', false);
        $(selectArr[i]).removeClass('textBackground');
    }

    var selectArr2 = $("input[ltype='select2']");
    for (var i = 0; i < selectArr2.length; i++) {
        $(selectArr2[i]).ligerGetComboBoxManager().setEnabled()
        $(selectArr2[i]).attr("disabled", false);
    }

    var textAreaArr = $("td>textarea");
    for (var i = 0; i < textAreaArr.length; i++) {
        $(textAreaArr[i]).attr('disabled', false);
    }
    $("#TRD_DTE").attr("disabled", false);
    $("#VAL_DTE").attr("disabled", false);
    $("#MAT_DTE").attr("disabled", false);
    $("#SI_VAL_DTE_NOT_DTE").attr("disabled", false);
    $("#SI_MAT_DTE_NOT_DTE").attr("disabled", false);
    $("#SI_VAL_DTE_ACT_SETT_DTE").attr("disabled", false);
    $("#SI_MAT_DTE_ACT_SETT_DTE").attr("disabled", false);
    $(".l-trigger").attr("disabled", false);
    $(".l-trigger-icon").attr("disabled", false);
}

function fileManageEnabled() {
    var arr = $("input[ltype=fileManage]")
    for (var i = 0; i < arr.length; i++) {
        $(arr[i]).attr('disabled', false);
        if ($(arr[i]).attr('readonly') == false) {
            if ($(arr[i]).attr('type') == "button") {
                $(arr[i]).addClass('l-button');
            } else {
                $(arr[i]).removeClass('textBackground');
                $(arr[i]).css('background-color', '');
            }
        }
    }
}

//通过table id,开启禁输项
function enabledPageByTid(tid) {
    var arr = $("#" + tid + " td>input");
    for (var i = 0; i < arr.length; i++) {
        $(arr[i]).attr('disabled', false);
        if ($(arr[i]).attr('readonly') == false) {
            if ($(arr[i]).attr('type') == "button") {
                $(arr[i]).addClass('l-button');
            } else {
                $(arr[i]).removeClass('textBackground');
                $(arr[i]).css('background-color', '');
            }
        }
    }
    var arrDate = $("#" + tid + " input[ltype='date']");
    for (var i = 0; i < arrDate.length; i++) {
        $(arrDate[i]).ligerDateEditor().setEnabled();
        $(arrDate[i]).attr("disabled", false);
    }
    var selectArr = $("#" + tid + " td>select");
    for (var i = 0; i < selectArr.length; i++) {
        $(selectArr[i]).attr('disabled', false);
        $(selectArr[i]).removeClass('textBackground');
        $(arr[i]).css('background-color', '');
    }

    var selectArr2 = $("#" + tid + " input[ltype='select2']");
    for (var i = 0; i < selectArr2.length; i++) {
        $(selectArr2[i]).ligerGetComboBoxManager().setEnabled()
        $(selectArr2[i]).attr("disabled", false);
    }

    var textAreaArr = $("#" + tid + " td>textarea");
    for (var i = 0; i < textAreaArr.length; i++) {
        $(textAreaArr[i]).attr('disabled', false);
    }
    $("#" + tid + " .l-trigger").attr("disabled", false);
    $("#" + tid + " .l-trigger-icon").attr("disabled", false);
}

//通过class id,开启禁输项
function enabledPageByClassId(cid) {
    var arr = $("." + cid + " input");
    for (var i = 0; i < arr.length; i++) {
        $(arr[i]).attr('disabled', false);
        if ($(arr[i]).attr('readonly') == false) {
            if ($(arr[i]).attr('type') == "button") {
                $(arr[i]).addClass('l-button');
            } else {
                $(arr[i]).removeClass('textBackground');
                $(arr[i]).css('background-color', '');
            }
        }
    }
    var arrDate = $("." + cid + " input[ltype='date']");
    for (var i = 0; i < arrDate.length; i++) {
        $(arrDate[i]).ligerDateEditor().setEnabled();
        $(arrDate[i]).attr("disabled", false);
    }
    var selectArr = $("." + cid + " td>select");
    for (var i = 0; i < selectArr.length; i++) {
        $(selectArr[i]).attr('disabled', false);
        $(selectArr[i]).removeClass('textBackground');
        $(arr[i]).css('background-color', '');
    }

    var selectArr2 = $("." + cid + " input[ltype='select2']");
    for (var i = 0; i < selectArr2.length; i++) {
        $(selectArr2[i]).ligerGetComboBoxManager().setEnabled()
        $(selectArr2[i]).attr("disabled", false);
    }

    var textAreaArr = $("." + cid + "td>textarea");
    for (var i = 0; i < textAreaArr.length; i++) {
        $(textAreaArr[i]).attr('disabled', false);
    }
    $("." + cid + " .l-trigger").attr("disabled", false);
    $("." + cid + " .l-trigger-icon").attr("disabled", false);
}

//通过元素 id开启禁输项
function enabledById(tid) {
    $('#' + tid).attr('disabled', false);
    $('#' + tid).removeClass('textBackground');
    if (tid == "PAY_INT_COMP_FREQ" || tid == "RCV_INT_COMP_FREQ" || tid == "PAY_RTE_FIX_FREQ" || tid == "RCV_RTE_FIX_FREQ") {
        $('#' + tid).addClass('choosableOption');
    } else {
        $('#' + tid).addClass('choosable');
    }
}

function disenabledById(tid) {
    $('#' + tid).attr('disabled', true);
    if (tid == "PAY_INT_COMP_FREQ" || tid == "RCV_INT_COMP_FREQ") {
        $('#' + tid).removeClass('choosableOption');
    } else {
        $('#' + tid).removeClass('choosable');
    }
    $('#' + tid).addClass('textBackground');
}

function getRateFixFreq(id, word) {
    $("#" + id + ">option").remove();
    var empty = '<option dtype="default" value=""></option>';
    var day = '<option value="D">D=Day</option>';
    var week = '<option value="W">W=Weekly</option>';
    var month = '<option value="M">M=Monthly</option>';
    var quarter = '<option value="Q">Q=Quarterly</option>';
    var semi = '<option value="S">S=Semi-annually</option>';
    var annu = '<option value="A">A=Annually</option>';
    if (word == "A") {
        $("#" + id).append($(empty + day + week + month + quarter + semi + annu));
    }
    if (word == "S") {
        $("#" + id).append($(empty + day + week + month + quarter + semi));
    }
    if (word == "Q") {
        $("#" + id).append($(empty + day + week + month + quarter));
    }
    if (word == "M") {
        $("#" + id).append($(empty + day + week + month));
    }
    if (word == "W") {
        $("#" + id).append($(empty + day + week));
    }
    if (word == "E") {
        $("#" + id).append($(empty + day + week + month + quarter + semi + annu));
    }
}

function simpleValidate() {
    /*	var inps=$("input[class$='validateMust']");
	for(var i=0;i<inps.length;i++){
		if($(inps[i]).attr("id")=="TRD_DTE"){
			$.ligerDialog.warn("交易日数据不合法");
			return;
		}
		if($(inps[i]).attr("id")=="VAL_DTE"){
			$.ligerDialog.warn("交割日数据不合法");
			return;
		}
		if($(inps[i]).attr("id")=="MAT_DTE"){
			$.ligerDialog.warn("到期日数据不合法");
			return;
		}
		if($(inps[i]).attr("id")=="VAL_DTE"){
			$.ligerDialog.warn("起息日数据不合法");
			return;
		}
		var msg=$(inps[i]).parent().prev().attr("title");
		$.ligerDialog.warn(msg+"数据不合法");
		return;
	}*/

//	var trdThrCde=$("#TRD_THR_CDE_TEXT").text();
//	var brkCde=$.trim($("#BRK_CDE").val());
//	if(trdThrCde=="Broker"){
//		if(notNull(brkCde)==false){
//			$.ligerDialog.warn("请输入经纪人代码");
//			return;
//		}
//	}
//	
//	var trdThrCde2=$("#TRD_THRO_CDE_TEXT").text();
//	var brkCde2=$.trim($("#BROKER_CDE").val());
//	if(trdThrCde2=="Broker"){
//		if(notNull(brkCde2)==false){
//			$.ligerDialog.warn("请输入经纪人代码");
//			return;
//		}
//	}

//	var inputArr=$("td>input[class='must']");
    var inputArr = $("input[ltype=must],select[ltype=must]");
    for (var i = 0; i < inputArr.length; i++) {
        var val = $(inputArr[i]).attr("value");
        var id = $(inputArr[i]).attr("id");
        val = $.trim(val);
        /**
         if(id =="PAY_NOTN_AMT"){
			if(parseFloat($("#PAY_NOTN_AMT").val())<= 0){
				$.ligerDialog.warn('CO-C0038 必须大于零');
				$("#PAY_NOTN_AMT").attr("style","background-color:red");
				return;
			}
        }
         **/
        if (val == "" || val.length == 0) {
            //var msg=$(inputArr[i]).parent().prev().attr("title");
            var msg = $("#" + id).parent().prev().attr("title");
            if (msg == undefined) {
                msg = $("#" + id).parent().parent().parent().prev().attr("title");
            }
            /**
             if(id =="RCV_FIX_RTE"){
				if ($("#OUR_TRAN_DIRCT").val()=="PF"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#RCV_FIX_RTE").attr("style","background-color:red");
					return;
				}
			}else if(id =="PAY_INT_RTE_CDE"){
				if ($("#OUR_TRAN_DIRCT").val()=="PF"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#PAY_INT_RTE_CDE").attr("style","background-color:red");
					return;
				}
			}else if(id =="PAY_INT_RTE_TNR"){
				if ($("#OUR_TRAN_DIRCT").val()=="PF"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#PAY_INT_RTE_TNR").attr("style","background-color:red");
					return;
				}
			}else if(id =="PAY_RTE_FIX_FREQ"){
				if ($("#OUR_TRAN_DIRCT").val()=="PF"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#PAY_RTE_FIX_FREQ").attr("style","background-color:red");
					return;
				}
			}else if(id =="PAY_INT_SPR"){
				if ($("#OUR_TRAN_DIRCT").val()=="PF"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#PAY_INT_SPR").attr("style","background-color:red");
					return;
				}
			}else if(id =="PAY_FIX_RTE"){
				if ($("#OUR_TRAN_DIRCT").val()=="PX"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#PAY_FIX_RTE").attr("style","background-color:red");
					return;
				}
			}else if(id =="RCV_INT_RTE_CDE"){
				if ($("#OUR_TRAN_DIRCT").val()=="PX"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#RCV_INT_RTE_CDE").attr("style","background-color:red");
					return;
				}
			}else if(id =="RCV_INT_RTE_TNR"){
				if ($("#OUR_TRAN_DIRCT").val()=="PX"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#RCV_INT_RTE_TNR").attr("style","background-color:red");
					return;
				}
			}else if(id =="RCV_RTE_FIX_FREQ"){
				if ($("#OUR_TRAN_DIRCT").val()=="PX"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#RCV_RTE_FIX_FREQ").attr("style","background-color:red");
					return;
				}
			}else if(id =="RCV_INT_SPR"){
				if ($("#OUR_TRAN_DIRCT").val()=="PX"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#RCV_INT_SPR").attr("style","background-color:red");
					return;
				}
			}else if(id =="PAY_INT_COMP_FREQ"){
				if($("#PAY_INT_CAL_MTHD_C").attr("checked")==true){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#PAY_INT_COMP_FREQ").attr("style","background-color:red");
					return;
				}
	    	}else if(id =="RCV_INT_COMP_FREQ"){
				if($("#RCV_INT_CAL_MTHD_C").attr("checked")==true){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#RCV_INT_COMP_FREQ").attr("style","background-color:red");
					return;
				}
	    	}else if(id =="BROKER_CDE"){
				if($("#TRD_THRO_CDE").val()=="BROK"){
					$.ligerDialog.warn('CO-C0006 该字段在某些条件下是必须的');
					$("#BROKER_CDE").attr("style","background-color:red");
					return;
				}
	    	}else{
				$("#"+id).attr("style","background-color:red");
				$.ligerDialog.warn(msg+"不能为空");
				return ;
			}
             **/
            $("#" + id).attr("style", "background-color:red");
            $.ligerDialog.warn(msg + "不能为空");
            return;
        }
        /*else{
			var id=$(inputArr[i]).attr("id")+"_TEXT";
			if($("#"+id).is("span") && !notNull($("#"+id).text())){
				var msg=$("#"+id).parent().prev().attr("title");
				$("#"+id).attr("style","background-color:red");
				$.ligerDialog.warn(msg+"数据不合法");
				return ;
			}
		}*/
    }


    /*	$.each($("input[ltype=must]"),function(i,item){
		var id = item.id;
		var value=$("#"+id).val();
		var msg=$("#"+id).parent().prev().attr("title");

		if(value==''){
			$.ligerDialog.warn(msg+"不能为空",function(){
				$("#"+item.id).attr("style","background-color:red");
				return ;
			});
			
		}
	});*/


    /*	var selectArr=$("td>select[class='must']");
	for(var i=0;i<selectArr.length;i++)
	{
		var sid=$(selectArr[i]).attr("id");alert("sid==="+sid);
		var val=$("#"+sid+">option:selected").attr("value");
		val=$.trim(val);
		if(val=="" || val.length<=0)
		{
			var msg=$(selectArr[i]).parent().prev().attr("title");
			$("#"+id).attr("style","background-color:red");
			$.ligerDialog.warn(msg+"不能为空");
			return;
		}
	}*/
    return true;
}

function mustInputValidate() {
    var mustInputField = $("textarea[mtype=must],input[mtype=must]");
    for (var i = 0; i < mustInputField.length; i++) {
        var val = $(mustInputField[i]).attr("value");
        var id = $(mustInputField[i]).attr("id");
        val = $.trim(val);
        //alert(val);

        if (val == "" || val.length == 0) {
            var msg = $("#" + id).attr("desc");
            if (mustInputField[i].tagName.toLocaleLowerCase() == 'input') {
                $("#" + id).attr("style", "background-color:red");
            } else {
                $("#" + id).addClass("validateMust");
            }
            var tipsMsg = $("#notNullMsg").val();
            $.ligerDialog.warn(msg + tipsMsg);
            return;
        }
    }
    return true;
}

function simpleValidateLd() {
    var inputArr = $("input[ltype=must],select[ltype=must]");
    for (var i = 0; i < inputArr.length; i++) {
        var val = $(inputArr[i]).attr("value");
        var id = $(inputArr[i]).attr("id");
        val = $.trim(val);
        if (id == "PRCP_AMT") {
            if (parseFloat($("#PRCP_AMT").val()) <= 0) {
                $.ligerDialog.warn('CO-C0038 必须大于零');
                $("#PRCP_AMT").attr("style", "background-color:red");
                return;
            }
        }
        //start SIR#547,Added by liuyan,2016/09/27 
        if (id == "INT_RTE") {
            if (parseFloat($("#INT_RTE").val()) <= 0) {
                $.ligerDialog.warn('CO-C0038 必须大于零');
                $("#INT_RTE").attr("style", "background-color:red");
                return;
            }
        }
        //End SIR#547,Added by liuyan,2016/09/27 
        if (val == "" || val.length == 0) {
            //var msg=$(inputArr[i]).parent().prev().attr("title");
            var msg = $("#" + id).parent().prev().attr("title"); //alert(msg+"==msg");
            if (msg == undefined) {
                msg = $("#" + id).parent().parent().parent().prev().attr("title");
            }
            $("#" + id).attr("style", "background-color:red");
            $.ligerDialog.warn(msg + "不能为空");
            return;
        }
    }
    return true;
}

//选择查询条件
function searchCondition(obj) {
    var name = obj.name;
    name = name.substring(name.indexOf(".") + 1, name.length - 4);
    if (obj.value == "N") {
        $("input[name=" + name + "]").attr("disabled", false);
        $("input[name=" + name + "]").removeClass("l-button-disabled");
        $("input[name=" + name + "]").addClass("l-button");
        $("#" + name).attr("disabled", false);
        $("#" + name).removeClass("textBackground");
        if ("CTP_CDE" == name) {
            $("#CTP_DES_OPR").attr("disabled", false);
            $("#CTP_DES_VAL").attr("disabled", false);
            $("#CTP_DES_VAL").removeClass("textBackground");
            $("#CTP_NME").attr("disabled", false);
            $("#CTP_NME").removeClass("textBackground");
        }
    }
    if (obj.value == "Y") {
        $("input[name=" + name + "]").attr("disabled", true);
        $("input[name=" + name + "]").removeClass("l-button");
        $("input[name=" + name + "]").addClass("l-button-disabled");
        $("#" + name).attr("disabled", true);
        $("#" + name).addClass("textBackground");
        $("#" + name).val("");//清空CDE
        $("#" + name + "_TEXT").text("");//描述后面必须是OID
        $("#" + name + "_TEXT").next().val("");//清空OID
        if ("CTP_CDE" == name) {
            $("#CTP_DES_OPR").attr("disabled", true);
            $("#CTP_DES_OPR").val("");
            $("#CTP_DES_VAL").attr("disabled", true);
            $("#CTP_DES_VAL").val("");
            $("#CTP_DES_VAL").addClass("textBackground");
            $("#CTP_NME").attr("disabled", true);
            $("#CTP_NME").val("");
            $("#CTP_NME").addClass("textBackground");
        }
    }
}

//通过ID清除值

function clearValById(arr) {
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            var str = jsonToString(arr[i]);
            var newArr = str.split(":");
            var key = newArr[0].toString();
            key = key.substring(1, key.length - 1);
            var val = newArr[1].toString();
            val = val.substring(1, val.length - 1);

            if (key == "val") {
                $("#" + val).val("");
            }
            if (key == "text") {
                $("#" + val).text("");
            }
        }
    }
}

//把查询数据转为JSON
function searchParms() {
    var str = "{";
    var initNum = str.length;
    var arr = $("input");
    for (var i = 0; i < arr.length; i++) {
        var name = $(arr[i]).attr("name");
        var val = "";
        if ($("input:radio[name='" + name + "']").first().attr("checked") == true) {
            val = $.trim($("input[name='" + name + "']:checked").val());
        }
        if ($("input:radio[name='" + name + "']").last().attr("checked") == true) {
            val = $.trim($("input[name='" + name + "']:checked").val());
        }
        if ($("input:text[name='" + name + "']").attr("disabled") == false) {
            val = $.trim($("input[id='" + name + "']").val());
        }
        if ($("input:text[name='" + name + "'][ltype=select]").attr("disabled") == false && $("input[name='" + name + "']").ligerGetComboBoxManager() != null) {
            val = $.trim($("input[name='" + name + "']").ligerGetComboBoxManager().selectedValue);
        }

        if ($("input:hidden[name='" + name + "']").attr("disabled") == false) {
            val = $.trim($("input[type='hidden'][name='" + name + "']").val());
        }
        if (name != "" && name != undefined && val != "" && val != undefined) {
            str += '"' + name + '":"' + val + '",';
        }
    }
    var selectArr = $("select");
    for (var j = 0; j < selectArr.length; j++) {
        var name = $(selectArr[j]).attr("name");
        var val = $(selectArr[j]).val();
        if (name != "rp") {
            str += '"' + name + '":"' + val + '",';
        }
    }
    if (str.length > initNum) {
        str = str.substring(0, str.length - 1) + "}";
        return jQuery.parseJSON(str);
    }
    return null;
}

function openDialog(type, errCode) {
    //tipTyp 类型 warn、success、error、question
    //err_code 错误编号
    var url = path + "/util!changePage.do?createType=tip&tipTyp=" + type + "&err_code=" + errCode + "&seconds=" + new Date().getSeconds();
    openWin = $.ligerDialog.open({
        //title : "提示",
        width: 300,
        height: 175,
        url: url
    });
}

//退出页面,关闭Tab
function exit() {
    //$(">ul", parent.$(".l-tab-links")).children().remove();
    //parent.$(".l-tab-content").children().remove();
    //modify by gx 20140719
    var tabObj = $(">ul", parent.$(".l-tab-links")).children();
    var contetObt = parent.$(".l-tab-content").children();
    for (var i = 0; i < tabObj.length; i++) {
        if ($(tabObj[i]).attr("class") == "l-selected") {
            $(tabObj[i]).remove();
            $(contetObt[i]).remove();
            if (i > 0) {
                $(tabObj[i - 1]).click();
            }
            break;
        }
    }
}

//产品模块下按钮加样式
function replaceBtn(appDiv) {
    var btns = $("#" + appDiv).children();
    var outerDiv = $("<DIV class=l-dialog-buttons-marginzero></DIV>");
    var innerDiv = $("<DIV class=l-dialog-buttons-inner></DIV>");
    for (var i = btns.length; i > 0; i--) {
        var btnDiv = $("<DIV><DIV class=l-dialog-btn-l></DIV><DIV class=l-dialog-btn-r></DIV><DIV ></DIV><DIV class=l-dialog-btn-inner></DIV></DIV>");
        var btnIcon = $(".l-dialog-btn-r+div", btnDiv);
        btnIcon.addClass($(btns[i - 1]).attr("rclass"));

        var btnVal = $(".l-dialog-btn-inner", btnDiv);
        btnVal.text($(btns[i - 1]).attr("text"));
        $(btns[i - 1]).css("width", $(btns[i - 1]).attr("rwidth"));
        innerDiv.append($(btns[i - 1]).append(btnDiv));
    }
    outerDiv.append(innerDiv);

    $("#" + appDiv).append(outerDiv);
}

//自定义

function defineAccordion(tid, cid) {
    $("#" + tid + " .l-accordion-toggle").hover(function () {
        if ($(this).hasClass("l-accordion-toggle-open"))
            $(this).addClass("l-accordion-toggle-open-over");
        else if ($(this).hasClass("l-accordion-toggle-close"))
            $(this).addClass("l-accordion-toggle-close-over");
    }, function () {
        if ($(this).hasClass("l-accordion-toggle-open"))
            $(this).removeClass("l-accordion-toggle-open-over");
        else if ($(this).hasClass("l-accordion-toggle-close"))
            $(this).removeClass("l-accordion-toggle-close-over");
    });

    $("#" + tid + " .l-accordion-toggle").click(function () {
        if ($(this).hasClass("l-accordion-toggle-open")) {
            $(this).removeClass("l-accordion-toggle-open").removeClass("l-accordion-toggle-open-over").addClass("l-accordion-toggle-close");
            $("#" + cid).hide();
        } else if ($(this).hasClass("l-accordion-toggle-close")) {
            $(this).removeClass("l-accordion-toggle-close").removeClass("l-accordion-toggle-close-over").addClass("l-accordion-toggle-open");
            $("#" + cid).show();
        }
    });

    $("#" + tid + " .l-accordion-header-inner").click(function () {
        if ($(this).prev().hasClass("l-accordion-toggle-open")) {
            $(this).prev().removeClass("l-accordion-toggle-open").addClass("l-accordion-toggle-close");
            $("#" + cid).hide();
        } else if ($(this).prev().hasClass("l-accordion-toggle-close")) {
            $(this).prev().removeClass("l-accordion-toggle-close").addClass("l-accordion-toggle-open");
            $("#" + cid).show();
        }
    });
    $("#" + cid).hide();
}

/**
 * @param path 路径
 * @param codeValue 输入的代码的值

 * @param code 输入值的id
 * @param tableSearch 输入值相对应的OID
 */
function getSdDescAndOidByCode(path, codeValue, code, tableSearch) {
    // 主页面左侧部分

    if (codeValue != "") {
        $.getJSON(path + "/soSearch!searchOidCdeDesc.do?seconds=" + new Date().getSeconds(), {
            'CODE': codeValue,
            'SEARCH': tableSearch
        }, function (msg) {
            //var value=jQuery.parseJSON(msg)._data;
            var value = msg._data;
            var array = new Array();
            array = value;
            //alert('value====='+value);
            $("#" + code + "_TEXT").text(array[0]);
            $("#" + tableSearch).val(array[1]);
        });
    } else {
        $("#" + code + "_TEXT").text("");
        $("#" + tableSearch).val("");
    }
    //$("#"+tableSearch).change();
}

/**处理联动的输入代码自动回显描述和OID
 * @param path 路径
 * @param codeValue 输入的代码的值

 * @param code 输入值的id
 * @param tableSearch 后台对应的表
 * @param codeOid 输入值相对应的OID
 */
function getSdDescAndOidByCodeRel(path, codeValue, codeRelValue, code, tableSearch, codeOid) {
    // 主页面左侧部分

    if (codeValue != "" && codeRelValue != "") {
        $.getJSON(path + "/soSearch!searchOidCdeDesc.do?seconds=" + new Date().getSeconds(),
            {'CODE': codeValue, 'CODEREL': codeRelValue, 'SEARCH': tableSearch}, function (msg) {
                var value = msg._data;
                var array = new Array();
                array = value;
                $("#" + code + "_TEXT").text(array[0]);
                $("#" + codeOid).val(array[1]);
            });
    } else {
        $("#" + code + "_TEXT").text("");
        $("#" + codeOid).val("");
        //$("#"+codeOid).change();
    }
}

//add by wangdan  日期校验
function TextDate(DateStr) {
    var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;
    if (sDate == '') return true;
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
    var s = sDate.replace(/[\d]{4,4}[\-/]{1}[\d]{1,2}[\-/]{1}[\d]{1,2}/g, '');
    if (s == '') {
        //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
        var t = new Date(sDate.replace(/\-/g, '/'));
        var ar = sDate.split(/[-/:]/);
        //Start SIR#271, amended by Nick, 20160302
        //if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate()){
        if (ar[0] != t.getFullYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
            //End SIR#271, amended by Nick, 20160302
            return false;
        }
    } else {
        return false;
    }
    return true;
}


/**
 * 产品下查询页面重置

 * guoxiang 2014
 */
function resetVal() {
//	$('select>option:first').attr('selected',true).attr("disabled",true).addClass("textBackground");  
    $('#CTP_DES_OPR').val("");
    $('input[type="text"]').val("");
    $('input[type="hidden"][id][name]').val("");
    $('span[id]').text("");
    $('input[type="radio"]').attr("checked", false);
}

//校验class="must"字段的值是否全部输入

function validationIsMust() {
    var flag = true;
    var inputArr = $("td>input[class*='l-text-must']");
    for (var i = 0; i < inputArr.length; i++) {
        var val = $(inputArr[i]).attr("value");
        val = $.trim(val);
        if (val == "" || val.length <= 0) {
            flag = false;
            var msg = $(inputArr[i]).parent().prev().text();
            $(inputArr[i]).focus();
            //$(inputArr[i]).attr('style','background-color: red');
            $(inputArr[i]).addClass("l-text-error");
            $.ligerDialog.warn(msg.toString().replace("*", "") + "不能为空!");
            break;
        } else
        //$(inputArr[i]).attr('style',"none");
            $(inputArr[i]).removeClass("l-text-error");
    }
    return flag;
}

//点击修改时给一些字段添加新的样式

function removeAddColor(field, type) {
    var arr = field.split(",");
    for (var i = 0; i < arr.length; i++) {
        $("#" + arr[i]).removeClass('textBackground');
        $("#" + arr[i]).css('background-color', '');
        //$("input[name="+arr[i]+"]").attr('disabled',false);//使得下拉框可以点
        if (type == "must") {
            //$("#"+arr[i]).attr('style','background-color: #FFFFC6');
            $("#" + arr[i]).addClass("l-text-must");
        } else if (type == "chooseable") {
            //$("#"+arr[i]).attr('style','background-color: #CAFFCA');
            $("#" + arr[i]).addClass("l-text-choosable");
        } else if (type == "") {
            //$("#"+arr[i]).css('background-color','');
            $("#" + arr[i]).addClass("l-text");
        }
    }
}

//验证日期格式yyyy/mm/dd
function validateTime(fieldId) {
    $("#" + fieldId).bind('click', function () {
        $("#" + fieldId).removeClass("validateMust");
    });
    var valTime = $("#" + fieldId).val();
    var reg = /^\d{4}\/((0{0,1}[1-9]{1})|(1[0-2]{1}))\/(0{0,1}[1-9]{1})|([1-2]{1}[0-9]{1}|(3[0-1]{1}))$/;
    if (notNull(valTime) == true && reg.test(valTime) == false) {
        $.ligerDialog.warn("请输入正确的日期格式");
        $("#" + fieldId).addClass("validateMust");
        return false;
    }
}

//加载产品下边input表单的样式

function bindProductForm(formId) {
    if (formId == null) return;
    $("input[type=text][ltype!='date'],input[type=password]", $("#" + formId)).each(function () {
        $(this).addClass("l-text");
        $(this).attr("lwidth") && $(this).css("width", $(this).attr("lwidth"));
        !$(this).attr("lwidth") && $(this).css("width", "130px");
    });
    //$("input[ltype=spinner]", $("#" + formId)).ligerSpinner2();
    $("input[ltype='date']", $("#" + formId)).ligerDateEditor({format: "yyyy/MM/dd"});
    $("select").each(function () {
        $(this).addClass("l-text");
        $(this).attr("style", "width:180px;height:20px;");
    });
}

//格式化为n位小数

function FormatNumber(value, nAfterDot)        //nAfterDot小数位数
{
    if (!notNull(value)) {
        return "";
    }
    var re2 = /,/g;
    value = value.replace(re2, "") + "";
    var tempval = -1;
    for (var i = 0; i < value.length; i++) {
        var c = value.substring(i, i + 1);
        if (c != 0) {
            tempval = i;
            break;
        }
    }
    if (value.length > 0 && tempval >= 0) {
        value = value.substring(tempval);
    } else {
        return "";
    }
    if (value.substring(0, 1) == ".") {
        value = "0" + value;
    }
    var srcStr;
    var resultStr, nTen;
    srcStr = "" + value + "";
    strLen = srcStr.length;
    dotPos = srcStr.indexOf(".", 0);
    if (isNumber2(srcStr)) {
        if (dotPos == -1) {
            resultStr = srcStr + ".";
            for (var i = 0; i < nAfterDot; i++) {
                resultStr = resultStr + "0";
            }
        } else {
            if ((strLen - dotPos - 1) > nAfterDot) {
                nAfter = dotPos + nAfterDot + 1;
                nTen = 1;
                for (var j = 0; j < nAfterDot; j++) {
                    nTen = nTen * 10;
                }
                alert(nTen);
                alert(parseFloat(srcStr));
                resultStr = Math.round(parseFloat(srcStr) * nTen) / nTen;
                alert(resultStr);
            }
            else {
                resultStr = srcStr;
                for (var i = 0; i < (nAfterDot - strLen + dotPos + 1); i++) {
                    resultStr = resultStr + "0";
                }
            }
        }

        return resultStr;
    } else {
        //$.ligerDialog.warn(srcStr+"值错误,只能输入正数!");
        return "";
    }
}

function delFlag(fieldValue) {
    var endChar = fieldValue.substring(fieldValue.length - 1, fieldValue.length);
    if (endChar == "m") {
        fieldValue = fieldValue.replace("m", "");
    }
    if (endChar == "M") {
        fieldValue = fieldValue.replace("M", "");
    }
    if (endChar == "b") {
        fieldValue = fieldValue.replace("b", "");
    }
    if (endChar == "B") {
        fieldValue = fieldValue.replace("B", "");
    }
    return fieldValue;
}

function delChar(fieldValue) {
    if (fieldValue.indexOf(",") > 0) {

        var newVal = "";
        for (var i = 0; i < fieldValue.length; i++) {
            var repVal = fieldValue.substring(i, i + 1);
            if (repVal != ",") {
                newVal += repVal;
            }
        }
        return newVal;
    }
    return fieldValue;
}

function validateTrdDte() {
    var TRD_DTE = $("#TRD_DTE").val();
    var INP_DTE = $("#INP_DTE").val();

    if (TextDate(TRD_DTE) == false) {
        focusEvent("TRD_DTE", "请输入正确的日期格式");
        return;
    }
    if (notNull(TRD_DTE) && notNull(INP_DTE)) {
        //var date1=new Date();
        //date1.setFullYear(INP_DTE.substring(0,4));
        //date1.setMonth(INP_DTE.substring(5,7));
        //date1.setDate(INP_DTE.substring(8,10));
        //var date2=new Date();
        //date2.setFullYear(TRD_DTE.substring(0,4));
        //date2.setMonth(TRD_DTE.substring(5,7));
        //date2.setDate(TRD_DTE.substring(8,10));

        //if(date1.getTime()<date2.getTime()){
        if (INP_DTE < TRD_DTE) {
            focusEvent("TRD_DTE", "交易日必须小于或等于输入日");
            return;
        }
    }
    $("#TRD_DTE").removeClass("validateMust");
    return true;
}

function validateValDte() {
    var VAL_DTE = $("#VAL_DTE").val();
    var TRD_DTE = $("#TRD_DTE").val();
    if (TextDate(VAL_DTE) == false) {
        focusEvent("VAL_DTE", "请输入正确的日期格式");
        return;
    }

    if (notNull(VAL_DTE) && notNull(TRD_DTE)) {
        //var date1=new Date();
        //date1.setFullYear(TRD_DTE.substring(0,4));
        //date1.setMonth(TRD_DTE.substring(5,7));
        //date1.setDate(TRD_DTE.substring(8,10));
        //var date2=new Date();
        //date2.setFullYear(VAL_DTE.substring(0,4));
        //date2.setMonth(VAL_DTE.substring(5,7));
        //date2.setDate(VAL_DTE.substring(8,10));

        //if(date2.getTime()<date1.getTime()){
        if (VAL_DTE < TRD_DTE) {
            focusEvent("VAL_DTE", "交割日必须大于或等于交易日");
            return;
        }
    }
    $("#VAL_DTE").removeClass("validateMust");
    return true;
}

function validateStrDte() {
    var VAL_DTE = $("#VAL_DTE").val();
    var TRD_DTE = $("#TRD_DTE").val();
    if (TextDate(VAL_DTE) == false) {
        focusEvent("VAL_DTE", "请输入正确的日期格式");
        return;
    }

    if (notNull(VAL_DTE) && notNull(TRD_DTE)) {
        //var date1=new Date();
        //date1.setFullYear(TRD_DTE.substring(0,4));
        //date1.setMonth(TRD_DTE.substring(5,7));
        //date1.setDate(TRD_DTE.substring(8,10));
        //var date2=new Date();
        //date2.setFullYear(VAL_DTE.substring(0,4));
        //date2.setMonth(VAL_DTE.substring(5,7));
        //date2.setDate(VAL_DTE.substring(8,10));

        //if(date2.getTime()<date1.getTime()){
        if (VAL_DTE < TRD_DTE) {
            focusEvent("VAL_DTE", "起息日必须大于或等于交易日");
            return;
        }
    }
    $("#VAL_DTE").removeClass("validateMust");
    return true;
}

function validateMatDte() {
    var VAL_DTE = $("#VAL_DTE").val();
    if (!notNull(VAL_DTE)) {
        var VAL_DTE = $("#VAL_DTE").val();
    }
    var MAT_DTE = $("#MAT_DTE").val();
    if (TextDate(MAT_DTE) == false) {
        focusEvent("MAT_DTE", "请输入正确的日期格式");
        return;
    }

    if (notNull(VAL_DTE) && notNull(MAT_DTE)) {
        //var date1=new Date();
        //date1.setFullYear(MAT_DTE.substring(0,4));
        //date1.setMonth(MAT_DTE.substring(5,7));
        //date1.setDate(MAT_DTE.substring(8,10));
        //var date2=new Date();
        //date2.setFullYear(VAL_DTE.substring(0,4));
        //date2.setMonth(VAL_DTE.substring(5,7));
        //date2.setDate(VAL_DTE.substring(8,10));

        if (MAT_DTE < VAL_DTE) {
            focusEvent("MAT_DTE", "到期日必须大于或等于交割日");
            return;
        }
    }
    $("#MAT_DTE").removeClass("validateMust");
    return true;
}

function validateMatStrDte() {
    var VAL_DTE = $("#VAL_DTE").val();
    if (!notNull(VAL_DTE)) {
        var VAL_DTE = $("#VAL_DTE").val();
    }
    var MAT_DTE = $("#MAT_DTE").val();
    if (TextDate(MAT_DTE) == false) {
        focusEvent("MAT_DTE", "请输入正确的日期格式");
        return;
    }

    if (notNull(VAL_DTE) && notNull(MAT_DTE)) {
        //var date1=new Date();
        //date1.setFullYear(MAT_DTE.substring(0,4));
        //date1.setMonth(MAT_DTE.substring(5,7));
        //date1.setDate(MAT_DTE.substring(8,10));
        //var date2=new Date();
        //date2.setFullYear(VAL_DTE.substring(0,4));
        //date2.setMonth(VAL_DTE.substring(5,7));
        //date2.setDate(VAL_DTE.substring(8,10));

        //if(date1.getTime()<date2.getTime()){
        if (MAT_DTE < VAL_DTE) {
            focusEvent("MAT_DTE", "到期日必须大于或等于起息日");
            return;
        }
    }
    $("#MAT_DTE").removeClass("validateMust");
    return true;
}

function validateEarlyDate() {
    var VAL_DTE = $("#VAL_DTE").val();
    if (!notNull(VAL_DTE)) {
        var VAL_DTE = $("#VAL_DTE").val();
    }
    var MAT_DTE = $("#MAT_DTE").val();
    var ERL_RED_DTE = $("#ERL_RED_DTE").val();
    if (TextDate(ERL_RED_DTE) == false) {
        focusEvent("ERL_RED_DTE", "请输入正确的日期格式");
        return;
    }

    if (notNull(ERL_RED_DTE)) {
        //var date1=new Date();
        //date1.setFullYear(MAT_DTE.substring(0,4));
        //date1.setMonth(MAT_DTE.substring(5,7));
        //date1.setDate(MAT_DTE.substring(8,10));
        //var date2=new Date();
        //date2.setFullYear(VAL_DTE.substring(0,4));
        //date2.setMonth(VAL_DTE.substring(5,7));
        //date2.setDate(VAL_DTE.substring(8,10));
        //var date3=new Date();
        //date3.setFullYear(ERL_RED_DTE.substring(0,4));
        //date3.setMonth(ERL_RED_DTE.substring(5,7));
        //date3.setDate(ERL_RED_DTE.substring(8,10));

        //if(date3.getTime()<date2.getTime()){
        /*if(ERL_RED_DTE<VAL_DTE){
	    	focusEvent("ERL_RED_DTE","提前偿还日期必须大于或等于交割日");
			return ;
		}
		//if(date3.getTime()>date1.getTime()){
    	if(ERL_RED_DTE>MAT_DTE){	
	    	focusEvent("ERL_RED_DTE","提前偿还日期必须小于或等于到期日");
			return ;
		}*/
        //Start SIR#533,Modified by miaomeng on 2016-05-03
        var CURR_DTE = $("#CURR_DTE").val();
        if (CURR_DTE > VAL_DTE && CURR_DTE < MAT_DTE) {
            //Start SIR#722,Modified by wangrongling 2016-07-26
            /*if(ERL_RED_DTE <= CURR_DTE){
    			focusEvent("ERL_RED_DTE","提前偿还日期必须大于当前系统日期");
    			return ;
    		}*/
            if (ERL_RED_DTE < CURR_DTE) {
                focusEvent("ERL_RED_DTE", "提前偿还日期必须大于等于当前系统日期");
                return;
            }
            //End SIR#722,Modified by wangrongling 2016-07-26
            if (ERL_RED_DTE >= MAT_DTE) {
                focusEvent("ERL_RED_DTE", "提前偿还日期必须小于到期日");
                return;
            }

        } else if (CURR_DTE <= VAL_DTE) {
            if (ERL_RED_DTE <= VAL_DTE) {
                focusEvent("ERL_RED_DTE", "提前偿还日期必须大于交割日");
                return;
            }
            if (ERL_RED_DTE >= MAT_DTE) {
                focusEvent("ERL_RED_DTE", "提前偿还日期必须小于到期日");
                return;
            }
        }
        //End SIR#533,Modified by miaomeng on 2016-05-03
        /*//Start SIR#533,Added by miaomeng on 2016-04-12
    	if(ERL_RED_DTE <= VAL_DTE){
	    	focusEvent("ERL_RED_DTE","提前偿还日期必须大于交割日");
			return ;
		}
    	if(ERL_RED_DTE >= MAT_DTE){	
	    	focusEvent("ERL_RED_DTE","提前偿还日期必须小于到期日");
			return ;
		}
    	//End SIR#533,Added by miaomeng on 2016-04-12*/
    }
    $("#ERL_RED_DTE").removeClass("validateMust");
    return true;
}

function validateDate(fieldId) {
    var dteVal = $("#" + fieldId).val();
    if (TextDate(dteVal) == false) {
        focusEvent(fieldId, "请输入正确的日期格式");
        return;
    }
    $("#" + fieldId).removeClass("validateMust");
    return true;
}

function validateNum(fieldId, intTag, decTag) {
    var fieldValue = $("#" + fieldId).val();
    if (!notNull(fieldValue)) {
        return;
    }
    var indexTag = fieldValue.indexOf(".", 0);
    var maxLength = intTag + decTag + 1;
    if (fieldValue.indexOf(".") > 0) {
        if (fieldValue.substring(fieldValue.length - 1, fieldValue.length) == ".") {
            focusEvent(fieldId, "格式非法");
            return;
        } else {
            if (fieldValue.length > maxLength) {
                focusEvent(fieldId, "长度不能超过" + maxLength + "位");
                return;
            }
            if (indexTag > 0 && fieldValue.substring(0, indexTag).length > intTag) {
                focusEvent(fieldId, "整数长度不能超过" + intTag + "位");
                return;
            }
            //Start SIR#1621 modified by tofu 2017-10-19
            /**
             if(indexTag>0 && fieldValue.substring(0,indexTag).match("^[0-9]*[0-9][0-9]*$")==null){
				focusEvent(fieldId,"格式非法");
		    	return ;
			}
             ***/
            if (indexTag > 0 && fieldValue.substring(0, indexTag).length == 1 && fieldValue.substring(0, indexTag).match("^[0-9]*[0-9][0-9]*$") == null) {
                focusEvent(fieldId, "格式非法");
                return;
            }

            if (indexTag > 0 && fieldValue.substring(0, indexTag).length > 1 && fieldValue.substring(0, indexTag).match("^[1-9]*[1-9][0-9]*$") == null) {
                focusEvent(fieldId, "格式非法");
                return;
            }
            //End SIR#1621 modified by tofu 2017-10-19
            if (indexTag > 0 && fieldValue.substring(indexTag + 1, fieldValue.length).match("^[0-9]*[1-9][0-9]*$") == null) {
                //start SIR#547,modified by liuyan,2016/08/29 
                //	focusEvent(fieldId,"格式非法");
                if (fieldValue.substring(indexTag + 1, fieldValue.length) != 0) {
                    focusEvent(fieldId, "格式非法");
                }
                //end SIR#547,modified by liuyan,2016/08/29 
                return;
            }
            if (indexTag > 0 && fieldValue.substring(indexTag + 1, fieldValue.length).length > decTag) {
                if (fieldId == 'GR_SESSION_TIME_OUT' && decTag == 0) {
                    focusEvent(fieldId, "不能输入小数");
                    return;
                }
                focusEvent(fieldId, "小数长度不能超过" + decTag + "位");
                return;
            }
        }
    } else {
        if (fieldValue.length > intTag) {
            focusEvent(fieldId, "整数长度不能超过" + intTag + "位");
            return;
        }
//Added  by  ningchen  2015-05-15    拆借交易利率的值可以输0  start
        if (fieldValue.length == 1 && fieldValue.match("^[0-9]*$") == null) {
            focusEvent(fieldId, "格式非法");
            return;
        }
        if (fieldValue.length > 1 && fieldValue.match("^[1-9]*[1-9][0-9]*$") == null) {
            focusEvent(fieldId, "格式非法");
            return;
        }
//Added  by  ningchen  2015-05-15    拆借交易利率的值可以输0  end
    }
    $("#" + fieldId).removeClass("validateMust");
    return true;
}

function focusEvent(fieldId, msg) {
    $("#" + fieldId).addClass("validateMust");
    $.ligerDialog.warn((msg), function () {
        //$("#"+fieldId).addClass("validateMust");
        //$('.l-dialog-btn').click(function(){
        $("#" + fieldId).val("");
        $("#" + fieldId).removeClass("validateMust");
        $("#" + fieldId).focus();
        //});
        //$('.l-dialog-close').click(function(){
        //	$("#"+fieldId).val("");
        //	$("#"+fieldId).removeClass("validateMust");
        //	$("#"+fieldId).focus();
        //});
    });
}

//文本框输入数字时校验使得只能输入正数且小数位只能为2位

//intLength为要保留的整数位,保留两位小数,oInput为文本框对象
function CheckInputFloat2(oInput, intLength) {
    if ('' != oInput.value.replace(/\d{1,15}\.{0,1}\d{0,2}/, '')) {//不匹配     
        if ('' == oInput.value.replace(/\d{1,15}\.{0,1}\d{0,10}/, '')) {//小数位过多

            var dicLoc = oInput.value.indexOf('.');
            oInput.value = oInput.value.substr(0, dicLoc) + '.' + oInput.value.substring(dicLoc + 1, dicLoc + 3);//保留两位小数   
        } else
            oInput.value = '';
    } else {//匹配   
        if (oInput.value.indexOf('.') == -1 && oInput.value.length > intLength) {//无小数点且整数位长度大于intLength    
            oInput.value = oInput.value.substr(0, intLength) + '.' + oInput.value.substr(intLength);
        }
    }
    $(oInput).change();
}

//文本框输入数字时校验使得只能输入正数且小数位保留6位

//intLength为要保留的整数位,保留两位小数,oInput为文本框对象
function CheckInputFloat6(oInput, intLength) {
    if ('' != oInput.value.replace(/\d{1,15}\.{0,1}\d{0,6}/, '')) {//不匹配     
        if ('' == oInput.value.replace(/\d{1,15}\.{0,1}\d{0,15}/, '')) {//小数位过多

            var dicLoc = oInput.value.indexOf('.');
            oInput.value = oInput.value.substr(0, dicLoc) + '.' + oInput.value.substring(dicLoc + 1, dicLoc + 7);//保留六位小数   
        } else
            oInput.value = '';
    } else {//匹配   
        if (oInput.value.indexOf('.') == -1 && oInput.value.length > intLength) {//无小数点且整数位长度大于intLength    
            oInput.value = oInput.value.substr(0, intLength) + '.' + oInput.value.substr(intLength);
        }
    }
    $(oInput).change();
}

//文本框输入数字时校验使得只能输入正数且小数位保留8位

//intLength为要保留的整数位,保留两位小数,oInput为文本框对象
function CheckInputFloat8(oInput, intLength) {
    if ('' != oInput.value.replace(/\d{1,15}\.{0,1}\d{0,8}/, '')) {//不匹配     
        if ('' == oInput.value.replace(/\d{1,15}\.{0,1}\d{0,15}/, '')) {//小数位过多

            var dicLoc = oInput.value.indexOf('.');
            oInput.value = oInput.value.substr(0, dicLoc) + '.' + oInput.value.substring(dicLoc + 1, dicLoc + 9);//保留八位小数   
        } else
            oInput.value = '';
    } else {//匹配   
        if (oInput.value.indexOf('.') == -1 && oInput.value.length > intLength) {//无小数点且整数位长度大于intLength  
            oInput.value = oInput.value.substr(0, intLength) + '.' + oInput.value.substr(intLength);
        }
    }
    $(oInput).change();
}

function compareToDateStr(date1, date2) {
    var year1 = date1.substring(0, 4);
    var month1 = date1.substring(5, 7);
    var day1 = date1.substring(8, 10);

    var year2 = date2.substring(0, 4);
    var month2 = date2.substring(5, 7);
    var day2 = date2.substring(8, 10);
    if (year1 == year2 && month1 == month2 && day1 == day2) {
        return true;
    } else {
        return false;
    }
}

//弹出错误框

function focusFieldEvent(fieldId, msg) {
    $.ligerDialog.warn(msg, function () {
        $("#" + fieldId).val("");
        $("#" + fieldId).addClass("l-text-error");
        $("#" + fieldId).focus();
    });
}

var waitingLoadingDialog;

function openWaitingLoadingDialog() {
    waitingLoadingDialog = $.ligerDialog.waitting("正在处理,请稍后...");
}

function closeWaitingLoadingDialog() {
    if (waitingLoadingDialog) {
        waitingLoadingDialog.close();
    }
}

//获取用户点击的某个菜单的权限
function getMenuFuncId() {
    var funcId = $(".l-selected", $(">ul", parent.$(".l-tab-links"))).attr("tabid");
    var loginUserId = parent.userId;
    var url = parent.path + "/grFuncAssion!getFuncAssginByUserAndFuncId.do";
    var returnAssign = "";
    $.ajaxSetup({async: false});
    get(url, {"FUNC_ID": funcId, "LOGIN_USER_ID": loginUserId}, function (funcMsg) {
        if (notNull(funcMsg)) {
            //alert(JSON2.stringify(funcMsg));
            returnAssign = funcMsg.ALL_ASSIGN;
        }
    });
    return returnAssign;
}

//得到当前登陆用户的权限组类型
function getUserRGTypes() {

}

function getAllso() {
    var allso = parent.parent.parent.allso;
    if (allso == null || allso == undefined) {
        allso = parent.parent.allso;
    }
    if (allso == null || allso == undefined) {
        allso = parent.allso;
    }
    return allso;
}

function releaseCiDeal(tabidx) {
    document.getElementById("tabIfrm_" + tabidx).contentWindow.exit();
}

//Start SIR#731,added by miaoyucong 2016-08-10
function convertCurrencytoCH(currencyDigits) {
    // Constants:  
    //alert(currencyDigits);
    var MAXIMUM_NUMBER = 999999999999.99;
    // Predefine the radix characters and currency symbols for output:  
    var CN_ZERO = "零";
    var CN_ONE = "壹";
    var CN_TWO = "贰";
    var CN_THREE = "叁";
    var CN_FOUR = "肆";
    var CN_FIVE = "伍";
    var CN_SIX = "陆";
    var CN_SEVEN = "柒";
    var CN_EIGHT = "捌";
    var CN_NINE = "玖";
    var CN_TEN = "拾";
    var CN_HUNDRED = "佰";
    var CN_THOUSAND = "仟";
    var CN_TEN_THOUSAND = "万";
    var CN_HUNDRED_MILLION = "亿";
    var CN_SYMBOL = "人民币";
    var CN_DOLLAR = "元";
    var CN_TEN_CENT = "角";
    var CN_CENT = "分";
    var CN_INTEGER = "整";
    // Variables:  
    var integral; // Represent integral part of digit number.  
    var decimal; // Represent decimal part of digit number.  
    var outputCharacters; // The output result.  
    var parts;
    var digits, radices, bigRadices, decimals;
    var zeroCount;
    var i, p, d;
    var quotient, modulus;
    // Process the coversion from currency digits to characters:  
    // Separate integral and decimal parts before processing coversion:  
    parts = currencyDigits.split(".");

    // alert(parts+"  "+parts.length+" "+parts[0]+" "+parts[1]);
    if (parts.length > 1) {
        integral = parts[0];  //整数部分
        decimal = parts[1];  //小数部分
        // Cut down redundant decimal digits that are after the second.  
        decimal = decimal.substr(0, 2); //小数部分只截取后两位 
        if (parts[1] == "00") {
            decimal = "";  //当整数部分为00小数部分也为0
        }
    } else {
        integral = parts[0];   //否则整数部分 为integral
        decimal = "";
    }

    // Prepare the characters corresponding to the digits:  
    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);  // 空，十，百，千

    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);  // 空，万，亿

    decimals = new Array(CN_TEN_CENT, CN_CENT);  //角，分

    // Start processing:  
    outputCharacters = "";
    // Process integral part if it is larger than 0:  
    if (Number(integral) > 0) {
        zeroCount = 0;

        for (i = 0; i < integral.length; i++) {
            p = integral.length - i - 1;
            d = integral.substr(i, 1);
            quotient = p / 4;
            modulus = p % 4;
            if (d == "0") {
                zeroCount++;
            }
            else {
                if (zeroCount > 0) {
                    outputCharacters += digits[0];
                }
                zeroCount = 0;
                outputCharacters += digits[Number(d)] + radices[modulus];
            }
            if (modulus == 0 && zeroCount < 4) {
                outputCharacters += bigRadices[quotient];
            }
        }
        outputCharacters += CN_DOLLAR;
    }
    // Process decimal part if there is:  
    if (decimal != "") {
        for (i = 0; i < decimal.length; i++) {
            d = decimal.substr(i, 1);
            if (d != "0") {
                outputCharacters += digits[Number(d)] + decimals[i];
            }
        }
    }
    // Confirm and return the final output string:  
    if (outputCharacters == "") {
        outputCharacters = CN_ZERO + CN_DOLLAR;
    }
    if (decimal == "") {
        outputCharacters += CN_INTEGER;
    }
    //Start SIR#731,Added by miaoyucong 2016-11-01
    //判断一下是否出现undefined  如果有 表示 超过了的
    if (currencyDigits > MAXIMUM_NUMBER) {
        // alert("123");
        //判断是否包含 亿/undefined
        var reg = new RegExp("undefined", "g");
        //outputCharacters=outputCharacters.replace(reg,CN_TEN_THOUSAND);
        var f = new RegExp(CN_HUNDRED_MILLION).test(outputCharacters);
        if (f) {
            outputCharacters = outputCharacters.replace(reg, CN_TEN_THOUSAND);
        } else {
            outputCharacters = outputCharacters.replace(reg, CN_TEN_THOUSAND + CN_HUNDRED_MILLION);
        }

    }
    //outputCharacters = CN_SYMBOL + outputCharacters;  
    //End SIR#731,Added by miaoyucong 2016-11-01 
    return outputCharacters;
}

//End SIR#731,added by miaoyucong 2016-08-10
//Start SIR#968,added by miaoyucong 2016-12-19
//新增加的这个方法用来验证字段必须是数字，并且是定值

function validateTagNum(fieldId, intTag, decTag) {
    var fieldValue = $("#" + fieldId).val();
    if (!notNull(fieldValue)) {
        return;
    }

    if (fieldValue.substring(0).match("^[0-9]*[0-9][0-9]*$") == null) {
        focusEvent(fieldId, "格式非法");
        return;
    } else {
        if (fieldValue.length < intTag) {
            focusEvent(fieldId, "长度必须是" + intTag + "位");
            return;
        }
    }
    $("#" + fieldId).removeClass("validateMust");
    return true;
}

//End SIR#968,added by miaoyucong 2016-12-19
//Start Added by tofu 2017/07/20
function showloadDialog() {
    waittingDialog = $.ligerDialog.waitting("正在处理,请稍后...");
}

function hideloadDialog() {
    if (waittingDialog) {
        waittingDialog.close();
    }
}

//End Added by tofu 2017/07/20
//Start Added by tofu 2017/08/14
function simpleValidatePm(formId) {
    var inputArr = $("#" + formId + " [mtype='must']");
    for (var i = 0; i < inputArr.length; i++) {
        var val = $(inputArr[i]).attr("value");
        var id = $(inputArr[i]).attr("id");
        val = $.trim(val);
        if (val == "" || val.length == 0) {
            //var msg=$(inputArr[i]).parent().prev().attr("title");
            var msg = $("#" + id).parent().prev().attr("title");
            if (msg == undefined) {
                msg = $("#" + id).parent().parent().parent().prev().attr("title");
            }
            if (msg == undefined) {
                msg = $("#" + id).parent().prev().text();
            }

            //Start SIR#1505 modified by tofu 2017/11/22
            //$("#"+id).attr("style","background-color:red");
            if (inputArr[i].tagName.toLocaleLowerCase() == 'input') {
                $("#" + id).attr("style", "background-color:red");
            } else {
                $("#" + id).addClass("validateMust");
            }
            //End SIR#1505 modified by tofu 2017/11/22
            $.ligerDialog.warn(msg + "不能为空");
            return;
        }
    }
    return true;
}

//End Added by tofu 2017/08/14
//阻止事件传播到keypress
function prevent(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

function digitInput(el, e) {
    var ee = e || window.event; // FF、Chrome IE下获取事件对象  
    var c = e.charCode || e.keyCode; //FF、Chrome IE下获取键盘码  
    var val = el.val();
    if (c == 110 || c == 190) { // 110 (190) - 小(主)键盘上的点  
        (val.indexOf(".") >= 0 || !val.length) && prevent(e); // 已有小数点或者文本框为空，不允许输入点  
    } else {
        if ((c != 8 && c != 46 && // 8 - Backspace, 46 - Delete  
            (c < 37 || c > 40) && // 37 (38) (39) (40) - Left (Up) (Right) (Down) Arrow  
            (c < 48 || c > 57) && // 48~57 - 主键盘上的0~9  
            (c < 96 || c > 105)) // 96~105 - 小键盘的0~9  
            || e.shiftKey) { // Shift键，对应的code为16  
            prevent(e); // 阻止事件传播到keypress  
        }
    }
}

function initLigerComboBoxValueByFrmId(formId) {
    $("input[ltype=select2]", $("#" + formId)).each(function () {
        var id = $(this).attr('id');
        //alert(id);
        //console.log( id+":"+ $("#"+id+"_VAL").val());
        $(this).ligerGetComboBoxManager().setValue($("#" + id + "_VAL").val());
    });
}

function initLigerComboBoxValue() {
    $("input[ltype=select2]").each(function () {
        var id = $(this).attr('id');
        //alert(id);
        //console.log( id+":"+ $("#"+id+"_VAL").val());
        $(this).ligerGetComboBoxManager().setValue($("#" + id + "_VAL").val());
    });
}

var nowBtn;

function genButtons(buttonsId, buttons) {
    //buttons need array format
    //var buttons=[];
    /*buttons.push({text: '<s:text name="CAP_BTNBITRETURN"/>',icon:'back',
		 onclick: cancelMainform
    });*/
    //var nowBtn; //放在全局变量中，使用setTimeout时才会生效

    var innerDiv = $("<DIV class=l-dialog-buttons-inner></DIV>");
    $(buttons).each(function (i, item) {
        var btn = $('<div class="l-dialog-btn"><div class="l-dialog-btn-l"></div><div class="l-dialog-btn-r"></div><div class="l-icon"></div><div class="l-dialog-btn-inner"></div></div>');
        $(".l-icon", btn).addClass("l-icon-" + item.icon);
        $(".l-dialog-btn-inner", btn).html(item.text);
        //$(".l-dialog-buttons-inner", $("#buttons")).prepend(btn);
        //$(".l-dialog-buttons-inner", $("#buttons")).append(btn);
        innerDiv.append(btn);
        item.width && btn.width(item.width);
        item.onclick && btn.click(function () {
            item.onclick(item, $(this), i);
            nowBtn = btn;
            nowBtn.attr("disabled", "disabled");
            //timeout  not  use
            setTimeout("nowBtn.attr('disabled','')", 500);
        });
    });
    $("#" + buttonsId).append(innerDiv);
}

//Start SIR#1455 added by tofu 2017-09-25
function validateMoney(fieldId, intTag, decTag, neg) {
    /* 	    $("#"+fieldId).bind('click',function(){
		        var fieldVal=delChar(delFlag($("#"+fieldId).val()));
		        $("#"+fieldId).val(fieldVal);
		    	$("#"+fieldId).removeClass("validateMust");
		    });   */
    var fieldValue = $("#" + fieldId).val();
    if (notNull(fieldValue) == false) {
        return false;
    }
    //Start SIR#XXX added by tofu 2017/12/13
    //允许输入负数
    if (neg) {
        if (fieldValue.indexOf("-", 0) == 0) fieldValue = fieldValue.substring(1, fieldValue.length);
    }
    //End SIR#XXX added by tofu 2017/12/13
    fieldValue = delChar(delFlag(fieldValue));
    var indexTag = fieldValue.indexOf(".", 0);
    var maxLength = intTag + decTag + 1;
    if (fieldValue.indexOf(".") > 0) {
        if (fieldValue.substring(fieldValue.length - 1, fieldValue.length) == ".") {
            //Start SIR#547,Modified by liuyan,2016/09/19
            //$.ligerDialog.warn("格式非法");
            $.ligerDialog.warn("格式非法", function () {
                $("#" + fieldId).val("");
                $("#" + fieldId).removeClass("validateMust");
                $("#" + fieldId).focus();
            });
            $("#" + fieldId).addClass("validateMust");


            /*$('.l-dialog-btn').click(function(){
						$("#"+fieldId).val("");
						$("#"+fieldId).removeClass("validateMust")
						$("#"+fieldId).focus();
					});*/
            //End SIR#547,Modified by liuyan,2016/09/19  
            $('.l-dialog-close').click(function () {
                $("#" + fieldId).val("");
                $("#" + fieldId).removeClass("validateMust");
                $("#" + fieldId).focus();
            });
            return false;
        } else {
            if (fieldValue.length > maxLength) {
                //Start SIR#547,Modified by liuyan,2016/09/19
                //$.ligerDialog.warn("长度不能超过"+maxLength+"位");
                $.ligerDialog.warn("长度不能超过" + maxLength + "位", function () {
                    $("#" + fieldId).val("");
                    $("#" + fieldId).removeClass("validateMust");
                    $("#" + fieldId).focus();
                });
                $("#" + fieldId).addClass("validateMust");

                /* $('.l-dialog-btn').click(function(){
							$("#"+fieldId).val("");
							$("#"+fieldId).removeClass("validateMust")
							$("#"+fieldId).focus();
						}); */
                //End SIR#547,Modified by liuyan,2016/09/19  
                $('.l-dialog-close').click(function () {
                    $("#" + fieldId).val("");
                    $("#" + fieldId).removeClass("validateMust");
                    $("#" + fieldId).focus();
                });
                return false;
            }
            if (indexTag > 0 && fieldValue.substring(0, indexTag).length > intTag) {
                //Start SIR#547,Modified by liuyan,2016/09/19
                //$.ligerDialog.warn("整数长度不能超过"+intTag+"位");
                $.ligerDialog.warn("整数长度不能超过" + intTag + "位", function () {
                    $("#" + fieldId).val("");
                    $("#" + fieldId).removeClass("validateMust");
                    $("#" + fieldId).focus();
                });
                $("#" + fieldId).addClass("validateMust");

                /* $('.l-dialog-btn').click(function(){
							$("#"+fieldId).val("");
							$("#"+fieldId).removeClass("validateMust")
							$("#"+fieldId).focus();
						}); */
                //End SIR#547,Modified by liuyan,2016/09/19 
                $('.l-dialog-close').click(function () {
                    $("#" + fieldId).val("");
                    $("#" + fieldId).removeClass("validateMust");
                    $("#" + fieldId).focus();
                });
                return false;
            }
            //Start SIR#1621 modified by tofu 2017-10-19
            /***
             if(indexTag>0 && fieldValue.substring(0,indexTag).match("^[0-9]*$")==null){
					//Start SIR#547,Modified by liuyan,2016/09/19
					//$.ligerDialog.warn("格式非法");
						$.ligerDialog.warn("格式非法",function(){
						$("#"+fieldId).val("");
						$("#"+fieldId).removeClass("validateMust");
						$("#"+fieldId).focus();
					});
						$("#"+fieldId).addClass("validateMust");


						//End SIR#547,Modified by liuyan,2016/09/19 
		    			$('.l-dialog-close').click(function(){
		    				$("#"+fieldId).val("");
		    				$("#"+fieldId).removeClass("validateMust");
		    				$("#"+fieldId).focus();
		    			});
				    	return false;
					}
             **/
            if (indexTag > 0 && fieldValue.substring(0, indexTag).length == 1 && fieldValue.substring(0, indexTag).match("^[0-9]*$") == null) {
                focusEvent(fieldId, "格式非法");
                return;
            }

            if (indexTag > 0 && fieldValue.substring(0, indexTag).length > 1 && fieldValue.substring(0, indexTag).match("^[1-9]*[1-9][0-9]*$") == null) {
                focusEvent(fieldId, "格式非法");
                return;
            }
            //End SIR#1621 modified by tofu 2017-10-19
            if (indexTag > 0 && fieldValue.substring(indexTag + 1, fieldValue.length).match("^[0-9]*[0-9][0-9]*$") == null) {
                //Start SIR#547,Modified by liuyan,2016/09/19
                //$.ligerDialog.warn("格式非法");
                $.ligerDialog.warn("格式非法", function () {
                    $("#" + fieldId).val("");
                    $("#" + fieldId).removeClass("validateMust");
                    $("#" + fieldId).focus();
                });
                $("#" + fieldId).addClass("validateMust");
                /* $('.l-dialog-btn').click(function(){
							$("#"+fieldId).val("");
							$("#"+fieldId).removeClass("validateMust")
							$("#"+fieldId).focus();
						}); */
                //End SIR#547,Modified by liuyan,2016/09/19 
                $('.l-dialog-close').click(function () {
                    $("#" + fieldId).val("");
                    $("#" + fieldId).removeClass("validateMust");
                    $("#" + fieldId).focus();
                });
                return false;
            }
            if (indexTag > 0 && fieldValue.substring(indexTag + 1, fieldValue.length).length > decTag) {
                //Start SIR#547,Modified by liuyan,2016/09/19
                //$.ligerDialog.warn("小数长度不能超过"+decTag+"位");
                $.ligerDialog.warn("小数长度不能超过" + decTag + "位", function () {
                    $("#" + fieldId).val("");
                    $("#" + fieldId).removeClass("validateMust");
                    $("#" + fieldId).focus();
                });
                $("#" + fieldId).addClass("validateMust");

                /* $('.l-dialog-btn').click(function(){
							$("#"+fieldId).val("");
							$("#"+fieldId).removeClass("validateMust")
							$("#"+fieldId).focus();
						}); */
                //End SIR#547,Modified by liuyan,2016/09/19 
                $('.l-dialog-close').click(function () {
                    $("#" + fieldId).val("");
                    $("#" + fieldId).removeClass("validateMust");
                    $("#" + fieldId).focus();
                });
                return false;
            }
        }
    } else {
        if (fieldValue.length > intTag) {
            //Start SIR#547,Modified by liuyan,2016/09/19
            //$.ligerDialog.warn("整数长度不能超过"+intTag+"位");
            $.ligerDialog.warn("整数长度不能超过" + intTag + "位", function () {
                $("#" + fieldId).val("");
                $("#" + fieldId).removeClass("validateMust");
                $("#" + fieldId).focus();
            });
            $("#" + fieldId).addClass("validateMust");

            /* $('.l-dialog-btn').click(function(){
						$("#"+fieldId).val("");
						$("#"+fieldId).removeClass("validateMust")
						$("#"+fieldId).focus();
					}); */
            //End SIR#547,Modified by liuyan,2016/09/19 
            $('.l-dialog-close').click(function () {
                $("#" + fieldId).val("");
                $("#" + fieldId).removeClass("validateMust");
                $("#" + fieldId).focus();
            });
            return false;
        }
        //Start SIR#1621 added by tofu 2017-10-19
        if (fieldValue.length == 1 && fieldValue.match("^[0-9]*$") == null) {
            focusEvent(fieldId, "格式非法");
            return;
        }
        //End SIR#1621 added by tofu 2017-10-19
        //Start SIR#1621 modified by tofu 2017-10-19
        //if(fieldValue.match("^[1-9]*[1-9][0-9]*$")==null){
        if (fieldValue.length > 1 && fieldValue.match("^[1-9]*[1-9][0-9]*$") == null) {
            //End SIR#1621 modified by tofu 2017-10-19

            //Start SIR#547,Modified by liuyan,2016/09/19
            //$.ligerDialog.warn("格式非法");
            $.ligerDialog.warn("格式非法", function () {
                $("#" + fieldId).val("");
                $("#" + fieldId).removeClass("validateMust");
                $("#" + fieldId).focus();
            });
            $("#" + fieldId).addClass("validateMust");

            /* $('.l-dialog-btn').click(function(){
						$("#"+fieldId).val("");
						$("#"+fieldId).removeClass("validateMust")
						$("#"+fieldId).focus();
					}); */
            //End SIR#547,Modified by liuyan,2016/09/19 
            $('.l-dialog-close').click(function () {
                $("#" + fieldId).val("");
                $("#" + fieldId).removeClass("validateMust");
                $("#" + fieldId).focus();
            });
            return false;
        }
    }
    //fromatMoney(fieldId);
    $("#" + fieldId).val(MoneyToCurrency($("#" + fieldId).val()));
    $("#" + fieldId).removeClass("validateMust");
    return true;
}

function convertCurrency2(val) {
    val = val + "";
    var re2 = /,/g;
    val = val.replace(re2, "");
    return val;
}

//End SIR#1455 added by tofu 2017-09-25
//Start SIR#1646 added by tofu 2017-10-16
function URLencode(sStr) {
    return escape(sStr).replace(/\+/g, '+').replace(/\"/g, '"').replace(/\'/g, "'").replace(/\//g, '/');
}

//End SIR#1646 added by tofu 2017-10-16

//Added by Nick on 2017/10/10 start
function validFmtNumber(id, sign, intSize, decSize, decCompl, ccyFmt) {
    var val = $("#" + id).val();
    if (val === "") return;
    if (ccyFmt) val = val.replace(/,/g, '');
    if ($.trim(val) === "" || isNaN(val)) {
        focusEvent(id, "格式非法");
        return false;
    } else {
        if (sign == "-1") {
            if (Number(val) >= 0) {
                focusEvent(id, "必须小于零");
                return false;
            }
        } else if (sign == "-0") {
            if (Number(val) > 0) {
                focusEvent(id, "必须小于或等于零");
                return false;
            }
        } else if (sign == "+1") {
            if (Number(val) <= 0) {
                focusEvent(id, "必须大于零");
                return false;
            }
        } else if (sign == "+0") {
            if (Number(val) < 0) {
                focusEvent(id, "必须大于或等于零");
                return false;
            }
        }
        intSize = Number(intSize);
        decSize = Number(decSize);
        var intPart = "";
        var decPart = "";
        var negative = false;
        var pntIdx = val.indexOf(".");
        if (pntIdx < 0) {
            intPart = val;
        } else {
            if (decSize <= 0) {
                focusEvent(id, "必须是整数");
                return false;
            }
            intPart = val.substring(0, pntIdx);
            decPart = val.substring(pntIdx + 1, val.length);
        }
        while ((intPart.indexOf("+") == 0)
        || (intPart.indexOf("-") == 0) || (intPart.indexOf("0") == 0 && intPart.length > 1)) {
            if (intPart.indexOf("-") == 0)
                negative = true;
            intPart = intPart.substring(1, intPart.length);
        }
        if (intPart.length > intSize) {
            focusEvent(id, "整数长度不能超过" + intSize + "位");
            return false;
        }
        if (decPart.length > decSize) {
            focusEvent(id, "小数长度不能超过" + decSize + "位");
            return false;
        }
        val = (negative ? "-" : "") + intPart + (pntIdx > 0 ? "." : "") + decPart;
        if (decCompl) {
            if (decSize > 0 && pntIdx < 0) val += ".";
            for (var i = 0; i < decSize - decPart.length; i++) val += "0";
        }
        $("#" + id).val(val);
    }
    return true;
}

//Added by Nick on 2017/10/10 end
/**
 * 根据提供的数组初始化话下拉框
 * @param id 页面标签id
 * @param dataArr 初始化下拉框下拉元素的数组
 */
function setSelectData(id, dataArr) {
    var select = $("#" + id);
    for (var i = 0; i < dataArr.length; i++) {
        select.append("<option value='" + dataArr[i].value + "'>"
            + dataArr[i].text + "</option>");
    }
    select.selectpicker('val', '');
    select.selectpicker('refresh');
}

/**
 * 根据访问地址获取下拉元素，然后初始化下拉框
 * @param id 页面标签id
 * @param url 访问后台的地址
 */
function getSelectData(id, url) {
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        success: function (datas) {//返回list数据并循环获取  
            var select = $("#" + id);
            datas = datas._data;
            for (var i = 0; i < datas.length; i++) {
                select.append("<option value='" + datas[i].value + "'>"
                    + datas[i].text + "</option>");
            }
            select.selectpicker('val', '');
            select.selectpicker('refresh');
        }
    });
}

//付款类型
var payment_type = [{"text": "请选择", "value": "&nbsp;"}, {"text": "本息还款", "value": "1"}, {
    "text": "只还本金",
    "value": "2"
}, {"text": "只还利息", "value": "3"}, {"text": "提前全部还款", "value": "4"}, {"text": "提前部分还款", "value": "5"}, {
    "text": "逾期还款",
    "value": "6"
}];
//币种  
var curDataArr = [{"text": "请选择", "value": "&nbsp;"}, {"text": '人民币', 'value': 'CNY'}, {
    "text": '港币',
    'value': 'HKD'
}, {"text": '美元', 'value': 'USD'}];
//频率
var payment_freq = [{"text": "请选择", "value": "&nbsp;"}, {"text": 'Week', 'value': 'W'}, {
    "text": 'Month',
    'value': 'M'
}, {"text": 'Quarter', 'value': 'Q'}, {"text": 'Year', 'value': 'Y'}];