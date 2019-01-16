package com.excel.bookstore.model;

public class CustInfo {

    private Long custOid;
    private String custCde;
    private String custName;
    private String address;
    private String tel;
    private String remak;

    public Long getCustOid() {
        return custOid;
    }

    public void setCustOid(Long custOid) {
        this.custOid = custOid;
    }

    public String getCustCde() {
        return custCde;
    }

    public void setCustCde(String custCde) {
        this.custCde = custCde;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getRemark() {
        return remak;
    }

    public void setRemark(String remark) {
        this.remak = remark;
    }
}
