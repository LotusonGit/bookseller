package com.excel.bookstore.web.action;

import com.excel.bookstore.model.SysMenu;
import com.excel.bookstore.service.intf.IMenuService;
import org.beetl.core.GroupTemplate;
import org.beetl.core.resource.ClasspathResourceLoader;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class DemoController {

    private org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());

    @Resource
    IMenuService menuService;

    @Autowired
    @Qualifier("beetlConfig")
    BeetlGroupUtilConfiguration beetlConfig;

    @RequestMapping("/menu")
    public String demo(Model model) {
		/*//view.setViewName("/demo.html");
		model.addAttribute("name", "Lotuson");
		System.out.println("########### MOdel is "+model);
		return "menu";*/
        List<SysMenu> menuTree = menuService.createMenuTree();
        model.addAttribute("menuTree", menuTree);
        model.addAttribute("testName", "Kitty");

        ///////////////////////////////////////////////////////////////////////////////////
        GroupTemplate gt = beetlConfig.getGroupTemplate();
        ClasspathResourceLoader resLoader = (ClasspathResourceLoader) gt.getResourceLoader();
        logger.debug("/demo.html ============" + resLoader.exist("demo.html"));
        logger.debug("/menu/demo.html ============" + resLoader.exist("/menu/demo.html"));
        ///////////////////////////////////////////////////////////////////////////////////
        return "menu/demo";
    }

    @RequestMapping("/demo")
    public String test(Model model) {
        model.addAttribute("name", "Lotuson");
        model.addAttribute("testName", "Kitty");
        return "demo";
    }

    @RequestMapping("/test")
    public String test1(Model model) {
        model.addAttribute("name", "Lotuson");
        model.addAttribute("testName", "Kitty");
        return "menu/test";
    }


}
