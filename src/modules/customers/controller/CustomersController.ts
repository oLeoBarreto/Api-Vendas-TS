import { Request, Response } from 'express';
import Createcustomerservice from '../services/CreateCustomerService';
import Deletecustomerservice from '../services/DeleteCustomerService';
import ListCustomerservice from '../services/ListCustomerService';
import Showcustomerservice from '../services/ShowCustomerService';
import Updatecustomerservice from '../services/UpdateCustomerService';

export default class customersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomers = new ListCustomerservice();
    const customers = await listCustomers.execute();

    return res.json(customers);
  }

  public async crete(req: Request, res: Response): Promise<Response> {
    const createcustomer = new Createcustomerservice();

    const { name, email } = req.body;
    const customer = await createcustomer.execute({ name, email });

    return res.json(customer);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showcustomer = new Showcustomerservice();

    const { id } = req.params;
    const customer = await showcustomer.execute({ id });

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const updatecustomer = new Updatecustomerservice();

    const { id } = req.params;
    const { name, email } = req.body;
    const customer = await updatecustomer.execute({ id, name, email });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const deletecustomer = new Deletecustomerservice();

    const { id } = req.params;
    await deletecustomer.execute(id);

    return res.json([]);
  }
}
