import { Title, Text, Div, CellButton } from '@vkontakte/vkui';
import { $books, setActiveBook } from "../store/addBook";
import { $imagesStore } from "../store/images";
import { useUnit } from "effector-react";
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import '../styles/Components.scss';


export const BookFactory = (): JSX.Element => {
    const [books, images] = useUnit([$books, $imagesStore]);
    const router = useRouteNavigator();

    return (
        <>
            {
                books.map(bookItem => (
                    <CellButton onClick={() => {router.push("/aboutBook"); setActiveBook(bookItem)}} className='book__item' key={bookItem.id}>
                        <img className='book_item-image' src={'http://localhost:3000/' + images.find(image => image.bookId === bookItem.id)?.path} alt={bookItem.title} />
                        <Div className='book__item-textContent'>
                            <Title className='book__name'>{bookItem.title}</Title>
                            <Text className='book__descr'>{bookItem.author}</Text>
                        </Div>
                    </CellButton>
                ))
                // books.map(bookItem => <BookFactory book={bookItem} images={images} />)
            }
        </>
    );
}