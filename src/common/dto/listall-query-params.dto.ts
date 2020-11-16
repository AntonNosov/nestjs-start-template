import { ApiProperty } from '@nestjs/swagger'

export class ListAllEntities {
  @ApiProperty({ description: 'Offset of query select', default: '0', required: false })
  skip: number

  @ApiProperty({ description: 'Limit of query select', default: 50, required: false })
  take: number

  @ApiProperty({ description: 'Sort of query select', required: false })
  sort: string
}