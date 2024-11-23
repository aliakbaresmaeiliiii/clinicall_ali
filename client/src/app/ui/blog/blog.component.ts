import { Component } from '@angular/core';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
    standalone: false
})
export class BlogComponent {
  array = 3;

  posts = [
    {
      title: 'what do you want to know about UI',
      body: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia',
      category: 'SENSEX',
      author: 'Aliakbar Esmaeili',
      published_date: 'February 1,2030',
      img: '../../../assets/images/ui/blog/blog.jpg',
    },
    {
      title: 'what do you want to know about UI',
      body: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia',
      category: 'SENSEX',
      author: 'Hamid Reza',
      published_date: 'February 1,2030',
      img: '../../../assets/images/ui/blog/blog.jpg',
    },
    {
      title: 'what do you want to know about UI',
      body: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia',
      category: 'SENSEX',
      author: 'Elahe Esmaeili',
      published_date: 'February 1,2030',
      img: '../../../assets/images/ui/blog/blog.jpg',
    },
  ];
}
