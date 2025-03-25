import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/errorManager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        relations: ['company'],
      });
      if (!users.length) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No users found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['company'],
      });
      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `User with ID ${id} not found`,
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(createUserDto);
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      return await this.userRepository.save(user);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.findOne(id);
      this.userRepository.merge(user, updateUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    try {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);
      return { deleted: true };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
