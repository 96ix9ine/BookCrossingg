import { useUnit } from "effector-react";
import { $books, $resultBook } from "../store/addBook";
import { useEffect } from "react";
import { IBook } from "../interfaces/interface";
import { getAllImages } from "../api/addBookApi";
import { $imagesStore } from "../store/images";



export const BookFactory = (book: IBook, images: any): JSX.Element => {
    const [resultBooks, imagesStore] = useUnit([$resultBook, $imagesStore]);


    useEffect(() => {
        const fetchImages = async () => {
            await getAllImages();
        }

        fetchImages();
        console.log(resultBooks);
    }, [])

    return (
        <>

        </>
    );
}