import { 
    PanelHeader, 
    Text, 
    Group,
    CellButton,
    Cell
} from "@vkontakte/vkui";


const AddBookPanelHeaderComponent = (): JSX.Element => {
    return (
        <PanelHeader className="addBook__panelheader">
            <Group className="group">
                <Text
                    className="panelheader__title"
                >
                    Добавить книгу
                </Text>
                <Cell
                    onClick={() => {}} 
                    className="cellbutton"
                >
                    <Text className="cellbutton__text">Очистить</Text>
                </Cell>
            </Group>
        </PanelHeader>
    )
}


export default AddBookPanelHeaderComponent;