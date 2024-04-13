import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-apps-router';
import { coordinates } from './components/MapCoordinates';

import CustomMap from './panels/Map';
import AddBookPanel from './panels/AddBookPanel';
import { CatalogPanel } from './panels/CatalogPanel';
import Profile from './panels/Profile';
import { useUnit } from 'effector-react';
import { $user, setUser } from './store/user';
import { createUserFx } from './api/addUser';
import AboutBook from './panels/AboutBook';


export const App = () => {
	const { view: activeView } = useActiveVkuiLocation();
	const activePanel = useGetPanelForView("default_view");

  // состояние из ../store/user.ts вместо useState<UserInfo | undefined>();
  const user = useUnit($user);


  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');

      // добавление пользователя в состояние (../store/user.ts)
      setUser(user);

      // Добавление ID пользователя в базу данных.
      createUserFx(user.id);
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
