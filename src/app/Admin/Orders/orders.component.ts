import { Component } from "@angular/core";

@Component({
    selector:'orders-admin',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss'
}) export class OrdersAdminComponent {
    collection: any[] = []
    p: number = 1;
}