import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ErrorManager } from 'src/utils/errorManager';
import { ProductService } from '../service/product.service';
import { ApiResponse } from 'src/types/response.interface';
import { ProductEntity } from '../entity/products.entity';
import { ResponseUtil } from 'src/utils/response.util';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ApiResponse<ProductEntity>> {
    try {
      const products = await this.productService.findAll();
      return ResponseUtil.success(products, 'Products retrieved successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<ApiResponse<ProductEntity>> {
    try {
      const product = await this.productService.findOne(id);
      return ResponseUtil.success(product, 'Product retrieved successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ApiResponse<ProductEntity>> {
    try {
      const product = await this.productService.create(createProductDto);
      return ResponseUtil.success(product, 'Product created successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ApiResponse<ProductEntity>> {
    try {
      const updatedProduct = await this.productService.update(
        id,
        updateProductDto,
      );
      return ResponseUtil.success(
        updatedProduct,
        'Product updated successfully',
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<ApiResponse<boolean>> {
    try {
      const result = await this.productService.delete(id);
      return ResponseUtil.success(
        result.deleted,
        'Product deleted successfully',
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
