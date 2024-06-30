import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';


@Injectable({
	providedIn: 'root',
})
export class MessageUtilService {
    message = '';

    getMessageQuestion(titulo: string, mensaje?: string) {
		const SwalMixin = Swal.mixin({
			focusCancel: true,
		});
		return SwalMixin.fire({
			title: titulo,
			icon: 'question',
			text: mensaje,
			showCancelButton: true,
			confirmButtonText: 'Si',
			cancelButtonText: 'No',
			confirmButtonColor: '#0ABB87',
			cancelButtonColor: '#FD397A',
		});
	}
}