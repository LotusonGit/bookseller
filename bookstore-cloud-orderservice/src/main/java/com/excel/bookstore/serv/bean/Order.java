package com.excel.bookstore.serv.bean;

import java.util.Date;
import java.util.List;

public class Order {

    private  Integer oid;
    private List<Goods> goodsCode;
    private  String orderNumber;
    private Date orderTime;
    private  String user;

    public Order(Integer oid, List<Goods> goodsCode, String orderNumber, Date orderTime, String user) {
        this.oid = oid;
        this.goodsCode = goodsCode;
        this.orderNumber = orderNumber;
        this.orderTime = orderTime;
        this.user = user;
    }

    public void setOid(Integer oid) {
        this.oid = oid;
    }

    public void setGoodsCode(List<Goods> goodsCode) {
        this.goodsCode = goodsCode;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public void setOrderTime(Date orderTime) {
        this.orderTime = orderTime;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Integer getOid() {
        return oid;
    }

    public List<Goods> getGoodsCode() {
        return goodsCode;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public Date getOrderTime() {
        return orderTime;
    }

    public String getUser() {
        return user;
    }
}
