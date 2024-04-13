import { useUnit } from "effector-react";
import { $books, $resultBook } from "../store/addBook";
import { useEffect, useState } from "react";
import { IBook, IResultBook } from "../interfaces/interface";
import { $imagesStore } from "../store/images";
import { Title, Text, Div, CellButton } from '@vkontakte/vkui';


export const BookFactory = (book: IBook): JSX.Element => {
    const [resultBooks, imagesStore] = useUnit([$resultBook, $imagesStore]);
    const [catalogBook, setCatalogBook] = useState<IResultBook>();


    useEffect(() => {
        // const fetchImages = async () => {
        //     await getAllImages();
        // }

        // fetchImages();
        console.log(resultBooks);
        imagesStore.map(image => console.log(image.path));
    }, [])

    
    return (
        <CellButton className='book__item'>
            <Div className='book_div_item-image'>
                <img className='book_item-image' src={imagesStore.map((image: any, id: any) => {
                    return <img key={id} src={'http://localhost:3000/' + image.path}/>
                })} alt="" />
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