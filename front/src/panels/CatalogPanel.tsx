import React, { useEffect, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Search, Group, Title, Text, Div, CellButton } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import '../styles/Components.scss';
import { TabbarComponent } from '../components/Tabbar';
import { $books, $resultBook } from '../store/addBook';
import { useUnit } from 'effector-react';
import { getUserBooksFx } from '../api/addBookApi';
import { createUserFx } from '../api/addUserApi';
import { $user, $userServerStore } from '../store/user';
import { api } from '../api/axiosInstance';


export const CatalogPanel: React.FC = () => {
    const router = useRouteNavigator();
    const [search, setSearch] = useState<string>('');
    const [images, setImages] = useState<any>([]);
    const books = useUnit($books);
    const user = useUnit($userServerStore);
    const resultBook = useUnit($resultBook);
    
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };


    const getUserImages = async (bookId: string) => {
        try {
            console.log(bookId);
            const response = await api.get(`api/book/${bookId}/images`);
            console.log(response.data);
            setImages(response.data)
        } 
        
        catch (error) {
            console.error("asd");
        }
    } 


    useEffect(() => {
        async function getBooks() {
            await getUserBooksFx(user.id);
        }

      
        getBooks();
        getUserImages(resultBook.id);
        console.log(resultBook.id)
    }, [user])

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
                            <CellButton className='book__item'>
                                <Div className='book_div_item-image'>
                                    <img className='book_item-image' src={images.map((image: any, id: any) => {
                                        
                                        return <img src={'http://localhost:3000/' + image.path}/>
                                    })} alt="" />
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
                        )
                    }
                </Div>
                
            </Div>
            <TabbarComponent/>
        </Panel>
    );
};
