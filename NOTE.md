# Explanatory note

In the module, there is a non-obvious behavior when saving and adding a user or group entity. 

In particular, to add a new user or group, you need to click the “Add” button. 
To save changes to user data or group, you need to click the “Add” button too. 
Depending on which component is active, the behavior of the button changes.
For example, if a component passes an event "create", clicking the button calls the create method.
```
ngOnInit() {
    ...
    this.componentEventService.create('user');
    ...
```

```
<button class="button" (click)="updateButtonShown === false ? add($event) : update($event)" [disabled]="addButtonDisabled">
```

This implementation is related to setting the task conditions itself, where only two buttons were offered as workers in the template. 



There were options for permanent access to the database for any change in the software entity 
