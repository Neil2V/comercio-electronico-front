import { Injectable } from "@angular/core";
import { Producto } from "../model/producto";
import { ComponentStore } from "@ngrx/component-store";
import { ProductosService } from "src/app/service/productos.service";
import { Observable } from "rxjs";

export interface ProductoState {
    productosCart: Producto[] | null;
}

export const initialState: ProductoState = {
    productosCart: null
}

@Injectable()
export class ProductoStore extends ComponentStore<ProductoState> {

    constructor(private readonly productosService: ProductosService) {
		super(initialState);
        this.loadLocalStorage();
	}

    readonly getProductos$: Observable<Producto[] | null> = this.select(state => state.productosCart);
    readonly deleteProductos = this.updater((state, productosCart: Producto[] | null) => {
        const newState = {
            ...state,
            productosCart
        }
        this.saveLocalStorage(productosCart);
        return newState;
    })
    readonly setProductos = this.updater((state, productosCart: Producto[] | null) => {
        const newState = {
            ...state,
            productosCart: [
                ...(state.productosCart || []),
                ...(productosCart || [])
            ]
        };
        this.saveLocalStorage(productosCart);
        return newState;
    });

    private saveLocalStorage(productosCart: Producto[] | null): void {
        localStorage.setItem('productosCart', JSON.stringify(productosCart));
    }

    private loadLocalStorage(): void {
        const productosCartString = localStorage.getItem('productosCart');
        if (productosCartString) {
            const productosCart = JSON.parse(productosCartString);
            this.setState({ productosCart });
        }
    }
}