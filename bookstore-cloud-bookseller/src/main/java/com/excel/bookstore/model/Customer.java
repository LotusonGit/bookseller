// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : Customer.java
 * Description	:
 * Creation Date : 2018年5月3日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Lotuson
 */
@Entity
@Table(name = "CUSTOMER")
public class Customer {

    private Long custOid;
    private String custCde;
    private String custName;
    private String address;
    private String telephone;
    private String remark;

    @Id
    @Column(name = "CUST_OID", unique = true, nullable = false, precision = 12, scale = 0)
    public Long getCustOid() {
        return custOid;
    }

    public void setCustOid(Long custOid) {
        this.custOid = custOid;
    }

    @Column(name = "custCde", length = 20)
    public String getCustCde() {
        return custCde;
    }

    public void setCustCde(String custCde) {
        this.custCde = custCde;
    }

    @Column(name = "CUST_NAME", length = 100)
    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    @Column(name = "ADDRESS", length = 200)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Column(name = "TEL", length = 50)
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @Column(name = "REMAK", length = 200)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


}
