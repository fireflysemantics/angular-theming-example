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

  public themeSelect = new FormControl();
  themes: string[] = ['Light', 'Dark'];
  themeClass:string = 'light-theme'
  themeMap:Map<string,String> = new Map()

  constructor(
    public s:StateService,
    private overlayContainer: OverlayContainer
  ) {
    this.themeMap.set('Light', 'light-theme')
    this.themeMap.set('Dark', 'dark-theme')
  }

  ngOnInit(): void {
    this.themeSelect.valueChanges.subscribe(theme=>{
      this.s.OS.put(this.s.OS.S.theme, this.themeMap.get(theme))
    })
    this.removeThemeClasses()
    this.addThemeClass()
    this.s.OS.S.theme.obs.subscribe(t=>console.log(t))
  }


  /**
   * Remove css classes that contain the classPostfix
   * string from the CDK overlayContainer.
   */
  removeThemeClasses(classPostfix:string = '-theme') {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes(classPostfix));
    if (themeClassesToRemove.length) {
       overlayContainerClasses.remove(...themeClassesToRemove);
    }    
  }

  /**
   * Add the themeClass to the overlay container class list.
   * @param themeClass The theme class to add
   */
  addThemeClass(themeClass:string = 'light-theme') {
    this.overlayContainer.getContainerElement().classList.add(themeClass)
  }

}