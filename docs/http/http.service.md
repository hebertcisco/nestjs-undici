#### Using the module

To use the nestjs-undici module, you will need to inject the `HttpService` into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```js
import { HttpService } from 'nestjs-undici';

export class AppComponent {
  constructor(private httpService: HttpService) {}
}
```

Once you have injected the `HttpService`, you can use it to make HTTP requests using the `request()` method. The `request()` method takes a URL and an options object as arguments, and returns an [RxJS Observable](https://rxjs.dev/api/index/class/Observable) that you can subscribe to in order to handle the response.

For example, here is how you could use the `HttpService` to make a GET request to the `/users` endpoint:

```js
import { of } from 'rxjs';

export class AppComponent {
  constructor(private httpService: HttpService) {}

  public getUsers(): void {
    this.httpService
      .request
      .get('/users')
      .subscribe(response => { // Handle the response here }); 
}}
```

> You can also use the `post`, `put`, `patch`, `delete`, and `head` methods to send other types of HTTP requests.

### Customizing the request options

The `request()` method also accepts an options object as its second argument. This options object can be used to customize the request, such as setting the HTTP method, adding headers, or setting the body of the request.

Here is an example of how you could use the options object to set the HTTP method to `POST` and add a JSON payload to the request body:

```js
import { of } from 'rxjs';

export class AppComponent {
  constructor(private httpService: HttpService) {}

  public createUser(user: User): void {
    this.httpService
      .request('/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe(response => {
        // Handle the response here
      });
  }
}
```
