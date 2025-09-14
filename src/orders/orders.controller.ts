import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateOrderDto } from './dto';
import { ORDERS_SERVICE } from 'src/config';


@Controller( 'orders' )
export class OrdersController {

  constructor(
    @Inject( ORDERS_SERVICE ) private readonly ordersClient: ClientProxy,
  ) { }

  @Post()
  create( @Body() createOrderDto: CreateOrderDto ) {
    return this.ordersClient.send( 'createOrder', createOrderDto );
  }

  @Get()
  findAll() {
    return this.ordersClient.send( 'findAllOrders', {} );
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseUUIDPipe ) id: string ) {
    try {

      const order = await firstValueFrom(
        this.ordersClient.send( 'findOneOrder', { id } )
      );

      return order;
    } catch ( error ) {
      throw new RpcException( error );
    }
  }

}
