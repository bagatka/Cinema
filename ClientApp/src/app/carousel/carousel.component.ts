import {trigger, transition, style, animate} from '@angular/animations';
import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Film} from '../film';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1}))
      ]),
      transition('* => void', [
        animate('300ms', style({opacity: 0}))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() films: Film[];

  currentSlide = 0;
  interval: any;

  public onPreviousClick(): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.films.length - 1 : previous;
    this.cancelUpdate();
  }

  public onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.films.length ? 0 : next;
    this.cancelUpdate();
  }

  private updateSlide(): void {
    this.interval = setInterval(() => {
      this.onNextClick();
    }, 5000);
  }

  private cancelUpdate(): void {
    clearInterval(this.interval);
    this.updateSlide();
  }

  public getFilmName(): string {
    return this.films[this.currentSlide].filmName;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.updateSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
