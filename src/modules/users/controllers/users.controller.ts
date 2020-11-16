import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { InsertResult } from 'typeorm'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'
import { Roles } from '../../../common/decorators/roles.decorator'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard'
import { RolesGuard } from '../../../common/guards/roles.guard'
import { FindAllInterceptor, FindOneInterceptor, ResultInterceptor } from '../../../common/interceptors'
import { ValidationPipe } from '../../../common/validations/validation.pipe'
import { getAdminRoles, getAllRoles, Roles as RolesEnum } from '../constants/Roles'
import { CreateUserDto, QueryParamsDto, UpdateUserDto } from '../dto'
import { User } from '../interfaces/users.interface'
import { UsersService } from '../services/users.service'

@Controller()
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(QueryFailedExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('v1/users')
  @Roles(getAdminRoles())
  @UseInterceptors(FindAllInterceptor)
  findAll(@Query(new ValidationPipe()) queryParams: QueryParamsDto): Promise<[ User[], number ]> {
    const preparedQuery = UsersService.prepareQueryParams(queryParams)
    return this.usersService.findAll(preparedQuery)
  }

  @Get('v1/users/whoami')
  @Roles(getAllRoles())
  whoAmI(@Req() request): User {
    return request.user
  }

  @Get('v1/users/:id')
  @Roles(getAdminRoles())
  @UseInterceptors(FindOneInterceptor)
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id)
  }

  @Post('v1/users')
  @Roles(getAdminRoles())
  @UseInterceptors(ResultInterceptor)
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<InsertResult> {
    return this.usersService.createOne(createUserDto)
  }

  @Put('v1/users/:id')
  @Roles(getAllRoles())
  @UseInterceptors(FindOneInterceptor)
  update(
    @Req() request,
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto
  ): Promise<User> {
    if (request.user.id == id && updateUserDto.role) {
      throw new BadRequestException('You can`t change role yourself.')
    }
    if (request.user !== RolesEnum.SUPER_ADMIN && updateUserDto.role) {
      throw new ForbiddenException('You haven`t access to change role.')
    }
    return this.usersService.updateOne(id, updateUserDto)
  }

  @Delete('v1/users/:id')
  @Roles(getAdminRoles())
  @UseInterceptors(ResultInterceptor)
  remove(@Req() request, @Param('id') id: number): Promise<DeleteResult> {
    if (request.user.id == id) throw new BadRequestException('You can`t delete yourself.')
    return this.usersService.removeOne(id)
  }
}