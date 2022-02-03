'use strict';

// Este archivo está para el funcionamiento de la selección de plataformas de una pelicula
window.addEventListener('load', () => {
  let boton = document.querySelector('#quitarPlataformes');
  let plataformesSelect = document.querySelector('#plataformes');
  let seleccionado = false;

  if (!plataformesSelect) return;

  plataformesSelect.childNodes.forEach((select) => {
    if (select.selected) seleccionado = true;
  });

  if (!seleccionado) boton.classList.add('d-none');

  plataformesSelect.addEventListener('click', () => {
    if (boton.classList.contains('d-none')) boton.classList.remove('d-none');
  });

  boton.addEventListener('click', (event) => {
    event.preventDefault();
    boton.classList.add('d-none');
    plataformesSelect.childNodes.forEach((select) => (select.selected = false));
  });
});
