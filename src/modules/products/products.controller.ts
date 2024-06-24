import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import {
  CreateProductDto,
  createProductSchema,
} from './dto/create-product.dto';

import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { Products } from './entities/product.entity';
import {
  UpdateProductDto,
  updateProductSchema,
} from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async create(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() params: any): Promise<Products | null> {
    return await this.productsService.findOne(params.id);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param() params: any,
    @Body(new ZodValidationPipe(updateProductSchema))
    updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(params.id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() params: any) {
    return this.productsService.delete(params.id);
  }
}
