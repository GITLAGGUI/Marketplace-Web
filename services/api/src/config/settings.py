from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Core
    port: int = Field(8080, validation_alias="PORT")
    environment: str = Field("development", validation_alias="NODE_ENV")

    # Database & cache
    database_url: str = Field("sqlite:///./app.db", validation_alias="DATABASE_URL")
    redis_url: str = Field("redis://localhost:6379/0", validation_alias="REDIS_URL")

    # Auth
    jwt_secret: str = Field("changeme-super-secret", validation_alias="JWT_SECRET")
    jwt_exp_hours: int = Field(24, validation_alias="JWT_EXP_HOURS")

    # AWS S3
    aws_region: str | None = Field(default=None, validation_alias="AWS_REGION")
    aws_s3_bucket: str | None = Field(default=None, validation_alias="AWS_S3_BUCKET")
    aws_access_key_id: str | None = Field(default=None, validation_alias="AWS_ACCESS_KEY_ID")
    aws_secret_access_key: str | None = Field(default=None, validation_alias="AWS_SECRET_ACCESS_KEY")

    # OpenRouter
    openrouter_api_key: str | None = Field(default=None, validation_alias="OPENROUTER_API_KEY")
    openrouter_base_url: str = Field("https://openrouter.ai/api/v1", validation_alias="OPENROUTER_BASE_URL")
    openrouter_model: str = Field("deepseek/deepseek-chat-v3-0324:free", validation_alias="OPENROUTER_MODEL")

    # Service URLs
    ai_agent_url: str = Field("http://localhost:8081", validation_alias="AI_AGENT_URL")


settings = Settings()
