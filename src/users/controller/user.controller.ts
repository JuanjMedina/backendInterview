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
import { UserService } from '../service/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/errorManager';
import { ApiResponse } from 'src/types/response.interface';
import { UserEntity } from '../entity/user.entity';
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

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all users',
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
  })
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
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a single user by their ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @SwaggerApiResponse({
    status: 200,
    description: 'User retrieved successfully',
  })
  @SwaggerApiResponse({ status: 404, description: 'User not found' })
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
  @ApiOperation({
    summary: 'Create new user',
    description: 'Create a new user in the system',
  })
  @ApiBody({ type: CreateUserDto, description: 'User data' })
  @SwaggerApiResponse({ status: 201, description: 'User created successfully' })
  @SwaggerApiResponse({
    status: 400,
    description: 'Bad request - Invalid data',
  })
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
  @ApiOperation({
    summary: 'Update user',
    description: 'Update an existing user by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @ApiBody({ type: UpdateUserDto, description: 'Updated user data' })
  @SwaggerApiResponse({ status: 200, description: 'User updated successfully' })
  @SwaggerApiResponse({ status: 404, description: 'User not found' })
  @SwaggerApiResponse({
    status: 400,
    description: 'Bad request - Invalid data',
  })
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
  @ApiOperation({
    summary: 'Delete user',
    description: 'Remove a user from the system',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
  })
  @SwaggerApiResponse({ status: 200, description: 'User deleted successfully' })
  @SwaggerApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id') id: string): Promise<ApiResponse<boolean>> {
    try {
      const result = await this.userService.delete(id);
      return ResponseUtil.success(result.deleted, 'User deleted successfully');
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
