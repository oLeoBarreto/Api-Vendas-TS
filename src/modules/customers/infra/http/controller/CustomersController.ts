import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatecustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class customersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listCustomers = container.resolve(ListCustomerService);
    const customers = await listCustomers.execute({ page, limit });

    return res.json(customers);
  }

  public async crete(req: Request, res: Response): Promise<Response> {
    const createcustomer = container.resolve(CreatecustomerService);

    const { name, email } = req.body;
    const customer = await createcustomer.execute({ name, email });

    return res.json(customer);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showCustomer = container.resolve(ShowCustomerService);

    const { id } = req.params;
    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const updatecustomer = container.resolve(UpdateCustomerService);

    const { id } = req.params;
    const { name, email } = req.body;
    const customer = await updatecustomer.execute({ id, name, email });

    return res.json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteCustomer = container.resolve(DeleteCustomerService);
    await deleteCustomer.execute({ id });

    return res.json([]);
  }
}
