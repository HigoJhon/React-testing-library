import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);

  const aboutTitle = screen.getByRole('heading', {
    name: /about pokédex/i,
  });
  expect(aboutTitle).toBeInTheDocument();
});
test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const aboutP = screen.getByText(
    /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
  );
  const aboutP2 = screen.getByText(
    /one can filter pokémon by type, and see more details for each one of them/i,
  );

  expect(aboutP).toBeInTheDocument();
  expect(aboutP2).toBeInTheDocument();
});
test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  renderWithRouter(<About />);

  const imagem = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const img = screen.getByRole('img', {
    name: /pokédex/i,
  });

  expect(img).toBeInTheDocument();
  expect(img.src).toBe(imagem);
});
test('', () => {});
