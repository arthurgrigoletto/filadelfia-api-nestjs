import { Controller, Get } from '@nestjs/common';
import { StockService } from '../services/stock.service';

@Controller('stock')
export class StockController {
  constructor(public stockService: StockService) {}

  @Get()
  public async findAll() {
    return this.stockService.findAll();
  }
}
