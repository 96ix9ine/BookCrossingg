import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useGetPanelForView } from '@vkontakte/vk-mini-apps-router';
import { coordinates } from './components/MapCoordinates';

import CustomMapTabbar from './panels/MapTabbar';
import CustomMap from './panels/Map';
import AddBookPanel from './panels/AddBookPanel';
import { CatalogPanel } from './panels/CatalogPanel';
import { Profile } from './panels/Profile';
import { createUserFx, getUserIdFx } from './api/addUserApi';
import { $user, setUser } from './store/user';
import AboutBook from './panels/AboutBook';
import { useUnit } from 'effector-react';
import { getAllImages, getUserBooksFx } from './api/addBookApi';
import { $dealStore } from './store/deal';


export const App = () => {
	const { view: activeView } = useActiveVkuiLocation();
	const activePanel = useGetPanelForView("default_view");
  const deal = useUnit($dealStore);
  

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      // Добавление ID пользователя в базу данных.
      createUserFx(user.id);
      
      getUserBooksFx(user.id.toString());
      await getAllImages();
    }
    
    fetchData();
    console.log(deal)
  }, []);

  
  return (
    <SplitLayout>
      <SplitCol>
        <View nav={activeView} activePanel={activePanel}>
          <CatalogPanel nav="home_panel"/>
          <Profile nav="profile_panel" />
          <AddBookPanel nav="addbook_panel"/>
          <CustomMapTabbar nav="mapTabbar_panel" coordinates={coordinates}/>
          <CustomMap nav="map_panel" coordinates={coordinates}/>
          <AboutBook nav='aboutbook_panel'/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
