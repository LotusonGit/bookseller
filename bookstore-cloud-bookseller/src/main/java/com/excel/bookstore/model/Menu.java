// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : Menu.java
 * Description	:
 * Creation Date : 2018年4月27日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.model;

import java.util.List;

/**
 * @author Lotuson
 */
public class Menu {

    private String name;
    private List<Menu> children;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Menu> getChildren() {
        return children;
    }

    public void setChildren(List<Menu> children) {
        this.children = children;
    }

}
