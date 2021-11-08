import { Avatar } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components'
import getRecepientEmail from '../utils/getRecepientEmail';
import { auth, db } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore' 
import { useRouter } from 'next/router'

function Chat({ id, users }) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [recepientSnapshot] = useCollection(
        db.collection("users").where("email", '==', getRecepientEmail(users,user))
        );

    const recepientEmail = getRecepientEmail(users, user)
    const recepient = recepientSnapshot?.docs?.[0]?.data();

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    return (
        <Container onClick={enterChat}>
            {recepient ? 
                (<UserAvatar src={recepient?.photoURL}/> ) 
                :
                (<UserAvatar>{recepientEmail[0]}</UserAvatar>)   }
            
            <p>{recepientEmail}</p>
        </Container>
    )
}

export default Chat;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;
    :hover{
        background-color: #e9eaeb;
    }
`;
const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;
