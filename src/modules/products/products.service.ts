import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Products } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productRepository: typeof Products,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto as any);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { name, description, price } = updateProductDto;
    return this.productRepository.update(
      {
        name: name,
        description: description,
        price: price,
      },
      { where: { id: id } },
    );
  }

  delete(id: number) {
    return this.productRepository.destroy({ where: { id: id } });
  }
}
