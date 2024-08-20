# oauth2-passport
OAuth2 Passport

Authentication Types with Laravel Passport

- [Password Grant Tokens](https://laravel.com/docs/11.x/passport#password-grant-tokens)
>The OAuth2 password grant allows your other first-party clients, such as a mobile application, to obtain an access token using an email address / username and password. This allows you to issue access tokens securely to your first-party clients without requiring your users to go through the entire OAuth2 authorization code redirect flow.

- [Client Credentials Gran Tokens](https://laravel.com/docs/11.x/passport#client-credentials-grant-tokens)
>The client credentials grant is suitable for machine-to-machine authentication. For example, you might use this grant in a scheduled job which is performing maintenance tasks over an API.

- [Personal Access Tokens](https://laravel.com/docs/11.x/passport#personal-access-tokens)
>Sometimes, your users may want to issue access tokens to themselves without going through the typical authorization code redirect flow. Allowing users to issue tokens to themselves via your application's UI can be useful for allowing users to experiment with your API or may serve as a simpler approach to issuing access tokens in general.

::: info
If your application is primarily using Passport to issue personal access tokens, consider using [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum), Laravel's light-weight first-party library for issuing API access tokens.
:::


