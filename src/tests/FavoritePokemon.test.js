import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<App />);

  const linkFavo = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  userEvent.click(linkFavo);

  const aboutTitle = screen.getByText(/no favorite pokémon found/i);
  expect(aboutTitle).toBeInTheDocument();
});
test('Teste se são exibidos todos os cards de Pokémon favoritados', () => {
  renderWithRouter(<App />);

  const homeTitle = screen.getByRole('link', {
    name: /home/i,
  });
  userEvent.click(homeTitle);

  const pokemonLink = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(pokemonLink);

  const pokemonFav = screen.getByText(/pokémon favoritado\?/i);
  userEvent.click(pokemonFav);

  const LinkFav = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  userEvent.click(LinkFav);

  const renderPoke = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });

  expect(renderPoke).toBeInTheDocument();
});
