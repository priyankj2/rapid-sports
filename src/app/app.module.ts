import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { VerticalForceComponent } from './shared/charts/vertical-force/vertical-force.component';
import { CenterPressureComponent } from './shared/charts/center-pressure/center-pressure.component';
import { TempoRhythmComponent } from './shared/charts/tempo-rhythm/tempo-rhythm.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    HeaderComponent,
    SidenavComponent,
    VerticalForceComponent,
    CenterPressureComponent,
    TempoRhythmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
