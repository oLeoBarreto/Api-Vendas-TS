import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductService from '../../../services/ListProductService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute({ page, limit });

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, amount } = req.body;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({ name, price, amount });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, amount } = req.body;
    const { id } = req.params;

    const updateProduct = container.resolve(UpdateProductService);
    const product = await updateProduct.execute({ id, name, price, amount });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductService);
    await deleteProduct.execute({ id });

    return res.json([]);
  }
}
