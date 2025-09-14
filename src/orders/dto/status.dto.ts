import { IsEnum, IsOptional } from 'class-validator';

import { OrderStatus, orderStatusList } from '../enum';



export class StatusDto {

  @IsOptional()
  @IsEnum( orderStatusList, {
    message: `Valid status are ${ orderStatusList }`
  } )
  status: OrderStatus;

}