import React, { useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Search, Group, Title, Text, Div, CellButton } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import '../styles/Components.scss';
import { TabbarComponent } from '../components/Tabbar';
import { $books } from '../store/addBook';
import { useUnit } from 'effector-react';
import { api } from '../api/axiosInstance';
import { getAllImages } from '../api/addBookApi';
import { $imagesStore } from '../store/images';
import { BookFactory } from '../components/BookFactory';


export const CatalogPanel: React.FC = () => {
    const router = useRouteNavigator();
    const [search, setSearch] = useState<string>('');
    
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };


    const getUserImages = async (bookId: string) => {
        try {
            const response = await api.get(`api/book/${bookId}/images`);
            setImages(response.data)
        }
        
        catch (error) {
            console.error("asd");
        }
    }


    useEffect(() => {
        getAllImages();
    }, [])

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
                    <BookFactory />
                </Div>
            </Div>
            <TabbarComponent/>
        </Panel>
    );
};
