import React from 'react';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return <Wrapper>
        <a href='https://github.com/evkondr/github-users' target='_blank' rel="noopener noreferrer"><AiFillGithub/>source code</a>
  </Wrapper>
};

const Wrapper = styled.nav`
  margin-top: 1rem;
  padding: 1.5rem;
  background: var(--clr-white);
  text-align: center;
  color: var(--clr-black);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  a{
    color: var(--clr-black);
    svg{
        font-size: 1.5rem;
        margin-right: 0.5rem;
        vertical-align: text-top;
    }
  }
`;

export default Footer;
