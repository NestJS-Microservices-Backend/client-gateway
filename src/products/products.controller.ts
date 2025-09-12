import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';




@Controller( 'products' )
export class ProductsController {

  constructor() { }

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts() {
    return 'Regresa varios productos';
  }

  @Get( ':id' )
  findOne( @Param( 'id' ) id: string ) {
    return 'Regresa el producto ' + id;
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
