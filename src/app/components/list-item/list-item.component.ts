import { Component, OnInit } from '@angular/core';

import { IcoListService } from '../../services';

@Component({
  selector: 'ico-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  constructor(private service: IcoListService) {}

  ngOnInit() {}
}
