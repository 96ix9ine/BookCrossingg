import { Panel, Group, SimpleCell, Avatar, NavIdProps, Div } from "@vkontakte/vkui";
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


export interface ProfileProps extends NavIdProps {
    fetchedUser?: UserInfo;
  }
  
  const Profile: React.FC<ProfileProps> = ({ fetchedUser }) => {
    const { photo_max_orig, city, first_name } = { ...fetchedUser };
    const router = useRouteNavigator();

    const profileBackgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      anime({
        targets: profileBackgroundRef.current,
        background: [
          'linear-gradient(90deg, rgba(131,140,152,1) 0%, rgba(38,136,235,1) 50%, rgba(0,0,0,1) 100%)',
          'linear-gradient(-90deg, rgba(131,140,152,1) 0%, rgba(38,136,235,1) 50%, rgba(0,0,0,1) 100%)'
        ],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        duration: 20000,
      });
    }, [])
  
    return (
      <Panel>
          <Group>
          <div className='user_background' ></div>
            <div className='profile' ref={profileBackgroundRef} >
            <SimpleCell className='profile_info' before={<Avatar size={82} src={photo_max_orig} />}>
              <p>{`${first_name}`}</p>
              <p>{`${city}`}</p>
            </SimpleCell>            
            <div className='user_books'>
            <h1 className='header'>Мои книги</h1>
            <p className='no_books'>Здесь пока нет ни одной книги, которую вы бы хотели отдать. Подарите свою первую книгу другому</p>
            <div className="user_books_list">
              <Div className="book_container">
                <Div className="book_container-wrapper">
                  <div className="book book1" onClick={() => [router.push("/aboutbook")]}></div>
                  <Div>
                    <p className="name_book">Это я</p>
                    <p className="name_book author">Сашка</p>
                  </Div>
                </Div>
              </Div>
            </div>
            </div>
            </div>
          </Group>
          <TabbarComponent />
      </Panel>
    );
  }; 

  export default Profile;