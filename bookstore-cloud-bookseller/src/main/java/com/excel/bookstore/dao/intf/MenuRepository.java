// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : MenuRepository.java
 * Description	:
 * Creation Date : 2018年5月4日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.dao.intf;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excel.bookstore.model.SysMenu;

/**
 * @author Lotuson
 */
public interface MenuRepository extends JpaRepository<SysMenu, Integer> {

    public List<SysMenu> findByParentMenu(SysMenu parentMenu);

}
