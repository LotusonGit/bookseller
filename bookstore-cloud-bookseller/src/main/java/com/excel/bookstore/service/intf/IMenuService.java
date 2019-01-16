// ******************************COPYRIGHT NOTICE********************************************************
//  All rights reserved.  This material is confidential and proprietary to Excel Technology International
// (Hongkong) Limited and no part of this material should be reproduced, published in any form by any
//  means, electronic or mechanical including photocopy or any information storage or retrieval system nor
// should the material be disclosed to third parties without the express written authorization of Excel
//  Technology International (Hongkong) Limited.

/**
 * <PRE>
 * ******************************PROGRAM DESCRIPTION*******************************************************
 * Program Name  : ITest.java
 * Description	:
 * Creation Date : 2018年5月2日
 * Creator	: Lotuson
 * ******************************MODIFICATION HISTORY******************************************************
 * </PRE>
 */
package com.excel.bookstore.service.intf;

import com.excel.framework.exception.GeneralException;
import com.excel.framework.intf.IService;
import com.excel.bookstore.model.SysMenu;

import java.util.List;

public interface IMenuService extends IService {

    public List<SysMenu> createMenuTree() throws GeneralException;

}
