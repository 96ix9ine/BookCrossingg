import { Panel, Group, SimpleCell, Avatar, NavIdProps, Title, Text, CellButton, Div } from "@vkontakte/vkui";
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
import { getUserBooksFx } from "../api/addBookApi";
import { $books } from "../store/addBook";
import { BookFactory } from "../components/BookFactory";

export interface ProfileProps extends NavIdProps {
    fetchedUser?: UserInfo;
}
  
const Profile = () => {
  // const { photo_max_orig, city, first_name, id } = { ...fetchedUser };
  const router = useRouteNavigator();

  const user = useUnit($user);
  const userServer = useUnit($userServerStore);

  // const userId = userServer.id.toString();
  const books = useUnit($books);


  useEffect(() => {
    async function getBooks() {
      await getUserBooksFx(userServer.id);
    }

    getBooks();
    console.log(books);
  }, [])

  return (
    <Panel>
        <Group>
        <div className='user_background'></div>
          <div className=''>
            <SimpleCell className='profile_info' before={<Avatar size={82} src={user?.photo_200}/>}>
              <Title>{`${user?.first_name}`}</Title>
              <Text>{`${user?.city.title}`}</Text>
            </SimpleCell>
            <div className=''>
              <h1 className='header'>Мои книги</h1>
              {
                books.length == 0 
                ? 
                <p className='no_books'>Здесь пока нет ни одной книги, которую вы бы хотели отдать. Подарите свою первую книгу другому</p>
                :
                <div className="">
                  <div className="user_books_list" onClick={() => [router.push("/aboutbook")]}>
                    <BookFactory />
                  </div>
                  
                </div>
              }
              
             
            </div>
          </div>
        </Group>
        <TabbarComponent />
    </Panel>
  );
}; 

  export default Profile;