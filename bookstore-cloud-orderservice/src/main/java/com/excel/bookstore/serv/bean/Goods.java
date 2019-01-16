package com.excel.bookstore.serv.bean;

import java.math.BigDecimal;

public class Goods {

    private  Integer gid;
    private  String gCode;
    private  String gType;
    private  String  description;
    private BigDecimal price;

    public Goods(Integer gid, String gCode, String gType, String description, BigDecimal price) {
        this.gid = gid;
        this.gCode = gCode;
        this.gType = gType;
        this.description = description;
        this.price = price;
    }

    public void setGid(Integer gid) {
        this.gid = gid;
    }

    public void setgCode(String gCode) {
        this.gCode = gCode;
    }

    public void setgType(String gType) {
        this.gType = gType;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getGid() {
        return gid;
    }

    public String getgCode() {
        return gCode;
    }

    public String getgType() {
        return gType;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }
}
