import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Root } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-apps-router';

import CustomMap from './panels/Map';
import AddBookPanel from './panels/AddBookPanel';
import { Persik } from './panels';

export const App = () => {
	const { view: activeView } = useActiveVkuiLocation();
	const activePanel = useGetPanelForView("default_view");
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  // const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  const coordinates: [number, number, number][] = [
    [55.166212, 61.400838, 1],
    [55.185764, 61.282548, 2],
    [55.161569, 61.464564, 3],
    [55.184608, 61.332009, 4],
    [55.181941, 61.294031, 5],
    [55.191387, 61.311330, 6],
    [55.182392, 61.353937, 7],
    [55.184927, 61.398915, 8],
    [55.175094, 61.410299, 9],
    [55.174794, 61.410620, 10],
    [55.174594, 61.410820, 11],
    [55.169817, 61.377751, 12],
    [55.161707, 61.401440, 13],
    [55.164248, 61.417627, 14]
]

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      // setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View nav={activeView} activePanel={activePanel}>
          <AddBookPanel nav="home_panel"/>
          <CustomMap nav="map_panel" coordinates={coordinates}/>
          <Persik nav="persik_panel"/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
