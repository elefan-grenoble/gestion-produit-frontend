import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Article} from '../../models/article';
import {BarecodeScannerLivestreamComponent} from 'ngx-barcode-scanner';
import {MatDialog, MatInput, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {LoadingService} from '../../services/loading.service';
import {AddSupplyingDialogComponent} from "../supplying/add-supplying-dialog/add-supplying-dialog.component";
import {SupplyingService} from "../../services/supplying.service";
import {Supplying} from "../../models/supplying";
import {DatePipe} from "@angular/common";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['designation', 'famille', 'prix_vente'];

  actionColumnTitle: string = 'Actions';

  @Input() feature: string;

  @ViewChild('searchInput', {static: true}) searchInput: MatInput;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(BarecodeScannerLivestreamComponent, {static: true})
  barecodeScanner: BarecodeScannerLivestreamComponent;
  cameraAvailable: boolean = false;

  dataSource: MatTableDataSource<Article>;

  private filterPredicate = (article: Article, filter: string) => {
    return article.designation.toLowerCase().indexOf(filter) != -1 ||
      article.fournisseur.nom.toLowerCase().indexOf(filter) != -1 ||
      article.code.toString() === filter;
  };

  constructor(private articleService: ArticlesService,
              private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.loadArticles();
    switch (this.feature) {
      case 'supplying': {
        this.actionColumnTitle = "Ajouter";
        this.displayedColumns = ['designation', 'famille', 'prix_vente', 'actions'];
        break;
      }
      case 'delivery': {
        this.displayedColumns = ['designation', 'emplacement', 'rayon'];
        break;
      }
      case 'barcodes': {
        this.actionColumnTitle = "Ajouter un code barre";
        this.displayedColumns = ['designation', 'famille', 'prix_vente', 'actions'];
        break;
      }
      case 'tags': {
        this.actionColumnTitle = "Ajouter une demande d'impression";
        this.displayedColumns = ['designation', 'famille', 'prix_vente', 'actions'];
        break;
      }
      default: {
        console.error("Unknown feature : " + this.feature);
      }
    }
  }

  private loadArticles() {
    this.loadingService.taskStarted();
    this.articleService.getArticles().subscribe(
      (articles: Article[]) => {
        this.dataSource = new MatTableDataSource(articles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.firstPage();
        this.dataSource.filterPredicate = this.filterPredicate;
        this.loadingService.taskFinished();
      },
      err => {
        console.error(err);
        this.loadingService.taskFinished();
      }
    )
  }

  ngAfterViewInit(): void {
    this.searchInput.focus();
    // We can't use a reactive property because the check is asynchronous
    this.updateCameraDeviceAvailability();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilter() {
    this.searchInput.value = '';
    this.applyFilter('');
    this.searchInput.focus();
  }

  scanBarCode() {
    try {
      if (this.barecodeScanner.isStarted()) {
        this.barecodeScanner.stop();
      } else {
        this.barecodeScanner.start();
      }
    } catch (exception) {
      alert('Pas de camera disponible sur cet appareil');
    }
  }

  updateCameraDeviceAvailability() {
    if (!environment.barcodeScanner) {
      this.cameraAvailable = false;
      return;
    }

    if (!navigator.mediaDevices) {
      this.cameraAvailable = false;
      return;
    }

    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) {
      this.cameraAvailable = false;
      return;
    }

    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
      this.cameraAvailable = true;
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }).catch(err => {
      console.log(err);
      /* handle the error */
      this.cameraAvailable = false;
    });
  }

  onBarCodeDetected(result) {
    this.searchInput.value = result.codeResult.code;
    this.barecodeScanner.stop();
    this.applyFilter(this.searchInput.value);
  }
}
