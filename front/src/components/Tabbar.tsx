import React, { useEffect, useRef, useState } from 'react';
import { Tabbar, TabbarItem, Badge, NavIdProps} from '@vkontakte/vkui';
import { Icon28UserCircleOutline, Icon28MessageOutline, Icon28PlaceOutline, Icon28AddCircleFillBlue, Icon28BillheadOutline } from '@vkontakte/icons';
import { useRouteNavigator }from '@vkontakte/vk-mini-apps-router';
import  bridge, { UserInfo } from "@vkontakte/vk-bridge";
import anime from 'animejs/lib/anime.es.js';

export interface ProfileProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const TabbarComponent: React.FC = () => {
  const [indicator, setIndicator] = useState<string>('one');
  const router = useRouteNavigator();
  const tabbarRef = useRef<HTMLDivElement>(null);

  const [fetchedUser, setUser] = useState<UserInfo | undefined>();

  const handleMessagesClick = (userId: number | undefined) => {
    if (userId) {
      setIndicator('two');
      window.open(`https://vk.com/im?sel`, '_blank'); // добавить =${userId} если нужно
    }
  };

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
    }
    fetchData();
  }, [handleMessagesClick]);

  useEffect(() => {
    anime({
      targets: tabbarRef.current,
      background: [
        'linear-gradient(105deg, rgba(85,134,198,1) 0%, rgba(49,59,85,1) 20%, rgba(60,113,167,1) 45%, rgba(60,105,150,1) 55%, rgba(49,59,85,1) 80%, rgba(109,120,133,1) 100%)',
        'linear-gradient(-105deg, rgba(85,134,198,1) 0%, rgba(49,59,85,1) 20%, rgba(60,113,167,1) 45%, rgba(60,105,150,1) 55%, rgba(49,59,85,1) 80%, rgba(109,120,133,1) 100%)'
      ],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 6800,
    });
  }, []);

  return (
      <Tabbar className="tabbar" getRootRef={tabbarRef}>
        <TabbarItem
          selected={indicator === 'one'}
          onClick={() => [setIndicator('one'), router.push('/home')]}
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
        <TabbarItem selected={indicator === 'four'} onClick={() => [setIndicator('four'), router.push('/mapTabbar')]} text="Места">
          <Icon28PlaceOutline />
        </TabbarItem>
        <TabbarItem selected={indicator === 'five'} onClick={() => [setIndicator('five'), router.push('/profile')]} text="Профиль">
          <Icon28UserCircleOutline />
        </TabbarItem>
        
        
      </Tabbar>
  );
}
