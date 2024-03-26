import React, { useEffect, useState } from 'react';
import { Tabbar, TabbarItem, Badge} from '@vkontakte/vkui';
import { Icon28UserCircleOutline, Icon28MessageOutline, Icon28PlaceOutline, Icon28AddCircleFillBlue, Icon28BillheadOutline } from '@vkontakte/icons';

export const TabbarComponent: React.FC = () => {
  const [indicator, setIndicator] = useState<string>('one');

  return (
      <Tabbar className="tabbar">
        <TabbarItem
          selected={indicator === 'one'}
          onClick={() => setIndicator('one')}
          indicator={<Badge mode="prominent">Есть обновления</Badge>}
          text="Каталог"
        >
          <Icon28BillheadOutline />
        </TabbarItem>
        <TabbarItem
          selected={indicator === 'two'}
          onClick={() => setIndicator('two')}
          text="Сообщения"
        >
          <Icon28MessageOutline />
        </TabbarItem>
        <TabbarItem selected={indicator === 'three'} onClick={() => setIndicator('three')} text="Добавить">
          <Icon28AddCircleFillBlue />
        </TabbarItem>
        <TabbarItem selected={indicator === 'four'} onClick={() => setIndicator('four')} text="Места">
          <Icon28PlaceOutline />
        </TabbarItem>
        <TabbarItem selected={indicator === 'five'} onClick={() => setIndicator('five')} text="Профиль">
          <Icon28UserCircleOutline />
        </TabbarItem>
        
        
      </Tabbar>
  );
}