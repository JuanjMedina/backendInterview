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

import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';
import { ErrorManager } from 'src/utils/errorManager';
import { CompanyService } from '../service/company.service';
import { ApiResponse } from 'src/types/response.interface';
import { CompanyEntity } from '../entity/companies.entity';
import { ResponseUtil } from 'src/utils/response.util';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ApiResponse<CompanyEntity>> {
    try {
      const companies = await this.companyService.findAll();
      return ResponseUtil.success(
        companies,
        'Companies retrieved successfully',
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<ApiResponse<CompanyEntity>> {
    try {
      const company = await this.companyService.findOne(id);
      return ResponseUtil.success(company, 'Company retrieved successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<ApiResponse<CompanyEntity>> {
    try {
      const company = await this.companyService.create(createCompanyDto);
      return ResponseUtil.success(company, 'Company created successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<ApiResponse<CompanyEntity>> {
    try {
      const updatedCompany = await this.companyService.update(
        id,
        updateCompanyDto,
      );
      return ResponseUtil.success(
        updatedCompany,
        'Company updated successfully',
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<ApiResponse<boolean>> {
    try {
      const result = await this.companyService.delete(id);
      return ResponseUtil.success(
        result.deleted,
        'Company deleted successfully',
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
