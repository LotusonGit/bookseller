package com.excel.bookstore.service.gr;

import com.excel.framework.exception.GeneralException;
import com.excel.bookstore.dao.intf.MenuRepository;
import com.excel.bookstore.model.Menu;
import com.excel.bookstore.model.SysMenu;
import com.excel.bookstore.service.intf.IMenuService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class MenuServiceImpl implements IMenuService {
    @Resource
    private MenuRepository menuDao;

    public List<SysMenu> createMenuTree(SysMenu menu) throws GeneralException {
        // 创建根菜单列表
        List<SysMenu> menuList = null;
        try {
            menuList = menuDao.findByParentMenu(menu);
        } catch (Exception e) {
            throw new GeneralException(e);
        }
		
		/*createMenuList(null, 2); 
		for (Menu rootMenu : rootMenuList) { 
			// rootMenu是根菜单 
			// 给rootMenu创建一级菜单 
			rootMenu.setChildren(createMenuList(rootMenu, 2)); 
			for (Menu childMenu : rootMenu.getChildren()) { 
				// childMenu是一级菜单 
				// 给childMenu创建子菜单（二级菜单）
				childMenu.setChildren(createMenuList(childMenu, 2)); 
				for (Menu childOfChildMenu : childMenu.getChildren()) { 
					// childOfChildMenu是二级菜单
				// 给childOfChildMenu创建子菜单（三级菜单）
					childOfChildMenu.setChildren(createMenuList(childOfChildMenu, 2)); 
					} 
				} 
			}
		*/
        //if(rootMenuList.size()<10)throw new GeneralException("系统错误");
        // 此时rootMenuList是一个树状结构
        return menuList;
    }

    /**
     * 创建指定菜单的子菜单列表 * *
     *
     * @param menu  Menu 指定的菜单，如果为空，则默认创建的是一级菜单 *
     * @param count int 指定菜单的子菜单数量 *
     * @return List<Menu>
     */
    private List<Menu> createMenuList(Menu menu, int count) {
        List<Menu> menuList = new ArrayList<Menu>();
        for (int i = 1; i <= count; i++) {
            if (menu == null) {
                // 创建一级菜单
                Menu rootMenu = new Menu();
                rootMenu.setName("Menu " + i);
                menuList.add(rootMenu);
            } else {
                // 创建menu的子菜单
                Menu childMenu = new Menu();
                childMenu.setName(menu.getName() + "." + i);
                menuList.add(childMenu);
            }
        }
        return menuList;
    }

    /* (non-Javadoc)
     * @see com.excel.bookstore.service.intf.IMenuService#createMenuTree()
     */
    @Override
    public List<SysMenu> createMenuTree() throws GeneralException {
        SysMenu menu = new SysMenu();
        menu.setMenuOid(new Integer(1));
        return createMenuTree(menu);
    }

}
