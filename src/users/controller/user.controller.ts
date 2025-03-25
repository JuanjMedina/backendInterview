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
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/errorManager';
import { ApiResponse } from 'src/types/response.interface';
import { UserEntity } from '../entity/user.entity';
import { ResponseUtil } from 'src/utils/response.util';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ApiResponse<UserEntity>> {
    try {
      const users = await this.userService.findAll();
      return ResponseUtil.success(users, 'Users retrieved successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<ApiResponse<UserEntity>> {
    try {
      const user = await this.userService.findOne(id);
      return ResponseUtil.success(user, 'User retrieved successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<UserEntity>> {
    try {
      const user = await this.userService.create(createUserDto);
      return ResponseUtil.success(user, 'User created successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserEntity>> {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      return ResponseUtil.success(updatedUser, 'User updated successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<ApiResponse<boolean>> {
    try {
      const result = await this.userService.delete(id);
      return ResponseUtil.success(result.deleted, 'User deleted successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
