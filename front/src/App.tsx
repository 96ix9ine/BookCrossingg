import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Root } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-apps-router';
import { coordinates } from './components/MapCoordinates';

import CustomMap from './panels/Map';
import AddBookPanel from './panels/AddBookPanel';
import { Persik } from './panels/Persik';
import { CatalogPanel } from './panels/CatalogPanel';
import Profile from './panels/Profile';

export const App = () => {
	const { view: activeView } = useActiveVkuiLocation();
	const activePanel = useGetPanelForView("default_view");
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  // const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

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
          <CatalogPanel nav="home_panel"/>
          <Profile nav="profile_panel" />
          <AddBookPanel nav="addbook_panel"/>
          <CustomMap nav="map_panel" coordinates={coordinates}/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
