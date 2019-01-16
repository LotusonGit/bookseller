// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : PageHelper.java
 * Description	:
 * Creation Date : 2018年5月9日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.common.page;

import java.io.Serializable;
import java.util.List;

/**
 * @author Lotuson
 */
public class PageData<T> implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -8813321116688673142L;
    private Integer page;
    private Integer total;
    private List<T> rows;


    /**
     * @param page
     * @param total
     * @param rows
     */
    public PageData(Integer page, Integer total, List<T> rows) {
        super();
        this.page = page;
        this.total = total;
        this.rows = rows;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public List<T> getRows() {
        return rows;
    }

    public void setRows(List<T> rows) {
        this.rows = rows;
    }


}
