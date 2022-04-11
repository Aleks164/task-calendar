import {TaskType } from "../../taskCreator/types/taskType";

export interface CRUDType {
  create(newEl: TaskType): Promise<TaskType>;

  getItemById(id: number): Promise<TaskType | null>;

  getItemByColor(color: string): Promise<TaskType[]>;

  getItemByDate(date: number): Promise<TaskType | null>;

  getItemByStatus(Status: string): Promise<TaskType[]>;

  getItemByTags(Tags: string[]): Promise<TaskType[]>;

  update(id: number, elForUpdate: TaskType): Promise<TaskType | null>;

  delete(id: number): Promise<void | null>;
}
