import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    private httpService: HttpService,
  ) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id);

    this.httpService
      .post(`http://localhost:8000/api/products/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });

    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

  @MessagePattern('product_created')
  async productCreate(product: any) {
    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @MessagePattern('product_updated')
  async productUpdate(product: any) {
    await this.productService.update(product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @MessagePattern('product_deleted')
  async productDelete(id: number) {
    await this.productService.delete(id);
  }
}
