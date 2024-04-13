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


export const CatalogPanel: React.FC = () => {
    const router = useRouteNavigator();
    const [search, setSearch] = useState<string>('');
    const [books, images] = useUnit([$books, $imagesStore]);
    
    
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
        console.log(images)
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
                    {
                        books.map(bookItem => (
                            <CellButton onClick={() => router.push("/aboutBook")} className='book__item' key={bookItem.id}>
                                <Div className='book_div_item-image'>
                                    <img className='book_item-image' src={'http://localhost:3000/' + images.find(image => image.bookId === bookItem.id)?.path} alt={bookItem.title} />
                                </Div>
                                <Div className='book__item-textContent'>
                                    <Title className='book__name'>{bookItem.title}</Title>
                                    <Text className='book__descr'>{bookItem.description}</Text>
                                    <Text className='book__descr'>{bookItem.author}</Text>
                                    <Text className='book__descr'>{bookItem.damageLevel}</Text>
                                    <Text className='book__descr'>{bookItem.dealType}</Text>
                                    <Text className='book__descr'>{bookItem.genre}</Text>
                                </Div>
                            </CellButton>
                        ))
                        // books.map(bookItem => <BookFactory book={bookItem} images={images} />)
                    }
                </Div>
            </Div>
            <TabbarComponent/>
        </Panel>
    );
};
