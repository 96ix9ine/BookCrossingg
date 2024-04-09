import { Panel, Group, SimpleCell, Avatar, NavIdProps, Title, Text } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import '../styles/Profile.scss';
import { TabbarComponent } from "../components/Tabbar";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { getUserIdFx } from "../api/addUserApi";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { $user } from "../store/user";

export interface ProfileProps extends NavIdProps {
    fetchedUser?: UserInfo;
  }
  
const Profile = () => {
  // const { photo_max_orig, city, first_name, id } = { ...fetchedUser };
  const router = useRouteNavigator();

  const user = useUnit($user);

  useEffect(() => {
    console.log(user?.city.title);
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