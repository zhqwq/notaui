import Tabs, { TabsProps } from "./Tabs";
import TabItem, { TabItemProps } from "./TabItem";
import { FC } from "react";

export type ITabsComponent = FC<TabsProps> & {
  TabItem: FC<TabItemProps>
}

const _Tabs = Tabs as ITabsComponent
_Tabs.TabItem = TabItem

export default _Tabs 