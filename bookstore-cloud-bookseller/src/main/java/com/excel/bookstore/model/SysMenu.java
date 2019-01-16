// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : SysMenu.java
 * Description	:
 * Creation Date : 2018年5月4日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Lotuson
 */
@Entity
@Table(name = "sysmenu")
public class SysMenu {

    private Integer menuOid;
    private SysMenu parentMenu;
    private String menuCode;
    private String menuName;
    private String menuNameEng;
    private String menuDesc;
    private String menuIcon;
    private String menuUrl;
    private String remark;
    private Set<SysMenu> children = new HashSet<SysMenu>();

    @Id
    @Column(name = "MENU_OID", unique = true, nullable = false)
    public Integer getMenuOid() {
        return menuOid;
    }

    public void setMenuOid(Integer menuOid) {
        this.menuOid = menuOid;
    }

    @Column(name = "MENU_CDE", length = 50)
    public String getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(String menuCode) {
        this.menuCode = menuCode;
    }

    @Column(name = "MENU_NME", length = 50)
    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    @Column(name = "MENU_NME_ENG", length = 50)
    public String getMenuNameEng() {
        return menuNameEng;
    }

    public void setMenuNameEng(String menuNameEng) {
        this.menuNameEng = menuNameEng;
    }

    @Column(name = "MENU_DESC", length = 100)
    public String getMenuDesc() {
        return menuDesc;
    }

    public void setMenuDesc(String menuDesc) {
        this.menuDesc = menuDesc;
    }

    @Column(name = "ICON", length = 50)
    public String getMenuIcon() {
        return menuIcon;
    }

    public void setMenuIcon(String menuIcon) {
        this.menuIcon = menuIcon;
    }

    @Column(name = "URL", length = 50)
    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    @Column(name = "REMAK", length = 200)
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_MENU")
    public SysMenu getParentMenu() {
        return parentMenu;
    }

    public void setParentMenu(SysMenu parentMenu) {
        this.parentMenu = parentMenu;
    }

    @OneToMany(mappedBy = "parentMenu")
    public Set<SysMenu> getChildren() {
        return children;
    }

    public void setChildren(Set<SysMenu> children) {
        this.children = children;
    }


}
