export type MenuItemId = 'open' | 'save' | 'reset';

export interface MenuItem {
    id: MenuItemId;
    title: string;
}