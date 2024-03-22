import { Button, Panel, PanelHeader } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";


const AddBookPanel = (): JSX.Element => {
    const routeNavigator = useRouteNavigator();


    return (
        <Panel>
            <PanelHeader>
                <p>asd</p>
                <Button
                    value="Перейти на карту"
                    onClick={() => {routeNavigator.push("/map")}}
                />
                <Button
                    value="Перейти на карту"
                    onClick={() => {routeNavigator.push("/persik")}}
                />
            </PanelHeader>
        </Panel>
    );
}


export default AddBookPanel;