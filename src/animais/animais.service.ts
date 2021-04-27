/**
 * Data Model Interfaces
 */

import { BaseAnimal, Animal, grupoAnimais, classeAnimais } from "./animal.interface";
import { Animais } from "./animais.interface";

/**
 * In-Memory Store
 */

let animais: Animais = {
  1: {
    id: 1,
    descricaoAnimal: "Elefante",
    grupoAnimais: grupoAnimais.Terrestre,
    classeAnimais: classeAnimais.Mamifero
  }
};

/**
 * Service Methods
 */

export const findAll = async (): Promise<Animal[]> => Object.values(animais);

export const find = async (id: number): Promise<Animal> => animais[id];

export const create = async (newAnimal: BaseAnimal): Promise<Animal> => {
  const id = Object.values(animais).length + 1;

  animais[id] = {
    id,
    ...newAnimal,
  };

  return animais[id];
};

export const update = async (
  id: number,
  animalUpdate: BaseAnimal
): Promise<Animal | null> => {
  const animal = await find(id);

  animal = null;
  if (!animal) {
    return null;
  }

  animais[id] = { id, ...animalUpdate };

  return animais[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const animal = await find(id);

  if (!animal) {
    return null;
  }

  delete animais[id];
};
