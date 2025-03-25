import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entity/companies.entity';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';
import { ErrorManager } from 'src/utils/errorManager';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    try {
      const companies = await this.companyRepository.find({
        relations: ['ciudad', 'departamento', 'usuarios', 'productos'],
      });
      if (!companies.length) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No companies found',
        });
      }
      return companies;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<CompanyEntity> {
    try {
      const company = await this.companyRepository.findOne({
        where: { id },
        relations: ['ciudad', 'departamento', 'usuarios', 'productos'],
      });
      if (!company) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Company with ID ${id} not found`,
        });
      }
      return company;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    try {
      const company = this.companyRepository.create(createCompanyDto);
      return await this.companyRepository.save(company);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    try {
      const company = await this.findOne(id);
      this.companyRepository.merge(company, updateCompanyDto);
      return await this.companyRepository.save(company);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    try {
      const company = await this.findOne(id);
      await this.companyRepository.remove(company);
      return { deleted: true };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
