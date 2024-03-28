import React, { useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Search, Group, Title } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import '../styles/Components.scss';
import { TabbarComponent } from '../components/Tabbar';
import CatalogBookItem from '../components/CatalogBookItem';
import { $books } from '../store/addBook';
import { useUnit } from 'effector-react';


export const CatalogPanel: React.FC = () => {
    const router = useRouteNavigator();
    const [search, setSearch] = useState<string>('');
    const books = useUnit($books);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <Panel>
            <PanelHeader
                className='catalog_header'
                before={<PanelHeaderBack id='catalog-back' onClick={() => router.back()} />}
                after={<Search style={{ width: "80vw" }} value={search} onChange={onChange} />}
            />
            <Group mode='plain' separator='hide'>
                <Title>Актуальное</Title>
                {
                    books.map(bookItem => 
                        <CatalogBookItem book={bookItem}/>
                    )
                }
            </Group>
            <TabbarComponent/>
        </Panel>
    );
};
