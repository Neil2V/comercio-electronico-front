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
	}

    readonly productos$: Observable<Producto[] | null> = this.select(state => state.productosCart);
    readonly setProductos = this.updater((state, productosCart: Producto[]) => ({ ...state, productosCart}));
}