package com.excel.bookstore.web.controller;

import com.excel.bookstore.bookservice.BookServClient;
import com.excel.bookstore.common.page.PageData;
import com.excel.bookstore.model.Customer;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Controller
public class BookController {

    @Resource
    BookServClient bookClient;

    @RequestMapping(value = "/book/list",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public String list() {
        return bookClient.getBookList();
    }

    @RequestMapping(value = "/books")
    public String listbooks(Model model) {

        return "/bookstore/bookslist";
    }

    @RequestMapping(value = "/bookstore/view/{id}", method = RequestMethod.GET)
    public String showDetail(@PathVariable("id") Integer bookOid, Model model) throws Exception {
        System.out.println("bookOid ==== " + bookOid);
         String str = bookClient.getBook(bookOid);
        System.out.println("Request BookService:"+str);
        JSONObject bookJson = new JSONObject(str);
        model.addAttribute("book",bookJson);
        return "/bookstore/bookInfo";
    }
}
