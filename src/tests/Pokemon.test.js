import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(<App />);

  const name = screen.getByText(/pikachu/i);
  expect(name).toBeInTheDocument();
  const tipo = screen.queryByTestId('pokemon-type');
  expect(tipo).toBeInTheDocument();
  const kg = screen.queryByTestId('pokemon-weight');
  expect(kg).toBeInTheDocument();
  const imagem = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(imagem).toBeInTheDocument();
  const linkDet = screen.getByRole('link', { name: /more details/i });
  expect(linkDet).toBeInTheDocument();
});
test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
  renderWithRouter(<App />);

  const linkDet = screen.getByRole('link', { name: /more details/i });
  expect(linkDet).toBeInTheDocument();
});
test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento ', () => {
  const { history } = renderWithRouter(<App />);

  const next = screen.getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(next);
  const linkDet = screen.getByRole('link', { name: /more details/i });
  expect(linkDet).toBeInTheDocument();
  userEvent.click(linkDet);

  expect(history.location.pathname).toBe('/pokemon/4');

  const details = screen.getByRole('heading', { name: /charmander details/i });
  expect(details).toBeInTheDocument();

  const summary = screen.getByRole('heading', { name: /summary/i });
  expect(summary).toBeInTheDocument();

  const locations = screen.getByRole('heading', { name: /game locations of charmander/i });
  expect(locations).toBeInTheDocument();
});
test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  renderWithRouter(<App />);

  const linkDet = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkDet);

  const newPag = screen.getByRole('heading', { name: /pikachu details/i });
  expect(newPag).toBeInTheDocument();

  const name = screen.queryByTestId('pokemon-name');
  expect(name).toBeInTheDocument();
  expect(name.textContent).toBe('Pikachu');

  const tipo = screen.queryByTestId('pokemon-type');
  expect(tipo).toBeInTheDocument();
  expect(tipo.textContent).toBe('Electric');

  const peso = screen.queryByTestId('pokemon-weight');
  expect(peso).toBeInTheDocument();
  expect(peso.textContent).toBe('Average weight: 6.0 kg');

  const img = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(img.alt).toBe('Pikachu sprite');
});
test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
  const { history } = renderWithRouter(<App />);

  const linkDet = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkDet);
  expect(history.location.pathname).toBe('/pokemon/25');

  const img = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(img).toBeInTheDocument();

  const clickFav = screen.getByText(/pokémon favoritado\?/i);
  expect(clickFav).toBeInTheDocument();

  userEvent.click(clickFav);

  const fav = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(fav).toBeInTheDocument();
  expect(fav.src).toBe('http://localhost/star-icon.svg');
});
