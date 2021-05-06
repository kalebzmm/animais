/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as AnimalService from "./animais.service";
import { BaseAnimal, Animal } from "./animal.interface";

/**
 * Router Definition
 */

export const animaisRouter = express.Router();

/**
 * Controller Definitions
 */

animaisRouter.get("/", async (req: Request, res: Response) => {
  try {
    const animais: Animal[] = await AnimalService.findAll();
    
    res.status(200).send(animais);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// GET animal/:id

animaisRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const animal: Animal = await AnimalService.find(id);

    if (animal) {
      return res.status(200).send(animal)
    }

    res.status(404).send("animal not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// POST animal

animaisRouter.post("/", async (req: Request, res: Response) => {
  try {
    const animal: BaseAnimal = req.body;

    const newAnimal = await AnimalService.create(animal);

    res.status(201).json(newAnimal);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// PUT animal/:id

animaisRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const animalUpdate: Animal = req.body;

    const existingAnimal: Animal = await AnimalService.find(id);

    if (existingAnimal) {
      const updatedAnimal = await AnimalService.update(id, animalUpdate);
      return res.status(200).json(updatedAnimal);
      
    }

    const newAnimal = await AnimalService.create(animalUpdate);

    res.status(201).json(newAnimal);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE animal/:id

animaisRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await AnimalService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
