import { Component } from "@angular/core";

@Component({
    selector: 'blog',
    templateUrl:'./Blog.component.html',
    styleUrl: './Blog.component.scss'
}) export class BlogComponent {
    Blogs = [ 
        {
            imgSrc: 'assets/Images/Logo/blog1.jpg',
            title:'The Most Special Tom Ford Perfumes',
            content: 'Tom Ford is a famous perfume brand founded by Tom Ford , a famous fashion designer and makeup artist. Tom Ford is known for its famous perfumes with seductive scents and elegance and nobility.'
        },
        {
            imgSrc: 'assets/Images/Logo/blog2.jpg',
            title: '6 SUITABLE PERFUMES TO "Show off" during Tet holiday',
            content: 'Spring is an opportunity to enjoy and immerse yourself in the gentle and fresh scents from scent groups such as flowers and fruits full of vitality'
        },
        {
            imgSrc: 'assets/Images/Logo/blog3.jpg',
            title: 'Best spray sunscreen for face and body in 2024',
            content: 'For a crash course in all things spray sunscreen, I highly encourage you to keep reading. Not only did I dig into some of my personal favorites, but I also reached out to board-certified dermatologist Dr.'
        }


    ]
}