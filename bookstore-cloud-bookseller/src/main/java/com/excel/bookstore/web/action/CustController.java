// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : CustController.java
 * Description	:
 * Creation Date : 2018年5月3日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.web.action;

import com.excel.bookstore.common.annotation.Pagination;
import com.excel.bookstore.common.page.PageData;
import com.excel.bookstore.model.CustInfo;
import com.excel.bookstore.model.Customer;
import com.excel.bookstore.service.MyService;
import com.excel.bookstore.service.intf.ICustService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Lotuson
 */
@Controller
@RequestMapping("/cif")
public class CustController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    MyService myService;
    @Resource
    ICustService custService;

    @RequestMapping("/create")
    public String gotoPage(Model model) throws Exception {
        System.out.println("@@@@@$$$$$$");
        return "/cif/individualClientAdd";
    }

    @RequestMapping(value = "/view/{id}", method = RequestMethod.GET)
    public String showDetail(@PathVariable("id") Long custOid, Model model) throws Exception {
        System.out.println("custOid ==== " + custOid);
        CustInfo cs = custService.findCustByOid(custOid);
        model.addAttribute("cust", cs);
        return "/cif/individualClientDetail";
    }

    @RequestMapping("/listCif")
    public String listCif(Model model) throws Exception {
        List<Customer> custList = null;
        custList = myService.list();
        model.addAttribute("custlist", custList);
        if (custList.size() > 0) throw new Exception("数据太多");
        return "/custView";
    }

    @RequestMapping("/temp/listpage")
    public String customerMana(Model model) {
        logger.debug("****model:" + (model == null ? "null" : model.toString()));
        logger.debug("Mesage......");
        return "/cif/individualClientList";
    }


    /*@SuppressWarnings("unchecked")
	@RequestMapping(value="/list",method=RequestMethod.GET)
	@ResponseBody
	@Pagination(handler="myService")
	public PageData<Customer> list(	@RequestAttribute(value="data") Object result,@RequestParam(value="code") String cCde) {	
    	logger.debug("****Row NUM:"+(result == null?"0":((PageData<Customer>)result).getTotal()));
		return (PageData<Customer>)result;
	}*/
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    @Pagination(handler = "myService")
    public ResponseEntity<Object> list(@RequestAttribute(value = "data") Object result, @RequestParam(value = "code") String cCde) {
        logger.debug("****Row NUM:" + (result == null ? "0" : ((PageData<Customer>) result).getTotal()));
        ResponseEntity<Object> re = new ResponseEntity<Object>(result, HttpStatus.OK);
        return re;
    }

    @RequestMapping(value = "/client", method = RequestMethod.PUT)
    public ResponseEntity<Object> update() {
        JSONObject js = new JSONObject();
        js.put("success", "true");
        js.put("data", "update success");
        js.put("status", "200");
        ResponseEntity<Object> re = new ResponseEntity<Object>(js.toString(), HttpStatus.OK);
        return re;
    }

    @RequestMapping(value = "/client", method = RequestMethod.GET)
    public ResponseEntity<Object> query(@RequestParam(value = "custOid") String custOid) {
        JSONObject js = new JSONObject();
        js.put("success", "true");
        js.put("data", "Customer Name=张三");
        js.put("status", "200");
        ResponseEntity<Object> re = new ResponseEntity<Object>(js.toString(), HttpStatus.OK);
        return re;
    }

}
