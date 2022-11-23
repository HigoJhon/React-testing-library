import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);

  const h2 = screen.getByRole('heading', {
    name: /encountered pokémon/i,
  });
  expect(h2).toBeInTheDocument();
});
test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  renderWithRouter(<App />);

  const nextBtn = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });

  expect(nextBtn).toBeInTheDocument();

  userEvent.click(nextBtn);

  const newPokemon = screen.getByText(/charmander/i);
  expect(newPokemon).toBeInTheDocument();

  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);
  userEvent.click(nextBtn);

  const lastPokemon = screen.getByText(/dragonair/i);
  expect(lastPokemon).toBeInTheDocument();

  userEvent.click(nextBtn);

  const fistPokemon = screen.getByText(/pikachu/i);
  expect(fistPokemon).toBeInTheDocument();
});
test('Teste se é mostrado apenas um Pokémon por vez;', () => {
  renderWithRouter(<App />);

  const fistPokemon = screen.getByText(/pikachu/i);
  expect(fistPokemon).toBeInTheDocument();

  const nextBtn = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });

  userEvent.click(nextBtn);

  const newPokemon = screen.getByText(/charmander/i);
  expect(newPokemon).toBeInTheDocument();
});
test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);

  const checkBtn = screen.queryAllByTestId('pokemon-type-button');
  console.log(checkBtn);
  expect(checkBtn[0]).toBeInTheDocument();
});
test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);

  const fastPok = screen.getByText(/pikachu/i);
  expect(fastPok).toBeInTheDocument();
  const clickFire = screen.getByRole('button', { name: /fire/i });
  expect(clickFire).toBeInTheDocument();
  userEvent.click(clickFire);

  const charm = screen.getByText(/charmander/i);
  expect(charm).toBeInTheDocument();

  const clickAll = screen.getByRole('button', { name: /all/i });
  userEvent.click(clickAll);
  const pika = screen.getByText(/pikachu/i);
  expect(pika).toBeInTheDocument();
});
