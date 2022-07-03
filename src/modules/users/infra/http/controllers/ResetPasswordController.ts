import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordlService from '../../../services/ResetPasswordService';

export default class ResetPasswordCotroller {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPasswordEmail = container.resolve(ResetPasswordlService);

    await resetPasswordEmail.execute({ token, password });

    return res.status(204).json();
  }
}
