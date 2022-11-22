import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);

  const textH2 = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  expect(textH2).toBeInTheDocument();
});
test('Teste se a página mostra a imagem', () => {
  renderWithRouter(<NotFound />);
  const imagem = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const img = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  expect(img).toBeInTheDocument();
  expect(img.src).toBe(imagem);
});
