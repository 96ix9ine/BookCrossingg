import { Title, Text, Div, CellButton } from '@vkontakte/vkui';
import { $books } from "../store/addBook";
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
        </>
    );
}