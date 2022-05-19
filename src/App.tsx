/* Care */
import React, { useState } from "react";

/* Components */
import { Button, Checkbox, Input, Layout, Menu } from "antd";
import { CustomMap, ResizableDrawer } from "./components/";

/* Helpers */
import { GET_DATA } from "./services/sagas";
import { RootState } from "./services";
import { IData } from "./@types";

/* Hooks */
import { useDispatch, useSelector } from "react-redux";
import useDidMountEffect from "./hooks";

const App = () => {
  // State
  const [checkedKeys, setCheckedKeys] = useState<Array<number>>([]);
  const [center, setCenter] = useState<[number, number]>([51.505, -0.09]);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);

  const dispatch = useDispatch();
  useDidMountEffect(() => {
    dispatch({ type: GET_DATA });
  }, []);
  const data = useSelector<RootState, IData[]>((state) => state.main.data);

  // Handlers
  const onItemClick = (item: IData) => {
    setCenter([item.from_lat, item.from_long]);
    setFrom(item.from_long);
    setTo(item.from_lat);
  };

  const onDoubleClick = (key: number) => {
    if (checkedKeys.some((i) => i === key)) {
      setCheckedKeys(checkedKeys.filter((i) => i !== key));
    } else {
      setCheckedKeys((prev) => [...prev, key]);
    }
  };

  return (
    <Layout>
      <ResizableDrawer>
        <Menu>
          {checkedKeys[0] && (
            <Menu.Item>
              <Button style={{ width: "100%" }} type="primary" color="#DED2BF">
                Delete
              </Button>
            </Menu.Item>
          )}
          <Menu.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input style={{ width: "40%" }} value={from} />
              {"--->"}
              <Input style={{ width: "40%" }} value={to} />
            </div>
          </Menu.Item>

          {data[0] &&
            data.map((item: IData) => (
              <Menu.Item
                key={item.id}
                style={{ margin: "0 auto" }}
                onDoubleClick={() => onDoubleClick(item.id)}
                onClick={() => onItemClick(item)}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    {item.from_long} {"--->"} {item.from_lat}
                  </span>
                  {checkedKeys.some((i) => i === item.id) && (
                    <Checkbox checked={checkedKeys.some((i) => i === item.id)} />
                  )}
                </div>
              </Menu.Item>
            ))}
        </Menu>
      </ResizableDrawer>
      <Layout>
        <Layout.Content style={{ margin: "0", height: "100vh" }}>
          <CustomMap center={center} markups={data} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;
