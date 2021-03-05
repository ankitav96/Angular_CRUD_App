import { Component } from '@angular/core';
import { CommonService } from './common.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-app';
  myForm: FormGroup;
  searchForm: FormGroup;
  userData: any;
  isEdited: boolean = false;
  userId: any;
  selectedUsers: any;
  showModal: boolean = false;
  loading: boolean = true;
  constructor(private fb: FormBuilder, private commonService: CommonService) {
    this.createForm();
    this.searchFormGroup();
  }

  ngOnInit() {
    this.getAllUsers();
  }
  createForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      gender: ['', Validators.required],
      createDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  searchFormGroup() {
    this.searchForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
    })
  }

  submit(value) {
    this.commonService.createUser(value).subscribe((res) => {
      this.getAllUsers();
      this.myForm.reset();
    })
    this.showModal = false;
    this.searchForm.controls['name'].setValue("");
    this.searchForm.controls['department'].setValue("");
  }

  search(value) {
    if (value.department == "" && value.name == "") {
      this.getAllUsers();
    }
    else {
      if (value.name.includes("@")) {
        this.commonService.hasEmail = true;
      }
      else {
        this.commonService.hasEmail = false;
      }
      this.commonService.searchUser(value.name, value.department).subscribe(res => {
        this.userData = res;
      });
    }
  }

  getAllUsers() {
    this.commonService.getAllUser().subscribe((res) => {
      this.userData = res;
    })
  }

  refreshData() {
    this.getAllUsers();
    this.searchForm.controls['name'].setValue("");
    this.searchForm.controls['department'].setValue("");
  }

  hide() {
    this.showModal = false;
    this.myForm.reset();
    this.isEdited = false;
  }

  editUser(user) {
    this.isEdited = true;
    this.showModal = true;
    this.myForm.controls['name'].setValue(user.name);
    this.myForm.controls['department'].setValue(user.department);
    this.myForm.controls['email'].setValue(user.email);
    this.myForm.controls['phone'].setValue(user.phone);
    this.myForm.controls['gender'].setValue(user.gender);
    this.myForm.controls['createDate'].setValue(user.createDate);
    this.myForm.controls['status'].setValue(user.status);
    this.userId = user.id;
  }

  addUser() {
    this.showModal = true;
    this.myForm.controls['department'].setValue("");
    this.myForm.controls['gender'].setValue("");
    this.myForm.controls['status'].setValue("");

  }

  updateUser(user) {
    this.isEdited = !this.isEdited;
    user["id"] = this.userId;
    this.commonService.updateUser(user).subscribe(() => {
      this.getAllUsers();
      this.myForm.reset();
    })
    this.showModal = false;
    this.searchForm.controls['name'].setValue("");
    this.searchForm.controls['department'].setValue("");
  }

  deleteUser(user) {
    let userId = user.id
    this.commonService.deleteUser(userId, user).subscribe(() => {
      this.getAllUsers();
    })
  }

  deleteUsers() {
    this.selectedUsers.forEach(element => {
      this.commonService.deleteUser(element.id, element).subscribe(() => {
        this.getAllUsers();
      })
    });

  }

}




