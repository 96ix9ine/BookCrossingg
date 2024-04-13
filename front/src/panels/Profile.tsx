import { Panel, Group, SimpleCell, Avatar, NavIdProps, ModalRoot, ModalPage, Text, CellButton, PanelHeader, SplitLayout } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import '../styles/Profile.scss';
import { TabbarComponent } from "../components/Tabbar";
import { useState } from "react";
import "../styles/AboutBook.scss"
import * as React from "react";

export interface ProfileProps extends NavIdProps {
    fetchedUser?: UserInfo;
  }
  
  const Profile: React.FC<ProfileProps> = ({ fetchedUser }) => {
    const { photo_max_orig, city, first_name, last_name } = { ...fetchedUser };

    const[activeModal, setActiveModal]=useState('');

    const modal = (
      <ModalRoot activeModal={activeModal}>
        <ModalPage id="select" height={500} onClose={()=>setActiveModal(' ')}>
          <PanelHeader>
            <Text className="book_header">Книга</Text>
              </PanelHeader>
                <div className="book_title">
                    <img width={190} src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_655ef7271457c967f7e88543_655ef922b7f52370d5b5524b/scale_1200" alt="фото книги"></img>
                    <Text className="book_name">Заголовок книги</Text>
                </div>
                <SimpleCell className="user" before={<Avatar size={72} src={photo_max_orig} />}>
                  <p>{`${first_name + " " + last_name}`}</p>
                  <p>{`${city}`}</p>
                </SimpleCell>
                  <div className="book_info">
                    <div className="book_Author">
                      <Text className="book_description_title">Автор</Text>
                      <Text>Анджей Сапковский</Text>
                    </div>
                    <div className="book_Genre">
                      <Text className="book_description_title">Жанр</Text>
                      <Text className="genre">Современная зарубежная проза</Text>
                      <Text className="genre">Фентези</Text>
                      <Text className="genre">Романтика</Text>
                    </div>
                    <div className="book_Description">
                      <Text className="book_description_title">Описание книги</Text>
                      <Text>
                          Ведьмак — это мастер меча и мэтр волшебства, ведущий непрерывную войну
                           с кровожадными монстрами, которые угрожают покою сказочной страны. «Ведьмак»
                            — это мир на острие меча, ошеломляющее действие, незабываемые ситуации,
                             великолепные боевые сцены.
                          Читайте продолжение саги о Ведьмаке!
                      </Text>
                    </div>
                    <div className="bool_damage">
                      <Text className="book_description_title">Степень повреждения книги</Text>
                      <Text>Нет повреждений</Text>
                    </div>
                    <div className="book_Adress">
                      <Text className="book_description_title">Адрес встречи</Text>
                      <Text>Челябинск, Черкасская улица</Text>
                    </div>
                  </div>
                      <CellButton className="write-seller">
                      <span className="write-seller_btn">Написать продавцу</span>
            </CellButton>
        </ModalPage>
      </ModalRoot>
    );

    return (
      <Panel>
          <Group>
          <div className='user_background'></div>
            <div className='profile'>
            <SimpleCell className='profile_info' before={<Avatar size={82} src={photo_max_orig} />}>
              <p>{`${first_name}`}</p>
              <p>{`${city}`}</p>
            </SimpleCell>
            <div className='user_books'>
            <h1 className='header'>Мои книги</h1>
            <p className='no_books'>Здесь пока нет ни одной книги, которую вы бы хотели отдать. Подарите свою первую книгу другому</p>
            <div className="user_books_list">
               <div className="book book1" onClick={() => setActiveModal('select')}>
                <SplitLayout modal={modal}>
                <p className="name_book">Ведьмак</p>
                <p className="name_book author">Анджей Сапковский</p>
                </SplitLayout>
                </div>
               
               
              <div className="book book2" onClick={() => setActiveModal('select')}>
                <SplitLayout modal={modal}>
                <p className="name_book">Ведьмак</p>
                <p className="name_book author">Анджей Сапковский</p>
                </SplitLayout>
                </div>
                 
              <div className="book book3" onClick={() => setActiveModal('select')}>
                <SplitLayout modal={modal}>
                <p className="name_book">Это я</p>
                <p className="name_book author">Сашка</p>
                </SplitLayout>
                </div>
                
                {/*
              <div className="book book4">
                <p className="name_book">Это я</p>
                <p className="name_book author">Сашка</p>
                </div> */}
            </div>
            </div>
            </div>
          </Group>
          <TabbarComponent />
      </Panel>
    );
  }; 

  export default Profile;