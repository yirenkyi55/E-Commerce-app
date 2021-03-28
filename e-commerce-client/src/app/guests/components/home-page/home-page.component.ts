import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { rubberBand, zoomInLeft, lightSpeedIn } from 'ng-animate';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from '@kolkov/ngx-gallery';
import { Product } from 'src/app/core/models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('rubberBand', [
      transition(
        '*=>*',
        useAnimation(rubberBand, {
          params: { timing: 3, delay: 0.2 },
        })
      ),
    ]),

    trigger('zoomInLeft', [
      transition(
        '*=>*',
        useAnimation(zoomInLeft, {
          params: { timing: 2, delay: 0.1 },
        })
      ),
    ]),

    trigger('lightSpeedIn', [
      transition(
        '*=>*',
        useAnimation(lightSpeedIn, {
          params: { timing: 1, delay: 0.3 },
        })
      ),
    ]),
  ],
})
export class HomePageComponent implements OnInit {
  @Input() products: Product[];

  rubberBand: any;
  zoomInLeft: any;
  lightSpeedIn: any;

  galleryOptions = [
    {
      width: '100%',
      height: 'inherit',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      previewAutoPlay: false,
      imageAutoPlay: true,
      imageAutoPlayPauseOnHover: true,
      previewFullscreen: true,
      previewCloseOnClick: true,
      previewCloseOnEsc: true,
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20,
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false,
    },
  ];

  galleryImages = [
    {
      small:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      medium:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      big:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      small:
        'https://images.unsplash.com/photo-1569441508845-c6da9a35924c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1367&q=80',
      medium:
        'https://images.unsplash.com/photo-1569441508845-c6da9a35924c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1367&q=80',
      big:
        'https://images.unsplash.com/photo-1569441508845-c6da9a35924c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1367&q=80',
    },
    {
      small:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      medium:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      big:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      small:
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=616&q=80',
      medium:
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=616&q=80',
      big:
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=616&q=80',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    if (this.products && this.products.length > 0) {
      this.galleryImages = this.products.map((product) => {
        return {
          small: product.picture,
          medium: product.picture,
          big: product.picture,
        };
      });
    }
  }
}
