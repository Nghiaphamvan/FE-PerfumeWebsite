import { Component } from "@angular/core";

@Component({
    selector:'dashboard-admin',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
}) export class DashboardAdminComponent {
    hidden = false;

    toggleBadgeVisibility() {
        this.hidden = !this.hidden;
    }
}