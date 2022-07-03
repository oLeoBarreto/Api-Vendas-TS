import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

export default class ForgotPasswordCotroller {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}
