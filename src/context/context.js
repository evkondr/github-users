import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({children}) => {
    //Hooks
    const [ghUser, setGhUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({show:false, msg:""});
    //FUNCTIONS
    //Error handling 
    const toggleError = (show = false, msg = "") => {
        setError({show, msg});
    }
    //Checking requests
    const checkRequest = async () => {
        //Checks how much requests are left 
        try {
            const {data} = await axios(`${rootUrl}/rate_limit`);
            let {rate:{ remaining }} = data;
            setRequests(remaining);
            if(remaining === 0){
                toggleError(true, "Sorry, you have exceded all your requests")
            }
        } catch (error) {
            console.log(error)
        }
    }
    //searching users
    const searchGithubUser = async (user) => {
        toggleError();
        setLoading(true)
        try {
            //getting user
            const response = await axios(`${rootUrl}/users/${user}`);
            setGhUser(response.data)
            const {repos_url, followers_url} = response.data
            //gettin user's repos
            const {data:userRepos} = await axios(`${repos_url}?per_page=100`);
            setRepos(userRepos)
            //gettin user's followers
            const {data:userFollowers} = await axios(`${followers_url}?per_page=100`);
            setFollowers(userFollowers)
        } catch (error) {
            toggleError(true, error.message)
            setLoading(false)
        } finally {
            setLoading(false)
            checkRequest()
        }
    }
    //component did mount
    useEffect(() => {
        checkRequest()
    }, [])
    //return
    return <GithubContext.Provider value={{ghUser, repos, followers, requests, searchGithubUser, error, loading}}>{children}</GithubContext.Provider>
}
export {GithubProvider, GithubContext}