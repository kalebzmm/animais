export interface BaseAnimal {
  descricaoAnimal: string;
  grupoAnimais: grupoAnimais;
  classeAnimais: classeAnimais;
}

export interface Animal extends BaseAnimal {
  id: number;
}

export enum grupoAnimais {
	Terrestre = "Terrestre",
	Aquatico = "Aquatico",
}

export enum classeAnimais {
	Mamifero = "Mamifero",
	Reptil = "Reptil"
}