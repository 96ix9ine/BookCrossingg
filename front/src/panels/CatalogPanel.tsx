import React, { useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Search, Group, Title, Text, Div, Image } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import '../styles/Components.scss';
import { TabbarComponent } from '../components/Tabbar';
import CatalogBookItem from '../components/CatalogBookItem';
import { $books } from '../store/addBook';
import { useUnit } from 'effector-react';
import persik from '../assets/persik.png';



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
            <Div>
                <Title>Актуальное</Title>

                <Div className="books__items">
                    {
                        books.map(bookItem => 
                            <Group className='book__item'>
                                <img className='book_item-image' src={bookItem.imagePath} alt="" />
                                <Div className='book__item-textContent'>
                                    <Title className='book__name'>{bookItem.name}</Title>
                                    <Text className='book__descr'>{bookItem.description}</Text>
                                    <Text>{bookItem.imagePath}</Text>
                                </Div>
                            </Group>
                        )
                    }
                </Div>
                
            </Div>
            <TabbarComponent/>
        </Panel>
    );
};
