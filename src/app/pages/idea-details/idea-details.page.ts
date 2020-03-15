import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.page.html',
  styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

  idea: Idea = {
    name: '',
    notes: '',
    time:'',
    latitude:0,
    longitude:0
  };

  constructor(private activatedRoute:ActivatedRoute, private ideaService: IdeaService,private toastCtrl: ToastController, private router: Router,private geolocation: Geolocation) { }
 

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
    {
        this.ideaService.getIdea(id).subscribe(idea => {
          this.idea = idea;
        });
    }
  }


  ngAfterViewInit(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.idea.latitude= Number( resp.coords.latitude);
      this.idea.longitude=Number( resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  addIdea() {

    

   
  
    

      
    this.ideaService.addIdea(this.idea).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Event Added');
    }, err => {
      this.showToast('There was a problem adding your event :(');
    });
  }
 
  deleteIdea() {
    this.ideaService.deleteIdea(this.idea.id).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Event deleted');
    }, err => {
      this.showToast('There was a problem deleting your event :(');
    });
  }
 
  updateIdea() {
    this.ideaService.updateIdea(this.idea).then(() => {
      this.showToast('Event updated');
    }, err => {
      this.showToast('There was a problem updating your Event :(');
    });
  }
 
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
