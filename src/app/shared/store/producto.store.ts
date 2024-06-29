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
        productosCart?.forEach((e) => {
            e.cantidad = 0;
        });
        const newState = {
            ...state,
            productosCart
        }
        this.saveLocalStorage(productosCart);
        return newState;
    })
    readonly setProductos = this.updater((state, productosCart: Producto[] | null) => {
        //this.setProductCantidad(state, productosCart);
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

    /*private setProductCantidad(state: ProductoState, nuevosProductos: Producto[] | null): void {
        const ids = nuevosProductos?.map((e) => e.idProducto);
        const idsCarrito = state.productosCart?.map((e) => e.idProducto).filter((e) => e!=null && e!=undefined);
        if (ids && idsCarrito) {
            const existingIds = ids.filter(id => idsCarrito.includes(id));
            console.log('IDs que ya existen en el carrito:', existingIds);
        }
    }*/
        /*private setProductCantidad(state: ProductoState, nuevosProductos: Producto[] | null): void {
            const ids = nuevosProductos?.map((e) => e.idProducto);
            const productosCarrito = state.productosCart ?? [];
        
            if (ids) {
                ids.forEach(id => {
                    const existingProductIndex = productosCarrito.findIndex(p => p.idProducto === id);
        
                    if (existingProductIndex !== -1) {
                        const existingProduct = productosCarrito[existingProductIndex];
                        if (existingProduct) {
                            existingProduct.cantidad = existingProduct.cantidad ? existingProduct.cantidad + 1 : 1;
                        }
                    }  else {
                        const producto = nuevosProductos?.find(p => p.idProducto === id);
                        if (producto) {
                            productosCarrito.push({ ...producto, cantidad: 1 });
                        }
                    }
                });
            }
        }*/
        
      

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