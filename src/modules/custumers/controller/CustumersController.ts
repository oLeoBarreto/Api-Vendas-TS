import { Request, Response } from 'express';
import CreateCustumerService from '../services/CreateCustumerService';
import DeleteCustumerService from '../services/DeleteCustumerService';
import ListCustumerService from '../services/ListCustumerService';
import ShowCustumerService from '../services/ShowCustumerService';
import UpdateCustumerService from '../services/UpdateCustumerService';

export default class CustumersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustumers = new ListCustumerService();
    const custumers = await listCustumers.execute();

    return res.json(custumers);
  }

  public async crete(req: Request, res: Response): Promise<Response> {
    const createCustumer = new CreateCustumerService();

    const { name, email } = req.body;
    const custumer = await createCustumer.execute({ name, email });

    return res.json(custumer);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showCustumer = new ShowCustumerService();

    const { id } = req.params;
    const custumer = await showCustumer.execute({ id });

    return res.json(custumer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const updateCustumer = new UpdateCustumerService();

    const { id } = req.params;
    const { name, email } = req.body;
    const custumer = await updateCustumer.execute({ id, name, email });

    return res.json(custumer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteCustumer = new DeleteCustumerService();

    const { id } = req.params;
    await deleteCustumer.execute(id);

    return res.json([]);
  }
}
