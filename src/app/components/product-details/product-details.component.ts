import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.handleProductDetails());
  }
  handleProductDetails() {
    //get the i param string convert to a number ussing +
    const theProductId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }
}
