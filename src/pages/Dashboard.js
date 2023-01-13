import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
import Footer from '../components/Footer';
const Dashboard = () => {
  const {loading} = React.useContext(GithubContext);
  if(loading){
    return <main>
    <Navbar></Navbar>
    <Search/>
    <img src={loadingImage} className='loading-img ' alt='loading' />
 </main>
  }
  return (
    <main>
       <Navbar />
       <Search />
       <Info />
       <User />
       <Repos />
       <Footer />
    </main>
  );
};

export default Dashboard;
