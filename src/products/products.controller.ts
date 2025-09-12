import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
  async findOne( @Param( 'id' ) id: string ) {
    try {

      const product = await firstValueFrom(
        this.productsClient.send( { cmd: 'find_one_product' }, { id } )
      );

      return product;
    } catch ( error ) {
      throw new BadRequestException( error );
    }
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
