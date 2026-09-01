import {
  CreateExpenseInput,
  Expense,
  UpdateExpenseInput
} from '../models/expense.model.js';

import {
  ExpenseRepository,
  CreateExpenseData,
  UpdateExpenseData
} from '../repositories/expense.repository.js';


const expenseRepository = new ExpenseRepository();


export async function getExpenses(
  userId: number
): Promise<Expense[]> {

  return expenseRepository.findAll(userId);

}


export async function getExpenseById(
  id: string,
  userId: number
): Promise<Expense | null> {

  return expenseRepository.findById(
    id,
    userId
  );

}


/**
 * Crear un nuevo gasto.
 *
 * Antes de guardar el gasto se comprueba
 * que el usuario tenga suficiente saldo disponible.
 */
export async function createExpense(
  input: CreateExpenseInput,
  userId: number
): Promise<Expense> {

  const amount = Number(input.amount);


  if (!Number.isFinite(amount)) {
    throw new Error(
      'El monto del gasto no es válido.'
    );
  }


  if (amount <= 0) {
    throw new Error(
      'El monto debe ser mayor que cero.'
    );
  }


  const availableBalance =
    await expenseRepository.getAvailableBalance(
      userId
    );


  if (amount > availableBalance) {

    throw new Error(
      `Saldo insuficiente. ` +
      `Disponible: Q${availableBalance.toFixed(2)}. ` +
      `Gasto solicitado: Q${amount.toFixed(2)}.`
    );

  }


  const data: CreateExpenseData = {

    amount,

    description:
      input.description ?? null,

    date: input.date,

    category_id:
      input.category_id,

    user_id:
      userId

  };


  return expenseRepository.create(
    data
  );

}


/**
 * Actualizar un gasto existente.
 *
 * Al editar se excluye el gasto actual
 * del cálculo para evitar contarlo dos veces.
 */
export async function updateExpense(
  id: string,
  input: UpdateExpenseInput,
  userId: number
): Promise<Expense | null> {

  const amount = Number(input.amount);


  if (!Number.isFinite(amount)) {
    throw new Error(
      'El monto del gasto no es válido.'
    );
  }


  if (amount <= 0) {
    throw new Error(
      'El monto debe ser mayor que cero.'
    );
  }


  const existingExpense =
    await expenseRepository.findById(
      id,
      userId
    );


  if (!existingExpense) {
    return null;
  }


  const availableBalance =
    await expenseRepository
      .getAvailableBalanceForUpdate(
        id,
        userId
      );


  if (amount > availableBalance) {

    throw new Error(
      `Saldo insuficiente. ` +
      `Disponible para este gasto: ` +
      `Q${availableBalance.toFixed(2)}. ` +
      `Gasto solicitado: Q${amount.toFixed(2)}.`
    );

  }


  const data: UpdateExpenseData = {

    amount,

    description:
      input.description ?? null,

    date:
      input.date,

    category_id:
      input.category_id

  };


  return expenseRepository.update(
    id,
    userId,
    data
  );

}


export async function deleteExpense(
  id: string,
  userId: number
): Promise<boolean> {

  return expenseRepository.delete(
    id,
    userId
  );

}