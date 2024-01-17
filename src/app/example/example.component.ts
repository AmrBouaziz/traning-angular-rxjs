import {Component, OnInit} from '@angular/core';
import {Example, ExampleService} from './example.service';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-example',
  standalone: true,
  templateUrl: './example.component.html',
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  examples: Example[] = [];

  constructor(readonly exampleService: ExampleService) {
  }

  ngOnInit(): void {

    this.exampleService.examples.subscribe(data => {
      this.examples = data;
    });

    this.exampleService.load().subscribe((data) => {
      console.log('test 1')
    });
  }

  deleteExample(id: number): void {


    console.log("delete called with id", id);
    this.exampleService.delete(id).subscribe({
      next: () => {
        console.log('huray !!');
      }, error: () => {
        console.error('oups!!');
      }
    });
  }
}
