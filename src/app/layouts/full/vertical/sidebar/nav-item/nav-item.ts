import { ComponentType } from "@angular/cdk/portal";
import { Component } from "@angular/core";

export interface NavItem {
    displayName?: string;
    disabled?: boolean;
    external?: boolean;
    twoLines?: boolean;
    chip?: boolean;
    iconName?: string;
    navCap?: string;
    chipContent?: string;
    chipClass?: string;
    subtext?: string;
    route?: string;
    children?: NavItem[];
    ddType?: string;
    bgcolor?:string;
    openDialog?: ComponentType<unknown>;
    isImage?: boolean;
    group?: string;
}
