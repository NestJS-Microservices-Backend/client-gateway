import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';



@Controller( 'products' )
export class ProductsController {

  constructor(
    @Inject( PRODUCT_SERVICE ) private readonly productsClient: ClientProxy
  ) { }

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts( @Query() paginationDto: PaginationDto ) {
    return this.productsClient.send( { cmd: 'find_all_products' }, { limit: paginationDto.limit, page: paginationDto.page } );
  }

  @Get( ':id' )
  findOne( @Param( 'id' ) id: string ) {
    return this.productsClient.send( { cmd: 'find_one_product' }, { id } );
  }

  @Patch( ':id' )
  updateProduct( @Param( 'id' ) id: string ) {
    return 'Actualiza el producto ' + id;
  }

  @Delete( ':id' )
  deleteProduct( @Body() body: any, @Param( 'id' ) id: string ) {
    return 'Elimina el producto ' + id;
  }

}
