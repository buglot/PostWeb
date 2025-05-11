# how to run
- 1. create file `.env`
    ```text
    DSN_MYSQL="user/root:pass@tcp(mysql:3306)/post?charset=utf8mb4&parseTime=True&loc=Local"
    JWT_SECRAT_KEY=secertkey
    ```
- 2. create file `.env.local`
    ```text
    NEXT_PUBLIC_API_URL=http://localhost:8080
    NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8081/ws
    NEXT_PUBLIC_FRIEND_URL=http://localhost:8082/auth/friend
    ```