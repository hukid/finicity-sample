import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FinicityService } from './finicity.service';

@Controller('finicity')
export class FinicityController {
  constructor(private readonly finicityService: FinicityService) {}

  @Get('accounts/:customerId')
  async getAccounts(@Param('customerId') customerId: string) {
    try {
      const accounts = await this.finicityService.getAccountBalance(customerId);
      return accounts;
    } catch (error) {
      throw new HttpException('Failed to fetch accounts', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('connect-url')
  async getConnectUrl(@Body('partnerId') partnerId: string, @Body('customerId') customerId: string) {
    try {
      const connectUrl = await this.finicityService.generateConnectUrl(partnerId, customerId);
      return { link: connectUrl };
    } catch (error) {
      throw new HttpException('Failed to generate connect URL', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
