import { Title, Text, Div, CellButton } from '@vkontakte/vkui';
import { $activeBook, $books, setActiveBook } from "../store/addBook";
import { $imagesStore } from "../store/images";
import { useUnit } from "effector-react";
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import '../styles/Components.scss';
import { useEffect } from 'react';


export const BookFactory = (): JSX.Element => {
    const [books, images, activeBook] = useUnit([$books, $imagesStore, $activeBook]);
    const router = useRouteNavigator();

    useEffect(() => {
    }, [activeBook]);

    return (
        <>
            {
                books.map(bookItem => (
                    <Div className='book_container'>
                        <CellButton onClick={() => {router.push("/aboutBook"); setActiveBook(bookItem)}} className='book__item' key={bookItem.id}>
                            <Div className='book_container-wrapper--profile'>
                                <img 
                                    className='book_item-image' 
                                    src={'http://localhost:3000/' + images.find(image => image.bookId === bookItem.id)?.path} alt={bookItem.title} 
                                />
                                <Div className='book__item-textContent'>
                                    <Title className='name_book'>{bookItem.title}</Title>
                                    <Text className='name_book author'>{bookItem.author}</Text>
                                </Div>
                            </Div>
                        </CellButton>
                    </Div>
                ))
            }
        </>
    );
}