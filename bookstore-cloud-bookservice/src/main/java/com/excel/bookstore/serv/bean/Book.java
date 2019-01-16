package com.excel.bookstore.serv.bean;

import java.math.BigDecimal;

public class Book {

    private  Integer bookId;
    private  String bookName;
    private BigDecimal price;
    private String author;

    public Book(Integer bookId, String bookName, BigDecimal price, String author) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.price = price;
        this.author = author;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getBookId() {
        return bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getAuthor() {
        return author;
    }
}
