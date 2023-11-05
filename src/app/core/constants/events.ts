import {
    LayoutType,
    LayoutColor,
    LayoutWidth,
    MenuPositions,
    SideBarTheme,
    SideBarSize,
    TopbarTheme
} from "src/app/layout/shared/config/layout.model";
import {PageTitle} from "src/app/layout/shared/models/page-title.model";

// list of events
export enum EventType {
    CHANGE_LAYOUT = "changeLayoutType",
    CHANGE_LAYOUT_COLOR = "changeLayoutColor",
    CHANGE_LAYOUT_SIZE = "changeLayoutSize",
    CHANGE_LEFTBAR_SIZE = "changeLeftbarSize",
    CHANGE_LEFTBAR_COLOR = "changeLeftbarColor",
    CHANGE_LEFTBAR_POSITION = "changeLeftbarPosition",
    CHANGE_TOPBAR_COLOR = "changeTopbarColor",
    TOGGLE_SIDEBAR_USERINFO = "toggleSidebarUserInfo",
    SHOW_RIGHT_SIDEBAR = "showRightSideBar",
    HIDE_RIGHT_SIDEBAR = "hideRightSideBar",
    CHANGE_PAGE_TITLE = "changePageTitle",
}

// payload type
export type Payload =
    PageTitle
    | LayoutType
    | LayoutColor
    | LayoutWidth
    | MenuPositions
    | SideBarTheme
    | SideBarSize
    | TopbarTheme
    | boolean;
