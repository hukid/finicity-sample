import { Module } from '@nestjs/common';
import { FinicityService } from './finicity/finicity.service';
import { FinicityController } from './finicity/finicity.controller';

@Module({
  imports: [],
  controllers: [FinicityController],
  providers: [FinicityService],
})
export class AppModule {}

