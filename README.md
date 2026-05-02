## Development Notes

### Libraries and APIs used

- Github's Octokit
- Remark

### Only works with

- GitHub App user access tokens
- GitHub App installation access tokens
- Fine-grained personal access tokens

### Generate secret key to encrypt your session: **_SESSION_SECRET_**

`openssl rand -base64 32`

### Create a hash of the password you want to use and store it in **_USER_PASSWORD_HASH_** in .env

`node -e "console.log(require('bcryptjs').hashSync('your_actual_password', 10))"`

### Create a .env file from given .env.example and enter your own API keys

`cp .env.example .env`

### Run Docker based on whether you are developing or want to see final result

`docker compose --profile dev up`

`docker compose --profile prod up`
