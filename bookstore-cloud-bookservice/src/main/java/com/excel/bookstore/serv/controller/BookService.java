package com.excel.bookstore.serv.controller;

import com.excel.bookstore.serv.bean.Book;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class BookService {

    public static List<String> logs = new ArrayList<>();

    static List<Book> books = new ArrayList<Book >();

    static {
        books.add(new Book(new Integer(10001),"实战Gradle",new BigDecimal(89.00),"BenJamin"));
        books.add(new Book(new Integer(10002),"SpringBoot 2 精髓",new BigDecimal(79.00),"李家智"));
        books.add(new Book(new Integer(10003),"区块链技术驱动金融",new BigDecimal(79.00),"谢平，肖风等"));
        books.add(new Book(new Integer(10004),"Docker技术入门与实战（第3版）",new BigDecimal(00.00),"杨保华，戴王剑等"));
        books.add(new Book(new Integer(10005),"Spring Cloud与Docker微服务架构实战（第2版）",new BigDecimal(00.00),"周立"));

    }

    private  String nowTime(){
        Date time = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatter.format(time);
    }

    @RequestMapping(value = "/book/list",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Object> listBooks(){
        System.out.println("书籍清单被请求 ON "+nowTime());
        ResponseEntity<Object> result = new ResponseEntity<Object>(books, HttpStatus.OK);

        return  result;
    }

    @RequestMapping(value = "/book/{bookId}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Book getBookInfo(@PathVariable("bookId") Integer bookId){

        System.out.println("Accept the request, Book ID is "+bookId);
        //Book bk = new Book(bookId,"Gradle In Action",new BigDecimal(89.00),"Benjamin");
        Book bk = null;
        for(Book book : books){
            if(bookId != null && bookId.equals(book.getBookId())){
                bk = book;
                break;
            }
        }
        System.out.println("请求查阅图书《"+bk.getBookName()+"》详情 ON "+nowTime());
        return  bk;
    }
}
