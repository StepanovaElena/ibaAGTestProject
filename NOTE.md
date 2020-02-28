# Explanatory note

In the module, there is a non-obvious behavior when saving and adding a user or group entity.  
 
In particular, to add a new user or group, you need to click the “Add” button. To save changes to user data or group, you need to click the same “Add” button. Depending on which component is active, the behavior of the button changes. For example, if a component passes an event "create", clicking the button calls the create method. If the form is invalid, the button is desabled. 
```
ngOnInit() {
    ...
    this.componentEventService.create('user');
    ...
```

```
<button class="button" (click)="updateButtonShown === false ? add($event) : update($event)" [disabled]="addButtonDisabled">
```

This implementation is related to setting the task conditions itself, where only two buttons were offered as workers in the template. Creating a multitasking button was adopted in order not to go beyond the template. 

It is noteworthy that other implementation options were considered, such as 
* queries to the database whenever the data changes; 
* an additional button.  

Also, the behavior of accessing the user or group creation page is not obvious. This is only possible way to get access by following the link in the hamburger menu and the top menu.  

Taking into account these features, there are a number of options for improving the module: 
* an additional data update button;
* a more obvious transition to creation;
* a modal window for confirming user actions when saving or deleting. 

Additionally it is necessary to provide maximum code coverage with tests, what would increase the task completion time. 
