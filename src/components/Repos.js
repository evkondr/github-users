import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const {repos} = React.useContext(GithubContext);
  let chartData = repos.reduce((data, item) => {
    //This makes repos data suit for chart data
    const {language, stargazers_count} = item;
    if(!language) return data
    if(data.hasOwnProperty(language)){
      data[language] = {...data[language], value: data[language].value + 1 }
    }else{
      data[language] = {label: language, value: 1, stars: stargazers_count}
    }
    return data
  }, []);

  const usedLanguages = Object.values(chartData).sort((a,b) => b.values - a.value);
  const mostPopular = Object.values(chartData).sort((a,b) => b.stars - a.stars).map((item) => { return {...item, value: item.stars}})
  let {stars, forks} = repos.reduce((total, item) => {
    const {stargazers_count, name, forks} = item;
    total.stars[stargazers_count] = {label: name, value: stargazers_count}
    total.forks[forks] = {label: name, value: forks}
    return total;
  }, {stars:{}, forks: {}})

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return <section className='section'>
    <Wrapper className='section-center'>
      <Pie3D chartData={usedLanguages}/>
      <Column3D chartData={stars}/>
      <Doughnut2D chartData={mostPopular}/>
      <Bar3D chartData={forks}/>
    </Wrapper>
  </section>
};
//STYLES
const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
