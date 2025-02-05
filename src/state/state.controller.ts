import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {StateService} from './state.service';

@Controller('state')
export class StateController {
  constructor(
    private readonly stateService: StateService,
  ) {}

  @Post()
  async setState(@Query('userId') userId: string, @Body() useState: any ) {
    return this.stateService.saveState(userId, useState);
  }

  @Get()
  async getState(@Query('userId') userId: string) {
    return this.stateService.getState(userId);
  }
}