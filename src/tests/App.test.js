import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  renderWithRouter(<App />);
  const homeTitle = screen.getByRole('link', {
    name: /home/i,
  });
  expect(homeTitle).toBeInTheDocument();

  const aboutTitle = screen.getByRole('link', {
    name: /about/i,
  });
  expect(aboutTitle).toBeInTheDocument();

  const favoriteTitle = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  expect(favoriteTitle).toBeInTheDocument();
});
test('na URL / ao clicar no link Home da barra de navegação', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', {
    name: /home/i,
  });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);
  expect(history.location.pathname).toBe('/');
});
test('Na URL /about, ao clicar no link About da barra de navegação', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);
  expect(history.location.pathname).toBe('/about');
});
test('Na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });

  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);
  expect(history.location.pathname).toBe('/favorites');
});
test('Página Not Found ao entrar em uma URL desconhecida.', () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/pagina/que-nao-existe/');
  });

  const notFoundTitle = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  expect(notFoundTitle).toBeInTheDocument();
});
