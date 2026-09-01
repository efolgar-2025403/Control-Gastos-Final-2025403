import {
  CreateIncomeInput,
  Income,
  UpdateIncomeInput
} from '../models/income.model.js';

import {
  IncomeRepository,
  CreateIncomeData,
  UpdateIncomeData
} from '../repositories/income.repository.js';


const incomeRepository = new IncomeRepository();


export async function getIncomes(
  userId: number
): Promise<Income[]> {

  return incomeRepository.findAll(userId);

}


export async function getIncomeById(
  id: string,
  userId: number
): Promise<Income | null> {

  return incomeRepository.findById(
    id,
    userId
  );

}


export async function createIncome(
  input: CreateIncomeInput,
  userId: number
): Promise<Income> {

  const data: CreateIncomeData = {

    amount: input.amount,

    description:
      input.description ?? null,

    date: input.date,

    category_id: input.category_id,

    user_id: userId

  };

  return incomeRepository.create(data);

}


export async function updateIncome(
  id: string,
  input: UpdateIncomeInput,
  userId: number
): Promise<Income | null> {

  const data: UpdateIncomeData = {

    amount: input.amount,

    description:
      input.description ?? null,

    date: input.date,

    category_id: input.category_id

  };

  return incomeRepository.update(
    id,
    userId,
    data
  );

}


export async function deleteIncome(
  id: string,
  userId: number
): Promise<boolean> {

  return incomeRepository.delete(
    id,
    userId
  );

}