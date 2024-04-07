import React, { useState } from 'react';
import { View, Panel, Button, Title, Div, Tabbar, TabbarItem, Image, Group, CustomSelect, Checkbox, usePlatform, Search, Cell, Footer, PanelHeader, PanelHeaderButton, VisuallyHidden, PanelHeaderBack, SimpleCell, Avatar, CardGrid, Card, Subhead } from '@vkontakte/vkui';
import "../styles/StartScreens.scss";
import {StartSearchComponent} from '../components/StartSearchComponent';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const StartScreensPanel: React.FC = () => {
    const [activePanel, setActivePanel] = useState<string>("1");
    const [simple, setSimple] = useState<string>("one");

    const router = useRouteNavigator();

    const handleTabClick = (panel: string, value: string) => {
        setActivePanel(panel);
        setSimple(value);
    };
    const goHeaderSearch = () => setActivePanel("header-search");

    return (
        <View activePanel={activePanel}>
            <Panel id="1">
                <Div className='start_div_container'>
                    <Tabbar className='start_nav_wrapper'>

                    <TabbarItem className='start_nav_item' selected={simple === 'one'} onClick={() => handleTabClick("1", "one")}>
                    </TabbarItem>

                    <TabbarItem className='start_nav_item' selected={simple === 'two'} onClick={() => handleTabClick("2", "two")}>
                    </TabbarItem>

                    <TabbarItem className='start_nav_item' selected={simple === 'three'} onClick={() => handleTabClick("3", "three")}>
                    </TabbarItem>

                    </Tabbar>
                
                    <Div className='start_group_container'>
                        <Image className='start_group_img'></Image>
                        <Title className='start_group_title'>Добро пожаловать, друг!</Title>
                        
                    </Div>
                    <Div className='start_div_footer'>
                        <Button className='start_button left-btn' onClick={() => router.push('/')}>Пропустить</Button>
                        <Button className='start_button right-btn' onClick={() => handleTabClick("2", "two")}>Далее</Button>  
                    </Div>
                </Div>
            </Panel>

            <Panel id='2'>
                <Div className='start_div_container'>
                    <Tabbar className='start_nav_wrapper'>

                    <TabbarItem className='start_nav_item' selected={simple === 'one'} onClick={() => handleTabClick("1", "one")}>
                    </TabbarItem>

                    <TabbarItem className='start_nav_item' selected={simple === 'two'} onClick={() => handleTabClick("2", "two")}>
                    </TabbarItem>

                    <TabbarItem className='start_nav_item' selected={simple === 'three'} onClick={() => handleTabClick("3", "three")}>
                    </TabbarItem>

                    </Tabbar>

                    <Title className='start_search_title'>Выберите свой город</Title>
                    <Div className='start_div_seacrh'>
                        <StartSearchComponent goHeaderSearch={goHeaderSearch}/>
                    </Div>
                </Div>
            </Panel>

            <Panel id='3'>
                <Div className='start_div_container'>
                    <Tabbar className='start_nav_wrapper'>

                    <TabbarItem className='start_nav_item' selected={simple === 'one'} onClick={() => handleTabClick("1", "one")}>
                    </TabbarItem>

                    <TabbarItem className='start_nav_item' selected={simple === 'two'} onClick={() => handleTabClick("2", "two")}>
                    </TabbarItem>

                    <TabbarItem className='start_nav_item' selected={simple === 'three'} onClick={() => handleTabClick("3", "three")}>
                    </TabbarItem>

                    </Tabbar>
                    
                    <CardGrid size='s' className='start_grid'>
                        <Card className='start_grid_item' id='card_1'/>        
                        <Card className='start_grid_item' id='card_2'/>
                        <Card className='start_grid_item' id='card_3'/>
                        <Card className='start_grid_item' id='card_4'/>
                        <Card className='start_grid_item' id='card_5'/>
                        <Card className='start_grid_item' id='card_6'/>
                        <Card className='start_grid_item' id='card_7'/>
                        <Card className='start_grid_item' id='card_8'/>
                        <Card className='start_grid_item' id='card_9'/>
                    </CardGrid>

                    <Title className='start_grid_title'>Обнови свою книжную полку!</Title>
                    <Subhead className='start_grid_subtitle'>Тут ты сможешь отдавать, продавать и обмениваться книгами с другими пользователями</Subhead>
                    
                    <Div className='start_div_footer footer'>
                        <Button className='start_grid_button' onClick={() => router.push("/")}>Начать</Button>
                    </Div>
                </Div>
            </Panel>
        </View>
    );
}