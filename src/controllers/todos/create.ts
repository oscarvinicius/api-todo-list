import { Request, Response } from "express";
import * as yup from "yup";
import { Todo } from "../../entity/Todo";
import { AppDataSource } from "../../data-source";
import {
  buildValidationErrorResponse,
  failResponse,
  successResponse,
} from "../utils/controller.utils";

interface ICreateTodoRequest {
  title: string;
  description?: string;
  done: boolean;
}

const requestSchema: yup.Schema<ICreateTodoRequest> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  done: yup.bool().required(),
});

export const create = async (
  req: Request<{}, {}, ICreateTodoRequest>,
  res: Response
) => {
  let data: ICreateTodoRequest | undefined = undefined;

  try {
    data = await requestSchema.validate(req.body, { abortEarly: false });

    const todo = new Todo();
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
