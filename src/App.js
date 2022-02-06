import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import StoreProvider from './store/StoreProvider';
import HomeView from './views/Home';
import ChatView from './views/Chat';

import WelcomeView from './views/Welcome';
import SettingsView from './views/Settings';

import LoadingView from './components/shared/Loading';

import {listenToAuthChanges} from './actions/auth';
import {listenToConnectionChanges} from './actions/app';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import { checkUserConnection } from './actions/connection';
//import { loadInitialSettings } from './actions/settings';

const ContentWrapper = ({children}) => {
    const isDarkTheme  = useSelector(({settings}) => settings.isDarkTheme);
    return (
        <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>
    )
}

function ChatApp() {
    const dispatch = useDispatch();
    const isChecking = useSelector(({auth}) => auth.isChecking);
    const user = useSelector(({auth}) => auth.user);

        useEffect(() => {
           // dispatch(loadInitialSettings());
            const unsubFromAuth = dispatch(listenToAuthChanges());
            const unsubFromConnection = dispatch(listenToConnectionChanges());

            return () => {
                unsubFromAuth();
                unsubFromConnection();
            }
        }, [dispatch]);

        useEffect(() => {
            let unsubFromUserConnection;
            if (user?.uid) {
                unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
            }

            return () => {
                unsubFromUserConnection && unsubFromUserConnection();
            }
        }, [dispatch, user])

    if (isChecking) {
        return <LoadingView />
    }

    return (
        <Router>
            {isChecking ? <LoadingView/> :
                <ContentWrapper>
                    {user ?
                        <>
                            <Navbar/>
                            <Routes>
                                <Route path="/" element={<WelcomeView/>}/>
                                <Route path="/home" element={<HomeView/>}/>
                                <Route path="/chat/:id" element={<ChatView/>}/>
                                <Route path="/settings" element={<SettingsView/>}/>
                            </Routes>
                        </>
                        :
                            <Routes>
                                <Route path="/*" element={<WelcomeView/>}/>
                            </Routes>
                        }

                </ContentWrapper>
            }
        </Router>
    )
}

export default function App() {
    return (
        <StoreProvider>
            <ChatApp />
        </StoreProvider>
    )
}