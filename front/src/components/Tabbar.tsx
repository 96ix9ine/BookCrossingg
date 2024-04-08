import React, { useEffect, useState } from 'react';
import { Tabbar, TabbarItem, Badge, NavIdProps} from '@vkontakte/vkui';
import { Icon28UserCircleOutline, Icon28MessageOutline, Icon28PlaceOutline, Icon28AddCircleFillBlue, Icon28BillheadOutline } from '@vkontakte/icons';
import { useRouteNavigator }from '@vkontakte/vk-mini-apps-router';
import  bridge, { UserInfo } from "@vkontakte/vk-bridge";

export interface ProfileProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const TabbarComponent: React.FC = () => {
  const [indicator, setIndicator] = useState<string>('one');
  const router = useRouteNavigator();

  const [fetchedUser, setUser] = useState<UserInfo | undefined>();

  const handleMessagesClick = (userId: number | undefined) => {
    if (userId) {
      setIndicator('two');
      window.open(`https://vk.com/im?sel=${userId}`, '_blank');
    }
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const user = await bridge.send('VKWebAppGetUserInfo');
  //     setUser(user);
  //   }
  //   fetchData();
  // }, []);

  return (
      <Tabbar className="tabbar">
        <TabbarItem
          selected={indicator === 'one'}
          onClick={() => [setIndicator('one'), router.push('/')]}
          indicator={<Badge mode="prominent">Есть обновления</Badge>}
          text="Каталог"
        >
          <Icon28BillheadOutline />
        </TabbarItem>
        <TabbarItem
          selected={indicator === 'two'}
          onClick={() => handleMessagesClick(fetchedUser?.id)}
          text="Сообщения"
        >
          <Icon28MessageOutline />
        </TabbarItem>
        <TabbarItem selected={indicator === 'three'} onClick={() => [setIndicator('three'), router.push('/addbook')]} text="Добавить">
          <Icon28AddCircleFillBlue />
        </TabbarItem>
        <TabbarItem selected={indicator === 'four'} onClick={() => [setIndicator('four'), router.push('/map')]} text="Места">
          <Icon28PlaceOutline />
        </TabbarItem>
        <TabbarItem selected={indicator === 'five'} onClick={() => [setIndicator('five'), router.push('/profile')]} text="Профиль">
          <Icon28UserCircleOutline />
        </TabbarItem>
        
        
      </Tabbar>
  );
}