import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FinicityService {
  private partnerId = '2445584535123';
  private partnerSecret = 'AbWZjEKsv4tzy5L5VbJN';
  private appKey = '43784690657d7c1273e4127aa3d17d7c';

  private async getAccessToken(): Promise<string> {
    const response = await axios.post('https://api.finicity.com/aggregation/v2/partners/authentication', {
      partnerId: this.partnerId,
      partnerSecret: this.partnerSecret,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Finicity-App-Key': this.appKey,
      },
    });

    return response.data.token;
  }

  public async getAccountBalance(customerId: string): Promise<any> {
    const appToken = await this.getAccessToken();

    const response = await axios.post(`https://api.finicity.com/aggregation/v1/customers/${customerId}/accounts`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Finicity-App-Token': appToken,
        'Finicity-App-Key': this.appKey,
      },
    });

    return response.data.accounts;
  }

  public async generateConnectUrl(partnerId: string, customerId: string): Promise<string> {
    const appToken = await this.getAccessToken();

    const response = await axios.post('https://api.finicity.com/connect/v2/generate', {
      partnerId: partnerId,
      customerId: customerId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Finicity-App-Token': appToken,
        'Finicity-App-Key': this.appKey,
      },
    });

    return response.data.link;
  }
}
