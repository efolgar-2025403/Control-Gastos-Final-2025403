import { Response } from 'express';

import {
  AuthenticatedRequest
} from '../../auth/middlewares/auth.middleware.js';

import {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome
} from '../services/income.service.js';


function getParamId(
  id: string | string[]
): string | null {

  if (Array.isArray(id)) {
    return null;
  }

  return id;
}


export async function createIncomeController(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {

  try {

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });

    }

    const income = await createIncome(
      req.body,
      req.user.id
    );

    return res.status(201).json({
      success: true,
      data: income
    });

  } catch (error) {

    console.error(
      'Error creating income:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Error creating income'
    });

  }

}


export async function getIncomesController(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {

  try {

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });

    }

    const incomes = await getIncomes(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      data: incomes
    });

  } catch (error) {

    console.error(
      'Error getting incomes:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Error getting incomes'
    });

  }

}


export async function getIncomeByIdController(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {

  try {

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });

    }

    const id = getParamId(
      req.params.id
    );

    if (!id) {

      return res.status(400).json({
        success: false,
        message: 'Invalid income ID'
      });

    }

    const income = await getIncomeById(
      id,
      req.user.id
    );

    if (!income) {

      return res.status(404).json({
        success: false,
        message: 'Income not found'
      });

    }

    return res.status(200).json({
      success: true,
      data: income
    });

  } catch (error) {

    console.error(
      'Error getting income:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Error getting income'
    });

  }

}


export async function updateIncomeController(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {

  try {

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });

    }

    const id = getParamId(
      req.params.id
    );

    if (!id) {

      return res.status(400).json({
        success: false,
        message: 'Invalid income ID'
      });

    }

    const income = await updateIncome(
      id,
      req.body,
      req.user.id
    );

    if (!income) {

      return res.status(404).json({
        success: false,
        message: 'Income not found'
      });

    }

    return res.status(200).json({
      success: true,
      data: income
    });

  } catch (error) {

    console.error(
      'Error updating income:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Error updating income'
    });

  }

}


export async function deleteIncomeController(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {

  try {

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });

    }

    const id = getParamId(
      req.params.id
    );

    if (!id) {

      return res.status(400).json({
        success: false,
        message: 'Invalid income ID'
      });

    }

    const deleted = await deleteIncome(
      id,
      req.user.id
    );

    if (!deleted) {

      return res.status(404).json({
        success: false,
        message: 'Income not found'
      });

    }

    return res.status(200).json({
      success: true,
      data: deleted
    });

  } catch (error) {

    console.error(
      'Error deleting income:',
      error
    );

    return res.status(500).json({
      success: false,
      message: 'Error deleting income'
    });

  }

}