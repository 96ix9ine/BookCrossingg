import { 
    Div,
    Group,
    Text
} from "@vkontakte/vkui";
import { IBook } from "../interfaces/IBook";


const CatalogBookItem = (book: IBook): JSX.Element => {


    return (
        <Group>
            <Text>{book.name}</Text>
            <Text>{book.description}</Text>
        </Group>

    );
}

export default CatalogBookItem;