import { ApiProperty } from '@nestjs/swagger'
import { ListAllEntities } from '../../../common/dto'

export class QueryParamsDto extends ListAllEntities {
  @ApiProperty({ description: 'Status flag', default: 'false', required: false })
  active: Boolean
}