import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatButtonModule} from '@angular/material/button'
import {MatListModule} from '@angular/material/list'
import {MatBadgeModule} from '@angular/material/badge'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatCardModule} from '@angular/material/card'
import {MatMenuModule} from '@angular/material/menu'

@NgModule({
   imports: [
       MatToolbarModule,
       MatIconModule,
       MatSidenavModule,
       MatButtonModule,
       MatListModule,
       MatBadgeModule,
       MatGridListModule,
       MatCardModule,
       MatMenuModule
   ],
   exports: [
       MatToolbarModule,
       MatIconModule,
       MatSidenavModule,
       MatButtonModule,
       MatListModule,
       MatBadgeModule,
       MatGridListModule,
       MatCardModule,
       MatMenuModule
   ],
})
export class MaterialModule { }
