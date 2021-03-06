import React from 'react'
import styled from 'styled-components'
import {Avatar, IconButton, Button} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import Chat from '../components/Chat'

function Sidebar() {

    const [user] = useAuthState(auth);

    const userChatRef = db.collection('chats').where('users', 'array-contains', user?.email)

    const [chatsSnapshot] = useCollection(userChatRef)

    const createAChat = () => {
        const input = prompt("Please Enter An Email Address For The User You Want To Chat With");
        // const input = "lmaoded"
        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input != user.email ) {
            db.collection('chats').add({
                users: [user.email, input],
            })
        }
    };

    const chatAlreadyExists = (recepientEmail) => 
        !!chatsSnapshot?.docs.find
        ((chat) => 
        chat.data().users.find((user) => user === recepientEmail)?.length > 0)
    

    return (
        <Container>
            <Header>
                <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()}/>
                <IconsContainer>
                    <IconButton><ChatIcon/></IconButton>
                    <IconButton><MoreVertIcon/></IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Search in Chats"/>
            </Search>

            <SidebarButton onClick={() => createAChat()}>Start A New Chat</SidebarButton>
        
            {chatsSnapshot?.docs.map(chat => (
                <Chat
                    key={chat.id}
                    id={chat.id}
                    users={chat.data().users}
                />
            ))}
        
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    flex: 0.45;
    height: 100vh;
    min-width: 250px;
    max-width: 300px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index:1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`
    display: flex;
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`;

const SidebarButton = styled(Button)`
    width: 100%;
    &&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    }
`;
