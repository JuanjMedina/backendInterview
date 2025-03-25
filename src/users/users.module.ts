import { Module } from '@nestjs/common';

import { UserControllerController } from './controller/user.controller/user.controller.controller';
import { UserServiceService } from './service/user.service/user.service.service';

@Module({
  controllers: [UserControllerController],
  providers: [UserServiceService],
})
export class UsersModule {}
