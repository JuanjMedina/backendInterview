import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entity/products.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ErrorManager } from 'src/utils/errorManager';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    try {
      const products = await this.productRepository.find({
        relations: ['company'],
      });
      if (!products.length) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No products found',
        });
      }
      return products;
    } catch (error) {
      if (error instanceof ErrorManager) {
        throw error;
      }
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: 'Error fetching products',
      });
    }
  }

  async findOne(id: string): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['company'],
      });
      if (!product) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Product with ID ${id} not found`,
        });
      }
      return product;
    } catch (error) {
      if (error instanceof ErrorManager) {
        throw error;
      }
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: `Error finding product with ID ${id}`,
      });
    }
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: `Error creating product: ${error.message}`,
      });
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    try {
      const product = await this.findOne(id);
      this.productRepository.merge(product, updateProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      if (error instanceof ErrorManager) {
        throw error;
      }
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: `Error updating product: ${error.message}`,
      });
    }
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    try {
      const product = await this.findOne(id);
      await this.productRepository.remove(product);
      return { deleted: true };
    } catch (error) {
      if (error instanceof ErrorManager) {
        throw error;
      }
      throw new ErrorManager({
        type: 'INTERNAL_SERVER_ERROR',
        message: `Error deleting product: ${error.message}`,
      });
    }
  }
}
