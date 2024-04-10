import { Panel, Group, SimpleCell, Avatar, NavIdProps, Title, Text } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import '../styles/Profile.scss';
import { TabbarComponent } from "../components/Tabbar";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useEffect, useRef } from "react";
import anime from 'animejs/lib/anime.es.js';
import svg1 from "../img/svg1.svg";
import svg2 from "../img/svg2.svg";
import svg3 from "../img/svg3.svg";
import svg4 from "../img/svg4.svg";
import { getUserIdFx } from "../api/addUserApi";
import { useUnit } from "effector-react";
import { $user, $userServerStore } from "../store/user";
import { getUserBooks } from "../api/addBookApi";

export interface ProfileProps extends NavIdProps {
    fetchedUser?: UserInfo;
}
  
const Profile = () => {
  // const { photo_max_orig, city, first_name, id } = { ...fetchedUser };
  const router = useRouteNavigator();

  const user = useUnit($user);
  const userServer = useUnit($userServerStore);

  const userId = user?.id.toString();

  const books = getUserBooks(userServer.vkId);


  useEffect(() => {
    console.log(user?.city.title);
    console.log(userServer.vkId)
    console.log(books);
  }, [user])

  return (
    <Panel>
        <Group>
        <div className='user_background'></div>
          <div className='profile'>
            <SimpleCell className='profile_info' before={<Avatar size={82} src={user?.photo_200}/>}>
              <Title>{`${user?.first_name}`}</Title>
              <Text>{`${user?.city.title}`}</Text>
            </SimpleCell>
            <div className='user_books'>
              <h1 className='header'>Мои книги</h1>
              <p className='no_books'>Здесь пока нет ни одной книги, которую вы бы хотели отдать. Подарите свою первую книгу другому</p>
              <div className="user_books_list">
                <div className="book book1" onClick={() => [router.push("/aboutbook")]}>
                  <p className="name_book">Это я</p>
                  <p className="name_book author">Сашка</p>
                </div>
                  {/*
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