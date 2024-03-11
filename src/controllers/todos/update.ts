import { Request, Response } from "express";
import * as yup from "yup";
import { Todo } from "../../entity/Todo";
import { AppDataSource } from "../../data-source";
import {
  buildValidationErrorResponse,
  failResponse,
  successResponse,
} from "../utils/controller.utils";

interface IUpdateTodoRequest {
  title: string;
  description?: string;
  done: boolean;
}

const requestSchema: yup.Schema<IUpdateTodoRequest> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  done: yup.bool().required(),
});

export const update = async (req: Request, res: Response) => {
  let todoId = req.params.id;

  if (todoId == undefined) {
    return res.status(404);
  }

  let data: IUpdateTodoRequest | undefined = undefined;

  try {
    data = await requestSchema.validate(req.body, { abortEarly: false });

    const todo = await AppDataSource.manager.findOneBy(Todo, {
      id: parseInt(todoId),
    });

    if (todo == undefined) {
      return res.json(failResponse());
    }

    todo.title = data.title;
    todo.description = data.description ?? undefined;
    todo.done = data.done;

    await AppDataSource.manager.save(todo);
    return res.json(successResponse(todo));
  } catch (err) {
    console.error(err);
    let errors = buildValidationErrorResponse(err);
    return res.json(failResponse(errors));
  }
};
