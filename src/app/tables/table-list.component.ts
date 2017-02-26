import { DialogsService } from './../dialogs/dialogs.service';
import { Component, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Table } from './../models/table';
const uuidV4 = require('uuid/v4');

const images: {[nrofSeats: number] : string} = {
  3: "http://retaildesignblog.net/wp-content/uploads/2012/09/SABOTEN-cutlet-restaurant-DOYLE-COLLECTION-Fukuoka-02.jpg",
  4: "https://s-media-cache-ak0.pinimg.com/564x/25/95/fa/2595fa0364f3f36062ebd15391e86c31.jpg",
  5: "http://annarborcivicballet.com/images/American-retro-old-wooden-tables-and-chairs-wrought-iron-bar-lounge-restaurant-outdoor-cafe-tables-Furniture.jpg",
  6: "http://www.bizbash.com/content/editorial/StoryPhoto/big/e17927image1.jpg",
}

@Component({
  selector: 'nm-table-list',
  templateUrl: './table-list.component.html',
  styles: [`
    .table-index {
      font-weight: bold;
    }
    md-grid-tile-footer {
      justify-content: center;
      align-items: center;
    }
    .occupied-table {
      color: red;
    }
    .selected-table {
      color: green;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    img {
      height: 100%;
    }
  `]
})
export class TableListComponent {
  @Input() tables: Table[];
  @Input() occupiedTableIds: string[];
  @Input() selectedTableId: string;
  @Output() selectTable = new EventEmitter<string>();
  @Output() confirmTable = new EventEmitter<string>();
  @Output() tableDetail = new EventEmitter<string>();
  @Output() addTable = new EventEmitter<Table>();
  @Output() removeTable = new EventEmitter<string>();

  constructor(private dialogService: DialogsService,
    private viewContainerRef: ViewContainerRef
  ) {}

  doSelectTable(tableId: string) {
    if (this.occupiedTableIds.indexOf(tableId) === -1) {
      this.selectTable.emit(tableId);
    } else {
      this.tableDetail.emit(tableId);
    }
  }

  doAddTable() {
    this.dialogService.addTable(this.viewContainerRef).subscribe(
      nrofSeats => {
        if (!!nrofSeats) {
          this.addTable.emit(
            new Table(uuidV4(), images[nrofSeats], nrofSeats));
        }
      }
    )
  }
}
