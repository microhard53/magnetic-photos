import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatIconModule]
})
export class LandingPageComponent {
    constructor(private router: Router) { }

    public navigateToUpload() {
        this.router.navigate(['/photo-upload']);
    }
}