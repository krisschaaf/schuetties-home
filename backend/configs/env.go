package configs

import (
	"log"
	"os"

	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
)

type AuthConfig struct {
	Auth0Domain       string `env:"AUTH0_DOMAIN,required"`
	Auth0ClientId     string `env:"AUTH0_CLIENT_ID,required"`
	Auth0CallbackUrl  string `env:"AUTH0_CALLBACK_URL,required"`
	Auth0ClientSecret string
}

func EnvMongoURI() string {
	return os.Getenv("MONGO_URI")
}

func EnvAuthObj() AuthConfig {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("unable to load .env file: %e", err)
	}

	cfg := AuthConfig{}

	err = env.Parse(&cfg)
	if err != nil {
		log.Fatalf("unable to parse ennvironment variables: %e", err)
	}

	cfg.Auth0ClientSecret = os.Getenv("AUTH0_CLIENT_SECRET")

	return cfg
}
