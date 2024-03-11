import { Request, Response } from "express";
import { Todo } from "../../entity/Todo";
import { AppDataSource } from "../../data-source";
import { successResponse } from "../utils/controller.utils";

export const list = async (req: Request, res: Response) => {
  let todos = await AppDataSource.manager.find(Todo, {
    select: {
      id: true,
      title: true,
      done: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.json(successResponse(todos));
};
