/* Care */
import React from "react";

/* Hooks */
import { useCallback, useState } from "react";

/* Components */
import { Drawer } from "antd";

let isResizing: boolean = false;

interface IProps<D> {
  data?: D[];
  children: JSX.IntrinsicAttributes & React.ReactNode;
}

export const ResizableDrawer = <D extends Record<string, any>>({ children }: IProps<D>) => {
  const [drawerWidth, setDrawerWidth] = useState<number>(256);

  const cbHandleMouseMove = useCallback(handleMousemove, []);
  const cbHandleMouseUp = useCallback(handleMouseup, []);

  function handleMouseup() {
    if (!isResizing) {
      return;
    }
    isResizing = false;
    document.removeEventListener("mousemove", cbHandleMouseMove);
    document.removeEventListener("mouseup", cbHandleMouseUp);
  }

  function handleMousedown(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    e.preventDefault();
    document.addEventListener("mousemove", cbHandleMouseMove);
    document.addEventListener("mouseup", cbHandleMouseUp);
    isResizing = true;
  }

  function handleMousemove(e: MouseEvent) {
    let offsetLeft = e.clientX - document.body.offsetLeft;
    let minWidth = 256;
    let maxWidth = 600;
    if (offsetLeft > minWidth && offsetLeft < maxWidth) {
      setDrawerWidth(offsetLeft);
    }
  }

  return (
    <Drawer
      mask={false}
      style={{ margin: 0, padding: 0 }}
      bodyStyle={{ padding: 0, margin: 0 }}
      placement="left"
      closable={false}
      visible={true}
      width={drawerWidth}
    >
      {children}
      <div className="sidebar-dragger" onMouseDown={handleMousedown} />
    </Drawer>
  );
};
