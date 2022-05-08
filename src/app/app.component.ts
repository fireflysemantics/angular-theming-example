import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //========================================
  // The theme selection control
  // initialized with a snapshot
  // of the initial theme value
  // from the Object Store. 
  //========================================
  public themeSelect = new FormControl(this.s.OS.snapshot(this.s.OS.S.theme));

  //========================================
  // Array to populate the mat-select
  // for theme selection
  //========================================
  themes: string[] = ['Light', 'Dark'];

  //========================================
  // Map Light to light-theme and 
  // Dark to dark-theme
  //========================================
  themeMap: Map<string, string> = new Map()

  constructor(
    public s: StateService,
    private overlayContainer: OverlayContainer
  ) {
    //========================================
    // Map Light to light-theme and 
    // Dark to dark-theme
    //========================================
    this.themeMap.set('Light', 'light-theme')
    this.themeMap.set('Dark', 'dark-theme')
  }

  ngOnInit(): void {
    //========================================
    // Subscribe to the themeSelect control.
    // When the user selects a new theme
    // the control emmits the theme.
    // We put the new theme value in the object
    // store, and the object store theme 
    // observable is then used by the app.component.html
    // template to switch the theme.
    //========================================
    this.themeSelect.valueChanges.subscribe(themeColor => {
      const theme:string | undefined = this.themeMap.get(themeColor)
      this.s.OS.put(this.s.OS.S.theme, theme)
      this.removeThemeClasses()
      this.addThemeClass()
    })
    //========================================
    // Remove any current theme classes from
    // overlay container.  Then add the default
    // theme class.
    //========================================
    this.removeThemeClasses()
    this.addThemeClass()
  }

  /**
   * Remove css classes that contain the classPostfix
   * string from the CDK overlayContainer.
   */
  removeThemeClasses(classPostfix: string = '-theme') {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes(classPostfix));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
  }

  /**
   * Add the themeClass to the overlay container class list.
   * The current theme class is retrieved from the state service
   * Object Store.
   */
  addThemeClass() {
    const themeClass:string = this.s.OS.snapshot(this.s.OS.S.theme)
    this.overlayContainer.getContainerElement().classList.add(themeClass)
  }
}