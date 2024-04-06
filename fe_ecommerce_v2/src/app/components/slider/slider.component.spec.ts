import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { SliderComponent } from './slider.component';
import { Product } from 'src/app/shared/services/product/product.model';
import { ProductService } from '../../shared/services/product/product.service';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let productServiceMock: jest.Mocked<ProductService>;

  beforeEach(async () => {
    productServiceMock = {
      getAllProducts: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    await TestBed.configureTestingModule({
      declarations: [SliderComponent],
      imports: [StoreModule.forRoot({})],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', waitForAsync(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        productName: 'Product 1',
        price: 10,
        category: 'Category 1',
        quantity: 5,
        imgPath: 'path/to/image1.jpg',
      },
      {
        id: 2,
        productName: 'Product 2',
        price: 20,
        category: 'Category 2',
        quantity: 10,
        imgPath: 'path/to/image2.jpg',
      },
    ];

    productServiceMock.getAllProducts.mockReturnValue(of(mockProducts));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(productServiceMock.getAllProducts).toHaveBeenCalled();
      expect(component.productsList).toEqual(mockProducts);
    });
  }));
});
