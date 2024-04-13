import { IBook } from "../interfaces/interface";
import { Title, Text, Div, CellButton } from '@vkontakte/vkui';


export const BookFactory = (book: IBook, images: any): JSX.Element => {
    return (
        <CellButton className='book__item'>
            <Div className='book_div_item-image'>
                {
                    images.map((image: any, id: any) => {
                        return <img className='book_item-image' key={id} src={'http://localhost:3000/' + image.path}/>
                    })
                }
            </Div>
            <Div className='book__item-textContent'>
                <Title className='book__name'>{book.title}</Title>
                <Text className='book__descr'>{book.description}</Text>
                <Text className='book__descr'>{book.author}</Text>
                <Text className='book__descr'>{book.damageLevel}</Text>
                <Text className='book__descr'>{book.dealType}</Text>
                <Text className='book__descr'>{book.genre}</Text>
            </Div>
        </CellButton>
    );
}