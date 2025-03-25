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
  UseGuards,
} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ErrorManager } from 'src/utils/errorManager';
import { ProductService } from '../service/product.service';
import { ApiResponse } from 'src/types/response.interface';
import { ProductEntity } from '../entity/products.entity';
import { ResponseUtil } from 'src/utils/response.util';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Products')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all products',
    description: 'Retrieve a list of all products',
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
  })
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
  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Retrieve a single product by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
  })
  @SwaggerApiResponse({ status: 404, description: 'Product not found' })
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
  @ApiOperation({
    summary: 'Create new product',
    description: 'Create a new product in the system',
  })
  @ApiBody({ type: CreateProductDto, description: 'Product data' })
  @SwaggerApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @SwaggerApiResponse({
    status: 400,
    description: 'Bad request - Invalid data',
  })
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
  @ApiOperation({
    summary: 'Update product',
    description: 'Update an existing product by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @ApiBody({ type: UpdateProductDto, description: 'Updated product data' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @SwaggerApiResponse({ status: 404, description: 'Product not found' })
  @SwaggerApiResponse({
    status: 400,
    description: 'Bad request - Invalid data',
  })
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
  @ApiOperation({
    summary: 'Delete product',
    description: 'Remove a product from the system',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @SwaggerApiResponse({ status: 404, description: 'Product not found' })
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
