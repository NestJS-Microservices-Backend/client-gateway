import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';


@Controller( 'orders' )
export class OrdersController {

  constructor(
    @Inject( ORDERS_SERVICE ) private readonly ordersClient: ClientProxy,
  ) { }

  @Post()
  @MessagePattern( 'createOrder' )
  create( @Payload() createOrderDto: CreateOrderDto ) {
    return this.ordersClient.send( 'createOrder', createOrderDto );
  }

  @Get()
  @MessagePattern( 'findAllOrders' )
  findAll() {
    return this.ordersClient.send( 'findAllOrders', {} );
  }

}
