import { Menu } from "antd";
import React from "react";

export const Item = (title: string) => {
  return (
    <Menu.Item style={{ marginTop: 0 }} onClick={() => console.log(title)}>
      {title}
    </Menu.Item>
  );
};
