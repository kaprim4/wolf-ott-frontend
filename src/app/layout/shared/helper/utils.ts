import { LayoutColor, LayoutType, LayoutWidth, MenuPositions, SideBarSize, SideBarTheme, TopbarTheme } from "../config/layout.model";
import { LayoutConfig } from "../models/layout-config.model";
import { MenuItem } from "../models/menu.model";

/**
 * finds all parents of selected menuitem
 * @param menuItems list of menus
 * @param menuItem selected menu
 * @returns list of all parent menus of menuitem
 */
const findAllParent = (menuItems: MenuItem[], menuItem: any): any => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

/**
 * finds menuitem
 * @param menuItems list of menus
 * @param menuItemKey key to be matched
 * @returns menuitem that has menuItemKey
 */
const findMenuItem = (menuItems: MenuItem[], menuItemKey: string): any => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};


/**
 * Changes the body attribute
 */
const changeBodyAttribute = (attribute: string, value?: string, action = 'set'): void => {
    switch (action) {
        case 'remove':
            if (document.body) {
                if (document.body.hasAttribute(attribute)) {
                    document.body.removeAttribute(attribute);
                }
            }
            break;
        default:
            if (document.body) document.body.setAttribute(attribute, value!);
            break;
    }
}

/**
 * returns configurations based on layout type
 * @param layoutType layout type
 */
const getLayoutConfig = (layoutType: LayoutType = LayoutType.LAYOUT_VERTICAL): LayoutConfig => {
    let config: LayoutConfig = {
        layoutColor: LayoutColor.LAYOUT_COLOR_LIGHT,
        layoutType: layoutType,
        layoutSize: LayoutWidth.LAYOUT_WIDTH_FLUID,
        leftbarPosition: MenuPositions.MENU_POSITION_FIXED,
        leftbarColor: SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT,
        leftbarSize: SideBarSize.LEFT_SIDEBAR_TYPE_DEFAULT,
        topbarColor: TopbarTheme.TOPBAR_THEME_LIGHT,
        showSidebarUserInfo: true
    }

    switch (layoutType) {
        case LayoutType.LAYOUT_HORIZONTAL:
            return { ...config, topbarColor: TopbarTheme.TOPBAR_THEME_DARK }
        default:
            return config
    }
}

export { findAllParent, findMenuItem, changeBodyAttribute, getLayoutConfig };
