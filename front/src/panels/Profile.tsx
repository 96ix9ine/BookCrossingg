import React, { FC, useEffect, useState } from "react";
import { Panel, Group, SimpleCell, Avatar, NavIdProps } from "@vkontakte/vkui";
import  bridge, { UserInfo } from "@vkontakte/vk-bridge";
import '../styles/Profile.scss';
import { TabbarComponent } from "../components/Tabbar";

export interface ProfileProps extends NavIdProps {
    fetchedUser?: UserInfo;
  }
  
const Profile: React.FC<ProfileProps> = () => {

  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
    }
    fetchData();
  }, []);

    const { photo_max_orig, city, first_name, last_name } = { ...fetchedUser };
  
    return (
      <Panel>
          <Group>
          <div className='user_background'></div>
            <div className='profile'>
            <SimpleCell className='profile_info' before={<Avatar size={82} src={photo_max_orig} />}>
              <p>{`${first_name} ${last_name}`}</p>
              <p>{`${city?.title}`}</p>
            </SimpleCell>
            <div className='user_books'>
            <h1 className='header'>Мои книги</h1>
            <p className='no_books'>Здесь пока нет ни одной книги, которую вы бы хотели отдать. Подарите свою первую книгу другому</p>
            <div className="user_books_list">
              {/* <div className="book book1">
                <p className="name_book">Это я</p>
                <p className="name_book author">Сашка</p>
                </div>
              <div className="book book2">
                <p className="name_book">Это я</p>
                <p className="name_book author">Сашка</p>
                </div>
              <div className="book book3">
                <p className="name_book">Это я</p>
                <p className="name_book author">Сашка</p>
                </div>
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